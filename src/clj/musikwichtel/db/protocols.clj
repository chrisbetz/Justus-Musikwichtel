(ns musikwichtel.db.protocols)

(defprotocol CompetitionStorage
  "Storage abstraction supporting both Datalevin and SQLite backends."
  (init-storage! [this]
    "Initializes tables/schemas and default game state if needed.")
  (close-storage! [this]
    "Gracefully closes database connections / pools.")
  (get-game [this game-id]
    "Returns game state map {:player1 {:name ... :total-ms ... :running? ... :start-ts ...} :player2 {...}}")
  (start-timer! [this game-id player-id start-ts]
    "Starts timer for given player-id (:player1 or :player2) recording start-ts (epoch ms).")
  (stop-timer! [this game-id player-id stop-ts]
    "Stops timer, calculates delta from start-ts, adds to total-ms, clears start-ts.")
  (reset-game! [this game-id]
    "Resets timers and running state to zero for both players while preserving player names.")
  (update-player-name! [this game-id player-id new-name]
    "Updates the display name for player-id."))
