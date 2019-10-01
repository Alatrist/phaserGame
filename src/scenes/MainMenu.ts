import { TextButton } from "../Button";



export class MainMenu extends Phaser.Scene
{
    playButton: TextButton
    playButtonText: Phaser.GameObjects.Text;

    constructor()
    {
        super("MainMenu");
    }
    create()
    {
        let width = Number(this.game.config.width);
        let height = Number(this.game.config.height);
        this.playButton = new TextButton(this,width/2-10, height/2, "Play", {
            fontSize:'30px', 
            fontFamily: "Arial", 
            color: "#0",
            align: 'center',
            lineSpacing: 20    
        }); 
        this.add.existing(this.playButton);
        var player = this.add.image(100, 200, "playership1");
        player.angle = 130;
        player.setScale(2);
        var laser = this.add.image(300,600, "bullet");
        laser.setScale(2);
        laser.angle = 130;
        laser = this.add.image(250,350, "bullet");
        laser.setScale(2);
        laser.angle = 130;
        laser = this.add.image(500,700, "bullet");
        laser.setScale(2);
        laser.angle = 130;

        var enemy = this.add.image(600,900, "basicRed");
        enemy.angle = 130;
        var enemy = this.add.image(550,350, "eliteGreen");
        enemy.angle = 130;

        var meteor = this.add.image(200, 900, "asteroidBig");
        meteor.angle=126;
        meteor = this.add.image(500, 200, "asteroidBig");
        meteor.angle=35;

        var text = this.add.text(0,0,"SPACE SHOOTER \nULTIMATE", {
            fontSize:'80px', 
            fontFamily: "Arial", 
            color: "#ffffff",
            align: 'center',
            lineSpacing: 20    
        });
        text.setPosition(width/2 - text.getCenter().x, 30);
    }
    
}