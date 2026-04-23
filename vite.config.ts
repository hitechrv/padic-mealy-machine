import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

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
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.ico',
        'apple-touch-icon-180x180.png',
        'icon.svg',
      ],
      manifest: {
        name: 'Neon Survivors',
        short_name: 'Neon',
        description: 'An auto-shooter roguelite with a neon-geometric aesthetic.',
        theme_color: '#0b0014',
        background_color: '#0b0014',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '.',
        scope: '.',
        icons: [
          {
            src: 'pwa-64x64.png',
            sizes: '64x64',
            type: 'image/png',
          },
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'maskable-icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        // Phaser's bundle is large; bump the precache limit so it actually caches.
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff2}'],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
}));
