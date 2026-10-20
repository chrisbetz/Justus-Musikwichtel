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
  ::show-login-modal?
  (fn [db _]
    (boolean (:show-login-modal? db))))

(rf/reg-sub
  ::current-player
  (fn [db _]
    (:current-player db)))

(rf/reg-sub
  ::logged-in?
  :<- [::current-player]
  (fn [current-player _]
    (some? current-player)))

(rf/reg-sub
  ::can-control?
  :<- [::current-player]
  (fn [current-player [_ player-key]]
    (or (= current-player :both)
        (= current-player (keyword player-key)))))

(rf/reg-sub
  ::gauge-display-info
  (fn [_ _]
    [(rf/subscribe [::leader-info])
     (rf/subscribe [::current-player])
     (rf/subscribe [::player :player1])
     (rf/subscribe [::player :player2])])
  (fn [[leader-info current-player p1-data p2-data] _]
    (let [p1-name (or (:name p1-data) "Oboe")
          p2-name (or (:name p2-data) "Klavier")
          leader (:leader leader-info)
          diff-str (:diff-formatted leader-info "00:00:00")
          ;; On Santa's Dial:
          ;; Left = NAUGHTY (-45 deg), Center = BALANCE (0 deg), Right = NICE (+45 deg)
          needle-angle
          (case current-player
            :player1 (if (= leader :player1)
                       (Math/abs (:angle-deg leader-info 0))
                       (if (= leader :player2)
                         (- (Math/abs (:angle-deg leader-info 0)))
                         0))
            :player2 (if (= leader :player2)
                       (Math/abs (:angle-deg leader-info 0))
                       (if (= leader :player1)
                         (- (Math/abs (:angle-deg leader-info 0)))
                         0))
            ;; default (unauthenticated / both): needle shows the leader swinging to Nice
            (if (= leader :player1)
              (Math/abs (:angle-deg leader-info 0))
              (if (= leader :player2)
                (Math/abs (:angle-deg leader-info 0))
                0)))
          nice-name (when-let [np (:nice-player leader-info)]
                      (if (= np :player1) p1-name p2-name))
          naughty-name (when-let [np (:naughty-player leader-info)]
                         (if (= np :player1) p1-name p2-name))]
      {:needle-angle needle-angle
       :leader leader
       :diff-str diff-str
       :nice-name nice-name
       :naughty-name naughty-name
       :current-player current-player
       :p1-name p1-name
       :p2-name p2-name})))
