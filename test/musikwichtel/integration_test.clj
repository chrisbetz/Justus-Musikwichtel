(ns musikwichtel.integration-test
  (:require [clojure.test :refer [deftest is testing]]
            [cheshire.core :as json]
            [musikwichtel.routes :as routes]
            [musikwichtel.auth-test :refer [make-mock-storage]]))

(deftest test-full-ring-stack-auth-flow
  (let [storage (make-mock-storage)
        app (routes/make-app storage "integration-test-game")]

    (testing "1. Spectator / Unauthenticated state check"
      (let [res (app {:uri "/api/state" :request-method :get})
            body (json/parse-string (:body res) true)]
        (is (= 200 (:status res)))
        (is (nil? (:current-player body)))
        (is (nil? (:garden-user body)))
        (is (false? (:admin? body)))
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

        (let [res (app {:uri "/api/state"
                        :request-method :get
                        :headers {"cookie" (str "ring-session=" session-id)}})
              body (json/parse-string (:body res) true)]
          (is (= 200 (:status res)))
          (is (= "player1" (name (:current-player body))))
          (is (= "quentin" (get-in body [:garden-user :username]))))

        (let [res (app {:uri "/api/start"
                        :request-method :post
                        :headers {"content-type" "application/json"
                                  "cookie" (str "ring-session=" session-id)}
                        :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player1\"}"))})
              body (json/parse-string (:body res) true)]
          (is (= 200 (:status res)))
          (is (true? (get-in body [:player1 :running?]))))

        (let [res (app {:uri "/api/start"
                        :request-method :post
                        :headers {"content-type" "application/json"
                                  "cookie" (str "ring-session=" session-id)}
                        :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player2\"}"))})
              body (json/parse-string (:body res) true)]
          (is (= 403 (:status res)))
          (is (= "forbidden_instrument" (:code body))))

        (let [res (app {:uri "/api/stop"
                        :request-method :post
                        :headers {"content-type" "application/json"
                                  "cookie" (str "ring-session=" session-id)}
                        :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player1\"}"))})
              body (json/parse-string (:body res) true)]
          (is (= 200 (:status res)))
          (is (false? (get-in body [:player1 :running?]))))))

    (testing "4. Login as 'kilian' via Garden ID endpoint in local dev"
      (let [login-res (app {:uri "/.application.garden/garden-id/login"
                            :request-method :post
                            :body (java.io.ByteArrayInputStream. (.getBytes "username=kilian&name=Kilian&email=kilian@garden"))})
            cookie-hdr (first (get-in login-res [:headers "Set-Cookie"]))
            session-id (second (re-find #"ring-session=([^;]+)" cookie-hdr))]
        (is (= 302 (:status login-res)))

        (let [res (app {:uri "/api/state"
                        :request-method :get
                        :headers {"cookie" (str "ring-session=" session-id)}})
              body (json/parse-string (:body res) true)]
          (is (= 200 (:status res)))
          (is (= "player2" (name (:current-player body))))
          (is (= "kilian" (get-in body [:garden-user :username]))))

        (let [res (app {:uri "/api/start"
                        :request-method :post
                        :headers {"content-type" "application/json"
                                  "cookie" (str "ring-session=" session-id)}
                        :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player2\"}"))})
              body (json/parse-string (:body res) true)]
          (is (= 200 (:status res)))
          (is (true? (get-in body [:player2 :running?]))))

        (let [res (app {:uri "/api/start"
                        :request-method :post
                        :headers {"content-type" "application/json"
                                  "cookie" (str "ring-session=" session-id)}
                        :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player1\"}"))})
              body (json/parse-string (:body res) true)]
          (is (= 403 (:status res)))
          (is (= "forbidden_instrument" (:code body))))))

    (testing "5. Unauthorized user 'eve' logs in"
      (let [login-res (app {:uri "/.application.garden/garden-id/login"
                            :request-method :post
                            :body (java.io.ByteArrayInputStream. (.getBytes "username=eve&name=Eve&email=eve@garden"))})
            cookie-hdr (first (get-in login-res [:headers "Set-Cookie"]))
            session-id (second (re-find #"ring-session=([^;]+)" cookie-hdr))]
        (is (= 302 (:status login-res)))

        (let [res (app {:uri "/api/state"
                        :request-method :get
                        :headers {"cookie" (str "ring-session=" session-id)}})
              body (json/parse-string (:body res) true)]
          (is (= 200 (:status res)))
          (is (nil? (:current-player body)))
          (is (= "eve" (get-in body [:garden-user :username]))))

        (let [res (app {:uri "/api/start"
                        :request-method :post
                        :headers {"content-type" "application/json"
                                  "cookie" (str "ring-session=" session-id)}
                        :body (java.io.ByteArrayInputStream. (.getBytes "{\"player\":\"player1\"}"))})
              body (json/parse-string (:body res) true)]
          (is (= 403 (:status res)))
          (is (= "unauthorized_user" (:code body))))))

    (testing "6. Reset authorization: ONLY 'justus' can reset the clocks"
      ;; quentin tries to reset -> 403
      (let [login-quentin (app {:uri "/.application.garden/garden-id/login"
                                :request-method :post
                                :body (java.io.ByteArrayInputStream. (.getBytes "username=quentin&name=Quentin&email=quentin@garden"))})
            cookie-q (first (get-in login-quentin [:headers "Set-Cookie"]))
            sess-q (second (re-find #"ring-session=([^;]+)" cookie-q))
            q-reset (app {:uri "/api/reset"
                          :request-method :post
                          :headers {"cookie" (str "ring-session=" sess-q)}})
            q-body (json/parse-string (:body q-reset) true)]
        (is (= 403 (:status q-reset)))
        (is (= "forbidden_admin_only" (:code q-body))))

      ;; justus logs in and resets -> 200
      (let [login-justus (app {:uri "/.application.garden/garden-id/login"
                               :request-method :post
                               :body (java.io.ByteArrayInputStream. (.getBytes "username=justus&name=Justus&email=justus@garden"))})
            cookie-j (first (get-in login-justus [:headers "Set-Cookie"]))
            sess-j (second (re-find #"ring-session=([^;]+)" cookie-j))]
        (is (= 302 (:status login-justus)))

        (let [res (app {:uri "/api/state"
                        :request-method :get
                        :headers {"cookie" (str "ring-session=" sess-j)}})
              body (json/parse-string (:body res) true)]
          (is (= 200 (:status res)))
          (is (true? (:admin? body)))
          (is (= "justus" (get-in body [:garden-user :username]))))

        (let [res (app {:uri "/api/reset"
                        :request-method :post
                        :headers {"cookie" (str "ring-session=" sess-j)}})
              body (json/parse-string (:body res) true)]
          (is (= 200 (:status res)))
          (is (true? (:admin? body))))))))
