function Character(x,y,rad,clr,speed,life,ctx){
  this.pos = new JSVector(x,y);
  this.targetPos = new JSVector(this.pos.x,this.pos.y);
  this.rad = rad;
  this.speed = speed;
  this.vel = new JSVector(0,0);
  this.life = life;
  this.clr = clr;
  this.ctx = ctx;
}

Character.prototype.update = function(maze){

  if(this.life<0) return false;

  this.move(0.2);
  this.draw();

  let delta = maze.executeCollision(this.vel.x,this.vel.y,this); //Updates movement depending on collision with walls of maze

  this.targetPos.add(delta);

  return true;
}

Character.prototype.move = function(t){
  let dir = JSVector.subGetNew(this.targetPos,this.pos);
  dir.setMagnitude(dir.getMagnitude()*t); //interpolation
  this.prevMove = dir;
  this.pos.add(dir);
}

Character.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2);
  this.ctx.fillStyle = this.clr.toString();
  this.ctx.fill();
}

Character.prototype.setVel = function(dx,dy){
  this.vel = new JSVector(dx,dy);
  if(this.vel.getMagnitude()>Number.EPSILON)this.vel.setMagnitude(this.speed); //sets the velocity to a magnitude of speed to ensure constant speed regardless of direction
}
