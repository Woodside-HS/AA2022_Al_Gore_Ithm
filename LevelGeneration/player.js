function Player(x,y,rad,color,speed,ctx){
  this.pos = new JSVector(x,y);
  this.targetPos = new JSVector(x,y);
  this.rad = rad;
  this.color = color;
  this.speed = speed;
  this.ctx = ctx;
  this.prevMove = new JSVector(0,0);
}

Player.prototype.update = function(dx,dy,mazeGenerator){

  let delta = mazeGenerator.detectCharacterCollision(dx,dy,this,this.prevMove);

  if(Math.abs(delta.x)<Number.EPSILON&&Math.abs(delta.y)<Number.EPSILON){
    this.move(0.2);
    this.draw();
    return;
  }

  delta.setMagnitude(this.speed);
  this.targetPos.add(delta);

  this.move(0.2);
  this.draw();
}

Player.prototype.move = function(t){
  let dir = JSVector.subGetNew(this.targetPos,this.pos);
  dir.setMagnitude(dir.getMagnitude()*t);
  this.prevMove = dir;
  this.pos.add(dir);
}

Player.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.fillStyle = this.color.toString();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2);
  this.ctx.fill();
}
