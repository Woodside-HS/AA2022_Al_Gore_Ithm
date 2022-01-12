function Cell(x,y,scale,ctx){
  this.pos = new JSVector(x,y);
  this.scale = scale;
  this.ctx = ctx;
  this.connectedTo = -1;
  this.visited = false;
  this.style = "black";
  this.walls = {
    n:true,
    s:true,
    w:true,
    e:true
  }
}

Cell.prototype.draw = function(){

  this.ctx.strokeStyle = this.style;
  this.ctx.lineWidth = 2;
  this.ctx.beginPath();
  if(this.walls.n){
    this.ctx.lineTo(this.pos.x+this.scale,this.pos.y);
  }
  if(this.walls.s){
    this.ctx.moveTo(this.pos.x,this.pos.y+this.scale);
    this.ctx.lineTo(this.pos.x+this.scale,this.pos.y+this.scale);
  }
  if(this.walls.w){
    this.ctx.moveTo(this.pos.x,this.pos.y);
    this.ctx.lineTo(this.pos.x,this.pos.y+this.scale);
  }
  if(this.walls.e){
    this.ctx.moveTo(this.pos.x+this.scale,this.pos.y);
    this.ctx.lineTo(this.pos.x+this.scale,this.pos.y+this.scale);
  }
  this.ctx.stroke();
}
