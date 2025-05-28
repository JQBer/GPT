export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene');
    this.fruitCount = 0;
  }

  create(data) {
    this.heroKey = data.hero || 'Mask Dude';
    this.createLevel();
    this.createPlayer();
    this.createEnemies();
    this.createFruits();
    this.createTraps();
    this.createCheckpoints();
    this.createHUD();

    this.cursors = this.input.keyboard.createCursorKeys();
    this.keys = this.input.keyboard.addKeys('W,A,S,D');
  }

  createLevel() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'bg-green');

    const ground = this.physics.add.staticGroup();
    ground.create(width / 2, height - 16, 'tiles').setScale(32, 1).refreshBody();
    ground.create(100, height - 80, 'tiles').setScale(4, 1).refreshBody();
    ground.create(300, height - 120, 'tiles').setScale(3, 1).refreshBody();

    this.platforms = ground;
  }

  createPlayer() {
    this.player = this.physics.add.sprite(100, 100, `${this.heroKey}-Idle`);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);
    this.createAnimations();
  }

  createAnimations() {
    const hero = this.heroKey;
    const anims = ['Idle', 'Run', 'Jump', 'Fall'];
    anims.forEach(anim => {
      this.anims.create({
        key: `${anim}`,
        frames: this.anims.generateFrameNumbers(`${hero}-${anim}`, { start: 0, end: 9 }),
        frameRate: 20,
        repeat: anim === 'Idle' || anim === 'Run' ? -1 : 0
      });
    });
  }

  createEnemies() {
    this.enemies = this.physics.add.group();
    const enemy = this.enemies.create(200, 200, 'enemies', 0);
    enemy.body.setCollideWorldBounds(true);
    this.physics.add.collider(this.enemies, this.platforms);
    this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemy, undefined, this);
  }

  createFruits() {
    this.fruits = this.physics.add.group();
    this.fruits.create(150, 160, 'fruit-apple');
    this.fruits.create(350, 120, 'fruit-bananas');
    this.physics.add.collider(this.fruits, this.platforms);
    this.physics.add.overlap(this.player, this.fruits, this.collectFruit, undefined, this);
  }

  createTraps() {
    this.traps = this.physics.add.staticGroup();
    this.traps.create(250, 272, 'spike');
    this.physics.add.overlap(this.player, this.traps, this.playerDie, undefined, this);
  }

  createCheckpoints() {
    this.checkpoints = this.physics.add.staticGroup();
    const cp = this.checkpoints.create(480, 224, 'checkpoint');
    this.physics.add.overlap(this.player, this.checkpoints, () => {
      this.lastCheckpoint = cp;
    });
  }

  createHUD() {
    this.fruitText = this.add.text(8, 8, 'Fruits: 0', { fontSize: '16px', fill: '#fff' });
    this.fruitText.setScrollFactor(0);
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

  handlePlayerEnemy(player, enemy) {
    if (player.body.velocity.y > 0 && player.y < enemy.y) {
      enemy.disableBody(true, true);
    } else {
      this.playerDie();
    }
  }

  update() {
    const left = this.cursors.left.isDown || this.keys.A.isDown;
    const right = this.cursors.right.isDown || this.keys.D.isDown;
    const jump = Phaser.Input.Keyboard.JustDown(this.cursors.up) || Phaser.Input.Keyboard.JustDown(this.keys.W);

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

    if (jump && this.player.body.onFloor()) {
      this.player.setVelocityY(-250);
      this.player.anims.play('Jump');
    }

    if (!this.player.body.onFloor() && this.player.body.velocity.y > 0) {
      this.player.anims.play('Fall', true);
    }
  }
}
