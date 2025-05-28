export default class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bg-blue');

    const playBtn = this.add.image(width / 2, height / 2 + 40, 'btn-play').setInteractive();
    playBtn.on('pointerup', () => {
      this.scene.start('GameScene', { hero: this.selectedHero || 'Mask Dude' });
    });

    this.selectedHero = 'Mask Dude';
    const heroes = ['Mask Dude', 'Ninja Frog', 'Pink Man', 'Virtual Guy'];
    heroes.forEach((hero, index) => {
      const x = width / 2 - 90 + index * 60;
      const img = this.add.image(x, height / 2 - 40, `${hero}-Idle`, 0).setInteractive();
      img.on('pointerup', () => {
        this.selectedHero = hero;
      });
    });
  }
}
