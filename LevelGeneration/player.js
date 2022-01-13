function Player(x,y,rad,color,speed,ctx){
  this.pos = new JSVector(x,y);
  this.targetPos = new JSVector(x,y);
  this.rad = rad;
  this.color = color;
  this.speed = speed;
  this.ctx = ctx;
  this.prevMove = new JSVector(0,0);
}

Player.prototype.update = function(dx,dy,mazeGenerator){
  this.changeTarget(dx,dy,mazeGenerator);
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

Player.prototype.changeTarget = function(dx,dy,mazeGenerator){

  this.color = new Color(255,0,0,1);
  let shiftedPos = new JSVector(this.pos.x-mazeGenerator.cellSize/2,this.pos.y-mazeGenerator.cellSize/2)

  let closeCells = [];

  let r = Math.floor(shiftedPos.y/mazeGenerator.cellSize);
  let c = Math.floor(shiftedPos.x/mazeGenerator.cellSize);
  let i_center = Math.round(c + r*mazeGenerator.cols);
  let i_n = i_center-mazeGenerator.cols;
  let i_w = i_center-1;

  console.log(i_center);

  let center = mazeGenerator.cells[i_center]; //current cell
  let n = mazeGenerator.cells[i_n]; //top cell
  let w = mazeGenerator.cells[i_w]; //left cell

  if(center!=undefined)closeCells.push(center);
  if(n!=undefined)closeCells.push(n);
  if(i_center%mazeGenerator.cols!=0&&w!=undefined)closeCells.push(w);

  for(var i = 0;i<closeCells.length;i++){
    for(var k = 0;k<closeCells[i].walls.length;k++){
      let wall = closeCells[i].walls[k];
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
