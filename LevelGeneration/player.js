function Player(x,y,rad,color,speed,ctx){
  this.pos = new JSVector(x,y);
  this.targetPos = new JSVector(x,y);
  this.rad = rad;
  this.color = color;
  this.speed = speed;
  this.ctx = ctx;
  this.prevMove = new JSVector(0,0);
}

Player.prototype.update = function(dx,dy,cells){
  this.changeTarget(dx,dy,cells);
  this.draw();
}

Player.prototype.move = function(t){
  let dir = JSVector.subGetNew(this.targetPos,this.pos);
  dir.setMagnitude(dir.getMagnitude()*t);
  this.prevMove = dir;
  this.pos.add(dir);
}

Player.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.fillStyle = this.color.toString();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2);
  this.ctx.fill();
}

Player.prototype.changeTarget = function(dx,dy,cells){

  this.color = new Color(255,0,0,1);

  for(var i = 0;i<cells.length;i++){
    for(var k = 0;k<cells[i].walls.length;k++){
      let wall = cells[i].walls[k];
      if(wall.isColliding(this.pos,this.rad)){

        dx*=Math.cos(wall.angle);
        dy*=Math.sin(wall.angle);
        this.pos.sub(this.prevMove);
        this.targetPos = new JSVector(this.pos.x,this.pos.y);
      }
    }
  }

  if(Math.abs(dx)<Number.EPSILON&&Math.abs(dy)<Number.EPSILON) return;

  let delta = new JSVector(dx,dy);
  delta.setMagnitude(this.speed);
  this.targetPos.add(delta);

  this.move(0.2);
}
