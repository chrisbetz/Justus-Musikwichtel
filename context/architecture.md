# Justus-Musikwichtel: Architecture Documentation (arc42)

## 1. Introduction and Goals

### 1.1 Requirements Overview
**Wichtel-Wetteifern** is a web-based, Christmas-themed stopwatch competition tracker for two music students ("Oboe" and "Klavier"). It provides:
- Two independent stopwatches with wall-clock accuracy.
- A dynamic Naughty/Nice balance indicator comparing practice times.
- An animated Christmas village responding directly to stopwatch activity.
- Complete silence (zero audio).
- Multi-user authentication and persistent state storage on application.garden, with local development flexibility (SQLite or embedded Datalevin).

### 1.2 Quality Goals
1. **Timing Accuracy**: Wall-clock accuracy based on server epoch timestamps; immune to tab backgrounding, browser reload, or device sleep.
2. **Visual Charm & UX**: Playful, high-aesthetics Christmas theme optimized for iPad landscape with touch ergonomics and zero unnecessary scrolling.
3. **Operational Simplicity**: Pure Clojure/Java stack with embedded databases (Datalevin in production; SQLite/Datalevin locally) requiring zero external database daemon maintenance.
4. **Resilience**: State automatically persists across reloads; client optimistic updates prevent network lag from interrupting the user experience.

---

## 2. Architecture Constraints
- **Hosting Platform**: application.garden.
- **Frontend Framework**: ClojureScript, Reagent, re-frame, shadow-cljs.
- **Backend & System**: Clojure 1.12, Ring, Jetty, Compojure, GorillaLabs Bauhaus.
- **Authentication**: application.garden Garden ID (`io.github.nextjournal/garden-id`).
- **Secrets Management**: Secrets kept in `~/.secrets/musikwichtel.edn` locally and platform secrets on application.garden. Never committed to version control.

---

## 3. Context and Scope

### 3.1 Business Context
```
┌────────────────────────────────────────────────────────┐
│                        User (iPad / Browser)           │
└───────────────────────────▲────────────────────────────┘
                            │ HTTPS (UI & REST API)
┌───────────────────────────▼────────────────────────────┐
│                  Justus-Musikwichtel                   │
│                                                        │
│  [ ClojureScript / re-frame SPA ]                      │
│            │                                           │
│            ▼ HTTP REST (JSON)                          │
│  [ Clojure Ring Backend (Bauhaus lifecycle) ]          │
│            │                                           │
│      ┌─────┴─────────────────────┐                     │
│      ▼                           ▼                     │
│ [ Datalevin (Production) ]  [ SQLite (Local Dev) ]     │
└────────────────────────────────────────────────────────┘
```

---

## 4. Solution Strategy

1. **Frontend / SPA**: Built with re-frame. Subscriptions derive displayed milliseconds continuously from wall-clock timestamps (`Date.now() - start_ts + total_ms`) using `requestAnimationFrame`, rendering at 60fps without burdening the database.
2. **Backend**: Ring/Jetty HTTP server managed via Bauhaus lifecycle modules. Handles stopwatch state transitions atomically and calculates leaderboard standing.
3. **Storage Abstraction**: The `CompetitionStorage` protocol isolates persistence details. The application runs with `DatalevinStorage` on application.garden and optionally `SQLiteStorage` on local machines.
4. **Authentication**: In production, Garden ID handles OAuth/OIDC with application.garden. In local development, a dev user switcher enables simulating two concurrent players in adjacent browser windows.

---

## 5. Building Block View

### 5.1 Component Structure
- `musikwichtel.main`: Application startup and system lifecycle via Bauhaus.
- `musikwichtel.config`: Configuration merging `resources/config.edn` and `~/.secrets/musikwichtel.edn`.
- `musikwichtel.routes`: Ring HTTP routes for API endpoints and static assets.
- `musikwichtel.auth`: Garden ID authentication middleware and local user switching.
- `musikwichtel.db.protocols`: Storage protocol definition (`get-game-state`, `start-timer!`, `stop-timer!`, `reset-game!`, `update-names!`).
- `musikwichtel.db.datalevin`: Datalevin implementation using persistent storage path.
- `musikwichtel.db.sqlite`: SQLite implementation using `next.jdbc`.
- `cljs/musikwichtel.views`: Reagent UI components (Stopwatches, Naughty/Nice Gauge, Christmas Village, Reset Modal).

---

## 6. Runtime View

### 6.1 Timer Start Sequence
1. User taps "Start" on Player 1's stopwatch.
2. Re-frame dispatches `[:start-timer :player1]`, immediately setting optimistic local state.
3. Client fires `POST /api/start {:player :player1}`.
4. Server authenticates request, verifies player identity, stamps current epoch time `start-ts`, and records state to database.
5. Server responds with updated state; client synchronizes state.
6. Subscriptions activate village animation flag; village animations begin.

### 6.2 Timer Stop Sequence
1. User taps "Stop".
2. Client fires `POST /api/stop {:player :player1}`.
3. Server calculates elapsed time `(- now start-ts)`, adds to `total-ms`, clears `start-ts`, and persists state.
4. If no other timer is running, the village animation flag becomes false; village transitions to peaceful idle state.

---

## 7. Deployment View
- **application.garden**: Application packaged via `deps.edn` and deployed with `garden deploy`. Datalevin files reside in `$GARDEN_STORAGE/dtlv`.
- **Local Workstation**: Runs shadow-cljs watch server and Clojure Ring server. Uses `./dev-storage/wichtel.sqlite` or `./dev-storage/dtlv`.
