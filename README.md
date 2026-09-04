# Nguyen Luat — Portfolio

Personal portfolio that ships **five interchangeable UI styles** over one shared content
source. Switching style changes the layout, typography and motion language completely — the
content never moves.

**Live:** https://congluat.github.io/portfolio/

## Switching the UI style

Set one flag in `src/config.ts`:

```ts
export const UI_STYLE: UiStyle = 'console'
```

| Value | Style |
| --- | --- |
| `console` | Fraud-operations monitoring console — dark, hairline panels, career as a deployment log |
| `editorial` | Swiss / brutalist print — warm paper, oversized type, one accent colour |
| `bento` | Apple-style bento grid — soft light tiles, spring motion, 3D tilt |
| `blueprint` | Technical drawing — career as a service dependency diagram |
| `ide` | Code editor workspace — file tree, tabs, command palette |

Each value maps to a folder under `src/ui/` that owns its own components. Styles are lazy-loaded
as separate chunks, so only the selected one is downloaded. `src/main.tsx` writes the value to
`data-ui` on `<html>` before the first paint, and `src/index.css` uses that attribute to set the
page canvas per style.

To add a style: create `src/ui/<name>/index.tsx` with a default-exported component, add the name
to the `UiStyle` union, register it in the `STYLES` map in `src/App.tsx`, add its colour tokens
to `tailwind.config.js`, and add its `html[data-ui='<name>'] body` rule to `src/index.css`.

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

All profile content lives in a single file: `src/data/profile.ts`, shared by every UI style.

## Project layout

```
src/
  config.ts          UI_STYLE flag
  data/profile.ts    all content
  components/        style-agnostic helpers (CountUp, Sparkline, ScrambleText, CompanyLogo)
  ui/console/        one folder per UI style, each with a default-exported root component
  ui/editorial/
  ui/bento/
  ui/blueprint/
  ui/ide/
```

## License

MIT
