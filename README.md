# Nguyen Luat — Portfolio

Personal profile website showcasing professional experience, skills, and contact information. Built with React, Framer Motion, and Tailwind CSS.

**Live demo:** after deploy → `https://congluat.github.io/portfolio/`

## Features

- Animated preloader and particle background
- Scroll-triggered reveals and timeline animations
- Cursor glow effect (desktop)
- Fully responsive — mobile & desktop
- GitHub Pages ready via GitHub Actions

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

Push to `main` — GitHub Actions builds and commits the production files (`index.html`, `assets/`, `logos/`) to the repo root. GitHub Pages serves from **main / (root)** automatically.

Site: **https://congluat.github.io/portfolio/**

Local dev uses `index.dev.html` — run `npm run dev` (auto-restores dev `index.html`).

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [React Icons](https://react-icons.github.io/react-icons/)

## License

MIT
