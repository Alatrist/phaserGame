import { BasicWeapon } from "./Weapon";
import { Play } from "../scenes/Play";

export class Bullet extends Phaser.Physics.Arcade.Sprite {
  
    speed: number;
    weapon: BasicWeapon;
    weaponArgs: any; 
    
    constructor( scene: Play ){
        super(scene, 0, 0, "bullet");
    }

    fire(x: number, y: number, weapon: BasicWeapon, speed:number,args:any) {
        this.setVelocity(0,0);
        this.weapon=weapon;
        this.weaponArgs = args;
        this.scene.physics.add.existing(this, true);
        this.speed = speed;
        this.setPosition(x, y);
        this.setActive(true);
        this.setVisible(true);
    }

    update(time: number, delta: number)
    {
        this.weapon.computeBulletMove(this,delta);
        if (this.y<-50 || this.x<-50 
            || this.y-50>Number(this.scene.game.config.height) 
            || this.x -50 >Number(this.scene.game.config.width))
        {
           this.die();
        }
    }
    die()
    {
        this.setActive(false);
        this.setVisible(false);
        this.setPosition(-1000,-1000);
    }

}