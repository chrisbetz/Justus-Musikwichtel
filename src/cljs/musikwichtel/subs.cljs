(ns musikwichtel.subs
  (:require [re-frame.core :as rf]
            [musikwichtel.shared :as shared]))

(rf/reg-sub
  ::db
  (fn [db _] db))

(rf/reg-sub
  ::player
  (fn [db [_ player-key]]
    (get db (keyword player-key))))

(rf/reg-sub
  ::wall-clock-now
  (fn [db _]
    (:wall-clock-now db (.now js/Date))))

(rf/reg-sub
  ::player-ms
  :<- [::wall-clock-now]
  (fn [now [_ player-key]]
    (let [db @(rf/subscribe [::db])
          p-data (get db (keyword player-key))]
      (shared/calculate-effective-ms p-data now))))

(rf/reg-sub
  ::formatted-time
  (fn [[_ player-key] _]
    (rf/subscribe [::player-ms player-key]))
  (fn [ms _]
    (shared/format-time-ms ms)))

(rf/reg-sub
  ::is-running?
  (fn [db [_ player-key]]
    (boolean (get-in db [(keyword player-key) :running?]))))

(rf/reg-sub
  ::village-active?
  (fn [db _]
    (or (get-in db [:player1 :running?])
        (get-in db [:player2 :running?]))))

(rf/reg-sub
  ::leader-info
  (fn [_ _]
    [(rf/subscribe [::player-ms :player1])
     (rf/subscribe [::player-ms :player2])])
  (fn [[p1-ms p2-ms] _]
    (shared/determine-leader (or p1-ms 0) (or p2-ms 0))))

(rf/reg-sub
  ::show-reset-modal?
  (fn [db _]
    (boolean (:show-reset-modal? db))))

(rf/reg-sub
  ::current-player
  (fn [db _]
    (:current-player db :player1)))
