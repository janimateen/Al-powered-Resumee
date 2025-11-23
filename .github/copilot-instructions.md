<!-- Auto-generated guidance for AI coding agents. Please ask clarifying questions before making large changes. -->
# Copilot instructions for this repository

This repository is very small and currently contains only `README.md`. Use the notes below to be immediately productive and to avoid making incorrect assumptions.

- **Repository snapshot:** `Al-powered-Resumee` (owner: `janimateen`, branch: `main`). Only `README.md` presently exists.
- **Primary action rule:** If you cannot find files or explicit build/test commands, ask the human before creating large scaffolding (build systems, CI, or heavy refactors).

**Discovery & scope**
- Start by listing top-level files and folders. Reference `README.md` as the canonical project description when present.
- If adding source code, default locations to `src/` (for JS/TS/Python) and add a minimal `README` or `CONTRIBUTING` note explaining how to run locally.

**When editing files**
- Preserve existing styles and minimal diffs. Only add files when they are required to implement a requested feature.
- Before introducing a new dependency or framework, request approval and provide alternative lightweight approaches (single-file implementation, standard library first).

**Build / test / run guidance (repo-specific)**
- No build/test files detected. Do NOT assume package manager or language. Ask which language/runtime to use before adding `package.json`, `pyproject.toml`, etc.

**Conventions & patterns to follow in this repo**
- Keep changes small and easily reversible on `main`. For any new feature, propose a branch name and short PR summary.
- Add or update `README.md` with exact copyable commands required to run or test any new code you add.

**Commit & PR behavior**
- Use descriptive commit messages: one-line summary, optional 1–2 line body. Example: `feat: add basic resume parser + README instructions`.
- When creating a PR, include: short description, how to run locally, and any behaviour changes.

**If you need to scaffold developer tooling**
- Propose the minimal set of files (e.g., `package.json` with only `start`/`test` scripts or `requirements.txt`) and ask for confirmation.

**Safety & verification**
- Do not run network calls or add secrets. If external integrations are required (APIs, cloud), ask for credentials and explicit approval.

**When you are uncertain**
- Ask these clarifying questions before editing:
  - Which language/runtime should be used?
  - Are you okay with adding a package manager manifest (`package.json`, `pyproject.toml`, etc.)?
  - Is there an existing CI or test runner to integrate with?

If this file should be merged with existing agent guidance, preserve any human-written sections and append updates under a clearly labeled "AI-updated" subsection.

---
After you review this draft, tell me which project-specific commands or files you expect (build/test/runtime) and I will update these instructions with concrete examples from your stack.
