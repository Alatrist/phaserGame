import { Bullet } from "./Bullet";
import { Play } from "../scenes/Play";

export class BasicWeapon
{
    defaultRate:number = 2000
    fireRate: number = 2000;
    scene: Play;
    lastShoot: number
    width: number;
    deactivated:boolean;
    lasers:Phaser.GameObjects.Group;

    deactivate()
    {
        this.deactivated=true;
    }
    activate()
    {
        this.deactivated=false;
        this.fireRate=this.defaultRate;
    }
    constructor(scene:Play)
    {
        this.width = Number(scene.game.config.width);
        this.lastShoot=0; 
        this.scene=scene  
        this.deactivated=false;
        this.lasers = this.scene.lasers;
    }
    fire(x: number, y:number, time:number, texture?:string)
    {
        if (this.deactivated)
            return;
        if (time-this.lastShoot<this.fireRate)
            return;
        this.lastShoot=time;
        this.doFire(x,y, texture);
    }
    doFire(x: number, y:number, texture?:string)
    {
        let b = this.lasers.get() as Bullet;
        if (b)
        {
            if(texture)
                b.setTexture(texture);
            b.body.setCircle(7,0,0);
            b.angle=0;
           // Phaser.Physics.Arcade.Sprite.call(b, this.scene, 0, 0, 'shotgunBullet');
            let dir =  new Phaser.Math.Vector2(0, 1);          
            b.fire(x, y-45, this, Phaser.Math.GetSpeed(200, 1), dir);
        }
    }
    computeBulletMove(bullet: Bullet, delta:number)
    {
        bullet.y -= bullet.speed * bullet.weaponArgs.y*delta;
    }
    SpeedUP()
    {
        if(this.fireRate>500)
            this.fireRate-=200;
    }
    SpeedDOWN()
    {
        if(this.fireRate<2500)
            this.fireRate+=200;
    }
}
export class ShotgunWeapon extends BasicWeapon
{
    constructor(scene:any)
    {
        super(scene);
    }

    doFire(x: number, y:number, texture?:string)
    {       
        for(let i = -2; i<3; i++)
        {
            let b = this.lasers.get() as Bullet;
            if (b)
            {
                if(texture)
                    b.setTexture(texture);
                let aX:number = i/4;
                let aY:number = Math.sqrt(1 - i*i/16);
                let tan: number = aX/aY;
                let angle: number = Math.atan(tan);
                b.setCircle(6,i*6, aY);
                b.angle = angle*180/Math.PI;
                let dir =  new Phaser.Math.Vector2(aX, aY);          
                b.fire(x, y-45, this, Phaser.Math.GetSpeed(200, 1), dir);
            }          
        }
    }

    computeBulletMove(bullet: Bullet, delta:number)
    {
        bullet.y -= bullet.speed * bullet.weaponArgs.y *delta;
        bullet.x += bullet.speed*bullet.weaponArgs.x *delta;
    }
}

export class SidesWeapon extends BasicWeapon
{
    doFire(x: number, y:number, texture?:string)
    {
        if (this.mode & 1)
        {
            let b = this.lasers.get() as Bullet;
            if (b)
            {
                if(texture)
                    b.setTexture(texture);
                b.body.setCircle(7,-20,20);
                let dir =  new Phaser.Math.Vector2(1, 0);         
                b.angle = 270;  
                b.fire(x-45, y, this, Phaser.Math.GetSpeed(200, 1), dir);       
            }
        }
        if (this.mode & 2)
        {
            let b2 = this.lasers.get() as Bullet;
            if(b2)
            {
                if(texture)
                    b2.setTexture(texture);
                b2.body.setCircle(7,20,20);
                let dir2 =  new Phaser.Math.Vector2(-1, 0);
                b2.angle = 90;    
                b2.fire(x+45, y, this, Phaser.Math.GetSpeed(200, 1), dir2);
            }
        }  
    }
    computeBulletMove(bullet: Bullet, delta:number)
    {
        bullet.x -= bullet.speed * bullet.weaponArgs.x*delta;
    }
    activate()
    {
        let tmp = this.mode | 1;
        if (tmp==this.mode)
        {
            this.mode | 2;
        }
        this.deactivated=false;
        this.fireRate=this.defaultRate;
    }
    deactivate()
    {
        let tmp = this.mode & 1;
        if (tmp==this.mode)
        {
            this.mode &= 2;
        }
        this.mode &=1;
        if (this.mode==0)
            this.deactivated=true;
    }
    mode:number;
}

export class RearWeapon extends BasicWeapon
{
    scene: Play;
    lastShoot: number
    width: number;

    doFire(x: number, y:number, texture?:string)
    {
        let b = this.lasers.get() as Bullet;
        if (b)
        {
            if(texture)
                b.setTexture(texture);
           this.createCircle(b);
            b.angle=180;
            let dir =  new Phaser.Math.Vector2(0, 1);          
            b.fire(x, y+45, this, Phaser.Math.GetSpeed(200, 1), dir);
        }
    }
    computeBulletMove(bullet: Bullet, delta:number)
    {
        bullet.y += bullet.speed * bullet.weaponArgs.y*delta;
    }
    createCircle(b:Bullet)
    {
        b.body.setCircle(7,0,40);
    }
}
export class SmallRearWeapon extends RearWeapon
{
    createCircle(b:Bullet)
    {
        b.body.setCircle(7,-2,28);
    }
}

export class RearShotgunWeapon extends BasicWeapon
{

    doFire(x: number, y:number, texture?:string)
    {       
        for(let i = -2; i<3; i++)
        {
            let b = this.lasers.get() as Bullet;
            if (b)
            {
                if(texture)
                    b.setTexture(texture);
                let aX:number = i/4;
                let aY:number = Math.sqrt(1 - i*i/16);
                let tan: number = aX/aY;
                let angle: number = Math.atan(tan);
                b.setCircle(6,i*6, aY+40);
                b.angle = -angle*180/Math.PI-180;
                let dir =  new Phaser.Math.Vector2(aX, aY);          
                b.fire(x, y+10, this, Phaser.Math.GetSpeed(200, 1), dir);
            }          
        }
    }

    computeBulletMove(bullet: Bullet, delta:number)
    {
        bullet.y += bullet.speed * bullet.weaponArgs.y *delta;
        bullet.x += bullet.speed*bullet.weaponArgs.x *delta;
    }
}


