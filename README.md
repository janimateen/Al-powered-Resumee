# Job‑Craft (scaffold)

This repo contains a minimal scaffold for the Job‑Craft project: a simple Express server (`/server`) with an ATS scoring endpoint and a minimal React client (`/client`) to test the resume editor and ATS score flow.

Quick start (two terminals):

Server
```bash
cd server
npm install
# set HF_API_KEY in .env if you plan to call Hugging Face
npm run dev
```

Client
```bash
cd client
npm install
npm run dev
```

Then open the client at the URL printed by Vite (usually `http://localhost:5173`) and the server at `http://localhost:4000`.

Files of interest:
- `server/src/routes/ats.js` — ATS scoring endpoint used by the client.
- `client/src/pages/ResumeEditor.jsx` — UI to paste resume and job description and request scoring.
- `docs/prompt.md` — original product prompt and vision.

Persistence:
- The scaffold uses a small file-based store at `server/data/store.json` for resumes. This is for development only; we can replace it with SQLite/Postgres + Prisma on request.

Hugging Face:
- Optional: provide `HF_API_KEY` in `server/.env` and optionally `HF_MODEL` (default: `gpt2`) to enable model-based keyword extraction. The server will fall back to a heuristic extractor if HF calls fail or no key is provided.
# Al-powered-Resumee