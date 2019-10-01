import { BasicWeapon, SidesWeapon, RearWeapon } from "./Weapon";
import { Play } from "../scenes/Play";


export class Player extends Phaser.Physics.Arcade.Sprite
{
    basicWep : BasicWeapon;
    constructor(game:Play)
    {
        super(game,320,500, "playership1");
        this.setScale(.5,.5);
        game.add.existing(this);
        game.physics.add.existing(this,false);
        this.body.collideWorldBounds=true;
        this.body.width*=.5;
        this.body.height*=.5;
        this.basicWep = new BasicWeapon(game);
        this.weapon = this.basicWep;
        this.sidesWeapon = null;
        this.rearWeapon = null;
        this.lifes = 1;
        this.shield = game.add.sprite(this.x, this.y, "shield1");
        this.shieldLife = 20;
        this.lifeUI = game.add.image(75,35, "num1");
        this.acceleration=800;
        this.reverseMove=false;
        this.maxVelocity=100;
        this.godmode = false;
    }
    update(time: number, delta:number)
    {
        this.shield.setPosition(this.x, this.y);
        this.shieldLife+=delta*0.001;
        this.shieldLife = Math.min(this.shieldLife, 100);
        this.selectShieldTexture();
        if(this.godmode)
        {
            this.hitTime-=delta;
            if(this.hitTime<0)
                this.godmode=false;
        }
    }
    setReverseMove()
    {
        this.reverseMove=true;
        this.scene.time.addEvent({
            delay: 10000,
            callbackScope: this,
            callback: ()=>this.reverseMove=false
        })
    }
    AddLife()
    {
        if (this.lifes<5)
        {
            this.lifes++;
            this.setLifeUI()
        }
    }
    setLifeUI()
    {
        switch(this.lifes)
        {
            case 5: this.lifeUI.setTexture("num5"); break; 
            case 4: this.lifeUI.setTexture("num4"); break; 
            case 3: this.lifeUI.setTexture("num3"); break; 
            case 2: this.lifeUI.setTexture("num2"); break; 
            default: this.lifeUI.setTexture("num1"); break; 
        }
    }
    RemoveShield(n:number)
    {
        this.shieldLife-=n;
        if (this.shieldLife<0)
            this.shieldLife=0;
        this.selectShieldTexture();
    }
    GetShield(n:number)
    {
        this.shieldLife+=n;
        if (this.shieldLife>100)
            this.shieldLife=100;
        this.selectShieldTexture();
    }
    RemoveLife(explosion)
    {
        if(this.godmode)
            return;
        this.hitTime = 100;
        this.godmode=true;
        if (this.shieldLife>=25)
        {
            this.shieldLife-=15;
            this.selectShieldTexture();
            return;   
        }
        explosion.emitParticleAt(this.x, this.y);
        this.lifes--;
        this.acceleration=800;
        this.sidesWeapon=null;
        this.weapon=this.basicWep;
        this.weapon.activate();
        this.rearWeapon=null;
        this.reverseMove=false;
        this.setLifeUI();
        if (this.lifes<1)
        {
            this.scene.time.delayedCall(500, (this.scene as Play).gameOver, [], this.scene);
            this.setActive(false).setVisible(false);  
        }
    }
    selectShieldTexture()
    {
       if (this.shieldLife<25)
       {
           this.shield.setVisible(false);
       }
       else
        {
            this.shield.setVisible(true);
            if (this.shieldLife<50)
                this.shield.setTexture("shield1");
            else if (this.shieldLife<75)
                this.shield.setTexture("shield2");
            else
                this.shield.setTexture("shield3");
            this.shield.setScale(.5,.5);
        }   
    }
    getActivatedGuns()
    {
        let list = [];
        if (!this.weapon.deactivated)
            list.push(this.weapon);
        if (this.sidesWeapon!=null && ! this.sidesWeapon.deactivated)
        {
            list.push(this.sidesWeapon);
            if (this.sidesWeapon.mode==3)
                list.push(this.sidesWeapon);
        }
        if (this.rearWeapon!=null && ! this.rearWeapon.deactivated)
            list.push(this.rearWeapon);
        return list;
    }
    SpeedUP()
    {
        this.maxVelocity+=10;
        console.log("speedUP");
    }
    SpeedDOWN()
    {
        if(this.maxVelocity>20)
            this.maxVelocity-=10
    }
    godmode:boolean
    hitTime:number;
    maxVelocity:number;
    lifeUI:Phaser.GameObjects.Image;
    shield: Phaser.GameObjects.Sprite;
    shieldLife: number;
    lifes: number;
    weapon: BasicWeapon;
    rearWeapon: RearWeapon;
    sidesWeapon: SidesWeapon;
    acceleration: number;
    reverseMove:boolean;
}