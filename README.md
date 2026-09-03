# Nguyen Luat — Fraud Ops Console

Personal portfolio built as a fraud-operations monitoring console: career history reads as a
deployment log, skills as a capability matrix, and the whole surface uses signal colours,
hairline panels and monospace telemetry.

**Live:** https://congluat.github.io/portfolio/

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Framer Motion](https://www.framer.com/motion/) — boot sequence, log expansion, meters, sparklines
- [Tailwind CSS](https://tailwindcss.com/) — console design tokens in `tailwind.config.js`

## Local development

```bash
npm install
npm run dev
```

Opens on [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

This compiles to `dist/` and mirrors the output into the repo root (`index.html`, `assets/`,
`logos/`), which is what GitHub Pages serves.

## Deployment

Push to `main`. The workflow in `.github/workflows/deploy.yml` builds and commits the refreshed
production files back to the root of `main`, so no Pages configuration change is needed.

> Vite's HTML entry is `index.dev.html` rather than `index.html`, so the source entry and the
> deployed artifact can coexist in the repo root. `npm run dev` syncs the dev entry into
> `index.html`; `npm run build` restores the production one.

## Editing content

All profile content lives in a single file: `src/data/profile.ts`.

## License

MIT
