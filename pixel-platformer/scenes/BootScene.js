export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Backgrounds
    this.load.image('bg-blue', 'assets/Background/Blue.png');
    this.load.image('bg-green', 'assets/Background/Green.png');

    // Tileset
    this.load.image('tiles', 'assets/Terrain/Terrain (16x16).png');

    // Fruits
    this.load.image('fruit-apple', 'assets/Items/Fruits/Apple.png');
    this.load.image('fruit-bananas', 'assets/Items/Fruits/Bananas.png');

    // Checkpoints
    this.load.spritesheet('checkpoint', 'assets/Items/Checkpoints/Checkpoint (64x64).png', {
      frameWidth: 64,
      frameHeight: 64
    });

    // Enemies (sprite sheet with all enemies)
    this.load.spritesheet('enemies', 'assets/Enemies/Enemies.png', {
      frameWidth: 32,
      frameHeight: 32
    });

    // Player characters
    const heroes = ['Mask Dude', 'Ninja Frog', 'Pink Man', 'Virtual Guy'];
    const anims = ['Idle', 'Run', 'Jump', 'Fall', 'Wall Jump', 'Double Jump', 'Hit'];
    heroes.forEach(hero => {
      anims.forEach(anim => {
        const key = `${hero}-${anim}`;
        const file = `assets/Main Characters/${hero}/${anim} (32x32).png`;
        this.load.spritesheet(key, file, { frameWidth: 32, frameHeight: 32 });
      });
    });

    // Traps
    this.load.image('spike', 'assets/Traps/Spikes/Idle.png');
    this.load.spritesheet('saw', 'assets/Traps/Saw/On (38x38).png', {
      frameWidth: 38,
      frameHeight: 38
    });

    // Other effects
    this.load.image('shadow', 'assets/Other/Shadow.png');
    this.load.image('dust', 'assets/Other/Dust Particle.png');

    // Menu buttons
    this.load.image('btn-play', 'assets/Menu/Buttons/Play.png');
    this.load.image('btn-hero', 'assets/Menu/Buttons/HeroButton.png');

    // Transition
    this.load.image('transition', 'assets/Other/Transition.png');
  }

  create() {
    this.scene.start('MenuScene');
  }
}
