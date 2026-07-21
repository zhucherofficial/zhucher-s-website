# Personal Portfolio Website

React + Vite portfolio site for physics, engineering, robotics, research, and service work.

## Project Layout

- `src/` - application source code.
- `src/assets/` - imported images and SVGs used by React components.
- `public/` - static files served directly by Vite, including hero media.
- `docs/` - design and implementation notes.
- `archive/` - local-only original media, examples, generated files, and retired code.
- `dist/` - generated production build output.
- `node_modules/` - installed dependencies.

Only the active website, project documentation, and `archive/README.md` are tracked. The rest of `archive/` stays local so large source files and reference projects are not accidentally pushed to GitHub.

## Scripts

```sh
npm run dev
npm run build
npm run lint
npm run preview
```

## GitHub Workflow

```sh
git status
git add -A
git commit -m "Update portfolio website"
git push origin main
```

Run `npm run lint` and `npm run build` before committing. Files inside `archive/` are intentionally excluded from GitHub.
