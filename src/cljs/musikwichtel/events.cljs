(ns musikwichtel.events
  (:require [re-frame.core :as rf]
            [musikwichtel.db :as db]
            [clojure.walk :refer [keywordize-keys]]))

(def local-storage-key "wichtel-wetteifern-cache")

(defn- save-cache [db]
  (try
    (let [data {:player1 (:player1 db)
                :player2 (:player2 db)}
          json (js/JSON.stringify (clj->js data))]
      (.setItem js/localStorage local-storage-key json))
    (catch :default _ nil)))

(defn- load-cache []
  (try
    (when-let [item (.getItem js/localStorage local-storage-key)]
      (keywordize-keys (js->clj (js/JSON.parse item))))
    (catch :default _ nil)))

(rf/reg-event-db
  ::initialize-db
  (fn [_ _]
    (let [cached (load-cache)]
      (cond-> db/default-db
        (:player1 cached) (assoc :player1 (:player1 cached))
        (:player2 cached) (assoc :player2 (:player2 cached))))))

(rf/reg-event-db
  ::tick
  (fn [db [_ now]]
    (assoc db :wall-clock-now now)))

(rf/reg-event-fx
  ::poll-state
  (fn [_ _]
    (-> (js/fetch "/api/state")
        (.then (fn [resp] (when (.-ok resp) (.json resp))))
        (.then (fn [data]
                 (when data
                   (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
        (.catch (fn [_] nil)))
    {}))

(rf/reg-event-db
  ::state-received
  (fn [db [_ server-data]]
    (if-not server-data
      db
      (let [updated (cond-> db
                      (:player1 server-data) (assoc :player1 (:player1 server-data))
                      (:player2 server-data) (assoc :player2 (:player2 server-data))
                      (contains? server-data :current-player)
                      (assoc :current-player (when-let [cp (:current-player server-data)]
                                               (keyword cp)))
                      (contains? server-data :garden-user)
                      (assoc :garden-user (:garden-user server-data))
                      true (assoc :server-synced? true))]
        (save-cache updated)
        updated))))

;; Authentication Events
(rf/reg-event-db
  ::open-login-modal
  (fn [db _]
    (assoc db :show-login-modal? true)))

(rf/reg-event-db
  ::close-login-modal
  (fn [db _]
    (assoc db :show-login-modal? false)))

(rf/reg-event-fx
  ::dev-login-impersonate
  (fn [_ [_ username]]
    (let [disp-name (if (= username "quentin") "Quentin" "Kilian")
          body (str "username=" (js/encodeURIComponent username)
                    "&name=" (js/encodeURIComponent disp-name)
                    "&email=" (js/encodeURIComponent (str username "@application.garden")))]
      (-> (js/fetch "/.application.garden/garden-id/login"
                    #js {:method "POST"
                         :headers #js {"Content-Type" "application/x-www-form-urlencoded"}
                         :body body})
          (.then (fn [_]
                   (rf/dispatch [::poll-state])
                   (rf/dispatch [::close-login-modal])))
          (.catch (fn [_] nil))))
    {}))

(rf/reg-event-fx
  ::logout
  (fn [{:keys [db]} _]
    (let [optimistic-db (assoc db
                               :current-player nil
                               :garden-user nil)]
      (-> (js/fetch "/api/logout"
                    #js {:method "POST"})
          (.then (fn [_]
                   (rf/dispatch [::poll-state])))
          (.catch (fn [_] nil)))
      {:db optimistic-db})))

(rf/reg-event-fx
  ::start-timer
  (fn [{:keys [db]} [_ player-key]]
    (let [current (:current-player db)
          pk (keyword player-key)]
      (cond
        ;; If not logged in or not authorized for this player, prompt user with login modal
        (not= current pk)
        {:db (assoc db :show-login-modal? true)}

        :else
        (let [now (.now js/Date)
              optimistic-db (-> db
                                (assoc-in [pk :running?] true)
                                (assoc-in [pk :start-ts] now))]
          (save-cache optimistic-db)
          (-> (js/fetch "/api/start"
                        #js {:method "POST"
                             :headers #js {"Content-Type" "application/json"}
                             :body (js/JSON.stringify #js {:player (name pk)})})
              (.then (fn [resp]
                       (if (.-ok resp)
                         (.json resp)
                         (do (rf/dispatch [::poll-state])
                             (when (#{401 403} (.-status resp))
                               (rf/dispatch [::open-login-modal]))
                             nil))))
              (.then (fn [data]
                       (when data
                         (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
              (.catch (fn [_] nil)))
          {:db optimistic-db})))))

(rf/reg-event-fx
  ::stop-timer
  (fn [{:keys [db]} [_ player-key]]
    (let [current (:current-player db)
          pk (keyword player-key)]
      (cond
        (not= current pk)
        {:db (assoc db :show-login-modal? true)}

        :else
        (let [now (.now js/Date)
              p-data (get db pk)
              total (:total-ms p-data 0)
              start (:start-ts p-data)
              elapsed (if (and start (> now start)) (- now start) 0)
              new-total (+ total elapsed)
              optimistic-db (-> db
                                (assoc-in [pk :running?] false)
                                (assoc-in [pk :total-ms] new-total)
                                (assoc-in [pk :start-ts] nil))]
          (save-cache optimistic-db)
          (-> (js/fetch "/api/stop"
                        #js {:method "POST"
                             :headers #js {"Content-Type" "application/json"}
                             :body (js/JSON.stringify #js {:player (name pk)})})
              (.then (fn [resp]
                       (if (.-ok resp)
                         (.json resp)
                         (do (rf/dispatch [::poll-state])
                             (when (#{401 403} (.-status resp))
                               (rf/dispatch [::open-login-modal]))
                             nil))))
              (.then (fn [data]
                       (when data
                         (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
              (.catch (fn [_] nil)))
          {:db optimistic-db})))))

(rf/reg-event-db
  ::open-reset-modal
  (fn [db _]
    (assoc db :show-reset-modal? true)))

(rf/reg-event-db
  ::cancel-reset
  (fn [db _]
    (assoc db :show-reset-modal? false)))

(rf/reg-event-fx
  ::confirm-reset
  (fn [{:keys [db]} _]
    (let [current (:current-player db)]
      (if-not current
        {:db (-> db
                 (assoc :show-reset-modal? false)
                 (assoc :show-login-modal? true))}
        (let [p1-name (get-in db [:player1 :name] "Oboe")
              p2-name (get-in db [:player2 :name] "Klavier")
              optimistic-db (-> db
                                (assoc :show-reset-modal? false)
                                (assoc :player1 {:name p1-name :total-ms 0 :running? false :start-ts nil})
                                (assoc :player2 {:name p2-name :total-ms 0 :running? false :start-ts nil}))]
          (save-cache optimistic-db)
          (-> (js/fetch "/api/reset"
                        #js {:method "POST"
                             :headers #js {"Content-Type" "application/json"}})
              (.then (fn [resp]
                       (if (.-ok resp)
                         (.json resp)
                         (do (rf/dispatch [::poll-state])
                             (when (#{401 403} (.-status resp))
                               (rf/dispatch [::open-login-modal]))
                             nil))))
              (.then (fn [data]
                       (when data
                         (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
              (.catch (fn [_] nil)))
          {:db optimistic-db})))))

(rf/reg-event-fx
  ::update-name
  (fn [{:keys [db]} [_ player-key new-name]]
    (let [pk (keyword player-key)
          current (:current-player db)
          trimmed (.trim (str new-name))]
      (if (or (empty? trimmed) (not= current pk))
        {:db db}
        (let [optimistic-db (assoc-in db [pk :name] trimmed)]
          (save-cache optimistic-db)
          (-> (js/fetch "/api/name"
                        #js {:method "POST"
                             :headers #js {"Content-Type" "application/json"}
                             :body (js/JSON.stringify #js {:player (name pk) :name trimmed})})
              (.then (fn [resp] (when (.-ok resp) (.json resp))))
              (.then (fn [data]
                       (when data
                         (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
              (.catch (fn [_] nil)))
          {:db optimistic-db})))))
