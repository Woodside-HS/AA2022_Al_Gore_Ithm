function Character(x,y,rad,clr,speed,life,ctx,imgSrc){
  this.pos = new JSVector(x,y);
  this.targetPos = new JSVector(this.pos.x,this.pos.y);
  this.rad = rad;
  this.speed = speed;
  this.vel = new JSVector(0,0);
  this.life = life;
  this.clr = clr;
  this.ctx = ctx;

  this.img = new Image();
  if(imgSrc!=undefined) this.img.src = imgSrc;
}

Character.prototype.update = function(maze){

  if(this.life<0){
    this.life = 0;
    return false;
  }

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
  if(this.img.src!=undefined&&this.img.src!="") this.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.pos.x-this.rad,this.pos.y-this.rad,this.rad*2,this.rad*2);

  else{
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2);
    this.ctx.fillStyle = this.clr.toString();
    this.ctx.fill();
  }
}

Character.prototype.setVel = function(dx,dy){
  this.vel = new JSVector(dx,dy);
  if(this.vel.getMagnitude()>Number.EPSILON)this.vel.setMagnitude(this.speed); //sets the velocity to a magnitude of speed to ensure constant speed regardless of direction
}
Character.prototype.detectParticles = function(particleSystem){
  for(i=0; i < particleSystem.particles.length; i++){
    let hit = this.pos.distance(particleSystem.particles[i].pos)
    if(hit < this.rad){
      this.life--;
    }
  }
}
