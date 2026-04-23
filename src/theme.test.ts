import { describe, it, expect } from 'vitest';
import { hex, Palette } from './theme';

describe('hex', () => {
  it('formats a 6-digit colour with leading zeros', () => {
    expect(hex(0x00e5ff)).toBe('#00e5ff');
  });

  it('formats black without truncation', () => {
    expect(hex(0x000000)).toBe('#000000');
  });

  it('formats the palette consistently', () => {
    expect(hex(Palette.magenta)).toBe('#ff2bd6');
    expect(hex(Palette.cyan)).toBe('#00e5ff');
  });
});
