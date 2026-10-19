(ns musikwichtel.config
  (:require [aero.core :as aero]
            [clojure.java.io :as io]
            [clojure.edn :as edn]))

(defn- read-user-secrets []
  (let [user-home (System/getProperty "user.home")
        secret-file (io/file user-home ".secrets" "musikwichtel.edn")]
    (when (.exists secret-file)
      (try
        (edn/read-string (slurp secret-file))
        (catch Exception e
          (println "Warning: Failed to parse ~/.secrets/musikwichtel.edn:" (.getMessage e))
          nil)))))

(defn load-config []
  (let [base-cfg (aero/read-config (io/resource "config.edn"))
        secrets (read-user-secrets)]
    (cond-> base-cfg
      (:db-backend secrets)
      (assoc-in [:storage :backend] (:db-backend secrets))

      (:garden-storage secrets)
      (assoc-in [:storage :garden-storage] (:garden-storage secrets))

      (:sqlite-path secrets)
      (assoc-in [:storage :sqlite-path] (:sqlite-path secrets))

      (:session-secret secrets)
      (assoc-in [:http :session-secret] (:session-secret secrets)))))
