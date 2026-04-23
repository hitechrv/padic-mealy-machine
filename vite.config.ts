import { defineConfig } from 'vite';

/**
 * GitHub Pages serves this repo at /<repo-name>/. Vite's `base` must match so
 * that asset URLs resolve correctly in production. Override with BASE_URL env
 * var (e.g. when deploying to a custom domain where the site lives at `/`).
 */
const BASE = process.env['BASE_URL'] ?? '/padic-mealy-machine/';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? BASE : '/',
  build: {
    target: 'es2022',
    sourcemap: true,
    // Phaser alone is ~1.4MB unminified; the default 500KB warning is noise here.
    chunkSizeWarningLimit: 1500,
  },
  server: {
    host: true, // expose on LAN so we can test on iPhone over Wi-Fi
    port: 5173,
  },
}));
