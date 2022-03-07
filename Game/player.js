function Player(x,y,rad,clr,speed,life,cnv,ctx,imgSrc,particleDamage,firingRate){
  Character.call(this,x,y,rad,clr,speed,life,cnv,ctx,imgSrc,cnv.width-10,20,new Color(0.1,0.1,2,false),particleDamage,firingRate);
}

Player.prototype = new Character(); //inherits character class

Player.prototype.run = function(maze){
  this.particleSystem.update(maze); //updates all particles regardless if mouse down //shoots particles if mouse down - aimed towards mouse click
  this.update(maze); //runs character update method
  this.particleSystem.pos = new JSVector(this.pos.x,this.pos.y);
  if(mouseStatus && game.levels[game.currentLevel].detectPause != true){ //only shoots when mouse down
    let target = JSVector.addGetNew(mousePos,this.pos);
    target.sub(new JSVector(this.cnv.width/2,this.cnv.height/2));
    this.particleSystem.generateParticles(target,this.vel);
  }
}
