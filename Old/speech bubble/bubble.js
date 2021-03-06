class Bubble{
  constructor(mouseX, mouseY, length, width, fontSize, message, life){
    this.pos = new JSVector(0,0);
    this.cnv = document.getElementById("cnv");
    this.ctx = this.cnv.getContext("2d");
    this.rect = this.cnv.getBoundingClientRect();
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.length = length;
    this.width = width;
    this.fontSize = fontSize;
    this.ctx.font = fontSize+'px serif';
    this.originalMessage = message;
    this.message = message;
    this.charactersBack = 0;
    this.life = life;
    this.initialLife = life;
  }
  run(){
    this.update();
    this.draw();
  }
  update(){
    //this.ctx.color = "rgba (50,50,50,"+this.life/this.initialLife+")";
    this.life--;
  }
  draw(){
    this.message = this.originalMessage;
    this.ctx.beginPath();
    this.lineWidth = 3;
    //console.log(this.lineWidth);
    this.ctx.fillStyle = "rgba(0,0,0,"+this.life/10+")"; //fades out on the last 10 frames
    this.ctx.strokeStyle = "rgba(0,0,0,"+this.life/10+")";
    //this.ctx.strokeStyle = "rgba(0,0,0,"+this.life/this.initialLife+")";
    this.ctx.rect(this.mouseX, this.mouseY, this.length/2.4 *this.fontSize*1.1, this.width*this.fontSize*1.35);
    this.ctx.moveTo(this.mouseX + this.fontSize * this.length*1/3, this.mouseY + this.width*this.fontSize*1.35);
    this.ctx.lineTo(this.mouseX + this.fontSize * this.length*2.916/10, this.mouseY + this.width*this.fontSize*2.2); //rectangle and box creation that is scalable on paramaters passed
      for (let i = 0; i<this.width+1; i++){ //use 2.XXX for line left, 3.XXX for line right
          this.charactersBack = 0
          if(this.message.length <= this.length){
            this.charactersBack = 0;
            this.ctx.fillText(this.message.substring(0, this.length - this.charactersBack), this.mouseX+10, this.mouseY +this.fontSize*1.15*(i+1));
            break;
          }
          while (this.message.substring(this.length - 1 - this.charactersBack, this.length - this.charactersBack) != ' '){
              this.charactersBack++;
              //console.log(this.message.substring(this.length - 1 - this.charactersBack, this.length - this.charactersBack)); //debug
              if(this.charactersBack>this.length){
                this.charactersBack = 0;
                break;
              }
          }
          //this.ctx.fillText(this.message.substring(i*this.length*2.4 - this.charactersBack, (i+1)*this.length*2.4 - this.charactersBack), this.mouseX+10, this.mouseY +this.fontSize*1.15*(i+1));
          this.ctx.fillText(this.message.substring(0, this.length - this.charactersBack), this.mouseX+10, this.mouseY +this.fontSize*1.15*(i+1));
          this.message = this.message.substring(this.length - this.charactersBack);
      }
    this.ctx.stroke();
  }

}
