class Player{
  constructor(x, y, color){
    this.pos = new JSVector(x,y);
    this.vel = new JSVector(0,0);
    this.color = color;
    this.canvas = document.getElementById("cnv");
    this.ctx = this.canvas.getContext("2d");
  }
  run(){
    this.update();
    this.draw();
  }
  update(){
    this.pos.add(this.vel)
  }
  draw(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, 50, 50);
    ctx.fillStyle = "black";
    ctx.fillRect(this.pos.x+30,this.pos.y+20, 10, 10);
    ctx.stroke();
  }
}
