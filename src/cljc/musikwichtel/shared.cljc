(ns musikwichtel.shared)

(defn pad-zeros [n len]
  (let [s (str n)]
    (if (>= (count s) len)
      s
      (str (apply str (repeat (- len (count s)) "0")) s))))

(defn format-time-ms
  "Converts total milliseconds into HH:MM:SS string.
   Never wraps at 24 hours; formats 100+ hours correctly.
   No milliseconds displayed."
  [total-ms]
  (let [safe-ms (max 0 (or total-ms 0))
        total-seconds (quot safe-ms 1000)
        seconds (rem total-seconds 60)
        total-minutes (quot total-seconds 60)
        minutes (rem total-minutes 60)
        hours (quot total-minutes 60)]
    (str (pad-zeros hours 2) ":"
         (pad-zeros minutes 2) ":"
         (pad-zeros seconds 2))))

(defn calculate-effective-ms
  "Calculates current accumulated milliseconds for a player given current wall-clock time."
  [player-data current-wall-ts]
  (let [{:keys [total-ms running? start-ts]} player-data
        base-ms (or total-ms 0)]
    (if (and running? start-ts current-wall-ts (> current-wall-ts start-ts))
      (+ base-ms (- current-wall-ts start-ts))
      base-ms)))

(defn determine-leader
  "Returns leader map comparing player1 and player2 ms.
   :leader is :player1, :player2, or :tie.
   :angle-deg ranges from -45 (p1 leading) to +45 (p2 leading), 0 for tie."
  [p1-ms p2-ms]
  (let [diff (- p2-ms p1-ms)]
    (cond
      (= diff 0)
      {:leader :tie :diff-ms 0 :angle-deg 0}

      (> diff 0)
      ;; Player 2 has practiced more (p2 is on Nice side, p1 on Naughty side)
      (let [capped (min 1.0 (/ diff 1800000.0))] ;; max deflection at 30 min diff
        {:leader :player2
         :diff-ms diff
         :angle-deg (* capped 45.0)})

      :else
      ;; Player 1 has practiced more
      (let [capped (min 1.0 (/ (- diff) 1800000.0))]
        {:leader :player1
         :diff-ms (- diff)
         :angle-deg (* capped -45.0)}))))
