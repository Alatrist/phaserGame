import { BasicWeapon, RearWeapon, RearShotgunWeapon, SmallRearWeapon } from "./Weapon";
import { Play } from "../scenes/Play";

export class Enemy extends Phaser.Physics.Arcade.Sprite {
  
    speed: number;

    constructor( scene: Play ) {
        super(scene,0, 0, "enemy");
        scene.add.existing(this);
        this.scene.physics.add.existing(this);
       // this.speed = Phaser.Math.GetSpeed(50, 1);
        this.body.height *= 0.3;
        this.body.width *= 0.3;
        this.vec = new Phaser.Math.Vector2();
        this.weapon = new SmallRearWeapon(scene);
        this.bossWeapon=new RearShotgunWeapon(scene);
        this.weapon.lasers=scene.enemyLasers;
        this.bossWeapon.lasers = scene.enemyLasers;
    }


    launch(x: number, y: number, tween: Phaser.Tweens.Tween, path: Phaser.Curves.Path, fireRate:number, bulletTex?:string, bossHealth?:number) : Enemy {
        //Phaser.Physics.Arcade.Sprite.call(this, this.scene, 0, 0, 'enemy');
        this.xoff=x;
        this.yoff=y;

        this.setScale(0.3, 0.3);
        this.setVelocity(0,0);
        this.setPosition(-50,-50);
        this.setActive(true);
        this.setVisible(true);
        this.tween=tween;
        this.path =  path;        
        this.fireRate = fireRate;
        this.lastFire = Phaser.Math.Between(200,1000);
        this.bulletTex=bulletTex;
        this.bossHealth=bossHealth;
        if (bossHealth!=null)
            this.tween.loop=-1;
        this.body.enable=true;
        return this;
    }
    
    path: Phaser.Curves.Path;
    vec:Phaser.Math.Vector2;
    tween: Phaser.Tweens.Tween;
    xoff:number;
    yoff:number;
    fireRate:number;
    lastFire:number;
    weapon:SmallRearWeapon;
    bossWeapon:RearShotgunWeapon;
    bulletTex:string;
    bossHealth:number;
    update(time: number, delta: number) {
        if (this.path!=null)
        {
            if(this.tween.isPlaying())
            {
                this.lastFire-=delta;
                if (this.fireRate>0 && this.lastFire<0)
                {
                    if(this.scaleX==0.3)
                        this.weapon.fire(this.x, this.y, time, this.bulletTex);
                    else
                        this.bossWeapon.fire(this.x, this.y+40, time, this.bulletTex);
                    this.lastFire+=this.fireRate;
                }
                this.path.getPoint(this.tween.getValue(), this.vec);
                this.setPosition(this.vec.x+this.xoff, this.vec.y + this.yoff);
                return;
            }
            
        } 
        this.setActive(false);
        this.setVisible(false);
    }
    hit():number
    {
        if(this.bossHealth)
        {
            this.bossHealth-=1;
            if(this.bossHealth==0)
            {
                let ex = (this.scene as Play).explosion;
                for(let i=0; i<5;++i)
                {
                    this.scene.time.delayedCall(Phaser.Math.Between(0,600),()=>ex.emitParticleAt(this.x+Phaser.Math.Between(-100,100), this.y+Phaser.Math.Between(-100,100)),[],this);
                }
                this.tween.stop();
                this.scene.time.delayedCall(300,()=>{this.setActive(false).setVisible(false); this.setPosition(-1000,-1000)},[],this);
               
                return 20;
            }
            (this.scene as Play).explosion.emitParticleAt(this.x, this.y);
            return 0;
        }
        else
        {
            (this.scene as Play).explosion.emitParticleAt(this.x, this.y);
            this.setActive(false).setVisible(false);
            this.setPosition(-1000,-1000);
            return 1;
        }
    }

}



