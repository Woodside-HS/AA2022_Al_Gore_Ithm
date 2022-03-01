function ParticleSystem(x,y,ctx,clrScale){
  this.pos = new JSVector(x,y);
  this.particles = [];
  this.ctx = ctx;
  this.clrScale = clrScale;
}

ParticleSystem.prototype.generateParticles = function(targetPos,characterVel){
  //this.setDir(targetPos);
  let vel = JSVector.subGetNew(targetPos,this.pos).add(characterVel);
  vel.setMagnitude(5);
  this.rad = 6;
  this.particles.push(new Particle(this.pos.x,this.pos.y,this.rad,vel,this.ctx,Color.generateRandomColor(this.clrScale.r,this.clrScale.g,this.clrScale.b,false)));
}

ParticleSystem.prototype.update = function(maze){
  //PARTICLE LIFESPAN
  for(var i = this.particles.length-1;i>=0;i--){
    let p = this.particles[i];
    p.update();
    if(p.isDead(maze)){
      this.particles.splice(i, 1);
    }
    else{
      p.draw();
    }
  }
}

//setDir gets new vector from the click and orgin of particle system to shoot in correct dir
//ParticleSystem.prototype.setDir = function(enemypos){
 //this.acc = JSVector.subGetNew(enemypos,this.pos).setMagnitude(0.3);
//}
