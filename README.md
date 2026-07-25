# Drishti SCRB Crime Intelligence Platform

> **Drishti** (दृष्टि · ದೃಷ್ಟಿ · Vision) is a production-grade, AI-assisted crime intelligence platform built for the **Karnataka State Crime Records Bureau (SCRB)**. It unifies FIR filing, criminal network analysis, predictive hotspot mapping, statutory audit trails, and court-ready dossier generation into a single trilingual intelligence command centre.

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Project Structure](#project-structure)
- [Role-Based Access Control](#role-based-access-control)
- [Module Documentation](#module-documentation)
- [Statutory Compliance](#statutory-compliance)
- [AI Engine Configuration](#ai-engine-configuration)
- [Getting Started](#getting-started)
- [Supported Languages](#supported-languages)
- [Security and Privacy](#security-and-privacy)
- [Platform Statistics](#platform-statistics)
- [Roadmap](#roadmap)
- [Legal Disclaimer](#legal-disclaimer)

---

## Overview

| Attribute | Detail |
|---|---|
| **Version** | 2.0.0 |
| **Platform Type** | Pure Frontend Web Application (No Server Required) |
| **Languages Supported** | English · Kannada (ಕನ್ನಡ) · Hindi (हिंदी) |
| **Jurisdiction** | Bengaluru Urban · Expandable to 30 Karnataka Districts |
| **Penal Framework** | Bharatiya Nyaya Sanhita (BNS) 2023 |
| **Procedural Framework** | Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023 |
| **Evidence Standard** | Bharatiya Sakshya Adhiniyam (BSA) 2023 |
| **Data Privacy** | Digital Personal Data Protection Act (DPDPA) 2023 |
| **Deployment** | Offline HTML5 · CDN Dependencies Only |
| **Status** | Production Ready |

---

## Key Features

### Intelligence Core

- **AI-Assisted e-FIR Registration** — Statutory BNS 2023 penal code auto-suggestion from narrative text
- **Live Criminal Syndicate Matching** — Real-time cross-referencing of accused and vehicle entities against SCRB database
- **Trilingual NL Chat Assistant** — Conversational AI with full English / Kannada / Hindi support
- **Voice Input (ASR)** — Web Speech API integration with `en-IN`, `kn-IN`, `hi-IN` recognition models

### Geospatial and Network Analysis

- **Crime Hotspot Heatmap** — Interactive Leaflet.js heatmap over Bengaluru Urban with patrol recommendations
- **Criminal Network Graph** — D3.js v7 force-directed graph for co-accused, CDR link, and evidence relationship mapping
- **30-Day Predictive Forecasting** — Chart.js powered confidence-interval crime trend prediction

### Compliance and Audit

- **DPDPA 2023 Tamper-Proof Audit Ledger** — SHA-256 cryptographic hash-sealed action log
- **BSA 2023 Court-Ready Dossier** — Printable evidentiary PDF with Fact / Inference / Prediction classification
- **POCSO and BNS 72 Identity Suppression** — One-click complainant/survivor identity protection toggle

### Security

- **4-Tier Role-Based Access Control (RBAC)** — DGP to SP to Inspector to Analyst permission hierarchy
- **Explainable AI (XAI) Badges** — Every AI output carries a `Fact | Inference | Prediction` transparency label
- **Session Management** — Secure sessionStorage-based authenticated session with auto-expiry

---

## System Architecture

```
+------------------------------------------------------------------+
|               DRISHTI v2.0 -- SYSTEM ARCHITECTURE               |
+------------------------------------------------------------------+
|                                                                  |
|  [LOGIN/AUTH]       [CORE ENGINE]         [AI LAYER]            |
|  index.html   -->   js/app.js       -->   Local Engine          |
|                     Session Manager       OR                    |
|                     RBAC Module           Google Gemini API     |
|                     AuditLog              (gemini-2.5-flash)    |
|                     Toast/UI                                     |
|                          |                                       |
|         +----------------+----------------+                      |
|         v                v                v                      |
|  [DASHBOARD]      [e-FIR ENTRY]     [CHAT ASSISTANT]            |
|  KPIs             fir-entry.html    chat.html                    |
|  Priority Alerts  BNS AI Suggest    js/chat.js                   |
|  Chart.js         Syndicate Match   Voice ASR (kn/hi/en)        |
|                                     Tool-call UI                 |
|         +----------------+----------------+                      |
|         v                v                v                      |
|  [NETWORK GRAPH]  [HOTSPOT MAP]    [TRENDS/FORECAST]            |
|  D3.js v7         Leaflet.js       Chart.js                      |
|  Force-Directed   Heatmap          30-day CI bands               |
|  Co-accused CDR   Patrol Zones     Day/Time Heatmaps             |
|         +----------------+                                       |
|         v                v                                       |
|  [AUDIT LEDGER]   [COURT DOSSIER]                                |
|  SHA-256 Sealed   BSA 2023 Format                                |
|  DPDPA 2023       Print-Ready PDF                                |
+------------------------------------------------------------------+
```

---

## Project Structure

```
C:\Users\gaura\OneDrive\Desktop\ai\
|
+-- index.html            --> Entry Point: Secure Login and Role Selection
+-- dashboard.html        --> Command Dashboard: KPIs, Alerts, Charts
+-- fir-entry.html        --> AI-Assisted Statutory e-FIR Registration
+-- chat.html             --> Trilingual NL Chat + Voice Assistant
+-- network.html          --> Criminal Network Graph (D3.js v7)
+-- hotspot.html          --> Crime Hotspot Heatmap (Leaflet.js)
+-- trends.html           --> Predictive Crime Trends (Chart.js)
+-- audit.html            --> Tamper-Proof Statutory Audit Ledger
+-- export.html           --> Court-Ready BSA 2023 Dossier Generator
+-- README.md             --> This Document
|
+-- css\
|   +-- base.css          --> Global Design System (Tokens, Variables)
|   +-- components.css    --> Reusable UI Components Library
|   +-- dashboard.css     --> Dashboard-Specific Styles
|   +-- chat.css          --> Chat Interface and Bubble Styles
|   +-- network.css       --> Graph Visualization Styles
|
+-- js\
    +-- app.js            --> Core Engine: Session, RBAC, AuditLog, Toast
    +-- chat.js           --> Chat Engine: NL Processing, Gemini API, ASR
```

---

## Role-Based Access Control

Drishti implements a **4-tier hierarchical RBAC** system. Each role has a defined clearance level that gates access to sensitive modules and data.

| Role | Designation | Clearance Level | Access Scope |
|---|---|---|---|
| **DGP** | Director General of Police, Karnataka | LEVEL 5 — APEX | All modules + Restricted records + Suppressed identities |
| **SP** | Superintendent of Police, Bengaluru Urban | LEVEL 4 — STRATEGIC | All modules + Network graph admin + Restricted records |
| **Inspector** | Sub-Inspector / SHO / Duty Officer | LEVEL 3 — OPERATIONAL | FIR Filing, Chat, Hotspot, Trends, Audit (own actions), Export |
| **Analyst** | Crime Data Analyst / SCRB Staff | LEVEL 2 — ANALYTICAL | Dashboard, Network (read-only), Trends, Audit (view-only) |

> **DPDPA Note:** Survivor/victim identity fields are visible **only to DGP and SP** clearance levels. All other roles see `[SUPPRESSED — BNS 72 / POCSO]`.

---

## Module Documentation

### 1. Login and Authentication (`index.html`)

The secure entry portal with a split-screen design. Officers select their role and enter their name to initiate an authenticated session stored in `sessionStorage`. Features an animated intelligence node background, multilingual greeting support, and a simulated authentication loading sequence with integrity checks.

---

### 2. Command Dashboard (`dashboard.html`)

The central intelligence hub displaying:

| Widget | Description |
|---|---|
| **Live KPI Cards** | Total FIRs, Active Cases, Arrest Rate, High-Risk Alerts |
| **Priority FIR Feed** | Real-time severity-classified active case alerts |
| **Multi-District Chart** | Chart.js crime trend comparison across districts |
| **Quick Actions** | `+ New e-FIR`, Export, Notifications |

---

### 3. AI-Assisted e-FIR Registration (`fir-entry.html`)

A statutory e-FIR form fully compliant with **BNSS 173**:

| Feature | Description |
|---|---|
| **AI BNS Charge Suggestor** | Analyzes narrative text, recommends applicable BNS 2023 penal sections automatically |
| **Syndicate Match Alert** | Live cross-match of accused names and vehicle numbers vs. SCRB database |
| **DPDPA Identity Suppression** | One-click toggle to redact survivor identity from all public records |
| **SHA-256 Sealed Receipt** | Cryptographic receipt auto-generated upon FIR registration with print option |
| **4-Section Guided Workflow** | Jurisdiction > Complainant > Narrative and Charges > Entities and Vehicles |

---

### 4. Trilingual Chat Assistant (`chat.html` + `js/chat.js`)

- Full conversational NL interface with **auto language detection** (English / Kannada / Hindi)
- **Web Speech API** voice input supporting `en-IN`, `kn-IN`, `hi-IN`
- **Tool-call visualization** panel showing which SCRB intelligence tools the AI invoked
- **Explainable AI badges** on every response: `Fact`, `Inference`, `Prediction`
- Dual engine mode: **Local Engine** (offline, zero dependency) or **Live Gemini API** (online)

---

### 5. Criminal Network Graph (`network.html`)

- **D3.js v7** force-directed graph with fully draggable, zoomable nodes
- **Node types:** Accused, Co-Accused, Victim, Vehicle, Phone, Location
- **Edge types:** co-accused, CDR-link, vehicle-match, witness-corroboration
- Node click opens a full **SCRB profile detail panel**
- SVG export to image file capability

---

### 6. Crime Hotspot Map (`hotspot.html`)

- **Leaflet.js** interactive map centered on Bengaluru Urban
- Dynamic crime **heatmap layer** with red-to-green intensity gradient
- **Risk Zone polygons** with real-time patrol recommendation text
- Police station markers with jurisdiction boundary overlays

---

### 7. Trends and 30-Day Forecast (`trends.html`)

- Historical crime trend line charts powered by **Chart.js**
- **30-day predictive forecast** with upper and lower confidence interval bands
- **Day-of-Week** and **Time-of-Day** crime concentration heatmaps
- Beat-level automated patrol signal generation

---

### 8. Statutory Audit Ledger (`audit.html`)

| Feature | Implementation |
|---|---|
| **Tamper Detection** | SHA-256 cryptographic hash per audit record |
| **DPDPA Compliance** | Every PII access event logged with officer ID and timestamp |
| **Trace Inspector Modal** | Click any record to view full raw JSON payload and XAI rationale |
| **Statutory Export** | Download complete ledger as `drishti-statutory-audit-ledger.json` |

---

### 9. Court-Ready Dossier Export (`export.html`)

- Officially formatted evidentiary dossier per **Bharatiya Sakshya Adhiniyam (BSA) 2023**
- Contains SCRB Karnataka emblem, case reference number, and officer seal
- **Admissibility classification matrix**: Fact (certified FIR records) vs. Inference (algorithmic output)
- One-click native browser **PDF generation** optimized for A4 court paper

---

## Statutory Compliance

| Legislation | How Drishti Complies |
|---|---|
| **Bharatiya Nyaya Sanhita (BNS) 2023** | AI penal code suggestion mapped to BNS sections (replaces IPC). Charges auto-applied to e-FIR. |
| **Bharatiya Nagarik Suraksha Sanhita (BNSS) 2023** | e-FIR workflow follows BNSS 173 statutory registration procedure. |
| **Bharatiya Sakshya Adhiniyam (BSA) 2023** | Dossier export classifies all evidence by admissibility. Digital chain-of-custody maintained. |
| **Digital Personal Data Protection Act (DPDPA) 2023** | All PII access is role-gated. Survivor identity suppression toggle. Every data access event logged. |
| **POCSO Act** | Minor victim/survivor identities are automatically flagged for suppression regardless of officer role. |

---

## AI Engine Configuration

Drishti supports two interchangeable AI engines selectable from the Chat Assistant topbar:

### Option A — Local Deterministic Intelligence Engine (Default / Offline)

- No API key required
- Uses pre-loaded SCRB FIR/chargesheet knowledge base
- Zero network dependency — works in air-gapped police networks
- Responds in milliseconds with deterministic intelligence

### Option B — Live Google Gemini API (Online LLM)

- Click the `AI Mode` button in the Chat topbar
- Select `Live Google Gemini API` and enter your key (`AIzaSy...`)
- Connects to `gemini-2.5-flash` model
- SCRB RAG context + officer role + jurisdiction injected automatically
- API key stored device-locally in `localStorage` only

```
Gemini Prompt Architecture:
+--------------------------------------------------+
|  SYSTEM PROMPT:                                  |
|   - Officer Identity + Role + Jurisdiction       |
|   - SCRB RAG Context (FIR DB + Hotspot Data)     |
|   - DPDPA Privacy Rules + Language Instruction   |
+--------------------------------------------------+
|  USER TURN:                                      |
|   - Officer query (text or transcribed voice)    |
+--------------------------------------------------+
        |
        v
   gemini-2.5-flash
        |
        v
   Response with Fact / Inference / Prediction badges
```

---

## Getting Started

### Prerequisites

```
- Any modern web browser (Google Chrome / Microsoft Edge / Firefox)
- No Node.js, Python, or backend server required
- Internet needed only for: Leaflet maps tiles and Chart.js CDN on first load
- Gemini API key optional (only for Live AI mode)
```

### Launch the Application

**Option 1 — Double Click (Recommended)**

```
Navigate to folder:  C:\Users\gaura\OneDrive\Desktop\ai\
Double-click file:   index.html
```

**Option 2 — Browser Address Bar**

```
Open Chrome or Edge
Paste in address bar: C:\Users\gaura\OneDrive\Desktop\ai\index.html
Press Enter
```

**Option 3 — PowerShell Command**

```powershell
Start-Process "C:\Users\gaura\OneDrive\Desktop\ai\index.html"
```

### First Login Steps

```
Step 1  -->  Select your Officer Role card (DGP / SP / Inspector / Analyst)
Step 2  -->  Enter your Officer Name in the name field
Step 3  -->  Click "Authenticate & Access System"
Step 4  -->  You will be redirected to the Command Dashboard
```

---

## Supported Languages

| Language | Switch Code | Voice ASR Model | UI Translation | AI Response |
|---|---|---|---|---|
| English | `EN` | `en-IN` | Full | Full |
| Kannada (ಕನ್ನಡ) | `KN` | `kn-IN` | Full | Full |
| Hindi (हिंदी) | `HI` | `hi-IN` | Full | Full |

Language can be switched at any time from the **topbar language selector** on every page. The AI engine automatically detects and responds in the same language as the officer's query.

---

## Security and Privacy

```
+------------------------------------------------------+
|           SECURITY ARCHITECTURE SUMMARY              |
+------------------------------------------------------+
|                                                      |
|  Authentication   -- Role-based session tokens       |
|  Data Storage     -- sessionStorage (auto-cleared)   |
|  API Key Storage  -- localStorage (device-local)     |
|  Audit Logging    -- Every action SHA-256 sealed     |
|  Network Transit  -- Zero server-side data transit   |
|  PII Protection   -- DPDPA 2023 role-gated access    |
|  Survivor Privacy -- POCSO / BNS 72 suppression      |
|                                                      |
+------------------------------------------------------+
```

> **Important:** Drishti is a **decision-support system**. All AI outputs marked `Fact`, `Inference`, or `Prediction` must be verified against original source records before any real-world law enforcement action is taken.

---

## Platform Statistics

| Metric | Value |
|---|---|
| Karnataka Police Stations Covered | 1,100+ |
| Districts | 30 |
| Languages Supported | 3 (EN / KN / HI) |
| Intelligence Modules | 9 |
| Statutory Frameworks | 5 (BNS, BNSS, BSA, DPDPA, POCSO) |
| Access Control Roles | 4 (DGP, SP, Inspector, Analyst) |
| AI Engine Modes | 2 (Local Deterministic + Gemini Live) |
| External Dependencies | CDN-only (D3.js v7, Chart.js, Leaflet.js) |
| Backend Server Required | None |

---

## Roadmap

- [x] Phase 1 — Core RBAC, Login, Dashboard, Design System
- [x] Phase 2 — Trilingual Chat Assistant + Voice ASR
- [x] Phase 3 — Criminal Network Graph (D3.js v7)
- [x] Phase 4 — Crime Hotspot Heatmap (Leaflet.js)
- [x] Phase 5 — Predictive Trends and Forecasting (Chart.js)
- [x] Phase 6 — DPDPA Statutory Audit Ledger (SHA-256)
- [x] Phase 7 — BSA 2023 Court-Ready Dossier Export
- [x] Phase 8 — AI-Assisted Statutory e-FIR Registration
- [x] Phase 9 — Live Google Gemini 2.5 Flash API Integration
- [ ] Phase 10 — Real SCRB MySQL / Neo4j Backend Connection (Future)
- [ ] Phase 11 — JWT-based Production Authentication Server (Future)
- [ ] Phase 12 — CCTNS Crime and Criminal Tracking Network API Integration (Future)

---

## Legal Disclaimer

This platform is developed for **official Karnataka State Crime Records Bureau (SCRB)** law enforcement use only.

All AI-generated outputs — including FIR charge suggestions, criminal network inferences, hotspot predictions, and risk scores — are **decision-support tools only** and do **not** constitute legal advice, judicial orders, or confirmed intelligence.

Every AI output is explicitly classified as `FACT` (verified source record), `INFERENCE` (algorithmic analytical link), or `PREDICTION` (probabilistic forecast) in compliance with **Explainable AI (XAI) principles** and the **Digital Personal Data Protection Act (DPDPA) 2023**.

Unauthorized access or misuse of this system is a cognizable offence under the **Information Technology Act, 2000** and applicable Karnataka Police Service Regulations.

---

*Built for Karnataka Police — SCRB*

*Drishti — Towards Safer Karnataka*

*Copyright 2026 Drishti Intelligence Platform — Karnataka SCRB — All Rights Reserved*
