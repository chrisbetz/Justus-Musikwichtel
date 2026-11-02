(ns musikwichtel.integration-test
  (:require [clojure.test :refer [deftest is testing run-tests]]
            [cheshire.core :as json]
            [musikwichtel.routes :as routes]
            [musikwichtel.auth-test :refer [make-mock-storage]]))

(deftest test-full-ring-stack-auth-flow
  (let [storage (make-mock-storage)
        app (routes/make-app storage "integration-test-game")
        store (atom {})]

    (testing "1. Spectator / Unauthenticated state check"
      (let [res (app {:uri "/api/state" :request-method :get})
            body (json/parse-string (:body res) true)]
        (is (= 200 (:status res)))
        (is (nil? (:current-player body)))
        (is (nil? (:garden-user body)))
        (is (contains? body :player1))
        (is (contains? body :player2))))

    (testing "2. Unauthenticated user cannot start a timer"
      (let [res (app {:uri "/api/start"
                      :request-method :post
                      :headers {"content-type" "application/json"}
                      :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player1\"}"))})
            body (json/parse-string (:body res) true)]
        (is (= 401 (:status res)))
        (is (= "unauthenticated" (:code body)))))

    (testing "3. Login as 'quentin' via Garden ID endpoint in local dev"
      (let [login-res (app {:uri "/.application.garden/garden-id/login"
                            :request-method :post
                            :body (java.io.ByteArrayInputStream. (.getBytes "username=quentin&name=Quentin&email=quentin@garden"))})
            cookie-hdr (first (get-in login-res [:headers "Set-Cookie"]))
            session-id (second (re-find #"ring-session=([^;]+)" cookie-hdr))]
        (is (= 302 (:status login-res)))
        (is (= "/" (get-in login-res [:headers "location"])))
        (is (some? session-id))

        (testing "State reflects authenticated 'quentin' as :player1"
          (let [res (app {:uri "/api/state"
                          :request-method :get
                          :headers {"cookie" (str "ring-session=" session-id)}})
                body (json/parse-string (:body res) true)]
            (is (= 200 (:status res)))
            (is (= "player1" (name (:current-player body))))
            (is (= "quentin" (get-in body [:garden-user :username])))))

        (testing "quentin can start Oboe (:player1)"
          (let [res (app {:uri "/api/start"
                          :request-method :post
                          :headers {"content-type" "application/json"
                                    "cookie" (str "ring-session=" session-id)}
                          :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player1\"}"))})
                body (json/parse-string (:body res) true)]
            (is (= 200 (:status res)))
            (is (true? (get-in body [:player1 :running?])))))

        (testing "quentin CANNOT start Klavier (:player2) -> 403"
          (let [res (app {:uri "/api/start"
                          :request-method :post
                          :headers {"content-type" "application/json"
                                    "cookie" (str "ring-session=" session-id)}
                          :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player2\"}"))})
                body (json/parse-string (:body res) true)]
            (is (= 403 (:status res)))
            (is (= "forbidden_instrument" (:code body)))))

        (testing "quentin can stop Oboe (:player1)"
          (let [res (app {:uri "/api/stop"
                          :request-method :post
                          :headers {"content-type" "application/json"
                                    "cookie" (str "ring-session=" session-id)}
                          :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player1\"}"))})
                body (json/parse-string (:body res) true)]
            (is (= 200 (:status res)))
            (is (false? (get-in body [:player1 :running?])))))))

    (testing "4. Login as 'kilian' via Garden ID endpoint in local dev"
      (let [login-res (app {:uri "/.application.garden/garden-id/login"
                            :request-method :post
                            :body (java.io.ByteArrayInputStream. (.getBytes "username=kilian&name=Kilian&email=kilian@garden"))})
            cookie-hdr (first (get-in login-res [:headers "Set-Cookie"]))
            session-id (second (re-find #"ring-session=([^;]+)" cookie-hdr))]
        (is (= 302 (:status login-res)))

        (testing "State reflects authenticated 'kilian' as :player2"
          (let [res (app {:uri "/api/state"
                          :request-method :get
                          :headers {"cookie" (str "ring-session=" session-id)}})
                body (json/parse-string (:body res) true)]
            (is (= 200 (:status res)))
            (is (= "player2" (name (:current-player body))))
            (is (= "kilian" (get-in body [:garden-user :username])))))

        (testing "kilian can start Klavier (:player2)"
          (let [res (app {:uri "/api/start"
                          :request-method :post
                          :headers {"content-type" "application/json"
                                    "cookie" (str "ring-session=" session-id)}
                          :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player2\"}"))})
                body (json/parse-string (:body res) true)]
            (is (= 200 (:status res)))
            (is (true? (get-in body [:player2 :running?])))))

        (testing "kilian CANNOT start Oboe (:player1) -> 403"
          (let [res (app {:uri "/api/start"
                          :request-method :post
                          :headers {"content-type" "application/json"
                                    "cookie" (str "ring-session=" session-id)}
                          :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player1\"}"))})
                body (json/parse-string (:body res) true)]
            (is (= 403 (:status res)))
            (is (= "forbidden_instrument" (:code body)))))))

    (testing "5. Unauthorized user 'eve' logs in"
      (let [login-res (app {:uri "/.application.garden/garden-id/login"
                            :request-method :post
                            :body (java.io.ByteArrayInputStream. (.getBytes "username=eve&name=Eve&email=eve@garden"))})
            cookie-hdr (first (get-in login-res [:headers "Set-Cookie"]))
            session-id (second (re-find #"ring-session=([^;]+)" cookie-hdr))]
        (is (= 302 (:status login-res)))

        (testing "State shows authenticated garden user eve, but current-player is nil"
          (let [res (app {:uri "/api/state"
                          :request-method :get
                          :headers {"cookie" (str "ring-session=" session-id)}})
                body (json/parse-string (:body res) true)]
            (is (= 200 (:status res)))
            (is (nil? (:current-player body)))
            (is (= "eve" (get-in body [:garden-user :username])))))

        (testing "eve CANNOT start either instrument -> 403 unauthorized_user"
          (let [res (app {:uri "/api/start"
                          :request-method :post
                          :headers {"content-type" "application/json"
                                    "cookie" (str "ring-session=" session-id)}
                          :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player1\"}"))})
                body (json/parse-string (:body res) true)]
            (is (= 403 (:status res)))
            (is (= "unauthorized_user" (:code body)))))))))
