import Phaser from 'phaser';
import { GAME_WIDTH, GAME_HEIGHT } from '../main';
import { Palette, Fonts, hex } from '../theme';

/**
 * First-impression screen. Synthwave grid background, glowing title,
 * floating geometric particles, and a "tap to start" prompt.
 *
 * Everything is drawn with Phaser primitives and post-FX — no sprite
 * assets required — so the title is fully functional before any art
 * pipeline exists.
 */
export class TitleScene extends Phaser.Scene {
  static readonly KEY = 'TitleScene';

  constructor() {
    super(TitleScene.KEY);
  }

  create(): void {
    this.drawGridBackground();
    this.spawnFloatingShapes();
    this.drawTitle();
    this.drawTapPrompt();
    this.drawVersionBadge();

    // Accept any tap, click, or keypress as "start". For now, we just flash
    // the screen — the actual GameScene arrives in a future commit.
    this.input.once('pointerdown', () => this.flashAndLog());
    this.input.keyboard?.once('keydown', () => this.flashAndLog());
  }

  /**
   * Synthwave perspective grid: horizontal lines receding to a vanishing point,
   * vertical lines fanning out. Purely decorative — just `Graphics`, no tiles.
   */
  private drawGridBackground(): void {
    const g = this.add.graphics();
    const horizon = GAME_HEIGHT * 0.55;

    g.fillStyle(Palette.background, 1);
    g.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    g.lineStyle(2, Palette.gridGlow, 0.6);

    // Horizontal lines, spaced exponentially to fake perspective.
    const rows = 14;
    for (let i = 1; i <= rows; i++) {
      const t = i / rows;
      const y = horizon + Math.pow(t, 2) * (GAME_HEIGHT - horizon);
      g.beginPath();
      g.moveTo(0, y);
      g.lineTo(GAME_WIDTH, y);
      g.strokePath();
    }

    // Vertical lines converging at (centre, horizon).
    const cols = 16;
    const cx = GAME_WIDTH / 2;
    for (let i = -cols; i <= cols; i++) {
      const x = cx + (i / cols) * GAME_WIDTH * 1.2;
      g.beginPath();
      g.moveTo(x, GAME_HEIGHT);
      g.lineTo(cx, horizon);
      g.strokePath();
    }

    // Horizon glow line.
    g.lineStyle(3, Palette.magenta, 0.9);
    g.beginPath();
    g.moveTo(0, horizon);
    g.lineTo(GAME_WIDTH, horizon);
    g.strokePath();

    g.postFX?.addBloom(Palette.magenta, 1, 1, 1, 1.2);
  }

  /** Slow-drifting neon shapes for depth. */
  private spawnFloatingShapes(): void {
    const shapeCount = 12;
    const colors = [Palette.magenta, Palette.cyan, Palette.yellow];

    for (let i = 0; i < shapeCount; i++) {
      const color = colors[i % colors.length];
      const x = Phaser.Math.Between(40, GAME_WIDTH - 40);
      const y = Phaser.Math.Between(40, GAME_HEIGHT * 0.5);
      const size = Phaser.Math.Between(10, 24);
      const rotation = Phaser.Math.FloatBetween(0, Math.PI * 2);

      const shape =
        i % 3 === 0
          ? this.add.triangle(x, y, 0, size, size, size, size / 2, 0, color)
          : i % 3 === 1
            ? this.add.rectangle(x, y, size, size, color)
            : this.add.circle(x, y, size / 2, color);

      shape.setRotation(rotation);
      shape.setAlpha(0.7);
      shape.postFX?.addGlow(color, 3, 0, false, 0.1, 8);

      this.tweens.add({
        targets: shape,
        y: y + Phaser.Math.Between(20, 60),
        rotation: rotation + Math.PI * 2,
        duration: Phaser.Math.Between(4000, 8000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.InOut',
      });
    }
  }

  private drawTitle(): void {
    const cx = GAME_WIDTH / 2;
    const cy = GAME_HEIGHT * 0.3;

    const title = this.add
      .text(cx, cy, 'NEON\nSURVIVORS', {
        fontFamily: Fonts.display,
        fontSize: '112px',
        fontStyle: 'bold',
        color: hex(Palette.white),
        align: 'center',
        stroke: hex(Palette.magenta),
        strokeThickness: 4,
      })
      .setOrigin(0.5)
      .setLineSpacing(-10);

    title.postFX?.addGlow(Palette.magenta, 8, 0, false, 0.1, 16);

    // Gentle breathing effect.
    this.tweens.add({
      targets: title,
      scale: { from: 1, to: 1.03 },
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.InOut',
    });

    // Subtitle underneath.
    const subtitle = this.add
      .text(cx, cy + 180, 'an auto-shooter roguelite', {
        fontFamily: Fonts.body,
        fontSize: '26px',
        fontStyle: 'italic',
        color: hex(Palette.cyan),
      })
      .setOrigin(0.5);
    subtitle.postFX?.addGlow(Palette.cyan, 4, 0, false, 0.1, 10);
  }

  private drawTapPrompt(): void {
    const prompt = this.add
      .text(GAME_WIDTH / 2, GAME_HEIGHT * 0.78, 'TAP TO START', {
        fontFamily: Fonts.display,
        fontSize: '40px',
        fontStyle: 'bold',
        color: hex(Palette.yellow),
        stroke: hex(Palette.yellow),
        strokeThickness: 1,
      })
      .setOrigin(0.5);

    prompt.postFX?.addGlow(Palette.yellow, 6, 0, false, 0.1, 12);

    this.tweens.add({
      targets: prompt,
      alpha: { from: 1, to: 0.35 },
      duration: 900,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.InOut',
    });
  }

  private drawVersionBadge(): void {
    const version = import.meta.env.DEV ? 'dev' : 'v0.1.0';
    this.add
      .text(GAME_WIDTH - 20, GAME_HEIGHT - 20, version, {
        fontFamily: Fonts.body,
        fontSize: '20px',
        color: hex(Palette.dim),
      })
      .setOrigin(1, 1);
  }

  /** Placeholder "start" action until GameScene exists. */
  private flashAndLog(): void {
    this.cameras.main.flash(200, 255, 43, 214);
    console.info('[TitleScene] start tapped — GameScene coming soon');
  }
}
