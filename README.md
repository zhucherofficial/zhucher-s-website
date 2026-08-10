# Personal Portfolio Website

React + Vite portfolio site for physics, engineering, robotics, research, and service work.

## Project Layout

- `src/` - application source code.
- `src/assets/` - imported images and SVGs used by React components.
- `public/` - static files served directly by Vite, including hero media.
- `docs/` - durable design and implementation decisions.
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

## GitHub Workflow

```sh
git status --short
git add -u
git add .gitignore README.md archive/README.md docs/REDESIGN_BRIEF.md eslint.config.js index.html package.json package-lock.json vite.config.js public/ src/
git diff --cached --stat
git diff --cached
git commit -m "Update portfolio website"
git push origin main
```

Run `npm run lint` and `npm run build` before committing. Review the staged diff before the commit; files inside `archive/`, `.playwright-cli/`, and `.claude/` are intentionally excluded from GitHub.
