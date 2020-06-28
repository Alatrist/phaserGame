import { Player } from "./Player";
import { BasicWeapon, ShotgunWeapon, RearShotgunWeapon, RearWeapon, SidesWeapon } from "./Weapon";
import { Play } from "../scenes/Play";


export class PowerUp extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene: Phaser.Scene, spriteImg: string)
    {
        super(scene, 0, 0, spriteImg);
        this.speed = Phaser.Math.GetSpeed(50,1);
        scene.add.existing(this);
        scene.physics.add.existing(this, false);
        this.setActive(false).setVisible(false);
    }
    Pickup(player: Player)
    {}
    speed: number;
    lifetime:number;
    update(time: number, delta:number)
    {
        this.lifetime+=delta;
        if (this.lifetime>5000)
            this.hide();
    }
    launch(x:number, y:number):PowerUp
    {
        this.setActive(true).setVisible(true);     
        this.setPosition(x,y);
        this.lifetime=0;
        this.setVelocity(0,0)
        return this;
    }
    hide()
    {
        this.setActive(false).setVisible(false);
        this.setPosition(-1000,-1000);
    }
}

export class ShotgunPowerUp extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "goldPowerUp");
        this.fweapon = new ShotgunWeapon(game);
        this.rweapon = new RearShotgunWeapon(game);
    }
    fweapon;
    rweapon;
    Pickup(player: Player)
    {
        this.hide();  
        if (player.weapon == this.fweapon && !player.weapon.deactivated)   
            {
                player.rearWeapon = this.rweapon;
                player.rearWeapon.activate();             
            }
        else if (player.rearWeapon == this.rweapon && !player.rearWeapon.deactivated)
        {
            player.weapon = this.fweapon;
            player.weapon.activate();
        }
        else
        {
            if (Math.random()<0.5)
            {
                player.rearWeapon = this.rweapon;
                player.rearWeapon.activate();
            }   
            else
            {
                player.weapon = this.fweapon;
                player.weapon.activate();
            }
        }
    }
}
export class BasicWeaponPowerUp extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "silverPowerUp");
        this.sweapon = new SidesWeapon(game);
        this.rweapon = new RearWeapon(game);
        this.weapon = new BasicWeapon(game);
    }
    sweapon :SidesWeapon;
    rweapon;
    weapon: BasicWeapon;

    Pickup(player: Player)
    {
        this.hide();  
        if (player.weapon.deactivated)
        {
            player.weapon=this.weapon;
            this.weapon.activate();
            return;
        }
        if (player.sidesWeapon == this.sweapon && this.sweapon.mode ==3 && !this.sweapon.deactivated)
            {
                if (player.rearWeapon==null) 
                {
                    player.rearWeapon = this.rweapon;
                    player.rearWeapon.activate();
                }
            }
        else if (player.rearWeapon != null && !player.rearWeapon.deactivated)
        {
            player.sidesWeapon = this.sweapon;
            this.upgradeSides();
        }
        else
        {
            if (Math.random()<0.5)
            {
                player.sidesWeapon = this.sweapon;
                this.upgradeSides();
            }
            else
            {
                player.rearWeapon = this.rweapon;
                player.rearWeapon.activate();
            }
        }
    }
    upgradeSides()
    {
        if (this.sweapon.mode==1 || this.sweapon.mode==2)
            this.sweapon.mode=3;
        else
        {
            if (Math.random()<0.5)
                this.sweapon.mode = this.sweapon.mode | 1;
            else
            this.sweapon.mode = this.sweapon.mode | 2;
        }
        this.sweapon.activate();
    }
}

export class DestructivePowerUp extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "bronzePowerUp");
        this.weapon = new BasicWeapon(game);
    }
    weapon :BasicWeapon;

    Pickup(player: Player)
    {
        this.hide(); 
        let list = player.getActivatedGuns()        
        let index = Phaser.Math.Between(0, list.length-1);
        list[index].deactivate();
        return;        
    }
}

export class CorruptShield extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "corruptShield");
    }
    Pickup(player: Player)
    {
        player.RemoveShield(25);
        this.hide();
    }
}
export class SmallShield extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "smallShield");
    }
    Pickup(player: Player)
    {
        player.GetShield(25);
        this.hide();
    }
}
export class BigShield extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "bigShield");
    }
    Pickup(player: Player)
    {
        player.GetShield(50);
        this.hide();
    }
}

export class Health extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "lifePowerUp");
    }
    Pickup(player: Player)
    {
        player.AddLife();
        this.hide();
    }
}

export class RandomGunSpeedUP extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "randomGunSpeedUP");
    }
    Pickup(player: Player)
    {
        let list = player.getActivatedGuns();
        if (list.length>0)
            list[Phaser.Math.Between(0, list.length-1)].SpeedUP();
        this.hide();
    }
}

export class GunSpeedUP extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "gunSpeedUP");
    }
    Pickup(player: Player)
    {
        let list = player.getActivatedGuns();
        list.forEach(element => {
            element.SpeedUP();
        });
        this.hide();
    }
}

export class GunSpeedDOWN extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "gunSpeedDOWN");
    }
    Pickup(player: Player)
    {
        let list = player.getActivatedGuns();
        list.forEach(Element =>
            list[Phaser.Math.Between(0, list.length-1)].SpeedDOWN());
        this.hide();
    }
}

export class ShipSpeedDOWN extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "shipSpeedDOWN");
    }
    Pickup(player: Player)
    {
        player.SpeedDOWN();
        this.hide();
    }
}

export class ShipSpeedUP extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "shipSpeedUP");
    }
    Pickup(player: Player)
    {
        player.SpeedUP();
        this.hide();
    }
}
export class ReverseMove extends PowerUp
{
    constructor(game: Play)
    {
        super(game, "reverseMove");
    }
    Pickup(player: Player)
    {
        player.setReverseMove();
        this.hide();
    }
}