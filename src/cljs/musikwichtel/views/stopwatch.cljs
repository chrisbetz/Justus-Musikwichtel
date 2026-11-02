(ns musikwichtel.views.stopwatch
  (:require [re-frame.core :as rf]
            [reagent.core :as r]
            [musikwichtel.subs :as subs]
            [musikwichtel.events :as events]))

(defn- player-name-input [player-key default-name can-edit?]
  (let [editing? (r/atom false)
        temp-name (r/atom "")]
    (fn [player-key default-name can-edit?]
      (let [p-data @(rf/subscribe [::subs/player player-key])
            current-name (or (:name p-data) default-name)]
        [:div.player-name-wrapper
         (if (and can-edit? @editing?)
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
             (if can-edit?
               {:on-click (fn []
                            (reset! temp-name current-name)
                            (reset! editing? true))
                :title "Tippen zum Ändern des Namens"}
               {:title (str "Nur für @" (if (= player-key :player1) "quentin" "kilian"))})
             current-name]
            (when can-edit?
              [:span.edit-hint-pencil {:title "Name bearbeiten"} "✏️"])])]))))

(defn stopwatch-card [player-key default-name theme-class]
  (let [running? @(rf/subscribe [::subs/is-running? player-key])
        time-str @(rf/subscribe [::subs/formatted-time player-key])
        current-user @(rf/subscribe [::subs/current-player])
        can-control? @(rf/subscribe [::subs/can-control? player-key])
        target-garden-id (if (= player-key :player1) "quentin" "kilian")]
    [:div.stopwatch-card
     {:class (str theme-class
                  (when running? " running")
                  (when can-control? " card--mine")
                  (when (and current-user (not can-control?)) " card--other-player"))}

     ;; Festive Snow Cap on top of card
     [:div.card-snow-cap]

     ;; Holly & berry corner ornament
     [:div.card-holly-decor
      (if (= player-key :player1) "🌲" "🎹")]

     ;; Player status / ownership badge
     [:div.player-status-badge-row
      (cond
        can-control?
        [:span.player-badge.badge--mine (str "✨ Dein Instrument (@" target-garden-id ")")]

        current-user
        [:button.player-badge.badge--switch-prompt
         {:on-click #(rf/dispatch [::events/open-login-modal])
          :title (str "Nur für @" target-garden-id)}
         (str "🔒 Nur für @" target-garden-id)]

        :else
        [:button.player-badge.badge--login-prompt
         {:on-click #(rf/dispatch [::events/open-login-modal])}
         (str "🔒 @" target-garden-id " anmelden")])]

     [player-name-input player-key default-name can-control?]

     [:div.time-display-box
      [:span.time-digits time-str]]

     [:div.controls-row
      [:button.touch-btn.btn-start
       {:disabled (or running? (not can-control?))
        :on-click (fn []
                    (if can-control?
                      (rf/dispatch [::events/start-timer player-key])
                      (rf/dispatch [::events/open-login-modal])))
        :aria-label (str default-name " Start")}
       [:span.btn-icon "▶"]
       [:span (if can-control? "Üben" "Gesperrt")]]

      [:button.touch-btn.btn-stop
       {:disabled (or (not running?) (not can-control?))
        :on-click (fn []
                    (if can-control?
                      (rf/dispatch [::events/stop-timer player-key])
                      (rf/dispatch [::events/open-login-modal])))
        :aria-label (str default-name " Stopp")}
       [:span.btn-icon "⏸"]
       [:span "Pause"]]]]))
