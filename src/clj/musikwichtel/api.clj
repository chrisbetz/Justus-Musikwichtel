(ns musikwichtel.api
  (:require [ring.util.response :as resp]
            [musikwichtel.db.protocols :as db]
            [musikwichtel.auth :as auth]))

(defn handle-logout [_req]
  (-> (resp/response {:status "ok" :current-player nil :garden-user nil})
      (assoc :session nil)))

(defn handle-get-state [storage game-id req]
  (let [game (db/get-game storage game-id)
        current-player (:current-player req)
        garden-user (:garden-user req)]
    (resp/response (assoc game
                          :current-player current-player
                          :garden-user (when garden-user
                                         (select-keys garden-user [:username :name :email]))
                          :server-time (System/currentTimeMillis)))))

(defn- check-control-permission
  "Verifies that the request is authenticated with Garden ID and authorized for the requested player.
   Returns nil if permitted, or an HTTP error response map if unauthorized/forbidden."
  [req requested-player action-name]
  (let [garden-user (:garden-user req)
        current-player (:current-player req)]
    (cond
      (nil? garden-user)
      (resp/status
        (resp/response {:error "Nicht angemeldet: Bitte melde dich mit deiner Garden ID an."
                        :code "unauthenticated"
                        :login-uri "/.application.garden/garden-id/login"})
        401)

      (nil? current-player)
      (resp/status
        (resp/response {:error (format "Garden ID '@%s' ist nicht berechtigt. Nur @quentin (Oboe) und @kilian (Klavier) dürfen teilnehmen."
                                       (:username garden-user))
                        :code "unauthorized_user"
                        :username (:username garden-user)})
        403)

      (not= current-player requested-player)
      (let [target-name (get auth/player->instrument requested-player (name requested-player))
            owner-id    (get auth/player->garden-id requested-player "dem zuständigen Musiker")]
        (resp/status
          (resp/response {:error (format "Verboten: Nur @%s darf %s %s."
                                         owner-id target-name action-name)
                          :code "forbidden_instrument"
                          :current-player current-player
                          :requested-player requested-player})
          403))

      :else nil)))

(defn handle-start [storage game-id req]
  (let [body (:body req)
        requested (keyword (or (get body "player") (get body :player)))
        err (check-control-permission req requested "starten")]
    (if err
      err
      (let [now (System/currentTimeMillis)
            updated (db/start-timer! storage game-id requested now)]
        (resp/response (assoc updated
                              :current-player (:current-player req)
                              :garden-user (when-let [u (:garden-user req)]
                                             (select-keys u [:username :name :email]))
                              :server-time now))))))

(defn handle-stop [storage game-id req]
  (let [body (:body req)
        requested (keyword (or (get body "player") (get body :player)))
        err (check-control-permission req requested "stoppen")]
    (if err
      err
      (let [now (System/currentTimeMillis)
            updated (db/stop-timer! storage game-id requested now)]
        (resp/response (assoc updated
                              :current-player (:current-player req)
                              :garden-user (when-let [u (:garden-user req)]
                                             (select-keys u [:username :name :email]))
                              :server-time now))))))

(defn handle-reset [storage game-id req]
  (let [garden-user (:garden-user req)
        current-player (:current-player req)]
    (cond
      (nil? garden-user)
      (resp/status
        (resp/response {:error "Nicht angemeldet: Bitte mit Garden ID anmelden."
                        :code "unauthenticated"
                        :login-uri "/.application.garden/garden-id/login"})
        401)

      (nil? current-player)
      (resp/status
        (resp/response {:error "Verboten: Nur @quentin und @kilian dürfen die Uhren zurücksetzen."
                        :code "unauthorized_user"})
        403)

      :else
      (let [updated (db/reset-game! storage game-id)]
        (resp/response (assoc updated
                              :current-player current-player
                              :garden-user (when garden-user
                                             (select-keys garden-user [:username :name :email]))
                              :server-time (System/currentTimeMillis)))))))

(defn handle-update-name [storage game-id req]
  (let [body (:body req)
        player-key (keyword (or (get body "player") (get body :player)))
        new-name (str (or (get body "name") (get body :name) ""))
        trimmed (.trim new-name)]
    (if (and player-key (seq trimmed))
      (if-let [err (check-control-permission req player-key "umbenennen")]
        err
        (let [updated (db/update-player-name! storage game-id player-key trimmed)]
          (resp/response (assoc updated
                                :current-player (:current-player req)
                                :garden-user (when-let [u (:garden-user req)]
                                               (select-keys u [:username :name :email]))
                                :server-time (System/currentTimeMillis)))))
      (resp/bad-request {:error "Ungültiger Spieler oder Name"}))))
