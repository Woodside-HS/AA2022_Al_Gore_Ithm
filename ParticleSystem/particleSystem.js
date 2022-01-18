window.addEventListener("mousedown", ()=>{
  mouseStatus = true;
  mousePos = new JSVector(event.offsetX, event.offsetY);
  particleSystems.push(new ParticleSystem(cnv.width/2,cnv.height/2, .8, mousePos));
});

window.addEventListener("mouseup", ()=>{
  mouseStatus = false;
  particleSystems.splice(0, 1);
});

function ParticleSystem(x,y,accMag,destination){
  this.pos = new JSVector(x,y);
  this.acc = destination;
  this.acc.sub(this.pos);
  this.acc.setMagnitude(.9);
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
