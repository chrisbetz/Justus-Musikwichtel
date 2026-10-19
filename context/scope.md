# Justus-Musikwichtel: Project Scope

## 1. Project Objective & Vision
**Wichtel-Wetteifern** is a web-based, Christmas-themed dual stopwatch competition tracker primarily designed for iPad in landscape orientation (touch-optimized, Safari compatible, zero unnecessary scrolling) and responsive on iPhone/desktop.

The app tracks practice times between two players ("Oboe" and "Klavier"). Below the two stopwatches sits a shared, living Christmas village that awakens with gentle animations whenever at least one stopwatch is actively running, and pauses into a peaceful, static holiday scene when both are stopped.

## 2. Target Devices & Runtime Environment
- **Primary Platform**: iPad (Safari browser, landscape orientation priority).
- **Secondary Platform**: iPhone and desktop browsers (graceful degradation and vertical layout adaptation).
- **Audio Constraint**: Fully silent app. Absolutely NO audio elements, sound effects, background music, or audio controls.

## 3. Core Functional Requirements

### 3.1 Dual Independent Stopwatches
- Two independent timers:
  - **Player 1**: Default name "Oboe", Christmas forest green theme.
  - **Player 2**: Default name "Klavier", Christmas berry red theme.
- Tap-to-edit player names directly on screen; preserved across restarts and resets.
- Independent Start / Stop controls per clock.
- **Time Format**: `HH:MM:SS` (hours, minutes, seconds). No milliseconds displayed.
- Hours display does not wrap or reset at 24:00:00 (supports 100+ hours).
- **Wall-clock Accuracy**: Calculations use server-synchronized epoch timestamps (`start-ts` and accumulated `total-ms`) to guarantee exact time tracking even across device sleep, background tab throttling, or network reconnects.

### 3.2 Dynamic Naughty / Nice Gauge
- Visual analog balance gauge positioned harmoniously between the two timers.
- **Nice Side**: Player with more total accumulated practice time.
- **Naughty Side**: Player with less accumulated practice time.
- **Balanced Center**: When both total times are equal (including on initial state or after reset).
- Smooth needle transitions that continuously reflect the real leader without jumping erratically.

### 3.3 Living Christmas Village
- Positioned directly below both stopwatches spanning full width.
- **Scene Details**:
  - Gingerbread and timber cottages with snow-covered roofs.
  - Chimneys with rising smoke curls.
  - Warm glowing windows.
  - Festive evergreen trees with twinkling fairy lights.
  - Multiple distinct elves engaged in varied holiday activities (decorating trees, shoveling snow, wrapping gifts, carrying packages) — NOT a single elf pacing back and forth.
  - Gentle falling snow.
- **Dynamic State Logic**:
  - **Idle State** (both stopwatches stopped): Snowfall stops; smoke halts; lights remain static; elves hold charming idle poses.
  - **Active State** (≥ 1 stopwatch running): Village comes to life; snow falls; chimneys smoke; lights twinkle; elves animate.
  - **Accessibility**: Respects `prefers-reduced-motion` for reduced cognitive/motion load.

### 3.4 Shared Reset Mechanism
- Discreet reset icon located unobtrusively in the UI.
- Modal confirmation dialog prevents accidental resets.
- Upon confirmed reset:
  - Both timers are stopped and reset to `00:00:00`.
  - Naughty/Nice gauge needle returns to the exact center.
  - Village returns to its peaceful resting state.
  - **Player names are preserved** and never erased by reset.

### 3.5 Multi-User Authentication & Persistence
- Built for deployment on **application.garden** with persistent storage (`GARDEN_STORAGE`).
- Integrated with **Garden ID** (`nextjournal/garden-id`) for OpenID Connect user authentication.
- In production, state is persisted in **Datalevin** (embedded Datalog over persistent storage).
- In local development, the system supports both embedded Datalevin and a local **SQLite** database (`dev-storage/wichtel.sqlite`) via a swappable storage protocol.
- Local dev switcher enables simulating both players simultaneously.
