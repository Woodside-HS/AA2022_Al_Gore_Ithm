function ParticleSystem(x,y,ctx){
  this.pos = new JSVector(x,y);
  this.particles = [];
  this.ctx = ctx;
}

ParticleSystem.prototype.generateParticles = function(targetPos,vel){
  this.setDir(targetPos);
  this.particles.push(new Particle(this.pos.x,this.pos.y,vel,this.acc,this.ctx));
}

ParticleSystem.prototype.update = function(){
  //PARTICLE LIFESPAN
  for(var i = this.particles.length-1;i>=0;i--){
    let p = this.particles[i];
    p.run();
    if(p.isDead()){
      this.particles.splice(i, 1);
    }
  }
}
//setDir gets new vector from the click and orgin of particle system to shoot in correct dir
ParticleSystem.prototype.setDir = function(enemypos){
  this.acc = JSVector.subGetNew(enemypos,this.pos).setMagnitude(.8);
}
