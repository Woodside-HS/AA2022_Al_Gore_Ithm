function Particle(x,y,vel,acc,ctx){
  this.pos = new JSVector(x, y); //initialize pos at emitter pos
  //VELOCITY
  //  this.vel = new JSVector(Math.random()*5-2, Math.random()*5-2);
  this.vel = JSVector.addGetNew(vel,new JSVector(Math.random()*2-1, Math.random()*2-1));
  this.rad = 2;
  //
  this.acc = acc;
  this.lifeSpan = 200;
  this.clr = Color.generateRandomColor(155,1,1,false);
  this.ctx = ctx;
}

Particle.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.strokeStyle = this.clr;
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x, this.pos.y, this.rad, 0,Math.PI*2);
  this.ctx.stroke();
  this.ctx.fillStyle = this.clr;
  this.ctx.fill();
}

Particle.prototype.run = function(){
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.lifeSpan -= 1;
}

Particle.prototype.isDead = function(maze){
  let colliding = maze.detectCollision(this);
  if(this.lifeSpan < 0.0||colliding){
    return true;
  }else{
    return false;
  }
}
