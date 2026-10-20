(ns musikwichtel.views.dialogs
  (:require [re-frame.core :as rf]
            [musikwichtel.subs :as subs]
            [musikwichtel.events :as events]))

(defn reset-confirmation-modal []
  (let [open? @(rf/subscribe [::subs/show-reset-modal?])]
    (when open?
      [:div.modal-backdrop
       {:on-click #(rf/dispatch [::events/cancel-reset])}
       [:div.modal-card
        {:on-click (fn [e] (.stopPropagation e))}
        [:div.modal-snow-cap]
        [:div.modal-icon "🎄"]
        [:h2.modal-title "Uhren zurücksetzen?"]
        [:p.modal-text
         "Möchtest du beide Stoppuhren wirklich auf null stellen?\n(Die Musikernamen bleiben erhalten.)"]
        [:div.modal-actions
         [:button.modal-btn.modal-btn--cancel
          {:on-click #(rf/dispatch [::events/cancel-reset])}
          "Abbrechen"]
         [:button.modal-btn.modal-btn--confirm
          {:on-click #(rf/dispatch [::events/confirm-reset])}
          "Zurücksetzen"]]]])))

(defn player-login-modal []
  (let [open? @(rf/subscribe [::subs/show-login-modal?])
        current @(rf/subscribe [::subs/current-player])
        p1-data @(rf/subscribe [::subs/player :player1])
        p2-data @(rf/subscribe [::subs/player :player2])
        p1-name (or (:name p1-data) "Oboe")
        p2-name (or (:name p2-data) "Klavier")]
    (when open?
      [:div.modal-backdrop
       {:on-click #(rf/dispatch [::events/close-login-modal])}
       [:div.modal-card.modal-card--login
        {:on-click (fn [e] (.stopPropagation e))}
        [:div.modal-snow-cap]
        [:div.modal-header-decor
         [:span "🔔"]
         [:span "🎄"]
         [:span "✨"]]
        [:h2.modal-title "Wer musiziert heute?"]
        [:p.modal-text "Melde dich an, um deine Stoppuhr zu bedienen:"]

        ;; Player Selection Cards
        [:div.login-player-grid
         ;; Player 1 (Oboe)
         [:div.login-player-card.login-card--p1
          {:class (when (= current :player1) "selected")
           :on-click #(rf/dispatch [::events/login :player1])}
          [:div.player-avatar "🌲"]
          [:div.player-info
           [:div.player-title p1-name]
           [:div.player-sub "Grüner Wichtel"]]
          [:button.login-select-btn
           (if (= current :player1) "✓ Angemeldet" (str "Als " p1-name " üben"))]]

         ;; Player 2 (Klavier)
         [:div.login-player-card.login-card--p2
          {:class (when (= current :player2) "selected")
           :on-click #(rf/dispatch [::events/login :player2])}
          [:div.player-avatar "🎹"]
          [:div.player-info
           [:div.player-title p2-name]
           [:div.player-sub "Roter Wichtel"]]
          [:button.login-select-btn
           (if (= current :player2) "✓ Angemeldet" (str "Als " p2-name " üben"))]]]

        ;; Joint mode option
        [:div.login-joint-wrapper
         [:button.joint-login-btn
          {:class (when (= current :both) "selected")
           :on-click #(rf/dispatch [::events/login :both])}
          "🧑‍🎄 Gemeinsam am iPad üben (beide freischalten)"]]

        ;; Footer Actions
        [:div.modal-actions.login-modal-actions
         (when current
           [:button.modal-btn.modal-btn--logout
            {:on-click #(rf/dispatch [::events/logout])}
            "Abmelden"])
         [:button.modal-btn.modal-btn--cancel
          {:on-click #(rf/dispatch [::events/close-login-modal])}
          "Schließen"]]]])))
