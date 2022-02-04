function Player(x,y,rad,clr,speed,life,cnv,ctx){

  Character.call(this,x,y,rad,clr,speed,life,ctx);

  this.cnv = cnv;
  this.particleSystem = new ParticleSystem(x,y,ctx);
  this.particleSystem.pos = this.pos; //position of particle system points to position of player
  this.healthbar = new Healthbar(cnv,ctx,this.life/100);
}

Player.prototype = new Character(); //inherits character class

Player.prototype.run = function(maze){
  this.update(maze); //runs character update method

  if(mouseStatus){ //only shoots when mouse down
    let target = JSVector.addGetNew(mousePos,this.pos).sub(new JSVector(maze.cellSize,maze.cellSize));
    console.log(target.x+","+target.y);
    this.particleSystem.generateParticles(target,this.vel);
  }
  this.particleSystem.update(maze); //updates all particles regardless if mouse down //shoots particles if mouse down - aimed towards mouse click
}
