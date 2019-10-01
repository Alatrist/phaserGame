import { Bullet } from "../objects/Bullet";
import { Enemy } from "../objects/Enemy";
import {Asteroid} from "../objects/Asteroids"
import { ShotgunWeapon, BasicWeapon } from "../objects/Weapon";
import { Player } from "../objects/Player";
import { PowerUp, Health, ShotgunPowerUp, BasicWeaponPowerUp, DestructivePowerUp, CorruptShield, SmallShield, BigShield, RandomGunSpeedUP, GunSpeedUP, GunSpeedDOWN, ShipSpeedDOWN, ShipSpeedUP, ReverseMove } from "../objects/PowerUp";
import { EnemyLauncher } from "../objects/EnemyLauncher";
import { ObjectLauncher } from "../objects/ObjectLauncher";
export class Play extends Phaser.Scene {

    player: Player;

    moveKeys: {[key:string] : Phaser.Input.Keyboard.Key };

    lasers: Phaser.Physics.Arcade.Group;

    enemies: Phaser.Physics.Arcade.Group;

    asteroids: Phaser.Physics.Arcade.Group;
    enemyLasers: Phaser.Physics.Arcade.Group;

    lastSpawn: number = 0;

    score: number = 0;

    scoreText: Phaser.GameObjects.Text;

    powerUps: Phaser.Physics.Arcade.Group;

    explosion: Phaser.GameObjects.Particles.ParticleEmitterManager;
    asteroid_explosion: Phaser.GameObjects.Particles.ParticleEmitterManager;
  
    constructor() {
        super("Play");
    }

