(ns musikwichtel.system
  (:require [ring.adapter.jetty :refer [run-jetty]]
            [gorillalabs.bauhaus.setup.logging :as logging]
            [gorillalabs.bauhaus.setup.shutdown :as shutdown]
            [taoensso.timbre :as log]
            [musikwichtel.db.protocols :as db]
            [musikwichtel.db.datalevin :refer [create-datalevin-storage]]
            [musikwichtel.db.sqlite :refer [create-sqlite-storage]]
            [musikwichtel.routes :refer [make-app]]))

(defn start-system [config]
  (try
    (logging/init-dev-logging)
    (catch Exception e
      (println "Note on logging setup:" (.getMessage e))))

  (let [storage-cfg (:storage config)
        backend-type (keyword (or (:backend storage-cfg) :sqlite))
        game-id      (or (get-in config [:app :game-id]) "default-duell")
        storage      (case backend-type
                       :datalevin (let [path (or (:garden-storage storage-cfg) "./dev-storage")]
                                    (log/info "Initializing Datalevin storage at:" (str path "/dtlv"))
                                    (create-datalevin-storage (str path "/dtlv")))
                       :sqlite    (let [path (or (:sqlite-path storage-cfg) "./dev-storage/wichtel.sqlite")]
                                    (log/info "Initializing SQLite storage at:" path)
                                    (create-sqlite-storage path)))
        _            (db/init-storage! storage)
        app          (make-app storage game-id)
        http-cfg     (:http config)
        port         (or (:port http-cfg) 8080)
        host         (or (:host http-cfg) "0.0.0.0")
        server-atom  (atom nil)]

    (log/info (str "Starting Justus-Musikwichtel HTTP server on " host ":" port " (" (name backend-type) ")"))
    (let [server (run-jetty app {:port  port
                                 :host  host
                                 :join? false})]
      (reset! server-atom server)

      ;; Configure graceful Bauhaus shutdown hooks
      (shutdown/hook-order! [:stop-http :close-db :agents])
      (shutdown/add-hook! :stop-http
        (fn []
          (log/info "Shutting down HTTP server...")
          (when-let [s @server-atom]
            (.stop s))))
      (shutdown/add-hook! :close-db
        (fn []
          (log/info "Closing database storage...")
          (db/close-storage! storage)))

      {:storage storage
       :server  server
       :port    port
       :backend backend-type})))
