function Player(x,y,rad,clr,speed,life,cnv,ctx){

  Character.call(this,x,y,rad,clr,speed,life,ctx);

  this.particleSystem = new ParticleSystem(x,y,ctx);
  this.particleSystem.pos = this.pos; //position of particle system points to position of player
  this.healthbar = new Healthbar(cnv,ctx,this.life/100);
}

Player.prototype = new Character(); //inherits character class

Player.prototype.run = function(maze){
  this.processInput();
  this.shootParticles(); //shoots particles if mouse down - aimed towards mouse click
  this.update(maze); //runs character update method
  this.healthbar.run();
}

Player.prototype.processInput = function(){
  let dx,dy = 0;
  //sets direction of movement depending on keys down
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
  if(mouseStatus){ //only shoots when mouse down
    this.particleSystem.generateParticles(mousePos,this.vel);
  }
  this.particleSystem.update(); //updates all particles regardless if mouse down
}
