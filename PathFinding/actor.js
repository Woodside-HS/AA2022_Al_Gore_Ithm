/*
    IMPORTANT:

    THIS CLASS IS FOR TESTING PURPOSES ONLY. IT WILL NOT BE IMPLEMENTED IN THE FINAL PROJECT

    This class includes a path following algorithm that will be implemented later on in the enemy.js class.

*/



function Actor(cnv, ctx, scale, numRows, numCols){
  this.ctx = ctx;
  this.cnv = cnv;
  this.numCols = numCols;
  this.numRows = numRows;
  this.scale = scale;
  this.color = "blue";
  this.rad = 10;
  let startingCoordinates = new JSVector(Math.floor(Math.random()*numRows), Math.floor(Math.random()*numCols));
  //console.log(startingCoordinates);
  this.pos = new JSVector(startingCoordinates.x*scale+scale/2, startingCoordinates.y*scale+scale/2);
  let startingCell = Pathfinder.getCell(levels[currentLevel].maze.cells, this.numCols, this.pos, this.scale);
  let endingCell = Pathfinder.getCell(levels[currentLevel].maze.cells, this.numCols, levels[currentLevel].player.pos, this.scale);
  this.path = new Pathfinder(levels[currentLevel].maze.cells, numRows, numCols, startingCell, endingCell);
  this.vel = JSVector.subGetNew(this.path[1].coordinates, this.path[0].coordinates).setMagnitude(3);
  this.acc = new JSVector(0, 0);
  this.destination = new JSVector(this.scale/2, this.scale/2);
  this.lerp = false;
}

Actor.prototype.update = function(){
  if(this.path[1]!=null){
    let dir = new JSVector(this.path[1].coordinates.x, this.path[1].coordinates.y);
    dir.multiply(this.scale).add(new JSVector(this.scale/2, this.scale/2));
    this.destination = dir;
    if(JSVector.subGetNew(this.path[1].coordinates, Pathfinder.getCoordinates(this.pos, this.scale)).getMagnitude()==0){
      let startingCell = Pathfinder.getCell(levels[currentLevel].maze.cells, this.numCols, this.pos, this.scale);
      let targetCell = Pathfinder.getCell(levels[currentLevel].maze.cells, this.numCols, levels[currentLevel].player.pos, this.scale);
      this.path = new Pathfinder(levels[currentLevel].maze.cells, this.numRows, this.numCols, startingCell, targetCell);
      if(this.path[1]!=null){
        let dir = new JSVector(this.path[1].coordinates.x, this.path[1].coordinates.y);
        dir.multiply(this.scale).add(new JSVector(this.scale/2, this.scale/2));
        this.destination = dir;
      }
    }
  }
  else{
    this.lerp = true;
    this.destination = levels[currentLevel].player.pos;
    if(JSVector.subGetNew(this.pos, this.destination).getMagnitude()>this.scale){
      this.lerp = false;
      let startingCell = Pathfinder.getCell(levels[currentLevel].maze.cells, this.numCols, this.pos, this.scale);
      let targetCell = Pathfinder.getCell(levels[currentLevel].maze.cells, this.numCols, levels[currentLevel].player.pos, this.scale);
      this.path = new Pathfinder(levels[currentLevel].maze.cells, this.numRows, this.numCols, startingCell, targetCell);
    }
  }


  if(this.lerp){
    let dir = JSVector.subGetNew(this.destination, this.pos).divide(12);
    if(dir.getMagnitude()>Number.EPSILON){
      this.pos.add(dir);
    }
  }
  else{
    this.acc = JSVector.subGetNew(this.destination, this.pos).setMagnitude(1);
    let oldVel = this.vel.getMagnitude();
    this.vel.add(this.acc);
    this.vel.setMagnitude(oldVel);
    this.pos.add(this.vel);
  }

}
Actor.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2*Math.PI);
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
}
Actor.prototype.run = function(){
  this.update();
  this.checkEdges();
  this.draw();
}
Actor.prototype.checkEdges = function(){
  if(this.pos.x<this.rad||this.pos.x>this.cnv.width-this.rad){
    this.vel.x=Math.sign(this.cnv.width/2-this.pos.x)*Math.abs(this.vel.x);
  }
  if(this.pos.y<this.rad||this.pos.y>this.cnv.height-this.rad){
    this.vel.y=Math.sign(this.cnv.height/2-this.pos.y)*Math.abs(this.vel.y);
  }
  this.detectWallCollision();
}

Actor.prototype.detectWallCollision = function(){
  let cellsToCheck = [];
  let coordinates = Pathfinder.getCoordinates(this.pos, this.scale);
  cellsToCheck.push(this.findCell(coordinates.x, coordinates.y));
  if(coordinates.x!=0){
    cellsToCheck.push(this.findCell(coordinates.x-1, coordinates.y));
  }
  if(coordinates.y!=0){
    cellsToCheck.push(this.findCell(coordinates.x, coordinates.y-1));
  }
  let wallsToCheck = [];
  for(let i=0;i<cellsToCheck.length;i++){
    for(let k=0;k<cellsToCheck[i].walls.length;k++){
      wallsToCheck.push(cellsToCheck[i].walls[k]);
    }
  }

  for(let i=0;i<wallsToCheck.length;i++){
    if(wallsToCheck[i].isColliding(this.pos, this.rad)){
      if(wallsToCheck[i].angle==Math.PI/2){
        this.vel.x*=-1;
      }
      else this.vel.y*=-1;
    }
  }

}
Actor.prototype.findCell = function(r, c){
  return levels[currentLevel].maze.cells[this.numCols*c+r];
}
