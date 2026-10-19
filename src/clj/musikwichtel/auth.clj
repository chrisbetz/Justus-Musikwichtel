(ns musikwichtel.auth
  (:require [nextjournal.garden-id :as garden-id]
            [ring.middleware.session :as session]))

(defn wrap-player-identity
  "Injects :current-player into request.
   In local development, ?user=player2 switches to Player 2.
   In production, authenticated garden user is resolved."
  [handler]
  (fn [request]
    (let [query-user (get-in request [:query-params "user"])
          garden-user (garden-id/get-user request)
          player-id (cond
                      (= query-user "player2") :player2
                      (= query-user "player1") :player1
                      (and garden-user (= (:username garden-user) "player2")) :player2
                      :else :player1)
          req* (assoc request
                      :current-player player-id
                      :garden-user garden-user)]
      (handler req*))))

(defn wrap-auth-stack [handler]
  (-> handler
      wrap-player-identity
      garden-id/wrap-auth
      session/wrap-session))
