# Changelog

All notable changes to this project will be documented in this file. The format is loosely based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project aims to follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html) once it reaches a playable `v1.0.0`.

## [Unreleased]

### Added

- Project scaffolded with Vite + TypeScript (strict) + Phaser 3, targeting 720×1280 logical resolution with `Scale.FIT` for universal device support.
- `TitleScene`: synthwave grid background, glowing title, drifting neon shapes, and a pulsing tap-to-start prompt — all drawn with Phaser primitives + post-FX.
- Progressive Web App: `vite-plugin-pwa` service worker with `autoUpdate`, full manifest, and a single-source-of-truth SVG icon that generates the entire icon set (favicon, PWA icons, maskable icon, iOS apple-touch-icon).
- iOS home-screen install support: `apple-mobile-web-app-capable`, `black-translucent` status bar, custom short name.
- ESLint (flat config, type-checked rules) + Prettier + Vitest + v8 coverage.
- `npm run check` unified gate (typecheck + lint + format:check + test).
- GitHub Actions: `ci.yml` for pushes/PRs, `deploy.yml` for publishing to GitHub Pages with repo-name-derived base URL.

[Unreleased]: https://github.com/hitechrv/padic-mealy-machine/commits/main
