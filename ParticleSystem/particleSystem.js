
function ParticleSystem(x,y,accMag,destination){
  this.pos = new JSVector(x,y);
  this.acc = destination;
  this.acc.sub(this.pos);
  this.acc.setMagnitude(0.8);
  console.log(this.acc);
  this.particles = [];

}

ParticleSystem.prototype.run = function(){
  this.render();
  this.update();
}

ParticleSystem.prototype.render = function(){
  this.particles.push(new Particle(this.pos.x,this.pos.y, this.acc));
}

ParticleSystem.prototype.update = function(){
  for(var i = this.particles.length-1;i>=0;i--){
    let p = this.particles[i];
    p.run();
    if(p.isDead()){
      this.particles.splice(i, 1);
    }
  }
}

ParticleSystem.prototype.setDir = function(enemypos){
  this.acc = JSVector.subGetNew(enemypos,this.pos).setMagnitude(.8);
}
