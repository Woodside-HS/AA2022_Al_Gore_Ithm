class Pickup{
  constructor(itemType, itemMessage, x, y){
    this.cnv = document.getElementById("cnv");
    this.ctx = this.cnv.getContext("2d");
    this.loc = new JSVector(x,y);
    this.itemType = itemType;
    this.itemMessage = itemMessage;
    this.vel = new JSVector(0,0);
    this.acc = new JSVector(0,0);
    this.clock = 0; //movement is based on a cycle, this keeps track of time
  }
  run(){
    this.update();
    this.draw();
  }
  update(){
    if(this.clock>=0 && this.clock<=10){
      this.vel.y += .05;
    }
    if(this.clock>10 && this.clock<50){
      this.vel.y = .5
    }
    if(this.clock>=50 && this.clock<60){
      this.vel.y -= .05;
    }
    if(this.clock>=60 && this.clock<70){
      this.vel.y -= .05;
    }
    if(this.clock>70 && this.clock<=110){
      this.vel.y = -.5;
    }
    if(this.clock>110 && this.clock<120){
      this.vel.y += .05;
    }
    if(this.clock>=120){
      this.clock = 0;
    }
    this.loc.add(this.vel);
    this.clock++;
  }
  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.loc.x, this.loc.y, 10,0,Math.PI*2);
    if(this.itemType == "powerup"){
        this.ctx.fill();
    }
    this.ctx.stroke();
  }
}
