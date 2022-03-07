function Particle(x,y,rad,vel,ctx,clr,damage){
  this.pos = new JSVector(x, y); //initialize pos at emitter pos
  //VELOCITY
  //this.vel = new JSVector(Math.random()*5-2, Math.random()*5-2);
  this.vel = vel;//JSVector.addGetNew(vel,new JSVector(Math.random()*2-1, Math.random()*2-1));
  this.rad = 3;
  this.lifeSpan = 200;
  this.clr = clr;
  this.ctx = ctx;
  this.damage = damage;
}

Particle.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.strokeStyle = this.clr;
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x, this.pos.y, this.rad, Math.PI*2, 0, false);
  this.ctx.stroke();
  this.ctx.fillStyle = this.clr;
  this.ctx.fill();
}

Particle.prototype.update = function(){
  this.pos.add(this.vel);
  this.lifeSpan -= 1;
}

Particle.prototype.isDead = function(maze){
  let colliding = maze.detectCollision(this);
  if(this.lifeSpan < 0||colliding){
    return true;
  }else{
    return false;
  }
}
