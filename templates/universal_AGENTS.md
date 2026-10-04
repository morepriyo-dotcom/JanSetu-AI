# AGENTS.md — Universal Agentic Protocol & Standards

> This configuration file governs **Antigravity**, **Roo Code**, and all autonomous AI coding agents working on this project.

---

## 1. 🤖 Multi-Agent Ecosystem Roles

| Agent / Tool | Primary Responsibility | Best Practice Workflow |
|---|---|---|
| **Antigravity** | Lead Architect, Refactoring, Terminal Operations, Deployment & Vercel CI/CD | Full-stack debugging, multi-file refactoring, build error resolution. |
| **Roo Code** | Interactive Pair Programmer (VS Code), Inline Code & Component Construction | Fast UI iterations, single-component tweaks, rapid local prototyping. |
| **Ralph Loop** | Autonomous Iterative Execution Engine | Reads `TODO.md`, executes one atomic task per loop, tests, commits, and resets context. |
| **CodeRabbit** | Autonomous PR Code Reviewer & Quality Gate | Reviews all Pull Requests, detects regressions, ensures security and adherence to guidelines. |
| **GCD-2 (Google Cloud Dev)** | Project Theme & Digital Public Good Guidelines | Code for Communities 2.0 evaluation criteria, multimodal Gemini AI, resilience. |

---

## 2. 🔁 Ralph Loop Execution Protocol

To avoid **context rot** during long development sessions, agents must adhere to the Ralph Loop protocol:

1. **Atomic Task Scoping**:
   - Never attempt to solve multiple unrelated features in one prompt.
   - Pick exactly **one** task from `TODO.md` or the user request.
2. **Implementation with Type Safety**:
   - Write strict TypeScript code with zero `any` types where possible.
   - Follow existing patterns in the codebase (`src/app/`, `src/components/`, `src/lib/`).
3. **Mandatory Automated Verification**:
   - Before completing any task, execute:
     ```bash
     npm run lint
     npm run build
     ```
   - If linting or building produces warnings or errors, resolve them immediately.
4. **Git Commit & Context Reset**:
   - Commit verified changes with conventional commit messages:
     ```bash
     git add -A
     git commit -m "feat(scope): descriptive summary of verified work"
     ```
   - Conclude turn so the next iteration starts with a clean slate.

---

## 3. 🐇 CodeRabbit PR Review Guidelines

CodeRabbit acts as the automated reviewer for this repository. Code must satisfy:

- **Zero Lint / Compiler Errors**: No unescaped entities in JSX (`&quot;`, `&apos;`).
- **Dynamic Routing Hygiene**: Server routes reading request URL/parameters must export `export const dynamic = "force-dynamic"`.
- **Next.js 15 Compatibility**: Async route `params` must be awaited (`const { id } = await params;`).
- **Dependency Cleanliness**: No unused cloud runtime SDKs (e.g. `firebase-functions`) in frontend client packages.
- **Image Optimization**: Use Next.js `<Image />` or provide explicit ESLint overrides for user-uploaded previews.

---

## 4. ☁️ GCD-2 (Code for Communities) Architecture Rules

- **AI Core**: Use Google Gemini API (`@google/generative-ai` with `gemini-1.5-flash`). Enforce strict JSON output with schema validation.
- **Resilient Fallback**: Always maintain zero-crash heuristic fallbacks so the app operates even if API keys or networks fail.
- **Data Persistence**: Cloud Firestore + Firebase Storage in production, with seamless in-memory/localStorage fallback.
- **Accessibility**: Support multilingual interactions (voice & text) for inclusive digital governance.
