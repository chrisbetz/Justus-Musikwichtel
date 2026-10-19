(ns musikwichtel.db.sqlite
  (:require [next.jdbc :as jdbc]
            [next.jdbc.result-set :as rs]
            [clojure.java.io :as io]
            [musikwichtel.db.protocols :refer [CompetitionStorage]]))

(defn- row->game [row]
  (if-not row
    {:player1 {:name "Oboe" :total-ms 0 :running? false :start-ts nil}
     :player2 {:name "Klavier" :total-ms 0 :running? false :start-ts nil}}
    {:player1 {:name     (or (:games/p1_name row) (:p1_name row) "Oboe")
               :total-ms (or (:games/p1_total_ms row) (:p1_total_ms row) 0)
               :running? (pos? (or (:games/p1_running row) (:p1_running row) 0))
               :start-ts (let [ts (or (:games/p1_start_ts row) (:p1_start_ts row))]
                           (when (and ts (pos? ts)) ts))}
     :player2 {:name     (or (:games/p2_name row) (:p2_name row) "Klavier")
               :total-ms (or (:games/p2_total_ms row) (:p2_total_ms row) 0)
               :running? (pos? (or (:games/p2_running row) (:p2_running row) 0))
               :start-ts (let [ts (or (:games/p2_start_ts row) (:p2_start_ts row))]
                           (when (and ts (pos? ts)) ts))}}))

(deftype SQLiteStorage [db-spec ds-atom]
  CompetitionStorage
  (init-storage! [this]
    (let [f (io/file (:dbname db-spec))]
      (when-let [p (.getParentFile f)]
        (when-not (.exists p)
          (.mkdirs p))))
    (let [ds (jdbc/get-datasource db-spec)]
      (reset! ds-atom ds)
      (jdbc/execute! ds
        ["CREATE TABLE IF NOT EXISTS games (
            id TEXT PRIMARY KEY,
            p1_name TEXT NOT NULL,
            p1_total_ms INTEGER NOT NULL,
            p1_running INTEGER NOT NULL,
            p1_start_ts INTEGER,
            p2_name TEXT NOT NULL,
            p2_total_ms INTEGER NOT NULL,
            p2_running INTEGER NOT NULL,
            p2_start_ts INTEGER
          )"])
      (let [existing (jdbc/execute-one! ds
                       ["SELECT id FROM games WHERE id = ?" "default-duell"]
                       {:builder-fn rs/as-unqualified-maps})]
        (when-not existing
          (jdbc/execute! ds
            ["INSERT INTO games (id, p1_name, p1_total_ms, p1_running, p1_start_ts, p2_name, p2_total_ms, p2_running, p2_start_ts)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
             "default-duell" "Oboe" 0 0 nil "Klavier" 0 0 nil])))
      this))

  (close-storage! [this]
    (reset! ds-atom nil))

  (get-game [this game-id]
    (let [ds @ds-atom
          row (jdbc/execute-one! ds
                ["SELECT * FROM games WHERE id = ?" game-id]
                {:builder-fn rs/as-unqualified-maps})]
      (row->game row)))

  (start-timer! [this game-id player-id start-ts]
    (let [ds @ds-atom
          is-p1? (= (keyword player-id) :player1)
          col-run (if is-p1? "p1_running" "p2_running")
          col-ts  (if is-p1? "p1_start_ts" "p2_start_ts")
          sql (str "UPDATE games SET " col-run " = 1, " col-ts " = ? WHERE id = ?")]
      (jdbc/execute! ds [sql start-ts game-id])
      (.get-game this game-id)))

  (stop-timer! [this game-id player-id stop-ts]
    (let [ds @ds-atom
          curr (.get-game this game-id)
          p-data (get curr (keyword player-id))
          is-p1? (= (keyword player-id) :player1)
          total  (:total-ms p-data)
          start  (:start-ts p-data)
          elapsed (if (and start (> stop-ts start)) (- stop-ts start) 0)
          new-total (+ total elapsed)
          col-run   (if is-p1? "p1_running" "p2_running")
          col-ts    (if is-p1? "p1_start_ts" "p2_start_ts")
          col-total (if is-p1? "p1_total_ms" "p2_total_ms")
          sql (str "UPDATE games SET " col-run " = 0, " col-total " = ?, " col-ts " = NULL WHERE id = ?")]
      (jdbc/execute! ds [sql new-total game-id])
      (.get-game this game-id)))

  (reset-game! [this game-id]
    (let [ds @ds-atom]
      (jdbc/execute! ds
        ["UPDATE games SET p1_total_ms = 0, p1_running = 0, p1_start_ts = NULL,
                           p2_total_ms = 0, p2_running = 0, p2_start_ts = NULL
          WHERE id = ?" game-id])
      (.get-game this game-id)))

  (update-player-name! [this game-id player-id new-name]
    (let [ds @ds-atom
          col (if (= (keyword player-id) :player1) "p1_name" "p2_name")
          sql (str "UPDATE games SET " col " = ? WHERE id = ?")]
      (jdbc/execute! ds [sql new-name game-id])
      (.get-game this game-id))))

(defn create-sqlite-storage [sqlite-path]
  (->SQLiteStorage {:dbtype "sqlite" :dbname sqlite-path} (atom nil)))
