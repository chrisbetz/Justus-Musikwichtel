(ns musikwichtel.auth
  (:require [nextjournal.garden-id :as garden-id]
            [ring.middleware.session :as session]
            [clojure.string :as str]))

;; Allowed mappings between Garden ID usernames and instruments / players:
;; quentin -> Oboe (:player1)
;; kilian  -> Klavier (:player2)
(def garden-id->player
  {"quentin" :player1
   "kilian"  :player2})

(def player->garden-id
  {:player1 "quentin"
   :player2 "kilian"})

(def player->instrument
  {:player1 "Oboe"
   :player2 "Klavier"})

(defn resolve-player
  "Returns :player1, :player2, or nil based on the Garden ID username."
  [garden-user]
  (when-let [username (:username garden-user)]
    (get garden-id->player (str/lower-case (str/trim (str username))))))

(defn wrap-player-identity
  "Injects :current-player and :garden-user into request.
   - :garden-user: user map from session (via nextjournal.garden-id) or nil
   - :current-player:
       :player1 if garden-user username is 'quentin' (Oboe)
       :player2 if garden-user username is 'kilian' (Klavier)
       nil if unauthenticated or unauthorized"
  [handler]
  (fn [request]
    (let [garden-user (garden-id/get-user request)
          player-id (resolve-player garden-user)
          req* (assoc request
                      :current-player player-id
                      :garden-user garden-user)]
      (handler req*))))

(defn wrap-auth-stack
  "Ring middleware stack configuring Garden ID authentication and player resolution.
   Session middleware wraps the outside so garden-id and player-identity can read/write session."
  ([handler]
   (wrap-auth-stack handler nil))
  ([handler session-opts]
   (let [wrap-s (if session-opts
                  #(session/wrap-session % session-opts)
                  session/wrap-session)]
     (-> handler
         wrap-player-identity
         garden-id/wrap-auth
         wrap-s))))

