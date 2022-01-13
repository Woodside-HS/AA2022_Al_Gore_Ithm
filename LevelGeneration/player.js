function Player(x,y,rad,color,speed,ctx){
  this.pos = new JSVector(x,y);
  this.targetPos = new JSVector(x,y);
  this.rad = rad;
  this.color = color;
  this.speed = speed;
  this.ctx = ctx;
}

Player.prototype.update = function(){
  this.move(0.2);
  this.draw();
}

Player.prototype.move = function(t){
  let dir = JSVector.subGetNew(this.targetPos,this.pos);
  dir.setMagnitude(dir.getMagnitude()*t);
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
      if(cells[i].walls[k].isColliding(this.pos,this.rad)){
        this.color = new Color(0,255,0,1);
        i = cells.length;
        break;
      }
    }
  }

  if(dx==0&&dy==0) return;
  /*if(dx<0){

  }
  else if(dx>0){

  }
  if(dy<0){

  }
  else if(dy>0){

  }*/

  let delta = new JSVector(dx,dy);
  delta.setMagnitude(this.speed);
  this.targetPos.add(delta);
}
