function Character(x,y,rad,clr,speed,life,ctx){
  this.pos = new JSVector(x,y);
  this.targetPos = new JSVector(this.pos.x,this.pos.y);
  this.rad = rad;
  this.speed = speed;
  this.vel = new JSVector(0,0);
  this.prevMove = new JSVector(0,0);
  this.life = life;
  this.clr = clr;
  this.ctx = ctx;
}

Character.prototype.update = function(){ //NO MAZE GENERATOR SINCE FOR TESTING

  if(this.life<0) return false;

  //let delta = mazeGenerator.detectCharacterCollision(this.vel.x,this.vel.y,this,this.prevMove); //Updates movement depending on collision with walls of maze
  let delta = new JSVector(this.vel.x,this.vel.y);//TESTING PURPOSES - above line is correct for real game

  if(delta.getMagnitude()<Number.EPSILON){ //Checks if delta is basically zero
    this.move(0.2);
    this.draw();
    return true;
  }

  delta.setMagnitude(this.speed);
  this.targetPos.add(delta);

  this.move(0.2);
  this.draw();

  return true;
}

Character.prototype.move = function(t){
  let dir = JSVector.subGetNew(this.targetPos,this.pos);
  dir.setMagnitude(dir.getMagnitude()*t); //interpolation
  this.prevMove = dir;
  this.pos.add(dir);
}

Character.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2);
  this.ctx.fillStyle = this.clr.toString();
  this.ctx.fill();
}
