(ns musikwichtel.views.village
  (:require [re-frame.core :as rf]
            [musikwichtel.subs :as subs]))

(defn living-christmas-village []
  (let [active? @(rf/subscribe [::subs/village-active?])]
    [:div.village-container
     {:class (if active? "village--active" "village--idle")}

     ;; Falling Snowflakes Layer
     [:div.snow-container
      (for [i (range 32)]
        (let [left-pct (mod (* i 29.3) 98)
              size (+ 3.5 (mod (* i 2.7) 5))
              dur (+ 3.8 (mod (* i 1.3) 3.5))
              delay (mod (* i 0.45) 3.5)]
          ^{:key (str "flake-" i)}
          [:div.snowflake
           {:style {:left (str left-pct "%")
                    :top "-15px"
                    :width (str size "px")
                    :height (str size "px")
                    :animation-duration (str dur "s")
                    :animation-delay (str delay "s")}}]))]

     ;; Illustrated Christmas Village SVG Scene (viewBox: 0 0 1000 300)
     [:svg.village-svg
      {:viewBox "0 0 1000 300"
       :preserveAspectRatio "xMidYMid slice"
       :xmlns "http://www.w3.org/2000/svg"}

      ;; Soft distant snowy mountain silhouettes
      [:path {:d "M-50 240 Q 150 120 350 230 Q 550 140 750 220 Q 900 160 1050 250 L 1050 300 L -50 300 Z"
              :fill "#132b24" :opacity "0.7"}]
      [:path {:d "M-20 250 Q 200 160 450 240 Q 700 170 1020 260 L 1020 300 L -20 300 Z"
              :fill "#1a3a31" :opacity "0.8"}]

      ;; Snowy Hills Foreground
      [:path {:d "M-20 260 Q 250 210 500 250 Q 750 220 1020 260 L 1020 300 L -20 300 Z"
              :fill "#eaf4f0"}]

      ;; ============================================================
      ;; HOUSE 1: Left Gingerbread Cottage (x ~ 120)
      ;; ============================================================
      [:g {:transform "translate(110, 140)"}
       ;; Chimney & Smoke
       [:rect {:x "18" :y "-25" :width "16" :height "32" :fill "#7f4f24" :rx "2"}]
       [:rect {:x "16" :y "-29" :width "20" :height "5" :fill "#eaf4f0" :rx "2"}]
       [:circle.chimney-smoke-puff {:cx "26" :cy "-34" :r "6" :fill "rgba(240,240,240,0.85)"}]
       [:circle.chimney-smoke-puff.chimney-smoke-puff--2 {:cx "28" :cy "-36" :r "8" :fill "rgba(240,240,240,0.7)"}]

       ;; Main Cottage Walls
       [:rect {:x "0" :y "10" :width "100" :height "75" :fill "#8b5329" :rx "4"}]
       ;; Timber Framing
       [:line {:x1 "0" :y1 "45" :x2 "100" :y2 "45" :stroke "#582f0e" :stroke-width "3"}]
       [:line {:x1 "50" :y1 "10" :x2 "50" :y2 "85" :stroke "#582f0e" :stroke-width "3"}]

       ;; Wooden Door
       [:rect {:x "38" :y "46" :width "24" :height "39" :fill "#432818" :rx "3"}]
       [:circle {:cx "56" :cy "66" :r "2" :fill "#f3c969"}]

       ;; Warm Glowing Windows
       [:rect.village-window-glow {:x "12" :y "26" :width "18" :height "20" :fill "#ffd166" :rx "3"}]
       [:line {:x1 "21" :y1 "26" :x2 "21" :y2 "46" :stroke "#8b5329" :stroke-width "2"}]
       [:rect.village-window-glow {:x "70" :y "26" :width "18" :height "20" :fill "#ffd166" :rx "3"}]
       [:line {:x1 "79" :y1 "26" :x2 "79" :y2 "46" :stroke "#8b5329" :stroke-width "2"}]

       ;; Snowy Roof
       [:polygon {:points "-10,12 50,-24 110,12" :fill "#582f0e"}]
       [:path {:d "M -12 12 Q 50 -30 112 12 Q 100 2 85 8 Q 65 -4 50 2 Q 35 -6 18 8 Q 5 2 -12 12 Z"
               :fill "#ffffff" :filter "drop-shadow(0 2px 2px rgba(0,0,0,0.15))"}]]

      ;; ============================================================
      ;; EVERGREEN TREE 1 with Twinkling Lights (x ~ 260)
      ;; ============================================================
      [:g {:transform "translate(250, 145)"}
       [:polygon {:points "30,0 0,60 60,60" :fill "#134e35"}]
       [:polygon {:points "30,30 -6,85 66,85" :fill "#1b5e3f"}]
       [:polygon {:points "30,60 -12,110 72,110" :fill "#216e4a"}]
       [:rect {:x "25" :y "110" :width "10" :height "15" :fill "#432818"}]
       ;; Snow on Tree
       [:path {:d "M 10 60 Q 30 52 50 60 Q 30 45 10 60 Z" :fill "#ffffff"}]
       [:path {:d "M 4 85 Q 30 75 56 85 Q 30 68 4 85 Z" :fill "#ffffff"}]
       ;; Star on top
       [:polygon {:points "30,-8 33,-2 40,-2 34,2 37,8 30,4 23,8 26,2 20,-2 27,-2" :fill "#ffd166"}]
       ;; Twinkling Lights
       [:circle.fairy-light {:cx "20" :cy "45" :r "2.5" :fill "#ff5964"}]
       [:circle.fairy-light.fairy-light--alt {:cx "38" :cy "50" :r "2.5" :fill "#ffd166"}]
       [:circle.fairy-light {:cx "16" :cy "75" :r "2.5" :fill "#35a7ff"}]
       [:circle.fairy-light.fairy-light--alt {:cx "44" :cy "80" :r "2.5" :fill "#38b000"}]]

      ;; ============================================================
      ;; ELF 1: Decorating Tree (x ~ 315)
      ;; ============================================================
      [:g.elf-decorator {:transform "translate(315, 205)"}
       ;; Body & Coat (Green)
       [:path {:d "M 10 18 L 4 36 L 22 36 Z" :fill "#2d6a4f"}]
       [:rect {:x "8" :y "36" :width "3" :height "8" :fill "#1b4332"}]
       [:rect {:x "15" :y "36" :width "3" :height "8" :fill "#1b4332"}]
       ;; Head & Face
       [:circle {:cx "13" :cy "13" :r "6" :fill "#fcd5ce"}]
       ;; Elf Hat
       [:polygon {:points "8,11 18,11 10,0" :fill "#c1121f"}]
       [:circle {:cx "10" :cy "0" :r "2" :fill "#ffffff"}]
       ;; Hands reaching out holding golden star
       [:line {:x1 "11" :y1 "22" :x2 "-2" :y2 "14" :stroke "#fcd5ce" :stroke-width "2.5"}]
       [:polygon {:points "-2,14 -4,11 -1,11 0,8 2,11 5,11 3,14 4,17 0,15 -3,17" :fill "#ffd166"}]]

      ;; ============================================================
      ;; HOUSE 2: Central Village Clock / Bakery (x ~ 430)
      ;; ============================================================
      [:g {:transform "translate(420, 115)"}
       ;; Chimney & Smoke
       [:rect {:x "72" :y "-15" :width "16" :height "35" :fill "#7f4f24" :rx "2"}]
       [:circle.chimney-smoke-puff {:cx "80" :cy "-24" :r "7" :fill "rgba(240,240,240,0.85)"}]
       [:circle.chimney-smoke-puff.chimney-smoke-puff--2 {:cx "82" :cy "-26" :r "9" :fill "rgba(240,240,240,0.7)"}]

       ;; Building Body
       [:rect {:x "0" :y "20" :width "120" :height "95" :fill "#9c6644" :rx "5"}]
       ;; Decorative Shop Front
       [:rect {:x "14" :y "60" :width "40" :height "55" :fill "#432818" :rx "3"}]
       [:circle {:cx "48" :cy "88" :r "2" :fill "#ffd166"}]

       ;; Big Warm Window
       [:rect.village-window-glow {:x "65" :y "58" :width "42" :height "40" :fill "#ffd166" :rx "4"}]
       [:line {:x1 "86" :y1 "58" :x2 "86" :y2 "98" :stroke "#9c6644" :stroke-width "3"}]
       [:line {:x1 "65" :y1 "78" :x2 "107" :y2 "78" :stroke "#9c6644" :stroke-width "3"}]

       ;; Roof
       [:polygon {:points "-14,22 60,-24 134,22" :fill "#582f0e"}]
       [:path {:d "M -16 22 Q 60 -30 136 22 Q 120 10 100 16 Q 80 4 60 12 Q 40 2 20 14 Q 2 6 -16 22 Z"
               :fill "#ffffff"}]]

      ;; ============================================================
      ;; ELF 2: Shoveling Snow (x ~ 585)
      ;; ============================================================
      [:g.elf-shoveler {:transform "translate(580, 212)"}
       ;; Legs
       [:rect {:x "6" :y "32" :width "4" :height "10" :fill "#1b4332"}]
       [:rect {:x "14" :y "32" :width "4" :height "10" :fill "#1b4332"}]
       ;; Body (Red Coat)
       [:path {:d "M 8 16 L 3 33 L 21 33 Z" :fill "#c1121f"}]
       ;; Head
       [:circle {:cx "12" :cy "11" :r "6" :fill "#fcd5ce"}]
       ;; Hat
       [:polygon {:points "7,9 17,9 20,0" :fill "#2d6a4f"}]
       [:circle {:cx "20" :cy "0" :r "2" :fill "#ffffff"}]
       ;; Wooden Shovel
       [:line {:x1 "-8" :y1 "42" :x2 "16" :y2 "20" :stroke "#8b5329" :stroke-width "3"}]
       [:rect {:x "-16" :y "38" :width "10" :height "7" :fill "#d4a373" :rx "1"}]
       ;; Shoveled Snow Heap
       [:ellipse {:cx "-14" :cy "45" :rx "8" :ry "4" :fill "#ffffff"}]]

      ;; ============================================================
      ;; HOUSE 3: Right Toy Cottage (x ~ 720)
      ;; ============================================================
      [:g {:transform "translate(710, 135)"}
       [:rect {:x "0" :y "15" :width "95" :height "80" :fill "#7f4f24" :rx "4"}]
       ;; Windows
       [:rect.village-window-glow {:x "15" :y "32" :width "22" :height "24" :fill "#ffd166" :rx "3"}]
       [:line {:x1 "26" :y1 "32" :x2 "26" :y2 "56" :stroke "#7f4f24" :stroke-width "2"}]
       [:rect.village-window-glow {:x "58" :y "32" :width "22" :height "24" :fill "#ffd166" :rx "3"}]
       [:line {:x1 "69" :y1 "32" :x2 "69" :y2 "56" :stroke "#7f4f24" :stroke-width "2"}]

       ;; Roof
       [:polygon {:points "-10,18 48,-18 105,18" :fill "#432818"}]
       [:path {:d "M -12 18 Q 48 -24 107 18 Q 95 6 78 12 Q 60 2 48 8 Q 32 0 16 10 Q 0 4 -12 18 Z"
               :fill "#ffffff"}]]

      ;; ============================================================
      ;; ELF 3: Wrapping Gifts (x ~ 830)
      ;; ============================================================
      [:g.elf-wrapper {:transform "translate(830, 218)"}
       ;; Seated Body (Blue/Green Coat)
       [:path {:d "M 10 14 L 4 30 L 22 30 Z" :fill "#1b4332"}]
       [:circle {:cx "13" :cy "9" :r "5.5" :fill "#fcd5ce"}]
       [:polygon {:points "9,8 17,8 11,-1" :fill "#c1121f"}]
       [:circle {:cx "11" :cy "-1" :r "1.5" :fill "#ffffff"}]
       ;; Big Gift Box in front
       [:rect {:x "-12" :y "20" :width "14" :height "12" :fill "#d90429" :rx "1"}]
       [:line {:x1 "-5" :y1 "20" :x2 "-5" :y2 "32" :stroke "#ffd166" :stroke-width "2"}]
       [:line {:x1 "-12" :y1 "26" :x2 "2" :y2 "26" :stroke "#ffd166" :stroke-width "2"}]
       [:circle {:cx "-5" :cy "19" :r "2" :fill "#ffd166"}]]

      ;; ============================================================
      ;; ELF 4: Carrying a Parcel (x ~ 895)
      ;; ============================================================
      [:g.elf-carrier {:transform "translate(895, 210)"}
       [:rect {:x "8" :y "32" :width "3" :height "8" :fill "#2d6a4f"}]
       [:rect {:x "14" :y "32" :width "3" :height "8" :fill "#2d6a4f"}]
       [:path {:d "M 8 16 L 3 32 L 21 32 Z" :fill "#c1121f"}]
       [:circle {:cx "12" :cy "11" :r "5.5" :fill "#fcd5ce"}]
       [:polygon {:points "8,9 16,9 13,0" :fill "#ffd166"}]
       ;; Parcel in hands
       [:rect {:x "16" :y "18" :width "10" :height "9" :fill "#38b000" :rx "1"}]
       [:line {:x1 "21" :y1 "18" :x2 "21" :y2 "27" :stroke "#d90429" :stroke-width "1.5"}]]

      ;; ============================================================
      ;; EVERGREEN TREE 2 on Far Right (x ~ 940)
      ;; ============================================================
      [:g {:transform "translate(930, 160)"}
       [:polygon {:points "25,0 0,50 50,50" :fill "#134e35"}]
       [:polygon {:points "25,25 -5,70 55,70" :fill "#1b5e3f"}]
       [:rect {:x "21" :y "70" :width "8" :height "12" :fill "#432818"}]
       [:path {:d "M 5 50 Q 25 42 45 50 Q 25 36 5 50 Z" :fill "#ffffff"}]
       [:circle.fairy-light {:cx "15" :cy "35" :r "2" :fill "#ffd166"}]
       [:circle.fairy-light.fairy-light--alt {:cx "32" :cy "40" :r "2" :fill "#ff5964"}]]]]))
