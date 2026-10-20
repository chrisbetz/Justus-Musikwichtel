(ns musikwichtel.api
  (:require [ring.util.response :as resp]
            [musikwichtel.db.protocols :as db]))

(defn handle-login [req]
  (let [body (:body req)
        player-str (or (get body "player") (get body :player))
        player-key (when (contains? #{"player1" "player2" "both"} (str player-str))
                     (keyword player-str))]
    (if player-key
      (-> (resp/response {:status "ok" :current-player player-key})
          (assoc :session {:player-id (name player-key)}))
      (resp/bad-request {:error "Invalid player"}))))

(defn handle-logout [_req]
  (-> (resp/response {:status "ok" :current-player nil})
      (assoc :session nil)))

(defn handle-get-state [storage game-id req]
  (let [game (db/get-game storage game-id)
        current-player (:current-player req)]
    (resp/response (assoc game :current-player current-player
                               :server-time (System/currentTimeMillis)))))

(defn handle-start [storage game-id req]
  (let [body (:body req)
        requested (keyword (or (get body "player") (get body :player)))
        current (:current-player req)
        allowed? (or (nil? current) (= current :both) (= current requested))
        player-key (or requested current :player1)]
    (if allowed?
      (let [now (System/currentTimeMillis)
            updated (db/start-timer! storage game-id player-key now)]
        (resp/response (assoc updated :current-player current
                                      :server-time now)))
      (resp/status (resp/response {:error "Forbidden: not logged in as this player"}) 403))))

(defn handle-stop [storage game-id req]
  (let [body (:body req)
        requested (keyword (or (get body "player") (get body :player)))
        current (:current-player req)
        allowed? (or (nil? current) (= current :both) (= current requested))
        player-key (or requested current :player1)]
    (if allowed?
      (let [now (System/currentTimeMillis)
            updated (db/stop-timer! storage game-id player-key now)]
        (resp/response (assoc updated :current-player current
                                      :server-time now)))
      (resp/status (resp/response {:error "Forbidden: not logged in as this player"}) 403))))

(defn handle-reset [storage game-id req]
  (let [updated (db/reset-game! storage game-id)]
    (resp/response (assoc updated :current-player (:current-player req)
                                  :server-time (System/currentTimeMillis)))))

(defn handle-update-name [storage game-id req]
  (let [body (:body req)
        player-key (keyword (or (get body "player") (get body :player)))
        new-name (str (or (get body "name") (get body :name) ""))
        trimmed (.trim new-name)]
    (if (and player-key (seq trimmed))
      (let [updated (db/update-player-name! storage game-id player-key trimmed)]
        (resp/response (assoc updated :current-player (:current-player req)
                                      :server-time (System/currentTimeMillis))))
      (resp/bad-request {:error "Invalid player or name"}))))
