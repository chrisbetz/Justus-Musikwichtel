(ns musikwichtel.views.main
  (:require [re-frame.core :as rf]
            [musikwichtel.subs :as subs]
            [musikwichtel.events :as events]
            [musikwichtel.views.stopwatch :refer [stopwatch-card]]
            [musikwichtel.views.gauge :refer [naughty-nice-gauge]]
            [musikwichtel.views.village :refer [living-christmas-village]]
            [musikwichtel.views.dialogs :refer [reset-confirmation-modal player-login-modal]]))

(defn- fairy-lights-garland []
  [:div.fairy-garland
   (for [i (range 18)]
     (let [color-class (case (mod i 4)
                         0 "light--red"
                         1 "light--gold"
                         2 "light--green"
                         3 "light--blue")]
       ^{:key (str "garland-light-" i)}
       [:div.garland-bulb {:class color-class}]))])

(defn main-view []
  (let [current-user @(rf/subscribe [::subs/current-player])
        p1-data @(rf/subscribe [::subs/player :player1])
        p2-data @(rf/subscribe [::subs/player :player2])
        p1-name (or (:name p1-data) "Oboe")
        p2-name (or (:name p2-data) "Klavier")]
    [:div.app-container
     ;; Festive background with stars and soft snow
     [:div.app-stars-bg]

     ;; Twinkling Christmas Fairy Lights Garland at the top
     [fairy-lights-garland]

     ;; Top Header Bar
     [:header.app-header
      [:div.app-title-badge
       [:span.title-icon "🎄"]
       [:div.title-text-group
        [:span.title-main "Wichtel-Wetteifern"]
        [:span.title-sub "Weihnachtliches Musik-Duell"]]]

      ;; Header Controls (User badge + Reset)
      [:div.header-actions
       ;; Current User Login Indicator
       (if current-user
         [:div.user-pill-container
          [:div.user-pill
           {:class (case current-user
                     :player1 "user-pill--p1"
                     :player2 "user-pill--p2"
                     "user-pill--both")}
           [:span.pill-icon
            (case current-user
              :player1 "🌲"
              :player2 "🎹"
              "🧑‍🎄")]
           [:span.pill-name
            (case current-user
              :player1 p1-name
              :player2 p2-name
              "Beide aktiv")]]
          [:button.pill-switch-btn
           {:on-click #(rf/dispatch [::events/open-login-modal])
            :title "Spieler wechseln"}
           "Wechseln ⇄"]]

         [:button.btn-header-login
          {:on-click #(rf/dispatch [::events/open-login-modal])}
          "🎅 Anmelden"])

       ;; Reset icon button
       [:button.reset-icon-btn
        {:on-click #(rf/dispatch [::events/open-reset-modal])
         :title "Stoppuhren zurücksetzen"
         :aria-label "Stoppuhren zurücksetzen"}
        [:span "⟳"]]]]

     ;; Central Arena: Stopwatch 1, Naughty/Nice Gauge, Stopwatch 2
     [:main.arena-row
      [stopwatch-card :player1 "Oboe" "stopwatch-card--p1"]
      [naughty-nice-gauge]
      [stopwatch-card :player2 "Klavier" "stopwatch-card--p2"]]

     ;; Living Christmas Village below both stopwatches
     [living-christmas-village]

     ;; Dialogs
     [reset-confirmation-modal]
     [player-login-modal]]))