    width: number;
    height: number;
    create() {

        this.width = Number(this.game.config.width);
        this.height = Number(this.game.config.height);

        this.moveKeys = <{[key:string] : Phaser.Input.Keyboard.Key }> this.input.keyboard.addKeys({
            'up': Phaser.Input.Keyboard.KeyCodes.W,
            'down': Phaser.Input.Keyboard.KeyCodes.S,
            'left': Phaser.Input.Keyboard.KeyCodes.A,
            'right': Phaser.Input.Keyboard.KeyCodes.D,
            'fire': Phaser.Input.Keyboard.KeyCodes.SPACE
        });

        // Enables movement of player with WASD keys
        this.input.keyboard.on('keydown_W', function (event: object) {
            if (this.scene.player.reverseMove)
                this.scene.player.setAccelerationY(this.scene.player.acceleration);
            else
                this.scene.player.setAccelerationY(-this.scene.player.acceleration);
        });
        this.input.keyboard.on('keydown_S', function (event: object) {
            if (this.scene.player.reverseMove)
                this.scene.player.setAccelerationY(-this.scene.player.acceleration);
            else
                this.scene.player.setAccelerationY(this.scene.player.acceleration);
        });
        this.input.keyboard.on('keydown_A', function (event: object) {
            if (this.scene.player.reverseMove)
                this.scene.player.setAccelerationX(this.scene.player.acceleration);
            else
                this.scene.player.setAccelerationX(-this.scene.player.acceleration);
        });
        this.input.keyboard.on('keydown_D', function (event: object) {
            if (this.scene.player.reverseMove)
                this.scene.player.setAccelerationX(-this.scene.player.acceleration);
            else
                this.scene.player.setAccelerationX(this.scene.player.acceleration);
        });            

        // Stops player acceleration on uppress of WASD keys
        this.input.keyboard.on('keyup_W', function (event: object) {
            if (this.scene.moveKeys['down'].isUp)
                this.scene.player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_S', function (event: object) {
            if (this.scene.moveKeys['up'].isUp)
                this.scene.player.setAccelerationY(0);
        });
        this.input.keyboard.on('keyup_A', function (event: object) {
            if (this.scene.moveKeys['right'].isUp)
                this.scene.player.setAccelerationX(0);
        });
        this.input.keyboard.on('keyup_D', function (event: object) {
            if (this.scene.moveKeys['left'].isUp)
                this.scene.player.setAccelerationX(0);
        });


        // BULLET GROUP
        this.lasers = this.physics.add.group({
            classType: Bullet,
            maxSize: 60,
            runChildUpdate: true
        }); 

        this.enemyLasers = this.physics.add.group({
            classType:Bullet,
            maxSize:60,
            runChildUpdate:true
        })
    

        // ENEMY GROUP
        this.enemies = this.physics.add.group({
            classType: Enemy,
            maxSize: 50,
            runChildUpdate: true
        });

        //ASTEROID GROUP
       this.asteroids = this.physics.add.group({
        classType: Asteroid,
        maxSize: 20,
        runChildUpdate: true
      })

      this.powerUps = this.physics.add.group({
          classType: PowerUp,
          maxSize: 13,
          runChildUpdate: true
      })
      let pwrUps = this.powerUps.getChildren();
      pwrUps[0] = new ShotgunPowerUp(this); 
      pwrUps[1] = new BasicWeaponPowerUp(this);  
      pwrUps[2] = new DestructivePowerUp(this);       
      pwrUps[3] = new Health(this);
      pwrUps[4] = new CorruptShield(this);
      pwrUps[5] = new SmallShield(this);
      pwrUps[6] = new BigShield(this);
      pwrUps[7] = new RandomGunSpeedUP(this);
      pwrUps[8] = new GunSpeedUP(this);
      pwrUps[9] = new GunSpeedDOWN(this);
      pwrUps[10] = new ShipSpeedDOWN(this);
      pwrUps[11] = new ShipSpeedUP(this);
      pwrUps[12] = new ReverseMove(this);

      this.player =new Player(this);
      
        // LASERS kill ENEMIES
        this.physics.add.collider(this.lasers, this.enemies, this.collideLaserEnemy, null, this); // last parameter is the context passed into the callback
        this.physics.add.collider(this.lasers, this.enemies, this.collideLaserEnemy, null, this); // last parameter is the context passed into the callback
        this.physics.add.collider(this.enemyLasers, this.player, this.collideLaserPlayer, null, this);
        this.physics.add.collider(this.enemyLasers, this.lasers, this.collideLaserLaser, null, this);


        // PLAYER is killed by ENEMIES
        this.physics.add.collider(this.player, this.enemies, this.collidePlayerEnemy, null, this); // last parameter is the context passed into the callback


        //ASTEROID colliders
        this.physics.add.collider(this.player, this.asteroids, this.collidePlayerAsteroid, null, this);
        this.physics.add.collider(this.asteroids, this.asteroids, this.collideAsteroidAsteroid, null, this);
        this.physics.add.collider(this.lasers, this.asteroids, this.collideLaserAsteroid, null, this);
        this.physics.add.collider(this.asteroids, this.enemies, this.collideAsteroidEnemy, null, this);
        
        //PowerUps
        this.physics.add.collider(this.powerUps,this.player, this.pickPowerUp, null, this);


        // UI
        this.scoreText = this.add.text(5, 5, "Score: 0", { fontFamily: "Arial Black", fontSize: 12, color: "#33ff33", align: 'left' }).setStroke('#333333', 1);
        this.add.image(25,35,"smallShip");
        this.add.image(55,35, "x");
      this.explosion = this.add.particles('explosion');
      this.asteroid_explosion = this.add.particles('explosion');

      this.explosion.createEmitter({
        frame: {frames: [ 'smoke-puff', 'smoke0', 'smoke-puff' ],cycle: false},
        angle: { min: 0, max: 360 },
        speed: { min: 0, max: 50 },
        quantity: 6,
        lifespan: 1000,
        alpha: { start: 1, end: 0 },
        scale: { start: 0.5, end: 0.2 },
        on: false
    });

    this.explosion.createEmitter({
        frame: {frames: [ "meteorGrey_tiny1"],cycle: false},
        angle: { min: 0, max: 360 },
        speed: { min: 50, max: 50 },
        quantity: { min: 3, max: 8 },
        lifespan: 1000,
        alpha: { start: 1, end: 0 },
        scale: 0.5,
        rotate: { start: 0, end: 180, ease: 'Back.easeOut' },
        on: false
    });
    this.explosion.createEmitter({
        frame: {frames: [ "yellow"],cycle: false},
        angle: { min: 0, max: 360 },
        lifespan: 1000,
        speed: {min:0, max:50},
        alpha: { start: 1, end: 0 },
        quantity: 32,
        scale: { start: 0.1, end: 0.2 },
        on: false
    });

    this.asteroid_explosion.createEmitter({
        frame: {frames: [ 'smoke-puff', 'smoke0', 'smoke-puff' ],cycle: false},
        angle: { min: 0, max: 360 },
        speed: { min: 0, max: 50 },
        quantity: 6,
        lifespan: 1000,
        alpha: { start: 1, end: 0 },
        scale: { start: 0.5, end: 0.2 },
        on: false
    });
    this.asteroid_explosion.createEmitter({
        frame: {frames: [ "meteorGrey_tiny1"],cycle: false},
        angle: { min: 0, max: 360 },
        speed: { min: 50, max: 50 },
        quantity: { min: 3, max: 8 },
        lifespan: 1000,
        alpha: { start: 1, end: 0 },
        scale: 0.5,
        rotate: { start: 0, end: 180, ease: 'Back.easeOut' },
        on: false
    });

    this.launcher = new ObjectLauncher(this);
    }
    launcher:ObjectLauncher;
    update(time: number, delta: number) {

        this.constrainVelocity(this.player, this.player.maxVelocity);
        this.player.update(time, delta);
        if (this.input.keyboard.checkDown(this.moveKeys['fire'], 300))
        {
            this.player.weapon.fire(this.player.x, this.player.y, time);
            if (this.player.rearWeapon!=null)
                this.player.rearWeapon.fire(this.player.x, this.player.y, time);
            if (this.player.sidesWeapon!=null)
                this.player.sidesWeapon.fire(this.player.x, this.player.y, time);
        }
        this.launcher.launch(delta);
    }

