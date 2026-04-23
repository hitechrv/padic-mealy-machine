/**
 * Shared visual constants. Centralising the palette keeps the neon aesthetic
 * coherent as the codebase grows — scenes, entities, and UI all reach for the
 * same handful of colours.
 */
export const Palette = {
  background: 0x0b0014,
  backgroundCss: '#0b0014',
  grid: 0x1a0030,
  gridGlow: 0x3a0060,

  magenta: 0xff2bd6,
  cyan: 0x00e5ff,
  yellow: 0xffd300,
  green: 0x4bff9f,
  red: 0xff4b6b,

  white: 0xf0f0ff,
  dim: 0x8a7fb5,
} as const;

export const Fonts = {
  display:
    '"Orbitron", "Rajdhani", ui-sans-serif, system-ui, -apple-system, sans-serif',
  body: 'ui-sans-serif, system-ui, -apple-system, sans-serif',
} as const;

/** Convert a 0xRRGGBB integer to a "#rrggbb" string (for CSS / Phaser text). */
export function hex(color: number): string {
  return '#' + color.toString(16).padStart(6, '0');
}
