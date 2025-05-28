export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    const backgrounds = ['Blue', 'Brown', 'Gray', 'Green', 'Pink', 'Purple', 'Yellow'];
    backgrounds.forEach(name => {
      this.load.image(`bg-${name.toLowerCase()}`, `assets/Background/${name}.png`);
    });

    this.load.image('tiles', 'assets/Terrain/Terrain (16x16).png');

    const fruits = ['Apple','Bananas','Cherries','Kiwi','Melon','Orange','Pineapple','Strawberry'];
    fruits.forEach(f => this.load.image(`fruit-${f.toLowerCase()}`, `assets/Items/Fruits/${f}.png`));

    this.load.image('checkpoint-idle', 'assets/Items/Checkpoints/Checkpoint/Checkpoint (Flag Idle)(64x64).png');
    this.load.image('checkpoint-out', 'assets/Items/Checkpoints/Checkpoint/Checkpoint (Flag Out) (64x64).png');
    this.load.image('checkpoint-none', 'assets/Items/Checkpoints/Checkpoint/Checkpoint (No Flag).png');
    this.load.image('start-flag', 'assets/Items/Checkpoints/Start/Start (Idle).png');
    this.load.image('end-flag', 'assets/Items/Checkpoints/End/End (Idle).png');

    this.load.spritesheet('enemies', 'assets/20 Enemies.png', { frameWidth: 32, frameHeight: 32 });

    const heroes = ['Mask Dude','Ninja Frog','Pink Man','Virtual Guy'];
    const anims = ['Idle','Run','Jump','Fall','Wall Jump','Double Jump','Hit'];
    heroes.forEach(hero => {
      anims.forEach(anim => {
        const key = `${hero}-${anim}`;
        const file = `assets/Main Characters/${hero}/${anim} (32x32).png`;
        this.load.spritesheet(key, file, { frameWidth: 32, frameHeight: 32 });
      });
    });

    this.load.image('spikes', 'assets/Traps/Spikes/Idle.png');
    this.load.spritesheet('saw', 'assets/Traps/Saw/On (38x38).png', { frameWidth: 38, frameHeight: 38 });

    this.load.image('shadow', 'assets/Other/Shadow.png');
    this.load.image('dust', 'assets/Other/Dust Particle.png');
    this.load.image('confetti', 'assets/Other/Confetti (16x16).png');
    this.load.image('transition', 'assets/Other/Transition.png');

    const buttons = ['Play', 'Next', 'Previous', 'Back'];
    buttons.forEach(btn => {
      this.load.image(`btn-${btn.toLowerCase()}`, `assets/Menu/Buttons/${btn}.png`);
    });
  }

  create() {
    this.scene.start('MenuScene');
  }
}
