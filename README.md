<div style="font-family: 'Times New Roman', Times, serif;">

# Ken Zhang's Portfolio

React 19 + Vite 8 portfolio for physics, engineering, robotics, research, and service work. Project case studies include original evidence, interactive analyses, and downloadable research material. Cloudflare Workers serves the production build with single-page application routing.

## Quick Start

Use Node.js 22.13 or newer in the Node 22 release line, with npm. CI also uses Node 22.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`. The Astragalus case study is at `/projects/fermented-astragalus-feed`.

## Folder Layout

- `src/pages/` - route pages and lazy-loaded project sections.
- `src/components/` - shared UI, scenes, galleries, and project analyses.
- `src/data/` - portfolio content, project datasets, and image dimensions.
- `src/assets/project-media/` - published project images grouped by project.
- `src/assets/documents/` - published downloads grouped by project.
- `public/` - static files such as favicons and hero media.
- `scripts/` - image optimization and dimension-generation tools.
- `docs/` - durable design documentation.
- `.github/workflows/` - lint, build, and deployment-validation CI.
- `archive/` - original sources, references, and retired work; index only.
- `output/playwright/` - current browser QA captures; ignored and grouped by task.
- `tmp/`, `.playwright-cli/`, `.wrangler/` - temporary tool state; ignored.
- `dist/`, `node_modules/` - build output and installed dependencies; ignored.

Published Astragalus media is in `src/assets/project-media/astragalus/`; its downloadable slide deck is in `src/assets/documents/astragalus/`. Original sources remain in `archive/source-media/astragalus-project/`.

## Scripts

```sh
npm run dev
npm run build
npm run lint
npm run preview
npm run deploy -- --dry-run
```

Cloudflare publishes the generated `dist/` directory using the pinned Wrangler
version and `wrangler.jsonc`. The deployment dry run validates that configuration
without uploading anything.

The image tools use Pillow in an isolated Python environment:

```sh
python3 -m venv .venv
.venv/bin/pip install -r scripts/requirements.txt
.venv/bin/python scripts/generate-image-dimensions.py
```

Run `scripts/optimize-images.py` without flags for a dry run; add `--apply` only after reviewing its proposed conversions. Regenerate `src/data/imageDimensions.js` after changing image assets; do not edit that generated file by hand.

## Validation and Deployment

```sh
npm run lint
npm run build
npm run deploy -- --dry-run
npm run preview
```

Cloudflare publishes `dist/` using `wrangler.jsonc`. The dry run validates deployment without uploading. GitHub Actions repeats lint, build, and the dry run on pull requests and pushes to `main`.

There is no automated browser-test npm script. Check changed pages at desktop and mobile widths, including navigation, image viewers, and downloads. Keep screenshots under `output/playwright/<project-or-task>/`.

## Git Hygiene

Environment files, Cloudflare state, archives, caches, build output, and QA output are ignored. Example files such as `.env.example` remain eligible for tracking; never put credentials in them.

```sh
git status --short
git diff --check
git diff
git add -p
git diff --cached --stat
```

`git add -p` does not include untracked files. Explicitly add new application components, assets, downloads, or documentation after reviewing `git status`.

</div>
