(ns musikwichtel.core
  (:require [reagent.dom.client :as rdc]
            [re-frame.core :as rf]
            [musikwichtel.events :as events]
            [musikwichtel.subs :as subs]
            [musikwichtel.views.main :refer [main-view]]))

(defonce root-atom (atom nil))
(defonce raf-id-atom (atom nil))
(defonce poll-id-atom (atom nil))

(defn- tick-loop []
  (rf/dispatch [::events/tick (.now js/Date)])
  (reset! raf-id-atom (js/requestAnimationFrame tick-loop)))

(defn- render! []
  (when-let [root @root-atom]
    (rdc/render root [main-view])))

(defn ^:export init! []
  (rf/dispatch-sync [::events/initialize-db])
  (rf/dispatch [::events/poll-state])

  ;; Mount React root
  (when-let [el (.getElementById js/document "app")]
    (let [root (rdc/create-root el)]
      (reset! root-atom root)
      (render!)))

  ;; Start ticking clock for high-accuracy wall-clock RAF display
  (when-not @raf-id-atom
    (tick-loop))

  ;; Start server state polling every 1.5s
  (when-not @poll-id-atom
    (reset! poll-id-atom (js/setInterval #(rf/dispatch [::events/poll-state]) 1500))))

(defn ^:export after-load! []
  (render!))
