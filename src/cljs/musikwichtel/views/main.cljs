(ns musikwichtel.views.main
  (:require [re-frame.core :as rf]
            [musikwichtel.events :as events]
            [musikwichtel.views.stopwatch :refer [stopwatch-card]]
            [musikwichtel.views.gauge :refer [naughty-nice-gauge]]
            [musikwichtel.views.village :refer [living-christmas-village]]
            [musikwichtel.views.dialogs :refer [reset-confirmation-modal]]))

(defn main-view []
  [:div.app-container
   ;; Background star pattern
   [:div.app-stars-bg]

   ;; Top Header Bar
   [:header.app-header
    [:div.app-title-badge
     [:span "🎄"]
     [:span "Wichtel-Wetteifern"]]

    [:button.reset-icon-btn
     {:on-click #(rf/dispatch [::events/open-reset-modal])
      :title "Stoppuhren zurücksetzen"
      :aria-label "Stoppuhren zurücksetzen"}
     "⟳"]]

   ;; Central Arena: Stopwatch 1, Gauge, Stopwatch 2
   [:main.arena-row
    [stopwatch-card :player1 "Oboe" "stopwatch-card--p1"]
    [naughty-nice-gauge]
    [stopwatch-card :player2 "Klavier" "stopwatch-card--p2"]]

   ;; Living Christmas Village below both stopwatches
   [living-christmas-village]

   ;; Reset Confirmation Modal
   [reset-confirmation-modal]])
