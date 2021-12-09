import "phaser";
import Collectable from "../classes/Collectable";
import Dino from "../classes/Dino";
import ScenarioItem from "../classes/ScenarioItem";
import { WIDTH, HEIGHT } from "../constants";

export default class Principal extends Phaser.Scene {
  players: Dino[];
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  player2Cursors: {
    A: Phaser.Input.Keyboard.Key;
    W: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
  platform: Phaser.Physics.Arcade.StaticGroup;
  constructor() {
    super("Principal");
  }
  randomGems(number?: number) {
    const num = number || 10;
    for (let i = 0; i < num; i++) {
      const gem = new Collectable(this);
      gem.spritesheetKey = "gem";
      gem.render(
        Math.random() * (WIDTH * 2 - 128 - 128) + 128,
        Math.random() * (HEIGHT * 2 - 128 - 128) + 128
      );
      gem.objectBody.play("gem");
      gem.objectBody.setBodySize(15, 13);
      gem.objectBody.setScale(2);
      gem.objectBody.setCollideWorldBounds(false);
      gem.addOverlap(this.players[0].objectBody);
      gem.addOverlap(this.players[1].objectBody);
      gem.addOverlap(this.platform);
    }
  }

  preload() {
    this.players = [new Dino(this), new Dino(this)];
    this.players[0].load("dino-green", "../assets/dino-verde.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.players[1].load("dino-yellow", "../assets/dino-amar.png", {
      frameWidth: 24,
      frameHeight: 24,
    });
    this.load.image("block", "../assets/block-big.png");
    this.load.image("sky", "../assets/back.png");
    new Collectable(this).loadMultiple("gem", "../assets/gem", 5);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player2Cursors = this.input.keyboard.addKeys(
      "W,S,A,D",
      true,
      true
    ) as {
      A: Phaser.Input.Keyboard.Key;
      W: Phaser.Input.Keyboard.Key;
      S: Phaser.Input.Keyboard.Key;
      D: Phaser.Input.Keyboard.Key;
    };
  }

  create() {
    const gemFrames: Phaser.Types.Animations.AnimationFrame[] = [];
    for (let i = 1; i < 6; i++) {
      gemFrames.push({
        key: `gem${i}`,
        frame: null,
        duration: 1,
      });
    }
    const sky = new ScenarioItem(this, "sky");

    sky.render(WIDTH / 2, HEIGHT / 2);
    sky.staticBody.setScale(2);
    sky.render((3 * WIDTH) / 2, HEIGHT / 2);
    sky.staticBody.setScale(2);
    this.anims.create({
      key: "gem",
      frames: gemFrames,
      frameRate: 10,
      repeat: -1,
    });
    let width = 16;
    let height = 16;
    this.platform = this.physics.add.staticGroup();
    while (width <= WIDTH * 2) {
      const block = new ScenarioItem(this, "block");
      block.render(width, HEIGHT - 32 / 2);
      this.platform.add(block.staticBody);
      width += 32;
    }
    while (height <= HEIGHT) {
      const blockLeft = new ScenarioItem(this, "block");
      blockLeft.render(32 / 2, height);
      const blockRight = new ScenarioItem(this, "block");
      blockRight.render(WIDTH * 2 - 32 / 2, height);
      this.platform.addMultiple([blockLeft.staticBody, blockRight.staticBody]);
      height += 32;
    }
    this.players.forEach((dino) => {
      dino.render(56, HEIGHT - 56);
      dino.objectBody.setScale(2);
      dino.loadMoveAnimations();
      dino.addCollider(this.platform);
    });
    this.randomGems(80);
    this.physics.world.setBounds(0, 0, WIDTH * 2, HEIGHT);
    this.cameras.main.setBounds(0, 0, WIDTH * 2, HEIGHT);
    this.cameras.add(0, 0, 0, 0, false, "secondPlayer");
    this.cameras.main.setSize(WIDTH / 2, HEIGHT);
    this.cameras
      .getCamera("secondPlayer")
      .setSize(WIDTH / 2, HEIGHT)
      .setPosition(WIDTH / 2, 0)
      .setBounds(0, 0, WIDTH * 2, HEIGHT)
      .startFollow(this.players[1].objectBody);
    this.cameras.main.startFollow(this.players[0].objectBody);
    setInterval(
      (() => {
        this.randomGems(80);
      }).bind(this),
      2000
    );
  }

  update() {
    /* if (
      Math.abs(this.players[0].objectBody.x - this.players[1].objectBody.x) <
      (3 * (WIDTH - 50)) / 4 || 
    ) {
      this.cameras.main.setSize(WIDTH, HEIGHT).stopFollow();
      this.cameras.getCamera("secondPlayer").setVisible(false);
    } else {
      this.cameras.main.setSize(WIDTH / 2, HEIGHT);
      this.cameras.getCamera("secondPlayer").setVisible(true);
      if (this.players[0].objectBody.x < this.players[1].objectBody.x) {
        this.cameras.main.startFollow(this.players[0].objectBody);
        this.cameras
          .getCamera("secondPlayer")
          .startFollow(this.players[1].objectBody);
      } else {
        this.cameras.main.startFollow(this.players[1].objectBody);
        this.cameras
          .getCamera("secondPlayer")
          .startFollow(this.players[0].objectBody);
      }
    } */
    if (this.player2Cursors.A.isDown) {
      this.players[1].moveToLeft();
    } else if (this.player2Cursors.D.isDown) {
      this.players[1].moveToRight();
    } else {
      this.players[1].stayIdle();
    }
    if (this.player2Cursors.W.isDown) {
      this.players[1].jump();
    }

    if (this.cursors.left.isDown) {
      this.players[0].moveToLeft();
    } else if (this.cursors.right.isDown) {
      this.players[0].moveToRight();
    } else {
      this.players[0].stayIdle();
    }
    if (this.cursors.up.isDown) {
      this.players[0].jump();
    }
  }
}
