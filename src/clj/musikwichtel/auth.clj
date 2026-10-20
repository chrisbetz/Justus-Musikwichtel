(ns musikwichtel.auth
  (:require [nextjournal.garden-id :as garden-id]
            [ring.middleware.session :as session]))

(defn wrap-player-identity
  "Injects :current-player into request.
   Resolution order:
   1. query-param ?user=player1 | player2 | both
   2. session :player-id
   3. garden-user username match
   4. nil (unauthenticated, requires login)"
  [handler]
  (fn [request]
    (let [query-user (get-in request [:query-params "user"])
          session-user (get-in request [:session :player-id])
          garden-user (garden-id/get-user request)
          player-id (cond
                      (= query-user "player2") :player2
                      (= query-user "player1") :player1
                      (= query-user "both") :both
                      (and session-user (contains? #{"player1" "player2" "both"} (str session-user))) (keyword session-user)
                      (and garden-user (= (:username garden-user) "player2")) :player2
                      (and garden-user (= (:username garden-user) "player1")) :player1
                      :else nil)
          req* (assoc request
                      :current-player player-id
                      :garden-user garden-user)]
      (handler req*))))

(defn wrap-auth-stack [handler]
  (-> handler
      wrap-player-identity
      garden-id/wrap-auth
      session/wrap-session))

