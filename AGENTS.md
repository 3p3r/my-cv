# Agent / developer guide

Personal CV ([RenderCV](https://docs.rendercv.com)) + [Resume-Matcher](https://github.com/srbhr/Resume-Matcher) for tailoring applications.

**Source of truth:** [`Sepehr_Laal_CV.yaml`](Sepehr_Laal_CV.yaml)

**Published resume:** [`README.md`](README.md) is generated from RenderCV on `npm run build` — do not edit it by hand.

**Live CV site:** [https://3p3r.github.io/my-cv/](https://3p3r.github.io/my-cv/) — HTML deployed via GitHub Actions on every push to `main`.

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

## GitHub Pages

The workflow [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml) renders the HTML and PDF outputs, publishes the site to GitHub Pages, and replaces the `nightly` PDF release.

- **URL:** https://3p3r.github.io/my-cv/
- **PDF:** https://github.com/3p3r/my-cv/releases/download/nightly/Sepehr_Laal_CV.pdf
- **Trigger:** every push to `main` (or manual run)
- **Download links:** the Pages site and generated `README.md` link to the stable nightly PDF URL
- **One-time setup:** repo **Settings → Pages → Build and deployment → Source: GitHub Actions**

Preview the same HTML locally:

```bash
npm run build:pages    # writes site/index.html
```

## Scripts

Orchestration is TypeScript via [zx](https://github.com/google/zx) and [tsx](https://github.com/privatenumber/tsx) — no shell scripts, no `tsc` step.

| Command | Script |
|---------|--------|
| `npm run setup` | `scripts/setup.ts` |
| `npm run build` | `scripts/build.ts` |
| `npm run build:pages` | `scripts/build-pages.ts` — HTML for GitHub Pages preview |
| `npm run seed` | `scripts/seed-master-resume.ts` |
| `npm start` | `scripts/start.ts` |
| `npm run stop` | `scripts/stop.ts` |
| `npm run test:llm` | `scripts/test-llm.ts` — verify `http://deezr:4000/v1` |

## Edit the CV

Edit [`Sepehr_Laal_CV.yaml`](Sepehr_Laal_CV.yaml), then `npm run build` or `npm start`. The seed script detects YAML changes and re-uploads the master resume automatically.
