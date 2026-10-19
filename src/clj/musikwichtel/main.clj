(ns musikwichtel.main
  (:gen-class)
  (:require [musikwichtel.config :as config]
            [musikwichtel.system :as system]))

(defonce system-instance (atom nil))

(defn -main [& _args]
  (let [cfg (config/load-config)
        sys (system/start-system cfg)]
    (reset! system-instance sys)
    (println (str "🎄 Justus-Musikwichtel running at http://localhost:" (:port sys)))
    ;; Join current thread so the process does not terminate immediately
    (.join (Thread/currentThread))))
