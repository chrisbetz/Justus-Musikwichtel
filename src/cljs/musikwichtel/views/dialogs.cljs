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
        garden-user @(rf/subscribe [::subs/garden-user])
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
        [:h2.modal-title "Garden ID Anmeldung"]
        [:p.modal-text "Das Musik-Duell ist autorisiert für zwei Musiker:"]

        ;; Player Selection Cards showing Garden ID Mapping
        [:div.login-player-grid
         ;; Player 1 (Oboe) -> @quentin
         [:div.login-player-card.login-card--p1
          {:class (when (= current :player1) "selected")
           :on-click #(rf/dispatch [::events/dev-login-impersonate "quentin"])}
          [:div.player-avatar "🌲"]
          [:div.player-info
           [:div.player-title p1-name]
           [:div.player-sub "Garden ID: @quentin"]]
          [:button.login-select-btn
           (if (= current :player1)
             "✓ Angemeldet"
             "Als @quentin anmelden")]]

         ;; Player 2 (Klavier) -> @kilian
         [:div.login-player-card.login-card--p2
          {:class (when (= current :player2) "selected")
           :on-click #(rf/dispatch [::events/dev-login-impersonate "kilian"])}
          [:div.player-avatar "🎹"]
          [:div.player-info
           [:div.player-title p2-name]
           [:div.player-sub "Garden ID: @kilian"]]
          [:button.login-select-btn
           (if (= current :player2)
             "✓ Angemeldet"
             "Als @kilian anmelden")]]]

        ;; Garden ID Login / Status Banner
        (cond
          (= current :player1)
          [:div.login-status-box.status--success
           [:span "✨ Angemeldet als "]
           [:strong "@quentin"]
           [:span (str " — Du steuerst die " p1-name " (Grüner Wichtel).")]]

          (= current :player2)
          [:div.login-status-box.status--success
           [:span "✨ Angemeldet als "]
           [:strong "@kilian"]
           [:span (str " — Du steuerst das " p2-name " (Roter Wichtel).")]]

          garden-user
          [:div.login-status-box.status--warning
           [:span "⚠️ Angemeldet als "]
           [:strong (str "@" (:username garden-user))]
           [:div.text-xs "Dieser Garden ID Account hat keine Spielberechtigung. Nur @quentin und @kilian dürfen Stoppuhren steuern."]]

          :else
          [:div.login-garden-cta
           [:a.btn-garden-sso
            {:href "/.application.garden/garden-id/login"}
            "🎅 Mit Garden ID anmelden →"]
           [:div.login-garden-hint
            "Unter application.garden wirst du sicher per OpenID Connect authentifiziert."]])

        ;; Footer Actions
        [:div.modal-actions.login-modal-actions
         (when garden-user
           [:a.modal-btn.modal-btn--logout
            {:href "/.application.garden/garden-id/logout"
             :on-click (fn [_] (rf/dispatch [::events/logout]))}
            "Abmelden"])
         [:button.modal-btn.modal-btn--cancel
          {:on-click #(rf/dispatch [::events/close-login-modal])}
          "Schließen"]]]])))
