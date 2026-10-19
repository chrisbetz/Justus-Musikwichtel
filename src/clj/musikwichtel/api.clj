(ns musikwichtel.api
  (:require [ring.util.response :as resp]
            [musikwichtel.db.protocols :as db]))

(defn handle-get-state [storage game-id req]
  (let [game (db/get-game storage game-id)
        current-player (or (:current-player req) :player1)]
    (resp/response (assoc game :current-player current-player
                               :server-time (System/currentTimeMillis)))))

(defn handle-start [storage game-id req]
  (let [body (:body req)
        player-key (keyword (or (get body "player") (get body :player) (:current-player req) :player1))
        now (System/currentTimeMillis)
        updated (db/start-timer! storage game-id player-key now)]
    (resp/response (assoc updated :current-player (:current-player req)
                                  :server-time now))))

(defn handle-stop [storage game-id req]
  (let [body (:body req)
        player-key (keyword (or (get body "player") (get body :player) (:current-player req) :player1))
        now (System/currentTimeMillis)
        updated (db/stop-timer! storage game-id player-key now)]
    (resp/response (assoc updated :current-player (:current-player req)
                                  :server-time now))))

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
