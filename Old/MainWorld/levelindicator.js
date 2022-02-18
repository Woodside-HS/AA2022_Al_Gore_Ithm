function LevelIndicator(pos,rad,clr,ctx){
  this.rad = rad;
  this.clr = clr;
  this.ctx = ctx;
  this.pos = new JSVector(pos.x,pos.y);
  this.targetPos = new JSVector(pos.x,pos.y);
}

LevelIndicator.prototype.update = function(){
  this.move(0.4);
  this.draw();
}
LevelIndicator.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2); //draws circle icon to represent level
  this.ctx.fillStyle = this.clr.toString();
  this.ctx.fill();
}
LevelIndicator.prototype.move = function(ratio){//interpolates to target positions
  let dir = JSVector.subGetNew(this.targetPos,this.pos);
  dir.setMagnitude(dir.getMagnitude()*0.1);
  this.pos.add(dir);
}
LevelIndicator.prototype.assignTargetPos = function(x,y){
  this.targetPos = new JSVector(x,y);
}
