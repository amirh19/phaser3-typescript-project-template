import "phaser";
import DynamicObject from "./DynamicObject";
import MoveAnimations from "./MoveAnimations";

export default class Player extends DynamicObject {
  spritesheetKey: string;

  render(x: number, y: number) {
    this.objectBody = this.scene.physics.add.sprite(x, y, this.spritesheetKey);
    this.objectBody.setBounce(0, 0);
    this.objectBody.setCollideWorldBounds(true);
    this.objectBody.setGravityY(750);
  }

  moveToRight() {
    this.objectBody.flipX = false;
    this.objectBody.setVelocityX(160);
    this.objectBody.anims.play(
      MoveAnimations.RIGHT + this.spritesheetKey,
      true
    );
  }

  moveToLeft() {
    this.objectBody.flipX = true;
    this.objectBody.setVelocityX(-160);
    this.objectBody.anims.play(
      MoveAnimations.RIGHT + this.spritesheetKey,
      true
    );
  }

  jump() {
    if (this.objectBody.body.touching.down && this.objectBody.body.onFloor()) {
      this.objectBody.setVelocityY(-450);
    }
  }

  stayIdle() {
    this.objectBody.setVelocityX(0);
    this.objectBody.anims.play(MoveAnimations.TURN + this.spritesheetKey, true);
  }
  loadMoveAnimations() {}
}
