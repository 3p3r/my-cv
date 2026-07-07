# Agent / developer guide

Personal CV ([RenderCV](https://docs.rendercv.com)) + [Resume-Matcher](https://github.com/srbhr/Resume-Matcher) for tailoring applications.

**Source of truth:** [`Sepehr_Laal_CV.yaml`](Sepehr_Laal_CV.yaml)

**Published resume:** [`README.md`](README.md) is generated from RenderCV on `npm run build` — do not edit it by hand.

## Prerequisites

- Python 3.12+
- Node.js 20+
- git

## Setup

```bash
npm install
```

This runs `tsx scripts/setup.ts`, which:

- Creates `.venv` and installs Python dependencies (RenderCV 2.8 + Resume-Matcher backend)
- Installs Playwright Chromium (for matcher PDF export)
- Clones Resume-Matcher into `resume-matcher/` (gitignored)
- Installs the matcher frontend dependencies
- Syncs `.env.example` → `resume-matcher/apps/backend/.env` (defaults to local LLM at `http://deezr:4000/v1`)

LLM defaults to **openai_compatible** at `http://deezr:4000/v1` using model `smaller-qwens`. Edit `.env.example` to change defaults.

## Daily workflow

```bash
npm start
```

1. Renders `Sepehr_Laal_CV.yaml` → `rendercv_output/Sepehr_Laal_CV.pdf` and updates `README.md`
2. Starts the matcher backend on port 8000
3. Seeds your PDF as the **master resume** (re-uploads when YAML changes)
4. Starts the frontend at http://localhost:3000

```bash
npm run stop   # kill servers on ports 8000 and 3000
```

## CV only

```bash
npm run build    # render PDF/MD/HTML and sync README.md
npm run watch    # re-render on YAML changes (README.md updates on next full build)
```

Outputs:

- `rendercv_output/Sepehr_Laal_CV.pdf`
- `README.md` (markdown resume for GitHub)

## Scripts

Orchestration is TypeScript via [zx](https://github.com/google/zx) and [tsx](https://github.com/privatenumber/tsx) — no shell scripts, no `tsc` step.

| Command | Script |
|---------|--------|
| `npm run setup` | `scripts/setup.ts` |
| `npm run build` | `scripts/build.ts` |
| `npm run seed` | `scripts/seed-master-resume.ts` |
| `npm start` | `scripts/start.ts` |
| `npm run stop` | `scripts/stop.ts` |
| `npm run test:llm` | `scripts/test-llm.ts` — verify `http://deezr:4000/v1` |

## Edit the CV

Edit [`Sepehr_Laal_CV.yaml`](Sepehr_Laal_CV.yaml), then `npm run build` or `npm start`. The seed script detects YAML changes and re-uploads the master resume automatically.
