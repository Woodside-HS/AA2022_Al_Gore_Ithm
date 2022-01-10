function LevelIndicator(levelIcons,rad,clr,ctx){
  this.levelIcons = levelIcons;
  this.currentLevel = this.levelIcons.length>0?0:-1;
  this.rad = rad;
  this.clr = clr;
  this.ctx = ctx;
  this.pos = this.levelIcons.length>0?new JSVector(this.levelIcons[this.currentLevel].pos.x,this.levelIcons[this.currentLevel].pos.y):new JSVector(0,0);
}

LevelIndicator.prototype.update = function(){
  this.move(0.1);
  this.draw();
}

LevelIndicator.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2); //draws circle icon to represent level
  this.ctx.fillStyle = this.clr.toString();
  this.ctx.fill();
}
LevelIndicator.prototype.move = function(ratio){
  let dir = JSVector.subGetNew(this.levelIcons[this.currentLevel].pos,this.pos);
  dir.setMagnitude(dir.getMagnitude()*0.1);
  this.pos.add(dir);
}
LevelIndicator.prototype.nextLevel = function(){
  this.currentLevel = this.currentLevel>=this.levelIcons.length-1?0:this.currentLevel+1;
}
