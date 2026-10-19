# Deployment & Environment Guide: Justus-Musikwichtel

This document describes how to configure, run, and deploy the application in both local development and production environments.

---

## 1. Secrets Management

> [!IMPORTANT]
> **NEVER commit secrets, credentials, or local passwords into Git.**
> The `.gitignore` is configured to ignore `.secrets/`, `secrets/`, and `*.edn.local`.

- In **Local Development**, configuration overrides and secrets are read from:
  ```
  ~/.secrets/musikwichtel.edn
  ```
  Example content:
  ```clojure
  {:db-backend :sqlite                      ;; Options: :sqlite or :datalevin
   :garden-storage "./dev-storage"
   :sqlite-path "./dev-storage/wichtel.sqlite"
   :session-secret "musikwichtel-dev-secret-32-chars-long!"}
  ```
- In **application.garden Production**, secrets are managed via platform secrets:
  ```bash
  garden secrets add SESSION_SECRET
  ```

---

## 2. Local Development Environment

You can run the application locally using either an embedded **SQLite** backend or an embedded **Datalevin** backend.

### Prerequisites
- JDK 17+
- Clojure CLI (`brew install clojure/tools/clojure`)
- Node.js & npm (`brew install node`)

### Step-by-Step Local Setup

1. **Install dependencies**:
   ```bash
   clojure -P
   clojure -A:cljs -P
   npm install
   ```

2. **Select Database Backend**:
   Edit `~/.secrets/musikwichtel.edn` to select your preferred local backend:
   - For **SQLite**: `:db-backend :sqlite` (stores data in `./dev-storage/wichtel.sqlite`).
   - For **Datalevin**: `:db-backend :datalevin` (stores data in `./dev-storage/dtlv`).

3. **Start the ClojureScript dev server (shadow-cljs)**:
   ```bash
   npx shadow-cljs watch app
   ```
   - Compiles the frontend and serves hot-reloaded JS at `http://localhost:8280`.
   - Starts an nREPL server on port `7002`.

4. **Start the Ring Backend Server**:
   In another terminal:
   ```bash
   clojure -M:run
   ```
   The backend server will start on `http://localhost:8080`.

5. **Testing Both Players in Local Development**:
   Because application.garden OIDC is not active locally, the dev server simulates the two players using query parameters:
   - **Player 1 (Oboe)**: Open `http://localhost:8080?user=player1`
   - **Player 2 (Klavier)**: Open `http://localhost:8080?user=player2` in an incognito or secondary window.
   Both players share the same persistent competition state and update in real-time.

---

## 3. Clojure MCP Server (Agent REPL Integration)

The project includes configuration for `io.github.bhauman/clojure-mcp`:
- Configuration file: `.mcp.json`
- Once `shadow-cljs watch app` is running, nREPL is available at port `7002`.
- When connecting Antigravity or AI coding agents, the agent utilizes `.mcp.json` to inspect and evaluate Clojure/ClojureScript forms live in the application runtime.
- **Note**: If your IDE was started before `.mcp.json` was created or before nREPL was running, restart or reconnect the IDE agent session so it discovers and attaches to the MCP server.

---

## 4. Production Deployment on application.garden

application.garden provides managed hosting with persistent storage and native user authentication.

### Configuration (`garden.edn`)
The repository includes `garden.edn`:
```clojure
{:app/name "justus-musikwichtel"
 :app/exec ["clojure" "-M:run"]}
```

### Storage in Production
- application.garden mounts persistent disk storage at the directory specified by `GARDEN_STORAGE`.
- In production, the app automatically selects `:datalevin` and persists its LMDB/Datalog store into `$GARDEN_STORAGE/dtlv`.

### User Authentication in Production
- Authenticates users via Garden ID OpenID Connect.
- The platform supplies `OAUTH2_CLIENT_ID` and `OAUTH2_CLIENT_SECRET`.
- Users log in with their GitHub or Apple account; their account ID maps to Player 1 or Player 2.

### Deploying
1. Install the garden CLI (if not already installed):
   ```bash
   curl -sL https://application.garden/install.sh | bash
   ```
2. Build production ClojureScript release:
   ```bash
   npx shadow-cljs release app
   ```
3. Deploy to application.garden:
   ```bash
   garden deploy
   ```
