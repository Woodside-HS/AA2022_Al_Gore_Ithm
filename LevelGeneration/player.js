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
        this.color = new Color(0,255,0,1);

        let x = this.pos.x;
        let y = this.pos.y;

        if(dx*(this.pos.x+this.rad+wall.width/2-wall.pos.x)>=0){
          x-=dx*wall.width+this.prevMove.x;
          dx*=Math.cos(wall.angle);
        }
        if(dy*(this.pos.y+this.rad+wall.width/2-wall.pos.y)>=0){
          y-=dy*wall.width+this.prevMove.y;
          dy*=Math.sin(wall.angle);
        }

        this.targetPos = new JSVector(x,y);
      }
    }
  }

  if(Math.abs(dx)<Number.EPSILON&&Math.abs(dy)<Number.EPSILON) return;

  let delta = new JSVector(dx,dy);
  delta.setMagnitude(this.speed);
  this.targetPos.add(delta);

  this.move(0.2);
}
