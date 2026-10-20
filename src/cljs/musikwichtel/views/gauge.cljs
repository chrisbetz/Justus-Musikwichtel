(ns musikwichtel.views.gauge
  (:require [re-frame.core :as rf]
            [musikwichtel.subs :as subs]))

(defn naughty-nice-gauge []
  (let [info @(rf/subscribe [::subs/gauge-display-info])
        angle (:needle-angle info 0)
        leader (:leader info :tie)
        diff-str (:diff-str info "00:00:00")
        nice-name (:nice-name info)
        naughty-name (:naughty-name info)
        current (:current-player info)
        p1-name (:p1-name info "Oboe")
        p2-name (:p2-name info "Klavier")]
    [:div.gauge-wrapper
     ;; Festive Snow Cap on Gauge Bezel
     [:div.gauge-snow-cap]

     ;; Vintage Santa Meter Dial
     [:div.gauge-dial
      ;; Meter header title
      [:div.gauge-dial-title "SANTA'S METER"]

      ;; Arch background with Naughty (red/coal) to Nice (green/gold) gradient
      [:div.gauge-dial-background]

      ;; Tick marks for vintage analog scale
      [:div.gauge-ticks
       [:span.gauge-tick.tick--naughty {:style {:transform "rotate(-45deg)"}}]
       [:span.gauge-tick.tick--naughty-mid {:style {:transform "rotate(-22.5deg)"}}]
       [:span.gauge-tick.tick--center {:style {:transform "rotate(0deg)"}}]
       [:span.gauge-tick.tick--nice-mid {:style {:transform "rotate(22.5deg)"}}]
       [:span.gauge-tick.tick--nice {:style {:transform "rotate(45deg)"}}]]

      ;; Zone Labels: NAUGHTY on left, NICE on right
      [:div.gauge-labels
       [:div.gauge-label--naughty
        [:span.zone-icon "🪵"]
        [:span.zone-text "NAUGHTY"]]
       [:div.gauge-label--center "⚖️"]
       [:div.gauge-label--nice
        [:span.zone-text "NICE"]
        [:span.zone-icon "🎁"]]]

      ;; Analog Needle & Brass Pivot
      [:div.gauge-needle
       {:style {:transform (str "translateX(-50%) rotate(" angle "deg)")}}]
      [:div.gauge-needle-pivot]]

     ;; Dynamic Holiday Status Display
     [:div.gauge-status-box
      (cond
        (= leader :tie)
        [:div.gauge-status--tie
         [:span.status-main "⚖️ Ausgeglichen"]
         [:span.status-sub "Beide gleich brav auf der Liste"]]

        ;; If user is logged in as the leader
        (or (and (= current :player1) (= leader :player1))
            (and (= current :player2) (= leader :player2)))
        [:div.gauge-status--nice
         [:span.status-main (str "🌟 Du bist NICE! (+" diff-str ")")]
         [:span.status-sub (str (if (= current :player1) p2-name p1-name) " steht auf der Naughty-Liste 🪵")]]

        ;; If user is logged in as the trailing player
        (or (and (= current :player1) (= leader :player2))
            (and (= current :player2) (= leader :player1)))
        [:div.gauge-status--naughty
         [:span.status-main (str "🪵 Du bist NAUGHTY! (-" diff-str ")")]
         [:span.status-sub (str nice-name " ist auf der Nice-Liste 🎁")]]

        ;; If viewing together / unauthenticated
        :else
        [:div.gauge-status--duel
         [:span.status-main (str "🎁 " nice-name " ist NICE! (+" diff-str ")")]
         [:span.status-sub (str "🪵 " naughty-name " ist auf der Naughty-Liste")]])]]))
