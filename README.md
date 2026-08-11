# Personal Portfolio Website

React + Vite portfolio site for physics, engineering, robotics, research, and service work.

## Project Layout

- `src/` - application source code.
- `src/assets/` - imported images and SVGs used by React components.
- `public/` - static files served directly by Vite, including hero media.
- `scripts/` - image optimization and intrinsic-dimension maintenance tools.
- `docs/` - durable design and implementation decisions.
- `.github/workflows/` - automated lint and production-build checks.
- `archive/` - local-only original media, examples, generated files, and retired code.
- `dist/` - generated production build output.
- `node_modules/` - installed dependencies.

Only the active website, durable project documentation, and `archive/README.md` are tracked. The rest of `archive/`, browser-QA output, local tool configuration, build output, and installed dependencies stay local so they are not accidentally pushed to GitHub.

## Scripts

```sh
npm run dev
npm run build
npm run lint
npm run preview
```

The image tools use Pillow in an isolated Python environment:

```sh
python3 -m venv .venv
.venv/bin/pip install -r scripts/requirements.txt
.venv/bin/python scripts/generate-image-dimensions.py
```

Run `scripts/optimize-images.py` without flags for a dry run; add `--apply` only after reviewing its proposed conversions.

## GitHub Workflow

```sh
npm run lint
npm run build
git status --short
git add -A -- .github .gitignore README.md archive/README.md docs eslint.config.js index.html package.json package-lock.json public scripts src vite.config.js
git diff --cached --stat
git diff --cached
git commit -m "Update portfolio website"
git push origin main
```

The explicit staging allowlist keeps local archives, browser-QA output, editor files, build output, and installed dependencies out of commits. Review the staged diff before committing. GitHub Actions repeats the lint and production-build checks on pull requests and pushes to `main`.
