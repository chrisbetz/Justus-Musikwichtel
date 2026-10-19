(ns musikwichtel.views.gauge
  (:require [re-frame.core :as rf]
            [musikwichtel.subs :as subs]))

(defn naughty-nice-gauge []
  (let [leader-data @(rf/subscribe [::subs/leader-info])
        p1-data @(rf/subscribe [::subs/player :player1])
        p2-data @(rf/subscribe [::subs/player :player2])
        p1-name (or (:name p1-data) "Oboe")
        p2-name (or (:name p2-data) "Klavier")
        angle (:angle-deg leader-data 0)
        leader (:leader leader-data :tie)
        status-label (case leader
                       :player1 (str "⭐ " p1-name " ist vorn!")
                       :player2 (str "⭐ " p2-name " ist vorn!")
                       :tie "⚖️ Gleichstand")]
    [:div.gauge-wrapper
     [:div.gauge-dial
      [:div.gauge-dial-background]
      [:div.gauge-labels
       [:span.gauge-label--left p1-name]
       [:span.gauge-label--right p2-name]]
      [:div.gauge-needle
       {:style {:transform (str "translateX(-50%) rotate(" angle "deg)")}}]
      [:div.gauge-needle-pivot]]
     [:div.gauge-status-text status-label]]))
