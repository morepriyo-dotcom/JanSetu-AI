# GEMINI.md — Google Cloud & Antigravity Project Instructions

## Project Context: JanSetu AI (जनसेतु)
- **Initiative**: GCD-2 / Code for Communities 2.0 (Google "Build with AI" Hackathon).
- **Domain**: Digital Public Good (DPG) for Indian Civic Grievance Triage.
- **Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS, Google Gemini 1.5 Flash, Firebase Firestore & Storage.

---

## Antigravity Agent Guidelines

1. **Verify Before Declaring Complete**:
   - Always run `npm run lint` and `npm run build` after making modifications.
   - Zero tolerance for build regressions or unhandled TypeScript errors.

2. **Vercel & Cloud Deployment Readiness**:
   - Respect `.vercelignore` to keep backend cloud configs separate.
   - Use standard `"build": "next build"` in `package.json`.
   - Ensure all API routes reading dynamic parameters specify `export const dynamic = "force-dynamic"`.

3. **Autonomous Task Execution (Ralph Loop Mode)**:
   - When given multi-step requests, follow the Ralph Loop: Scope task ➔ Code ➔ Test (`npm run build`) ➔ Git commit ➔ Reset.

4. **Integration with Roo Code & CodeRabbit**:
   - Maintain compatibility with `AGENTS.md` and `.coderabbit.yaml`.
   - Never add dependencies without running lockfile reconciliation (`npm install`).
