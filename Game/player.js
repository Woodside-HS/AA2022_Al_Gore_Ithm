function Player(x,y,rad,speed,life,cnv,ctx,imgSrc,particleDamage,firingRate){
  Character.call(this,x,y,rad,speed,life,cnv,ctx,imgSrc,cnv.width-10,20,new Color(0.1,0.1,2,false),particleDamage,firingRate);

  this.inventory = new Inventory(10,40,240,cnv.height*0.8,this.cnv,this.ctx);
}

Player.prototype = new Character(); //inherits character class

Player.prototype.run = function(maze){
  this.particleSystem.update(maze); //updates all particles regardless if mouse down //shoots particles if mouse down - aimed towards mouse click
  this.update(maze); //runs character update method
  this.particleSystem.pos = new JSVector(this.pos.x,this.pos.y);
  if(mouseStatus){ //only shoots when mouse down
    let target = JSVector.addGetNew(mousePos,this.pos);
    target.sub(new JSVector(this.cnv.width/2,this.cnv.height/2));
    this.particleSystem.generateParticles(target,this.vel);
  }
}

Player.prototype.pickUpItem = function(item){
  if(this.pos.distance(item.pos)<=this.rad+item.rad){
    this.inventory.addItem(item);
    item.execute(this);
    return true;
  }
  return false;
}

Player.prototype.dropItem = function(powerup_only){
  if(this.inventory.items.length==0)  return null;
  let item = this.inventory.items[this.inventory.items.length-1];
  if(item.label=="key"||(powerup_only&&!item.isPowerup)) return null;

  this.inventory.removeItem(this.inventory.length-1);
  item.drop(this);
  return item;
}
