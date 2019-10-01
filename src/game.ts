import "phaser";
import { Boot } from "./scenes/Boot";
import {Play} from "./scenes/Play"
import { MainMenu } from "./scenes/MainMenu";

const config = {
  type: Phaser.AUTO,
  width: 768,
  height: 1024,
  scale:{
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH
  },
  backgroundColor: 0x000000,
  physics: {
      default: 'arcade',
      arcade: {
          //debug: true,
          gravity: { y: 0 }
      }
  },
  scene: [Boot, MainMenu, Play],        
};

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config);
  }
}

window.addEventListener("load", () => {
  let game = new Game(config);
});
