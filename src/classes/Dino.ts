import "phaser";
import MoveAnimations from "./MoveAnimations";
import Player from "./Player";

export default class Dino extends Player {
  loadMoveAnimations() {
    this.loadAnimation(MoveAnimations.LEFT, {
      start: 3,
      end: 9,
    });
    this.loadAnimation(MoveAnimations.TURN, {
      start: 0,
      end: 3,
    });
    this.loadAnimation(MoveAnimations.RIGHT, {
      start: 3,
      end: 9,
    });
  }
}
