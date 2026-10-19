(ns musikwichtel.db.datalevin
  (:require [datalevin.core :as d]
            [clojure.java.io :as io]
            [musikwichtel.db.protocols :refer [CompetitionStorage]]))

(def schema
  {:game/id          {:db/valueType :db.type/string
                      :db/unique    :db.unique/identity}
   :game/p1-name     {:db/valueType :db.type/string}
   :game/p1-total-ms {:db/valueType :db.type/long}
   :game/p1-running? {:db/valueType :db.type/boolean}
   :game/p1-start-ts {:db/valueType :db.type/long}

   :game/p2-name     {:db/valueType :db.type/string}
   :game/p2-total-ms {:db/valueType :db.type/long}
   :game/p2-running? {:db/valueType :db.type/boolean}
   :game/p2-start-ts {:db/valueType :db.type/long}})

(defn- entity->game [e]
  (if-not e
    {:player1 {:name "Oboe" :total-ms 0 :running? false :start-ts nil}
     :player2 {:name "Klavier" :total-ms 0 :running? false :start-ts nil}}
    {:player1 {:name     (or (:game/p1-name e) "Oboe")
               :total-ms (or (:game/p1-total-ms e) 0)
               :running? (boolean (:game/p1-running? e))
               :start-ts (:game/p1-start-ts e)}
     :player2 {:name     (or (:game/p2-name e) "Klavier")
               :total-ms (or (:game/p2-total-ms e) 0)
               :running? (boolean (:game/p2-running? e))
               :start-ts (:game/p2-start-ts e)}}))

(deftype DatalevinStorage [db-dir conn-atom]
  CompetitionStorage
  (init-storage! [this]
    (let [dir (io/file db-dir)]
      (when-not (.exists dir)
        (.mkdirs dir)))
    (let [conn (d/get-conn db-dir schema)]
      (reset! conn-atom conn)
      ;; Ensure default game exists
      (when-not (d/entity (d/db conn) [:game/id "default-duell"])
        (d/transact! conn [{:game/id          "default-duell"
                            :game/p1-name     "Oboe"
                            :game/p1-total-ms 0
                            :game/p1-running? false
                            :game/p2-name     "Klavier"
                            :game/p2-total-ms 0
                            :game/p2-running? false}]))
      this))

  (close-storage! [this]
    (when-let [conn @conn-atom]
      (d/close conn)
      (reset! conn-atom nil)))

  (get-game [this game-id]
    (let [conn @conn-atom
          e (d/entity (d/db conn) [:game/id game-id])]
      (entity->game e)))

  (start-timer! [this game-id player-id start-ts]
    (let [conn @conn-atom
          is-p1? (= (keyword player-id) :player1)
          attr-run (if is-p1? :game/p1-running? :game/p2-running?)
          attr-ts  (if is-p1? :game/p1-start-ts :game/p2-start-ts)]
      (d/transact! conn [{:game/id  game-id
                          attr-run true
                          attr-ts  start-ts}])
      (.get-game this game-id)))

  (stop-timer! [this game-id player-id stop-ts]
    (let [conn @conn-atom
          curr (.get-game this game-id)
          p-data (get curr (keyword player-id))
          is-p1? (= (keyword player-id) :player1)
          total  (:total-ms p-data)
          start  (:start-ts p-data)
          elapsed (if (and start (> stop-ts start)) (- stop-ts start) 0)
          new-total (+ total elapsed)
          attr-run   (if is-p1? :game/p1-running? :game/p2-running?)
          attr-ts    (if is-p1? :game/p1-start-ts :game/p2-start-ts)
          attr-total (if is-p1? :game/p1-total-ms :game/p2-total-ms)]
      (d/transact! conn [{:game/id    game-id
                          attr-run   false
                          attr-total new-total
                          attr-ts    nil}])
      (.get-game this game-id)))

  (reset-game! [this game-id]
    (let [conn @conn-atom]
      (d/transact! conn [{:game/id          game-id
                          :game/p1-total-ms 0
                          :game/p1-running? false
                          :game/p1-start-ts nil
                          :game/p2-total-ms 0
                          :game/p2-running? false
                          :game/p2-start-ts nil}])
      (.get-game this game-id)))

  (update-player-name! [this game-id player-id new-name]
    (let [conn @conn-atom
          attr (if (= (keyword player-id) :player1) :game/p1-name :game/p2-name)]
      (d/transact! conn [{:game/id game-id
                          attr     new-name}])
      (.get-game this game-id))))

(defn create-datalevin-storage [db-dir]
  (->DatalevinStorage db-dir (atom nil)))
