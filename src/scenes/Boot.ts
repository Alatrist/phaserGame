  export class Boot extends Phaser.Scene {

      constructor(){
          super("Boot");
      }


      preload() {
        console.log("Boot.preload()");
        this.load.path = "/assets/";
        this.load.image("playership1", "playerShip1_blue.png");
        this.load.image("bullet", "lasers/laserBlue01.png");
        this.load.image("shotgunBullet", "lasers/laserBlue16.png")
        this.load.image("enemy", "enemies/enemyBlack1.png");

        this.load.image("basicBlue","enemies/enemyBlue1.png");
        this.load.image("basicGreen","enemies/enemyGreen1.png");
        this.load.image("basicRed","enemies/enemyRed1.png");
        this.load.image("eliteBlue","enemies/enemyBlue2.png");
        this.load.image("eliteGreen","enemies/enemyGreen2.png");
        this.load.image("eliteRed","enemies/enemyRed2.png");
        this.load.image("bossBlue","enemies/enemyBlue5.png");
        this.load.image("bossGreen","enemies/enemyGreen5.png");
        this.load.image("bossRed","enemies/enemyRed5.png");

        this.load.image("bulletBlue", "lasers/laserBlue07.png");
        this.load.image("bulletGreen", "lasers/laserGreen13.png");
        this.load.image("bulletRed", "lasers/laserRed07.png");
        this.load.image("bossBulletBlue", "lasers/laserBlue16.png");
        this.load.image("bossBulletGreen", "lasers/laserGreen10.png");
        this.load.image("bossBulletRed", "lasers/laserRed16.png");
        
        this.load.image("asteroidBig", "meteors/meteorBrown_big1.png");
        this.load.image("asteroidMed", "meteors/meteorBrown_med1.png");
        this.load.image("asteroidSmall", "meteors/meteorBrown_small1.png");
        
        this.load.image("goldPowerUp", "powerups/things_gold.png");
        this.load.image("silverPowerUp", "powerups/things_silver.png");
        this.load.image("bronzePowerUp", "powerups/things_bronze.png");
        this.load.image("lifePowerUp", "powerups/star_gold.png");
        this.load.image("corruptShield", "powerups/shield_bronze.png");
        this.load.image("smallShield", "powerups/shield_silver.png");
        this.load.image("bigShield", "powerups/shield_gold.png");
        this.load.image("randomGunSpeedUP", "powerups/bolt_silver.png");
        this.load.image("gunSpeedUP", "powerups/bolt_gold.png");
        this.load.image("gunSpeedDOWN", "powerups/bolt_bronze.png");
        this.load.image("shipSpeedUP", "powerups/pill_yellow.png");
        this.load.image("shipSpeedDOWN", "powerups/pill_red.png");
        this.load.image("reverseMove", "powerups/pill_green.png");

        this.load.image("shield1", "effects/shield1.png");
        this.load.image("shield2", "effects/shield2.png");
        this.load.image("shield3", "effects/shield3.png");

        this.load.atlas('explosion', "effects/explosion.png","effects/explosion.json");

        this.load.image("smallShip", "ui/playerLife1_blue.png");
        this.load.image("x", "ui/numeralX.png");
        this.load.image("num1", "ui/numeral1.png");
        this.load.image("num2", "ui/numeral2.png");
        this.load.image("num3", "ui/numeral3.png");
        this.load.image("num4", "ui/numeral4.png");
        this.load.image("num5", "ui/numeral5.png");

        this.load.image("buttonBlue", "ui/buttonBlue.png");
      }

      create() {
        console.log("Boot.create()");
        this.scene.start("MainMenu");
      }

  } 