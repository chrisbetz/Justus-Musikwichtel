(ns musikwichtel.auth-test
  (:require [clojure.test :refer [deftest is testing run-tests]]
            [musikwichtel.auth :as auth]
            [musikwichtel.api :as api]
            [musikwichtel.db.protocols :as db]))

;; Mock storage for tests
(defrecord MockStorage [state-atom]
  db/CompetitionStorage
  (init-storage! [_])
  (close-storage! [_])
  (get-game [_ _game-id]
    @state-atom)
  (start-timer! [_ _game-id player-id start-ts]
    (swap! state-atom assoc-in [(keyword player-id) :running?] true)
    (swap! state-atom assoc-in [(keyword player-id) :start-ts] start-ts)
    @state-atom)
  (stop-timer! [_ _game-id player-id _stop-ts]
    (swap! state-atom assoc-in [(keyword player-id) :running?] false)
    (swap! state-atom assoc-in [(keyword player-id) :start-ts] nil)
    @state-atom)
  (reset-game! [_ _game-id]
    (reset! state-atom {:player1 {:name "Oboe" :total-ms 0 :running? false :start-ts nil}
                        :player2 {:name "Klavier" :total-ms 0 :running? false :start-ts nil}})
    @state-atom)
  (update-player-name! [_ _game-id player-id new-name]
    (swap! state-atom assoc-in [(keyword player-id) :name] new-name)
    @state-atom))

(defn make-mock-storage []
  (->MockStorage (atom {:player1 {:name "Oboe" :total-ms 0 :running? false :start-ts nil}
                        :player2 {:name "Klavier" :total-ms 0 :running? false :start-ts nil}})))

(deftest test-resolve-player
  (testing "quentin resolves to :player1 (Oboe)"
    (is (= :player1 (auth/resolve-player {:username "quentin"})))
    (is (= :player1 (auth/resolve-player {:username "Quentin"})))
    (is (= :player1 (auth/resolve-player {:username "QUENTIN "}))))

  (testing "kilian resolves to :player2 (Klavier)"
    (is (= :player2 (auth/resolve-player {:username "kilian"})))
    (is (= :player2 (auth/resolve-player {:username "Kilian"})))
    (is (= :player2 (auth/resolve-player {:username " KILIAN"}))))

  (testing "other usernames resolve to nil"
    (is (nil? (auth/resolve-player {:username "eve"})))
    (is (nil? (auth/resolve-player {:username "player1"})))
    (is (nil? (auth/resolve-player {:username "admin"})))
    (is (nil? (auth/resolve-player nil)))))

(deftest test-wrap-player-identity
  (let [handler (auth/wrap-player-identity (fn [req] req))]
    (testing "injects quentin as :player1"
      (let [res (handler {:session {:user {:username "quentin" :name "Quentin"}}})]
        (is (= :player1 (:current-player res)))
        (is (= "quentin" (get-in res [:garden-user :username])))))

    (testing "injects kilian as :player2"
      (let [res (handler {:session {:user {:username "kilian" :name "Kilian"}}})]
        (is (= :player2 (:current-player res)))
        (is (= "kilian" (get-in res [:garden-user :username])))))

    (testing "injects unauthorized user with nil :current-player"
      (let [res (handler {:session {:user {:username "eve"}}})]
        (is (nil? (:current-player res)))
        (is (= "eve" (get-in res [:garden-user :username])))))

    (testing "injects unauthenticated visitor with nil :current-player and nil :garden-user"
      (let [res (handler {:session {}})]
        (is (nil? (:current-player res)))
        (is (nil? (:garden-user res)))))))

