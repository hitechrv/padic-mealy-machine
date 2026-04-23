import {
  defineConfig,
  minimal2023Preset as preset,
} from '@vite-pwa/assets-generator/config';

/**
 * Regenerates icons, apple-touch-icons, and maskable icons from `public/icon.svg`
 * into `public/`. Run with: `npm run generate:pwa-assets`.
 *
 * The generated files are committed to the repo so deploys don't depend on the
 * generator running in CI.
 */
export default defineConfig({
  preset,
  images: ['public/icon.svg'],
});
