# Justus-Musikwichtel: Wichtel-Wetteifern 🎄⏱️

> Fully-featured Christmas-themed competition stopwatch web application for iPad and iPhone.

[![Clojure](https://img.shields.io/badge/Clojure-1.12-blue.svg)](https://clojure.org)
[![ClojureScript](https://img.shields.io/badge/ClojureScript-re--frame-green.svg)](https://re-frame.link)
[![application.garden](https://img.shields.io/badge/Hosted%20on-application.garden-teal.svg)](https://application.garden)

---

## Overview

**Wichtel-Wetteifern** is a delightful practice competition tracker between two musicians ("Oboe" and "Klavier").

- ⏱️ **Two Independent Stopwatches**: Green for Oboe, Red for Klavier. Wall-clock accurate timing, resilient to browser refresh, tab suspension, and device sleep.
- ⚖️ **Naughty / Nice Balance Gauge**: Analog dial dynamically indicating who is leading the practice duel.
- 🏘️ **Living Christmas Village**: An illustrated winter scene situated directly below the timers. It remains peaceful when both stopwatches are stopped, and springs to life with snowfall, smoking chimneys, glowing windows, and busy elves as soon as someone practices.
- 🔇 **100% Silent**: Strictly zero audio, sound effects, or background music.
- 📱 **iPad-Optimized**: Designed primarily for iPad Safari in landscape orientation with full touch ergonomics and zero unnecessary scrolling.
- 🔒 **Authenticated & Persistent**: Backed by application.garden Garden ID authentication and Datalevin persistent storage in production, with SQLite and Datalevin support for local development.

---

## Architecture & Documentation

- [Detailed Scope & Specifications](context/scope.md)
- [arc42 Architectural Documentation](context/architecture.md)
- [Deployment & Environment Guide (Local SQLite & Prod Datalevin)](DEPLOY.md)

---

## Quickstart (Local Development)

### 1. Prerequisites
- JDK 17+
- Clojure CLI (`brew install clojure/tools/clojure`)
- Node.js & npm (`brew install node`)

### 2. Install & Start
```bash
# 1. Install dependencies
clojure -P
clojure -A:cljs -P
npm install

# 2. Start ClojureScript compilation (with nREPL on port 7002)
npx shadow-cljs watch app

# 3. Start backend server (in another terminal)
clojure -M:run
```

Open `http://localhost:8080` in your browser.

---

## Secrets & Security

Secrets and local environment overrides are stored strictly in `~/.secrets/musikwichtel.edn` and are never committed to version control. See [DEPLOY.md](DEPLOY.md) for details.

---

## License

Copyright © 2026 Dr. Christian Betz. All rights reserved.
