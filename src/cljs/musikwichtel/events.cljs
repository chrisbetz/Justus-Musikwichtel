(ns musikwichtel.events
  (:require [re-frame.core :as rf]
            [musikwichtel.db :as db]
            [clojure.walk :refer [keywordize-keys]]))

(def local-storage-key "wichtel-wetteifern-cache")

(defn- save-cache [db]
  (try
    (let [data {:player1 (:player1 db)
                :player2 (:player2 db)}
          json (js/JSON.stringify (clj->js data))]
      (.setItem js/localStorage local-storage-key json))
    (catch :default _ nil)))

(defn- load-cache []
  (try
    (when-let [item (.getItem js/localStorage local-storage-key)]
      (keywordize-keys (js->clj (js/JSON.parse item))))
    (catch :default _ nil)))

(rf/reg-event-db
  ::initialize-db
  (fn [_ _]
    (let [cached (load-cache)]
      (cond-> db/default-db
        (:player1 cached) (assoc :player1 (:player1 cached))
        (:player2 cached) (assoc :player2 (:player2 cached))))))

(rf/reg-event-db
  ::tick
  (fn [db [_ now]]
    (assoc db :wall-clock-now now)))

(rf/reg-event-fx
  ::poll-state
  (fn [_ _]
    (let [query (.-search js/window.location)]
      (-> (js/fetch (str "/api/state" query))
          (.then (fn [resp] (when (.-ok resp) (.json resp))))
          (.then (fn [data]
                   (when data
                     (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
          (.catch (fn [_] nil))))
    {}))

(rf/reg-event-db
  ::state-received
  (fn [db [_ server-data]]
    (if-not server-data
      db
      (let [updated (cond-> db
                      (:player1 server-data) (assoc :player1 (:player1 server-data))
                      (:player2 server-data) (assoc :player2 (:player2 server-data))
                      (:current-player server-data) (assoc :current-player (keyword (:current-player server-data)))
                      true (assoc :server-synced? true))]
        (save-cache updated)
        updated))))

(rf/reg-event-fx
  ::start-timer
  (fn [{:keys [db]} [_ player-key]]
    (let [now (.now js/Date)
          pk (keyword player-key)
          optimistic-db (assoc-in db [pk :running?] true)
          optimistic-db (assoc-in optimistic-db [pk :start-ts] now)]
      (save-cache optimistic-db)
      (let [query (.-search js/window.location)]
        (-> (js/fetch (str "/api/start" query)
                      #js {:method "POST"
                           :headers #js {"Content-Type" "application/json"}
                           :body (js/JSON.stringify #js {:player (name pk)})})
            (.then (fn [resp] (when (.-ok resp) (.json resp))))
            (.then (fn [data]
                     (when data
                       (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
            (.catch (fn [_] nil))))
      {:db optimistic-db})))

(rf/reg-event-fx
  ::stop-timer
  (fn [{:keys [db]} [_ player-key]]
    (let [now (.now js/Date)
          pk (keyword player-key)
          p-data (get db pk)
          total (:total-ms p-data 0)
          start (:start-ts p-data)
          elapsed (if (and start (> now start)) (- now start) 0)
          new-total (+ total elapsed)
          optimistic-db (-> db
                            (assoc-in [pk :running?] false)
                            (assoc-in [pk :total-ms] new-total)
                            (assoc-in [pk :start-ts] nil))]
      (save-cache optimistic-db)
      (let [query (.-search js/window.location)]
        (-> (js/fetch (str "/api/stop" query)
                      #js {:method "POST"
                           :headers #js {"Content-Type" "application/json"}
                           :body (js/JSON.stringify #js {:player (name pk)})})
            (.then (fn [resp] (when (.-ok resp) (.json resp))))
            (.then (fn [data]
                     (when data
                       (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
            (.catch (fn [_] nil))))
      {:db optimistic-db})))

(rf/reg-event-db
  ::open-reset-modal
  (fn [db _]
    (assoc db :show-reset-modal? true)))

(rf/reg-event-db
  ::cancel-reset
  (fn [db _]
    (assoc db :show-reset-modal? false)))

(rf/reg-event-fx
  ::confirm-reset
  (fn [{:keys [db]} _]
    (let [p1-name (get-in db [:player1 :name] "Oboe")
          p2-name (get-in db [:player2 :name] "Klavier")
          optimistic-db (-> db
                            (assoc :show-reset-modal? false)
                            (assoc :player1 {:name p1-name :total-ms 0 :running? false :start-ts nil})
                            (assoc :player2 {:name p2-name :total-ms 0 :running? false :start-ts nil}))]
      (save-cache optimistic-db)
      (let [query (.-search js/window.location)]
        (-> (js/fetch (str "/api/reset" query)
                      #js {:method "POST"
                           :headers #js {"Content-Type" "application/json"}})
            (.then (fn [resp] (when (.-ok resp) (.json resp))))
            (.then (fn [data]
                     (when data
                       (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
            (.catch (fn [_] nil))))
      {:db optimistic-db})))

(rf/reg-event-fx
  ::update-name
  (fn [{:keys [db]} [_ player-key new-name]]
    (let [pk (keyword player-key)
          trimmed (.trim (str new-name))]
      (if (empty? trimmed)
        {:db db}
        (let [optimistic-db (assoc-in db [pk :name] trimmed)]
          (save-cache optimistic-db)
          (let [query (.-search js/window.location)]
            (-> (js/fetch (str "/api/name" query)
                          #js {:method "POST"
                               :headers #js {"Content-Type" "application/json"}
                               :body (js/JSON.stringify #js {:player (name pk) :name trimmed})})
                (.then (fn [resp] (when (.-ok resp) (.json resp))))
                (.then (fn [data]
                         (when data
                           (rf/dispatch [::state-received (keywordize-keys (js->clj data))]))))
                (.catch (fn [_] nil))))
          {:db optimistic-db})))))
