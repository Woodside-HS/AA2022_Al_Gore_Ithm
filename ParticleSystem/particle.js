
function Particle(x,y,acc){
  this.pos = new JSVector(x, y); //initialize pos at emitter pos
  //VELOCITY
//  this.vel = new JSVector(Math.random()*5-2, Math.random()*5-2);
  this.vel = new JSVector(Math.random()*2-1, Math.random()*2-1);
  //
  this.acc = acc;
  this.lifeSpan = 200;

}

Particle.prototype.draw = function(){

  context.strokeStyle = new Color(Math.random()*255,Math.random()*255,Math.random()*255,this.lifeSpan);
  context.beginPath();
  context.arc(this.pos.x, this.pos.y, 6, Math.PI*2, 0, false);
  context.stroke();
  context.fillStyle = new Color(Math.random()*255,Math.random()*255,Math.random()*255,this.lifeSpan);
  context.fill();

}

Particle.prototype.update = function(){
  this.vel.add(this.acc);
  this.pos.add(this.vel);
  this.lifeSpan -= 1;
}

Particle.prototype.run = function(){
  this.update();
  this.draw();
}

Particle.prototype.isDead = function(){
  if(this.lifeSpan < 0.0){
    return true;
  }else{
    return false;
  }
}
