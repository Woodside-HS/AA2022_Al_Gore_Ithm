class Player{
  constructor(x, y, color, size){
    this.size = size;
    this.pos = new JSVector(x,y);
    this.vel = new JSVector(0,0);
    this.posCalc = new JSVector(0,0);
    this.controlUp = false;
    this.controlLeft = false;
    this.controlDown = false;
    this.controlRight = false;
    this.color = color;
    this.wallScore = 0;
    this.canvas = document.getElementById("cnv");
    this.ctx = this.canvas.getContext("2d");
  }
  run(){
    this.update();
    this.draw();
    //this.wall.getPlayerCoords(this.pos.x, this.pos.y, this.size);
  }
  update(){
    this.pos.add(this.vel)
    this.posCalc.x = this.pos.x + this.size/2; //allows all collision to be based on the center rather than the conrer
    this.posCalc.y = this.pos.y + this.size/2; //reduces redundancy down the line
  }
  draw(){
    this.ctx.font = '24px serif';
    this.ctx.fillText("PlayerX" + this.posCalc.x + "PlayerY" + this.posCalc.y, 30, 30); //debug testing
    this.ctx.beginPath();
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.pos.x, this.pos.y, this.size, this.size);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(this.pos.x+this.size*3/5,this.pos.y+this.size*2/5, this.size/5, this.size/5);
    this.ctx.stroke();
  }
}
