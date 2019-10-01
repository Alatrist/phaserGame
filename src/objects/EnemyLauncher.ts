import { Enemy } from "./Enemy";
import { ShipSpeedDOWN } from "./PowerUp";
import { Tilemaps } from "phaser";


export class EnemyLauncher
{
    constructor(scene:Phaser.Scene)
    {
        this.scene = scene;
        this.basicPaths = [];
        this.bossPaths = [];
        this.basicPaths.push(new Phaser.Curves.Path(100,-100));
        let width = Number(this.scene.game.config.width)-100;
        let height = Number(this.scene.game.config.height)/5;
        for(let i=0; i< Number(this.scene.game.config.height)+3*height; i+=height)
        {
            if((i/height)%2 ==0)
                this.basicPaths[0].lineTo(width, i);
            else
                this.basicPaths[0].lineTo(100,i);
        }

        height = Number(this.scene.game.config.height);
        this.basicPaths.push(new Phaser.Curves.Path(100,-100));
        this.bossPaths.push(new Phaser.Curves.Path(100,-100));
        for(let i=100; i<width; i+=width/5)
        {
            this.basicPaths[1].lineTo(i, height);
            this.bossPaths[0].lineTo(i, height);
            if(i+width/5 <width)
            {
                this.basicPaths[1].lineTo(i+width/5, height);
                this.basicPaths[1].lineTo(i+width/5, 100);
                this.bossPaths[0].lineTo(i+width/5, height);
                this.bossPaths[0].lineTo(i+width/5, 100);
            }
            else
            {
                this.basicPaths[1].lineTo(i, height+500);     
                this.bossPaths[0].lineTo(i, height+100);
                this.bossPaths[0].closePath();    
            }    
        }
        
        this.basicPaths.push(new Phaser.Curves.Path(100,-100))
        this.bossPaths.push(new Phaser.Curves.Path(100,-100));
        let r=0;
        for(let h=100; h< height+400; h+=height/10)
        {
            if(r%2 ==0)
            {
                this.basicPaths[2].lineTo(100, h);
                this.basicPaths[2].lineTo(width, h);
                if (h<height+100)
                {
                    this.bossPaths[1].lineTo(100, h);
                    this.bossPaths[1].lineTo(width, h);
                }
            }
            else
            {
                this.basicPaths[2].lineTo(width, h)
                this.basicPaths[2].lineTo(100, h)
                if (h<height+100)
                {
                    this.bossPaths[1].lineTo(width, h)
                    this.bossPaths[1].lineTo(100, h)
                }            
            }
            r+=1;
        }
        this.bossPaths[1].closePath();

        {
            let width = Number(this.scene.game.config.width)-100;
            this.basicPaths.push(new Phaser.Curves.Path(width,-100));
            let height = Number(this.scene.game.config.height)/5;
            for(let i=0; i< Number(this.scene.game.config.height)+3*height; i+=height)
            {
                if((i/height)%2 !=0)
                    this.basicPaths[3].lineTo(width, i);
                else
                    this.basicPaths[3].lineTo(100,i);
            }
        }   
        {
            this.basicPaths.push(new Phaser.Curves.Path(width,-100));
            for(let i=width; i>50; i-=width/5)
            {
                this.basicPaths[4].lineTo(i, height);
                if(i-width/5 >50)
                {
                    this.basicPaths[4].lineTo(i-width/5, height);
                    this.basicPaths[4].lineTo(i-width/5, 100);
                }
                else
                    this.basicPaths[4].lineTo(i, height+500);
                
            }
        } 
        {
            this.basicPaths.push(new Phaser.Curves.Path(width,-100))
            let r=0;
            for(let h=100; h< height+400; h+=height/10)
            {
                if(r%2 !=0)
                {
                    this.basicPaths[5].lineTo(100, h);
                    this.basicPaths[5].lineTo(width, h);
                }
                else
                {
                    this.basicPaths[5].lineTo(width, h)
                    this.basicPaths[5].lineTo(100, h)
                }
                r+=1;
            }
        }
        
        {
            this.basicPaths.push(new Phaser.Curves.Path(100, -100));
            let d=8;
            let cx = (width-100)/2 +100;
            let cy = (height-100)/2+100;
            for(let i=d; i>=4; i-=4)
            {
                this.basicPaths[6].splineTo([new Phaser.Math.Vector2(cx, cy-i/d*(cy-100)),
                    new Phaser.Math.Vector2(cx+(i-1)/d*(width-100)/2, cy),
                    new Phaser.Math.Vector2(cx, cy+(i-2)/d*(height-100)/2),
                    new Phaser.Math.Vector2( cx-(i-3)/d*(width-100)/2, cy)])
            }
            this.basicPaths[6].splineTo([new Phaser.Math.Vector2(cx, cy)]);
            this.basicPaths[6].lineTo(cx, height+200);
        }
        {
            this.basicPaths.push(new Phaser.Curves.Path(width, -100));
            let d=8;
            let cx = (width-100)/2 +100;
            let cy = (height-100)/2+100;
            for(let i=d; i>=4; i-=4)
            {
                this.basicPaths[7].splineTo([new Phaser.Math.Vector2(cx, cy-i/d*(cy-100)),
                    new Phaser.Math.Vector2( cx-(i-1)/d*(width-100)/2, cy),
                    new Phaser.Math.Vector2(cx, cy+(i-2)/d*(height-100)/2),
                    new Phaser.Math.Vector2(cx+(i-3)/d*(width-100)/2, cy)])
            }
            this.basicPaths[7].splineTo([new Phaser.Math.Vector2(cx, cy)]);
            this.basicPaths[7].lineTo(cx, height+200);
        }
        {
            this.basicPaths.push(new Phaser.Curves.Path(width, -100));
            this.bossPaths.push(new Phaser.Curves.Path(width, -100));
            let cx = (width-100)/2 +100;
            this.basicPaths[8].lineTo(cx, 100).lineTo(100, height).lineTo(100,100)
            .lineTo(cx,height).lineTo(width,100).lineTo(width,height).lineTo(cx,100).lineTo(cx, height+300);

            this.bossPaths[2].lineTo(cx, 100).lineTo(100, height).lineTo(100,100)
            .lineTo(cx,height).lineTo(width,100).lineTo(width,height).lineTo(cx,100).lineTo(cx, height+300).closePath();
        }
    }
    t:number =0;
    scene:Phaser.Scene;
    launch(numb:number, ens: Enemy[], formation, path: Phaser.Curves.Path, speed:number, texture:string, fireRate:number, bulletTex?:string, scale?:number, health?:number)
    {        
        this.t=0;
        var tween =this.scene.tweens.addCounter({
            from:0,
            to:1,
            ease: 'Linear',
            duration:path.getLength()/speed,
            repeat:0,
            yoyo:false,
            onUpdateScope: this,
            onUpdateParams:[],
            delay:10
        })
        var i=0
        ens.forEach(element=>
            {
                element.setTexture(texture);
                let index = i++;
                let pos = formation[index%formation.length];
                element.launch(pos.x , pos.y - Math.floor(index/formation.length)*50, tween, path, fireRate, bulletTex,health);
                element.body.height = element.height;
                element.body.width = element.width;
                if(scale)
                {
                    element.setScale(scale,scale);
                }
                else
                {
                    element.body.height = element.height*0.3;
                    element.body.width = element.width*0.3;
                }
                   
            })
    }
    