(deftest test-api-authorization-start-and-stop
  (let [storage (make-mock-storage)
        quentin-req {:garden-user {:username "quentin"} :current-player :player1}
        kilian-req  {:garden-user {:username "kilian"}  :current-player :player2}
        eve-req     {:garden-user {:username "eve"}     :current-player nil}
        anon-req    {:garden-user nil                   :current-player nil}]

    (testing "quentin can start Oboe (:player1)"
      (let [res (api/handle-start storage "test" (assoc quentin-req :body {:player "player1"}))]
        (is (= 200 (:status res 200)))
        (is (true? (get-in res [:body :player1 :running?])))))

    (testing "quentin CANNOT start Klavier (:player2) -> 403"
      (let [res (api/handle-start storage "test" (assoc quentin-req :body {:player "player2"}))]
        (is (= 403 (:status res)))))

    (testing "kilian can start Klavier (:player2)"
      (let [res (api/handle-start storage "test" (assoc kilian-req :body {:player "player2"}))]
        (is (= 200 (:status res 200)))
        (is (true? (get-in res [:body :player2 :running?])))))

    (testing "kilian CANNOT start Oboe (:player1) -> 403"
      (let [res (api/handle-start storage "test" (assoc kilian-req :body {:player "player1"}))]
        (is (= 403 (:status res)))))

    (testing "unauthenticated user cannot start -> 401"
      (let [res (api/handle-start storage "test" (assoc anon-req :body {:player "player1"}))]
        (is (= 401 (:status res)))))

    (testing "unauthorized user eve cannot start -> 403"
      (let [res (api/handle-start storage "test" (assoc eve-req :body {:player "player1"}))]
        (is (= 403 (:status res)))))

    (testing "quentin can stop Oboe (:player1)"
      (let [res (api/handle-stop storage "test" (assoc quentin-req :body {:player "player1"}))]
        (is (= 200 (:status res 200)))
        (is (false? (get-in res [:body :player1 :running?])))))

    (testing "quentin CANNOT stop Klavier (:player2) -> 403"
      (let [res (api/handle-stop storage "test" (assoc quentin-req :body {:player "player2"}))]
        (is (= 403 (:status res)))))))

(deftest test-admin-check
  (testing "justus is recognized as admin"
    (is (true? (auth/admin? {:username "justus"})))
    (is (true? (auth/admin? {:username "Justus"})))
    (is (true? (auth/admin? {:username " JUSTUS "}))))

  (testing "quentin, kilian, and others are not admin"
    (is (false? (boolean (auth/admin? {:username "quentin"}))))
    (is (false? (boolean (auth/admin? {:username "kilian"}))))
    (is (false? (boolean (auth/admin? {:username "eve"}))))
    (is (false? (boolean (auth/admin? nil))))))

(deftest test-api-authorization-reset-and-name
  (let [storage (make-mock-storage)
        justus-req  {:garden-user {:username "justus"}  :admin? true :current-player nil}
        quentin-req {:garden-user {:username "quentin"} :current-player :player1}
        kilian-req  {:garden-user {:username "kilian"}  :current-player :player2}
        eve-req     {:garden-user {:username "eve"}     :current-player nil}
        anon-req    {:garden-user nil                   :current-player nil}]

    (testing "ONLY justus can reset competition"
      (let [res (api/handle-reset storage "test" justus-req)]
        (is (= 200 (:status res 200)))
        (is (true? (:admin? (:body res))))))

    (testing "quentin CANNOT reset competition -> 403"
      (let [res (api/handle-reset storage "test" quentin-req)]
        (is (= 403 (:status res)))
        (is (= "forbidden_admin_only" (get-in res [:body :code])))))

    (testing "kilian CANNOT reset competition -> 403"
      (let [res (api/handle-reset storage "test" kilian-req)]
        (is (= 403 (:status res)))
        (is (= "forbidden_admin_only" (get-in res [:body :code])))))

    (testing "unauthenticated cannot reset -> 401"
      (let [res (api/handle-reset storage "test" anon-req)]
        (is (= 401 (:status res)))))

    (testing "unauthorized user eve cannot reset -> 403"
      (let [res (api/handle-reset storage "test" eve-req)]
        (is (= 403 (:status res)))))

    (testing "quentin can update Oboe's name"
      (let [res (api/handle-update-name storage "test" (assoc quentin-req :body {:player "player1" :name "Quentins Oboe"}))]
        (is (= 200 (:status res 200)))
        (is (= "Quentins Oboe" (get-in res [:body :player1 :name])))))

    (testing "quentin CANNOT update Klavier's name -> 403"
      (let [res (api/handle-update-name storage "test" (assoc quentin-req :body {:player "player2" :name "Hacked"}))]
        (is (= 403 (:status res)))))))
