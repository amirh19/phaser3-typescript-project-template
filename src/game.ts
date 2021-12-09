import "phaser";
import { HEIGHT, WIDTH } from "./constants";
import Principal from "./scenes/Principal";

const config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 100 },
      debug: false,
    },
  },
  backgroundColor: "#070707",
  width: WIDTH,
  height: HEIGHT,
  scene: [Principal],
};

const game = new Phaser.Game(config);
