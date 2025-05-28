export default class LevelScene extends Phaser.Scene {
  constructor() {
    super('LevelScene');
    this.fruitCount = 0;
  }

  init(data) {
    this.heroKey = data.hero || 'Mask Dude';
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bg-green');

    this.platforms = this.physics.add.staticGroup();
    this.platforms.create(width / 2, height - 8, 'tiles').setScale(32, 1).refreshBody();
    this.platforms.create(120, height - 60, 'tiles').setScale(4, 1).refreshBody();
    this.platforms.create(320, height - 100, 'tiles').setScale(4, 1).refreshBody();

    this.player = this.physics.add.sprite(50, height - 120, `${this.heroKey}-Idle`);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);
    this.createHeroAnims();

    this.fruits = this.physics.add.group();
    this.fruits.create(160, height - 120, 'fruit-apple');
    this.fruits.create(340, height - 160, 'fruit-bananas');
    this.physics.add.collider(this.fruits, this.platforms);
    this.physics.add.overlap(this.player, this.fruits, this.collectFruit, undefined, this);

    this.enemies = this.physics.add.group();
    const enemy = this.enemies.create(220, height - 140, 'enemies', 0);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.overlap(this.player, this.enemies, this.handleEnemy, undefined, this);

    this.traps = this.physics.add.staticGroup();
    this.traps.create(280, height - 16, 'spikes');
    this.physics.add.overlap(this.player, this.traps, this.playerDie, undefined, this);

    this.checkpoints = this.physics.add.staticGroup();
    const cp = this.checkpoints.create(470, height - 48, 'checkpoint-idle');
    this.physics.add.overlap(this.player, this.checkpoints, () => {
      this.lastCheckpoint = cp;
    });

    this.fruitText = this.add.text(8, 8, 'Fruits: 0', { fontSize: '16px', fill: '#fff' });
    this.fruitText.setScrollFactor(0);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D');
    this.jumpCount = 0;
  }

  createHeroAnims() {
    const hero = this.heroKey;
    const anims = ['Idle', 'Run', 'Jump', 'Fall', 'Double Jump'];
    anims.forEach(anim => {
      this.anims.create({
        key: `${anim}`,
        frames: this.anims.generateFrameNumbers(`${hero}-${anim}`, { start: 0, end: 9 }),
        frameRate: 20,
        repeat: anim === 'Idle' || anim === 'Run' ? -1 : 0
      });
    });
  }

  collectFruit(player, fruit) {
    fruit.disableBody(true, true);
    this.fruitCount += 1;
    this.fruitText.setText('Fruits: ' + this.fruitCount);
  }

  playerDie() {
    if (this.lastCheckpoint) {
      this.player.setPosition(this.lastCheckpoint.x, this.lastCheckpoint.y - 32);
    } else {
      this.scene.restart({ hero: this.heroKey });
    }
  }

  handleEnemy(player, enemy) {
    if (player.body.velocity.y > 0 && player.y < enemy.y) {
      enemy.disableBody(true, true);
      player.setVelocityY(-200);
    } else {
      this.playerDie();
    }
  }

  update() {
    const left = this.cursors.left.isDown || this.keys.A.isDown;
    const right = this.cursors.right.isDown || this.keys.D.isDown;
    const jumpPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.keys.W);

    if (left) {
      this.player.setVelocityX(-150);
      this.player.anims.play('Run', true);
      this.player.flipX = true;
    } else if (right) {
      this.player.setVelocityX(150);
      this.player.anims.play('Run', true);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play('Idle', true);
    }

    if (jumpPressed && (this.player.body.onFloor() || this.jumpCount < 2)) {
      this.player.setVelocityY(-250);
      this.player.anims.play(this.jumpCount === 0 ? 'Jump' : 'Double Jump');
      this.jumpCount++;
    }

    if (this.player.body.onFloor()) {
      this.jumpCount = 0;
    }

    if (!this.player.body.onFloor() && this.player.body.velocity.y > 0) {
      this.player.anims.play('Fall', true);
    }
  }
}
