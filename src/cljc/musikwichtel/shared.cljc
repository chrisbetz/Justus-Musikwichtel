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
   :nice-player is the player with more practice time (or nil if tie).
   :naughty-player is the player with less practice time (or nil if tie).
   :angle-deg ranges from -45 (p1 leading) to +45 (p2 leading), 0 for tie."
  [p1-ms p2-ms]
  (let [diff (- (or p2-ms 0) (or p1-ms 0))]
    (cond
      (= diff 0)
      {:leader :tie
       :nice-player nil
       :naughty-player nil
       :diff-ms 0
       :diff-formatted "00:00:00"
       :angle-deg 0}

      (> diff 0)
      ;; Player 2 (Klavier) has practiced more
      (let [capped (min 1.0 (/ diff 1800000.0))] ;; max deflection at 30 min diff
        {:leader :player2
         :nice-player :player2
         :naughty-player :player1
         :diff-ms diff
         :diff-formatted (format-time-ms diff)
         :angle-deg (* capped 45.0)})

      :else
      ;; Player 1 (Oboe) has practiced more
      (let [abs-diff (- diff)
            capped (min 1.0 (/ abs-diff 1800000.0))]
        {:leader :player1
         :nice-player :player1
         :naughty-player :player2
         :diff-ms abs-diff
         :diff-formatted (format-time-ms abs-diff)
         :angle-deg (* capped -45.0)}))))
