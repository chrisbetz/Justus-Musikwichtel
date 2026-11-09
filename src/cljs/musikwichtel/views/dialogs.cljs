(ns musikwichtel.views.dialogs
  (:require [re-frame.core :as rf]
            [musikwichtel.subs :as subs]
            [musikwichtel.events :as events]))

(defn reset-confirmation-modal []
  (let [open? @(rf/subscribe [::subs/show-reset-modal?])
        admin? @(rf/subscribe [::subs/admin?])
        garden-user @(rf/subscribe [::subs/garden-user])]
    (when open?
      [:div.modal-backdrop
       {:on-click #(rf/dispatch [::events/cancel-reset])}
       [:div.modal-card
        {:on-click (fn [e] (.stopPropagation e))}
        [:div.modal-snow-cap]
        [:div.modal-icon (if admin? "🎄" "🔒")]
        [:h2.modal-title
         (if admin? "Uhren zurücksetzen?" "Schiedsrichter-Berechtigung erforderlich")]
        [:p.modal-text
         (if admin?
           "Möchtest du beide Stoppuhren wirklich auf null stellen?\n(Die Musikernamen bleiben erhalten.)"
           (if garden-user
             (str "Du bist als @" (:username garden-user) " angemeldet. Nur Garden ID 'justus' darf die Uhren zurücksetzen.")
             "Nur der Schiedsrichter (Garden ID @justus) kann die Uhren zurücksetzen. Bitte melde dich mit der Garden ID 'justus' an."))]
        [:div.modal-actions
         [:button.modal-btn.modal-btn--cancel
          {:on-click #(rf/dispatch [::events/cancel-reset])}
          (if admin? "Abbrechen" "Schließen")]
         (if admin?
           [:button.modal-btn.modal-btn--confirm
            {:on-click #(rf/dispatch [::events/confirm-reset])}
            "Zurücksetzen"]
           [:button.modal-btn.modal-btn--confirm
            {:on-click (fn []
                         (rf/dispatch [::events/cancel-reset])
                         (rf/dispatch [::events/open-login-modal]))}
            "Anmelden ➔"])]]])))

(defn player-login-modal []
  (let [open? @(rf/subscribe [::subs/show-login-modal?])
        current @(rf/subscribe [::subs/current-player])
        admin? @(rf/subscribe [::subs/admin?])
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
        [:p.modal-text "Autorisierte Rollen für dieses Musik-Duell:"]

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

        ;; Admin / Referee Card for Justus
        [:div.login-admin-card
         {:class (when admin? "selected")
          :on-click #(rf/dispatch [::events/dev-login-impersonate "justus"])}
         [:div.admin-avatar "👑"]
         [:div.admin-info
          [:div.admin-title "Schiedsrichter (@justus)"]
          [:div.admin-sub "Darf Uhren auf null zurücksetzen"]]
         [:button.login-select-btn
          (if admin? "✓ Angemeldet" "Als @justus anmelden")]]

        ;; Garden ID Login / Status Banner
        (cond
          admin?
          [:div.login-status-box.status--success
           [:span "👑 Angemeldet als "]
           [:strong "@justus"]
           [:span " — Du bist Schiedsrichter und kannst die Uhren zurücksetzen."]]

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
           [:div.text-xs "Dieser Account ist kein Teilnehmer. Berechtigt sind nur @quentin (Oboe), @kilian (Klavier) und @justus (Reset)."]]

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
