(ns musikwichtel.views.stopwatch
  (:require [re-frame.core :as rf]
            [reagent.core :as r]
            [musikwichtel.subs :as subs]
            [musikwichtel.events :as events]))

(defn- player-name-input [player-key default-name]
  (let [editing? (r/atom false)
        temp-name (r/atom "")]
    (fn [player-key default-name]
      (let [p-data @(rf/subscribe [::subs/player player-key])
            current-name (or (:name p-data) default-name)]
        [:div.player-name-wrapper
         (if @editing?
           [:input.player-name-input
            {:auto-focus true
             :value @temp-name
             :on-change #(reset! temp-name (-> % .-target .-value))
             :on-blur (fn []
                        (when (seq (.trim @temp-name))
                          (rf/dispatch [::events/update-name player-key @temp-name]))
                        (reset! editing? false))
             :on-key-down (fn [e]
                            (when (= (.-key e) "Enter")
                              (when (seq (.trim @temp-name))
                                (rf/dispatch [::events/update-name player-key @temp-name]))
                              (reset! editing? false))
                            (when (= (.-key e) "Escape")
                              (reset! editing? false)))}]
           [:div.player-title-row
            [:span.player-name-text
             {:on-click (fn []
                          (reset! temp-name current-name)
                          (reset! editing? true))
              :title "Tippen zum Ändern des Namens"}
             current-name]
            [:span.edit-hint-pencil {:title "Name bearbeiten"} "✏️"]])]))))

(defn stopwatch-card [player-key default-name theme-class]
  (let [running? @(rf/subscribe [::subs/is-running? player-key])
        time-str @(rf/subscribe [::subs/formatted-time player-key])
        current-user @(rf/subscribe [::subs/current-player])
        can-control? @(rf/subscribe [::subs/can-control? player-key])
        is-mine? (or (= current-user :both) (= current-user (keyword player-key)))]
    [:div.stopwatch-card
     {:class (str theme-class
                  (when running? " running")
                  (when is-mine? " card--mine")
                  (when (and current-user (not can-control?)) " card--other-player"))}

     ;; Festive Snow Cap on top of card
     [:div.card-snow-cap]

     ;; Holly & berry corner ornament
     [:div.card-holly-decor
      (if (= player-key :player1) "🌲" "🎹")]

     ;; Player status / ownership badge
     [:div.player-status-badge-row
      (cond
        is-mine?
        [:span.player-badge.badge--mine "✨ Dein Instrument"]

        (nil? current-user)
        [:button.player-badge.badge--login-prompt
         {:on-click #(rf/dispatch [::events/login player-key])}
         "🔒 Anmelden"]

        :else
        [:button.player-badge.badge--switch-prompt
         {:on-click #(rf/dispatch [::events/open-login-modal])}
         "Wechseln ⇄"])]

     [player-name-input player-key default-name]

     [:div.time-display-box
      [:span.time-digits time-str]]

     [:div.controls-row
      [:button.touch-btn.btn-start
       {:disabled running?
        :on-click (fn []
                    (if (or is-mine? (nil? current-user))
                      (rf/dispatch [::events/start-timer player-key])
                      (rf/dispatch [::events/open-login-modal])))
        :aria-label (str default-name " Start")}
       [:span.btn-icon "▶"]
       [:span "Üben"]]

      [:button.touch-btn.btn-stop
       {:disabled (not running?)
        :on-click (fn []
                    (if (or is-mine? (nil? current-user))
                      (rf/dispatch [::events/stop-timer player-key])
                      (rf/dispatch [::events/open-login-modal])))
        :aria-label (str default-name " Stopp")}
       [:span.btn-icon "⏸"]
       [:span "Pause"]]]]))