    basicPaths: Phaser.Curves.Path[];
    bossPaths:Phaser.Curves.Path[];

    getList(group:Phaser.GameObjects.Group, size:number): Enemy[]
    {
        let ens: Enemy[] =[];
        for(let i=0;i<size;i++)
        {
            let e = group.get() as Enemy;
            if (e==null)
                break;
                
            else
                {
                    e.setActive(true);
                    ens.push(e);
                }
        }
        return ens
    }
    launchBasic(group: Phaser.GameObjects.Group, formation, speed:number)
    {
        let p = Phaser.Math.Between(0,2);
        let ens: Enemy[] =this.getList(group, formation.length);
        let texture:string;
        let t = Phaser.Math.Between(0,2);
        let path = this.basicPaths[t*3 + p];
        switch(t)
        {
            case 0: texture = "basicBlue"; break
            case 1: texture = "basicGreen"; break
            default: texture = "basicRed"; break
        }
        this.launch(formation.length, ens, formation, path, speed, texture,0);
    }
    launchElite(group: Phaser.GameObjects.Group, formation, speed:number, fireRate:number)
    {
        let ens: Enemy[] =this.getList(group, formation.length);
        let texture:string;
        let bullet:string;
        let p = Phaser.Math.Between(0,2);
        let t = Phaser.Math.Between(0,2);
        let path = this.basicPaths[t*3 + p];
        switch(t)
        {
            case 0: texture = "eliteBlue"; bullet="bulletBlue"; break
            case 1: texture = "eliteGreen"; bullet="bulletGreen"; break
            default: texture = "eliteRed"; bullet="bulletRed"; break
        }
        this.launch(formation.length, ens, formation, path, speed, texture, fireRate, bullet);
    }
    launchBoss(group: Phaser.GameObjects.Group, speed:number, fireRate:number, health:number)
    {
        let ens: Enemy[] =this.getList(group, 1);
        let bullet:string;
        let texture:string;
        let t = Phaser.Math.Between(0,2);
        let path = this.bossPaths[t];
        switch(t)
        {
            case 0: texture = "bossBlue"; bullet="bossBulletBlue"; break
            case 1: texture = "bossGreen"; bullet="bossBulletGreen"; break
            default: texture = "bossRed"; bullet="bossBulletRed"; break
        }
        this.launch(1, ens, [{x:0, y:0}], path, speed, texture, fireRate, bullet,1, health);
    }
}
