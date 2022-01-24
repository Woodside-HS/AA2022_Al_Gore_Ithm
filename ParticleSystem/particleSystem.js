//Listener to determine when click to make particle system
window.addEventListener("mousedown", ()=>{
  mouseStatus = true;
  particleSystem = new ParticleSystem(cnv.width/2,cnv.height/2);
});
//Listener to determine when to stop running particle System
window.addEventListener("mouseup", ()=>{
  mouseStatus = false;
});
//Listner to track mouse movement to be able to drag and shoot.
window.addEventListener("mousemove", (event) => {
  mousePos = new JSVector(event.clientX, event.clientY);
})

function ParticleSystem(x,y){
  this.pos = new JSVector(x,y);
  this.particles = [];
}

ParticleSystem.prototype.run = function(){
  this.update();
  this.render();
}

ParticleSystem.prototype.render = function(){
  this.particles.push(new Particle(this.pos.x,this.pos.y, this.acc));
}

ParticleSystem.prototype.update = function(){
  this.setDir(mousePos);


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
