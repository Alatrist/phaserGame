export class Asteroid extends Phaser.Physics.Arcade.Sprite {
        speedX: number;
        speedY: number;
        xDir:number;
        lifeTime:number;
       size: number;
       constructor( scene: Phaser.Scene ) {
           super(scene, 0, 0, "asteroidBig");
           this.scene.physics.add.existing(this);

       }

       xdif:number;
       ydif:number;

       launch(x: number, y: number, size:number, xd:number, yd:number) : Asteroid {
        this.speedX = Phaser.Math.GetSpeed(Phaser.Math.Between(1, 50), 1);
        this.speedY = Phaser.Math.GetSpeed(Phaser.Math.Between(20,70),1);
        this.xDir = Phaser.Math.Between(0,1)>0 ? 1 : -1;
        this.lifeTime=0;
           this.size=size;
           this.setSprite();

           this.xdif = xd;
           this.ydif =yd;
           
           this.lifeTime=0;

           this.setScale(0.5, 0.5);
           this.setPosition(x, y);
           this.setActive(true);
           this.setVisible(true);

           return this;
       }

       update(time: number, delta: number) {
          this.lifeTime+=delta;
          this.body.width = this.width*.5;
           this.body.height = this.height*.5;
          var t:number = this.ydif * this.speedY*delta/100;
          this.y += this.speedY * delta +t/2;
          this.x += (this.speedY * delta +this.xdif * this.speedX*delta/100)/2 *this.xDir;
          if (this.y > Number(this.scene.game.config.height) + 50 || this.x > Number(this.scene.game.config.width)+25)
          {
              this.setActive(false);
              this.setVisible(false);
          }
       }
       get Y():number
       {
         return this.y;
       }

       get X():number
       {
         return this.x;
       }
       setSprite():void
       {
         if (this.size==1)
          {
            this.setTexture("asteroidBig");
           // this.scene.add.existing(this);
          }
           //Phaser.Physics.Arcade.Sprite.call(this, this.scene, this.x, this.y, 'asteroidBig');

         else if (this.size==2)
         {
          this.setTexture("asteroidMed");
          //this.scene.add.existing(this);
        }
           //Phaser.Physics.Arcade.Sprite.call(this, this.scene, this.x, this.y, 'asteroidMed');
        
         else
         {
          this.setTexture("asteroidSmall");
          //this.scene.add.existing(this);
        }
          // Phaser.Physics.Arcade.Sprite.call(this, this.scene, this.x, this.y, 'asteroidSmall');
       }
    }


