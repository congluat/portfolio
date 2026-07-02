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

1. Push this project to the `main` branch of [congluat/portfolio](https://github.com/congluat/portfolio)
2. Enable GitHub Pages
3. Go to **Settings → Pages → Build and deployment**
4. Set **Source** to **GitHub Actions**
5. Push to `main` — the workflow in `.github/workflows/deploy.yml` will build and deploy automatically

## Tech stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/) + TypeScript
- [Framer Motion](https://www.framer.com/motion/) — animations
- [Tailwind CSS](https://tailwindcss.com/) — styling
- [React Icons](https://react-icons.github.io/react-icons/)

## License

MIT
