import "phaser";
import { Boot } from "./scenes/Boot";
import {Play} from "./scenes/Play"

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0x000000,
  physics: {
      default: 'arcade',
      arcade: {
          debug: true,
          gravity: { y: 0 }
      }
  },
  scene: [Boot, Play],        
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  let game = new Game(config);
});
