function Player(x,y,rad,clr,speed,life,ctx){

  Character.call(this,x,y,rad,clr,speed,life,ctx);

  this.particleSystem = new ParticleSystem(x,y);
  this.particleSystem.pos = this.pos;
}

Player.prototype = new Character();

Player.prototype.run = function(){
  this.processInput();
  this.update();
  this.shootParticles();
}

Player.prototype.processInput = function(){
  let dx,dy = 0;

  if(keys["KeyW"]){
    dy = -1;
  }
  else if(keys["KeyS"]){
    dy = 1;
  }
  if(keys["KeyD"]){
    dx = 1;
  }
  else if(keys["KeyA"]){
    dx = -1;
  }

  this.vel = new JSVector(dx,dy);
}

Player.prototype.shootParticles = function(){
  if(mouseStatus){
    this.particleSystem.generateParticles(mousePos,this.vel);
  }
  this.particleSystem.update();
}
