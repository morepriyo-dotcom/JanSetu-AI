# 🇮🇳 JanSetu AI (जनसेतु)
### "AI-Powered Citizen Grievance & Public Service Assistant"
Built for **Code for Communities 2.0 Hackathon**

---

## 🌟 Overview

Citizens often struggle when facing everyday civic problems:
- They don't know which municipal department is responsible (e.g. Roads vs Water vs Drainage).
- They don't know how to formally describe the severity or technical specifications of the issue.
- Unstructured grievances get lost in bureaucratic silos or remain unattended.

**JanSetu AI** bridges this gap using Google Gemini. Citizens report civic issues in everyday conversational language (with optional photos and geolocation). Gemini parses, categorizes, triages priority (Low, Medium, High, Critical), extracts responsible municipal departments, and produces actionable public service work orders with live 4-stage tracking.

---

## 🚀 Key Features

1. **Natural Language Citizen Reporting**: Citizens describe complaints naturally without dealing with complicated bureaucratic forms.
2. **1-Click Hackathon Demo Scenarios**: Instant test presets (pothole near college, overflowing market garbage, dark streetlights, burst water main, clogged drainage) for rapid 3-minute judge demos.
3. **Google Gemini Multimodal AI Triage**:
   - Strict JSON structured output with comprehensive schema validation.
   - Intelligent detection of missing location (`locationRequired: true`).
   - Priority classification (`LOW`, `MEDIUM`, `HIGH`, `CRITICAL`).
   - Departmental routing (`ROADS`, `WATER`, `SANITATION`, `ELECTRICITY`, `STREETLIGHT`, `DRAINAGE`, `PUBLIC_SAFETY`, `OTHER`).
4. **Resilient Dual-Mode Data Architecture**:
   - Production Firebase Firestore synchronization when environment variables are supplied.
   - Zero-config Reactive Local/Memory Store fallback so judges and developers can run and test the application immediately with zero setup bottlenecks.
5. **Live 4-Stage Civic Tracking**:
   `Reported ➔ Assigned ➔ In Progress ➔ Resolved` with timestamps, notes, and staff updates.
6. **Administrative Municipal Portal**:
   - Real-time KPI analytics (Total, Open, In Progress, Resolved, Critical/High Priority).
   - Dynamic filters by Category, Priority, and Status.
   - Interactive live status modifier with immediate database persistence.
   - 1-click **"Seed 8+ Demo Grievances"** button for instant demonstration.

---

## 🏗️ Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router, React 19, TypeScript)
- **Styling**: Tailwind CSS, Lucide Icons, Mobile-first responsive civic theme
- **AI Engine**: Google Gemini API (`@google/generative-ai` with `gemini-1.5-flash` server-side)
- **Database**: Firebase Firestore (`complaints` collection) with dual-mode in-memory/localStorage fallback
- **Location**: Browser Geolocation API + OpenStreetMap Nominatim reverse geocoding

---

## 📁 Project Structure

```
JanSetu-AI/
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── complaints/page.tsx   # Master Complaints Ledger
│   │   │   └── page.tsx              # Admin Analytics & Triage Desk
│   │   ├── api/
│   │   │   ├── ai/analyze/route.ts   # Server-side Gemini AI analysis endpoint
│   │   │   ├── complaints/
│   │   │   │   ├── [id]/route.ts     # Complaint detail & PATCH status endpoint
│   │   │   │   └── route.ts          # GET/POST complaints endpoint
│   │   │   └── seed/route.ts         # 1-Click 8 Indian civic complaints seed endpoint
│   │   ├── complaints/
│   │   │   ├── [id]/page.tsx         # Citizen single complaint tracker & visual stepper
│   │   │   └── page.tsx              # Public complaints search directory
│   │   ├── dashboard/page.tsx        # Citizen personal dashboard
│   │   ├── report/page.tsx           # Citizen report form + Gemini live analysis preview
│   │   ├── globals.css               # Civic styling & animations
│   │   ├── layout.tsx                # App layout with Navbar & Footer
│   │   └── page.tsx                  # Landing page with stats, workflow & live feed
│   ├── components/
│   │   ├── Footer.tsx                # Civic footer with emergency helplines
│   │   ├── Navbar.tsx                # Top navigation & role indicators
│   │   ├── StatusBadge.tsx           # Priority, Status, and Category badge components
│   │   ├── StatusTracker.tsx         # Visual 4-stage stepper
│   │   └── TryDemoPresets.tsx        # 1-click sample complaint presets
│   ├── lib/
│   │   ├── complaintsStore.ts        # Unified database repository (Firestore + fallback)
│   │   ├── demoData.ts               # 8 realistic Indian civic complaints & presets
│   │   ├── firebase.ts               # Firebase Firestore client setup
│   │   └── gemini.ts                 # Gemini AI triage & heuristic engine
│   └── types/
│       └── complaint.ts              # TypeScript interfaces for complaints & AI schema
├── .env.example                      # Environment variables template
├── next.config.mjs                   # Next.js configuration
├── package.json                      # Project dependencies & scripts
├── tailwind.config.ts                # Tailwind civic theme configuration
└── tsconfig.json                     # TypeScript compiler configuration
```

---

## ⚙️ Environment Variables

Create `.env.local` based on `.env.example`:

```env
# 1. Google Gemini AI API Key (Get free key at: https://aistudio.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key_here

# 2. Firebase Configuration (Optional: application works out of the box with zero-config fallback)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> **Security Note**: `GEMINI_API_KEY` is kept exclusively on the server side (`src/app/api/ai/analyze/route.ts`) and is never leaked to the client browser.

---

## 🏃 Running Locally

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   Visit [http://localhost:3000](http://localhost:3000)

4. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

## 🎯 2-3 Minute Hackathon Demo Script

1. **Homepage (`/`)**:
   - Showcase the problem statement: *"Report. Understand. Resolve."*
   - Point out real-time KPI metrics and the 3-step citizen workflow.
2. **Report Page (`/report`)**:
   - Click one of the **1-Click Try Demo Scenarios** (e.g. *"Deep Pothole outside College Gate"*).
   - Click **"Analyze Complaint with Gemini AI"**.
   - Watch the animated triage steps.
   - Show the structured AI preview: Category: `ROADS`, Priority: `HIGH`, Department: `Municipal Roads & Infrastructure Department`, and actionable recommended steps.
   - Click **"Confirm & Submit Complaint"**.
   - Receive the unique Grievance Reference ID (e.g., `JS-2026-XXXX`).
3. **Citizen Tracking (`/complaints/[id]`)**:
   - Show the 4-stage visual tracker: `Reported ➔ Assigned ➔ In Progress ➔ Resolved`.
   - Inspect the location details and AI analysis card.
4. **Admin Portal (`/admin`)**:
   - Switch to the Municipal Admin Portal.
   - Notice the newly submitted complaint appearing at the top of the queue.
   - Change its status from `REPORTED` ➔ `IN_PROGRESS`.
   - Return to the citizen tracking page or dashboard to see the live status change reflected immediately!

---

## 🚢 Deploying to Vercel

1. Push this repository to GitHub.
2. In [Vercel Dashboard](https://vercel.com), click **Add New Project** and select this repo.
3. In **Environment Variables**, add:
   - `GEMINI_API_KEY`
   - (Optional) Firebase configuration keys.
4. Click **Deploy**. Vercel will build and serve the application globally with automatic SSL.
