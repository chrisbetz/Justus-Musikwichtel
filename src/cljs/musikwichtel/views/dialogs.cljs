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
        [:div.modal-icon "🎄"]
        [:h2.modal-title "Uhren zurücksetzen?"]
        [:p.modal-text
         "Möchtest du beide Stoppuhren wirklich auf null stellen?
(Die Spielernamen bleiben erhalten.)"]
        [:div.modal-actions
         [:button.modal-btn.modal-btn--cancel
          {:on-click #(rf/dispatch [::events/cancel-reset])}
          "Abbrechen"]
         [:button.modal-btn.modal-btn--confirm
          {:on-click #(rf/dispatch [::events/confirm-reset])}
          "Zurücksetzen"]]]])))
