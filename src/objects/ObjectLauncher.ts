import { Time } from "phaser";
import { EnemyLauncher } from "./EnemyLauncher";
import { Play } from "../scenes/Play";
import { Asteroid } from "./Asteroids";
import { PowerUp } from "./PowerUp";

export class ObjectLauncher
{
    constructor(scene: Play)
    {
        this.enLauncher= new EnemyLauncher(scene);
        this.powerUps = scene.powerUps;
        this.enemyGroup = scene.enemies;
        this.asteroidGroup = scene.asteroids;
        this.launchInterval = 5000;
        this.lastWave=-1;
        this.lastElite=20000;
        this.lastBoss=60000;
        this.lastLaunch=-1;
        this.waveInterval=20000;
        
        this.speed=0.05;
        this.fireRate=5000;

        this.sceneWidth = scene.width;
        this.sceneHeight = scene.height;

        this.asteroidInterval=3000;
        this.lastAsteroid=100;
        this.bossInterval=60000;
        this.eliteInterval=30000;
        this.state = this.launching;
        this.bossHealth=20;
        this.formations=[[{x:-25,y:0},{x:25, y:0}],
            [{x:-25,y:-25},{x:25, y:-25}, {x:0, y:25}],
            [{x:-25,y:-25},{x:25, y:-25}, {x:-25, y:25}, {x:25, y:25}],
            [{x:-50, y:50}, {x:50, y:50}, {x:0, y:0}, {x:-50, y:-50}, {x:50, y:-50}]
            ];
        this.formIndex=-1;
    }
    launch(delta: number)
    {
        this.state(delta);
    }

    launching(delta:number)
    {
        if(Math.random()<0.0008)
        {
            let asteroid =(this.asteroidGroup.get() as Asteroid)
            if (asteroid)
                asteroid.launch(Phaser.Math.Between(50,this.sceneWidth-50), -50, 1, 0, 0);
        }
        if(Math.random()<0.0018)
        {
            let ch =this.powerUps.getChildren();
            
            let pwrUp:PowerUp =  ch[Phaser.Math.Between(0, ch.length-1)] as PowerUp;
            if (pwrUp!=null && !pwrUp.visible)
                pwrUp.launch(Phaser.Math.Between(50,this.sceneWidth-50),Phaser.Math.Between(50, this.sceneHeight-50));
        }
        if (this.lastWave<0)
            if (this.lastLaunch<0)
            {
                if (this.lastBoss<0)
                {
                    this.enLauncher.launchBoss(this.enemyGroup, this.speed, this.fireRate, this.bossHealth);
                    this.state=this.bossFight;
                }
                else if(this.lastElite<0)
                {
                    this.lastBoss-=delta;
                    this.enLauncher.launchElite(this.enemyGroup, this.formation, this.speed, this.fireRate);
                    this.lastElite+=this.eliteInterval;
                    this.lastLaunch+=this.launchInterval;
                }
                else
                {
                    this.lastBoss-=delta;
                    this.lastElite-=delta
                    this.enLauncher.launchBasic(this.enemyGroup, this.formation, this.speed);
                    this.lastLaunch+=this.launchInterval;
                }
            }
            else
            {
                this.lastLaunch-=delta;
                this.lastBoss-=delta;
                this.lastElite-=delta
            }                     
        else
        {     
            this.lastWave-=delta;
            if(this.lastAsteroid<0)
            {
                // SPAWN ASTEROID
                let asteroid =(this.asteroidGroup.get() as Asteroid)
                if (asteroid)
                    asteroid.launch(Phaser.Math.Between(50,this.sceneWidth-50), -50, 1, 0, 0);
                this.lastAsteroid+=this.asteroidInterval;
            }
            else
                this.lastAsteroid-=delta;
        }
        
    }

    state;

    bossFight(delta:number)
    {
       if(this.enemyGroup.countActive()!=0)
       {
            if(Math.random()<0.0018)
            {
                let ch =this.powerUps.getChildren();
                
                let pwrUp:PowerUp =  ch[Phaser.Math.Between(0, ch.length-1)] as PowerUp;
                if (pwrUp!=null && !pwrUp.visible)
                    pwrUp.launch(Phaser.Math.Between(50,this.sceneWidth-50),Phaser.Math.Between(50, this.sceneHeight-50));
            }
            return;
       }
            
        this.state = this.launching;
        this.lastWave+=this.waveInterval;
        this.lastBoss+=this.bossInterval;

       this.bossHealth+=20;
        //level up
        if(this.formIndex<this.formations.length-1)
        {
            this.formIndex++;
            this.formation = this.formations[this.formIndex];
        }
        if(this.speed<0.2)
            this.speed+=0.01;
        if(this.fireRate>1000)
            this.fireRate-=100;
        
        this.bossInterval+=30000;
        this.eliteInterval-=1000;
        this.launchInterval-=200;
        this.asteroidInterval-=100;
        
    }

    enLauncher:EnemyLauncher
    lastLaunch:number;
    launchInterval:number;
    lastWave:number;
    lastElite:number;
    lastBoss:number;
    waveInterval:number;

    asteroidInterval:number;
    lastAsteroid:number;
    bossInterval:number;
    bossHealth:number;
    eliteInterval:number;
    speed:number;
    fireRate:number;

    enemyGroup:Phaser.GameObjects.Group;
    asteroidGroup:Phaser.GameObjects.Group;
    powerUps:Phaser.GameObjects.Group;
    sceneWidth:number;
    sceneHeight:number;
    formation = [{x:0, y:0}];//[{x:-50, y:0},{x:0, y:0},{x:50, y:0}];
    formations;
    formIndex:number;
}