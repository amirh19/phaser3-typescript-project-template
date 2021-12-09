import "phaser";
import DynamicObject from "./DynamicObject";
export default class Collectable extends DynamicObject {
  render(x: number, y: number) {
    super.render(x, y);
    this.objectBody.setBounce(1, 1);
    this.objectBody.setCollideWorldBounds(true);
    return this.objectBody;
  }
  addOverlap(
    gameObject:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.GameObjects.Group
  ) {
    this.scene.physics.add.overlap(
      gameObject,
      this.objectBody,
      () => this.objectBody.destroy(),
      null,
      this
    );
  }
}
