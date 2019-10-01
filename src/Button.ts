export class TextButton extends Phaser.GameObjects.Text {
    background: Phaser.GameObjects.Image;
    constructor(scene:Phaser.Scene, x, y, text, style) {
      super(scene, x, y, text, style);
    
        var center = this.getCenter();
        this.background = scene.add.image(center.x,center.y,"buttonBlue");
      
        this.background.setInteractive({ useHandCursor: true })
            .on('pointerover', () => this.enterButtonHoverState() )
            .on('pointerout', () => this.enterButtonRestState() )
            .on('pointerdown', () => this.enterButtonActiveState() )
            .on('pointerup', () => this.enterButtonHoverState() );         
    }
  
    enterButtonHoverState() {
      this.setStyle({ fill: '#ff0'});
      this.background.setTint(0xff0);
    }
  
    enterButtonRestState() {
      this.setStyle({ fill: '#0'});
      this.background.setTint(0xffffff);
    }
  
    enterButtonActiveState() {
      this.setStyle({ fill: '#0ff' });
      this.background.setTint(0x055ff);

      this.scene.scene.start("Play");
    }
  }