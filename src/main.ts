import Phaser from 'phaser';

/**
 * Logical resolution the game is designed against. Phaser's Scale.FIT mode
 * letterboxes this to fit any device, so gameplay code can assume these
 * dimensions regardless of the physical screen.
 */
export const GAME_WIDTH = 720;
export const GAME_HEIGHT = 1280;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0b0014',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  physics: {
    default: 'arcade',
    arcade: { debug: false },
  },
  render: {
    antialias: true,
    pixelArt: false,
  },
  scene: [
    // Scenes will be registered here as we build them.
  ],
};

new Phaser.Game(config);
