(ns musikwichtel.db)

(def default-db
  {:player1 {:name "Oboe"
             :total-ms 0
             :running? false
             :start-ts nil}
   :player2 {:name "Klavier"
             :total-ms 0
             :running? false
             :start-ts nil}
   :current-player :player1
   :wall-clock-now (.now js/Date)
   :show-reset-modal? false
   :server-synced? false})
