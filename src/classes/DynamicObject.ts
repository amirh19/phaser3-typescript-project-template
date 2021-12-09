import "phaser";
import { FrameNumbers } from "../types";

export default class DynamicObject extends Phaser.Physics.Arcade.ArcadePhysics {
  spritesheetKey: string;
  objectBody: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  load(
    key: string,
    url: string,
    config?: Phaser.Types.Loader.FileTypes.ImageFrameConfig
  ) {
    this.spritesheetKey = key;
    this.scene.load.spritesheet(key, url, config || undefined);
  }

  loadMultiple(
    key: string,
    folderUrl: string,
    files: number,
    config?: Phaser.Types.Loader.FileTypes.ImageFrameConfig
  ) {
    this.spritesheetKey = key;
    for (let i = 0; i < files; i++) {
      this.scene.load.image(
        `${key}${i + 1}`,
        `${folderUrl}/${key}-${i + 1}.png`
      );
    }
  }

  loadAnimation(key: string, config: FrameNumbers) {
    this.scene.anims.create({
      key: key + this.spritesheetKey,
      frames: this.scene.anims.generateFrameNumbers(
        this.spritesheetKey,
        config
      ),
      frameRate: 10,
      repeat: -1,
    });
  }

  render(x: number, y: number) {
    this.objectBody = this.scene.physics.add.sprite(x, y, this.spritesheetKey);
  }

  addCollider(
    object:
      | Phaser.Types.Physics.Arcade.GameObjectWithBody
      | Phaser.GameObjects.Group
  ) {
    this.scene.physics.add.collider(this.objectBody, object);
  }
}
