import "phaser";
export default class Scenario extends Phaser.Physics.Arcade.ArcadePhysics {
  key: string;
  constructor(scene: Phaser.Scene, key: string) {
    super(scene);
    this.key = key;
  }
  staticBody: Phaser.Types.Physics.Arcade.SpriteWithStaticBody;
  render(x: number, y: number) {
    this.staticBody = this.scene.physics.add.staticSprite(x, y, this.key);
  }
}