    constrainVelocity(sprite: Phaser.Physics.Arcade.Sprite, maxVelocity: number)
    {
        if (!sprite || !sprite.body)
        return;

        var angle, currVelocitySqr, vx, vy;
        vx = sprite.body.velocity.x;
        vy = sprite.body.velocity.y;
        currVelocitySqr = vx * vx + vy * vy;

        if (currVelocitySqr > maxVelocity * maxVelocity)
        {
            angle = Math.atan2(vy, vx);
            vx = Math.cos(angle) * maxVelocity;
            vy = Math.sin(angle) * maxVelocity;
            sprite.body.velocity.x = vx;
            sprite.body.velocity.y = vy;
        }
    }

    collideLaserEnemy(laser: Bullet, enemy: Enemy) { 
        if (!laser.active) return;
        if (!enemy.active) return;

        laser.die();
        this.score+=enemy.hit();
        this.scoreText.text = "Score: " + this.score;
    
    }
    collideLaserPlayer(player: Player, laser: Bullet) { 
        if (!laser.active) return;

        laser.die();
        player.RemoveLife(this.explosion);
    }
    collideLaserLaser(laser: Bullet, laser2: Bullet) { 
        if (!laser.active) return;
        if (!laser2.active) return;

        laser.die();
        laser2.die()
        this.score += 1;
        this.scoreText.text = "Score: " + this.score;
    }

    collidePlayerEnemy(player: Player, enemy: Enemy) { 
        if (!player.active) return;
        if (!enemy.active) return;

        player.RemoveLife(this.explosion);
        this.score+=enemy.hit();
        this.scoreText.text = "Score: " + this.score;
    }
    collidePlayerAsteroid(player: Player, a: Asteroid) { 
        if (!player.active) return;
        if (!a.active) return;

        this.explodeAsteroid(a);
        player.RemoveLife(this.explosion);
        this.scoreText.text = "Score: " + this.score;
    }

    explodeAsteroid(asteroid: Asteroid)
    {
        if (asteroid.size >= 3)
        {
          asteroid.setActive(false).setVisible(false);
          asteroid.setPosition(-1000,-1000);
        }
        else
        {
            asteroid.lifeTime=0;
            asteroid.size+=1;         
            var t:number = Phaser.Math.Between(-100,100);
            var t2:number = Phaser.Math.Between(-100,100);
            asteroid.setVisible(false).setActive(false);
            
           let a1 =(this.asteroids.get() as Asteroid);
           if (a1)
            a1.launch(asteroid.X,asteroid.Y,asteroid.size,t,t2);
           let a2 =(this.asteroids.get() as Asteroid);
           if (a2)
            a2.launch(asteroid.X,asteroid.Y,asteroid.size,-t,Phaser.Math.Between(-200,100));
        }
        this.asteroid_explosion.emitParticleAt(asteroid.x, asteroid.y);
    }

    collideLaserAsteroid(laser: Bullet, asteroid: Asteroid){
        if (!laser.active) return;
        if (!asteroid.active) return;
 
         laser.die(); 
        this.score += 1;
        this.scoreText.text = "Score: " + this.score;
        this.explodeAsteroid(asteroid);
        
    }

    collideAsteroidAsteroid(a1: Asteroid, a2: Asteroid)
    {
        if (!a1.active || !a2.active || !a1.visible 
            || !a2.visible || a1 == a2 || 
            (a1.lifeTime<1000 && a2.lifeTime<1000))  return;
        
        this.explodeAsteroid(a1);
        this.explodeAsteroid(a2);
    }
    collideAsteroidEnemy(asteroid: Asteroid, enemy: Enemy)
    {
        if (!enemy.active) return;
        if (!asteroid.active) return;

        this.explodeAsteroid(asteroid);
        this.score+=enemy.hit();
        this.scoreText.text = "Score: " + this.score;
    }

    pickPowerUp(player: Player, powerUp: PowerUp)
    {
        if (powerUp.active)
            powerUp.Pickup(player);
    }

    gameOver() {
        this.scene.restart();
    }

}