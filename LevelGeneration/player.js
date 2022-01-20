function Player(x,y,rad,color,speed,ctx){
  this.pos = new JSVector(x,y);
  this.targetPos = new JSVector(x,y);
  this.rad = rad;
  this.color = color;
  this.speed = speed;
  this.vel = new JSVector(0,0);
  this.prevMove = new JSVector(0,0);
  this.ctx = ctx;
}

Player.prototype.update = function(mazeGenerator){

  this.processInput();

  let delta = mazeGenerator.detectCharacterCollision(this.vel.x,this.vel.y,this,this.prevMove);

  if(Math.abs(delta.x)<Number.EPSILON&&Math.abs(delta.y)<Number.EPSILON){
    this.move(0.2);
    this.draw();
    return;
  }

  delta.setMagnitude(this.speed);
  this.targetPos.add(delta);

  this.move(0.2);
  this.draw();
}

Player.prototype.move = function(t){
  let dir = JSVector.subGetNew(this.targetPos,this.pos);
  dir.setMagnitude(dir.getMagnitude()*t);
  this.prevMove = dir;
  this.pos.add(dir);
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

Player.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.fillStyle = this.color.toString();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2);
  this.ctx.fill();
}
