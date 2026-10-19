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
           [:span.player-name-input
            {:on-click (fn []
                         (reset! temp-name current-name)
                         (reset! editing? true))
             :title "Tippen zum Ändern"}
            current-name])]))))

(defn stopwatch-card [player-key default-name theme-class]
  (let [running? @(rf/subscribe [::subs/is-running? player-key])
        time-str @(rf/subscribe [::subs/formatted-time player-key])]
    [:div.stopwatch-card
     {:class (str theme-class (when running? " running"))}
     [player-name-input player-key default-name]

     [:div.time-display-box
      [:span.time-digits time-str]]

     [:div.controls-row
      [:button.touch-btn.btn-start
       {:disabled running?
        :on-click #(rf/dispatch [::events/start-timer player-key])
        :aria-label (str default-name " Start")}
       "▶ Start"]

      [:button.touch-btn.btn-stop
       {:disabled (not running?)
        :on-click #(rf/dispatch [::events/stop-timer player-key])
        :aria-label (str default-name " Stopp")}
       "⏸ Stopp"]]]))
