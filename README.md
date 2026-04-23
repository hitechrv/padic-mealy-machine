# Neon Survivors

> An auto-shooter roguelite PWA with a neon-geometric aesthetic. Built with TypeScript, Phaser 3, and Vite. Installs to your iPhone home screen like a native app.

[![CI](https://github.com/hitechrv/padic-mealy-machine/actions/workflows/ci.yml/badge.svg)](https://github.com/hitechrv/padic-mealy-machine/actions/workflows/ci.yml)
[![Deploy](https://github.com/hitechrv/padic-mealy-machine/actions/workflows/deploy.yml/badge.svg)](https://github.com/hitechrv/padic-mealy-machine/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**Play it:** https://hitechrv.github.io/padic-mealy-machine/

---

## Install to your iPhone in 10 seconds

1. Open the live URL above in **Safari** on your iPhone.
2. Tap the **Share** button → **Add to Home Screen** → **Add**.
3. Launch it from the new icon. It runs fullscreen, offline-capable, and feels like any native game.

Android Chrome shows an install prompt automatically. Desktop Chrome/Edge offer install via the address bar.

## Quick start

```bash
npm install
npm run dev            # http://localhost:5173
```

To test on a real iPhone over the local network, open the `Network:` URL that Vite prints after `npm run dev` on any device connected to the same Wi-Fi.

## Architecture

A lean, data-driven engine sitting on top of Phaser 3. Systems are deliberately small and composable — this repo is as much a study in clean game architecture as it is a game.

```
src/
├── main.ts              # Game config, scene registration, PWA hook
├── theme.ts             # Palette + fonts — single source of truth for the look
├── scenes/              # Top-level modes: Title → Menu → Game → GameOver
└── scenes/TitleScene.ts # Synthwave title, all drawn with Phaser primitives + post-FX
```

**Coming next** (each will land as its own commit):

- `ecs/` — a ~100-line entity/component store for hundreds of on-screen entities.
- `gameplay/` — data-driven weapons, enemies, upgrades, wave director.
- `ui/Joystick.ts` — virtual thumbstick for one-thumb touch play.
- `persistence/SaveStore.ts` — localStorage-backed meta-progression between runs.

## Tech stack

| Concern       | Choice                                                        | Why                                                |
| ------------- | ------------------------------------------------------------- | -------------------------------------------------- |
| Language      | TypeScript (strict)                                           | Correctness at refactor time; great IDE feedback   |
| Engine        | [Phaser 3](https://phaser.io)                                 | Battle-tested 2D engine; GPU post-FX for neon glow |
| Build         | [Vite](https://vitejs.dev)                                    | Sub-second HMR, ESM-native                         |
| PWA           | [vite-plugin-pwa](https://vite-pwa-org.netlify.app) + Workbox | Zero-config service worker, manifest, iOS icons    |
| Lint / Format | ESLint flat config + Prettier                                 | Agreed style, no bikeshedding                      |
| Test          | [Vitest](https://vitest.dev) + v8 coverage                    | Vite-native; instant startup                       |
| Deploy        | GitHub Actions → GitHub Pages                                 | Free, automatic on push, public URL                |

## Scripts

| Script                            | What it does                                              |
| --------------------------------- | --------------------------------------------------------- |
| `npm run dev`                     | Start Vite dev server with LAN access for iPhone testing  |
| `npm run build`                   | Production build → `dist/` with service worker            |
| `npm run preview`                 | Serve the production build locally                        |
| `npm run typecheck`               | `tsc --noEmit`                                            |
| `npm run lint`                    | ESLint across the project                                 |
| `npm run format` / `format:check` | Prettier write / verify                                   |
| `npm run test` / `test:watch`     | Vitest                                                    |
| `npm run check`                   | Run typecheck + lint + format:check + test (what CI runs) |
| `npm run generate:pwa-assets`     | Regenerate icons from `public/icon.svg`                   |

## First-time GitHub Pages setup

One-time manual step on a fresh repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**. After that, every push to `main` (or to the active feature branch) auto-deploys.

## Roadmap

- [x] Scaffold, strict TS, PWA, CI/CD, title screen
- [ ] ECS + virtual joystick + player movement
- [ ] First weapon, first enemy, collision, XP
- [ ] Level-up → choose-an-upgrade screen
- [ ] Run end → meta-currency → persistent meta-upgrades
- [ ] Juice pass: screen shake, hit flash, audio, particles
- [ ] Content expansion: more weapons, enemies, biomes, bosses

## License

[MIT](LICENSE) © hitechrv
