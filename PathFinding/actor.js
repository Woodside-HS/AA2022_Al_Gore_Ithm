/*
    IMPORTANT:

    THIS CLASS IS FOR TESTING PURPOSES ONLY. IT WILL NOT BE IMPLEMENTED IN THE FINAL PROJECT

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
  let startingCell = Pathfinder.getCell(levels[currentLevel].mazeGenerator.cells, this.numCols, this.pos, this.scale);
  let endingCell = Pathfinder.getCell(levels[currentLevel].mazeGenerator.cells, this.numCols, levels[currentLevel].player.pos, this.scale);
  this.path = new Pathfinder(levels[currentLevel].mazeGenerator.cells, numRows, numCols, startingCell, endingCell);
  this.vel = JSVector.subGetNew(this.path[1].coordinates, this.path[0].coordinates).setMagnitude(3);
  this.acc = new JSVector(0, 0);
  this.destination = new JSVector(this.scale/2, this.scale/2);
}

Actor.prototype.update = function(){
  if(this.path.length>1){
    let dir = new JSVector(this.path[1].coordinates.x, this.path[1].coordinates.y);
    dir.multiply(this.scale).add(new JSVector(this.scale/2, this.scale/2));
    this.destination = dir;
    let currentCoordinates = new JSVector(Math.floor(this.pos.x/this.scale), Math.floor(this.pos.y/this.scale));
    if(JSVector.subGetNew(this.path[1].coordinates, currentCoordinates).getMagnitude()==0){
      let startingCell = Pathfinder.getCell(levels[currentLevel].mazeGenerator.cells, this.numCols, this.pos, this.scale);
      let targetCell = Pathfinder.getCell(levels[currentLevel].mazeGenerator.cells, this.numCols, levels[currentLevel].player.pos, this.scale);
      //this.path = new Pathfinder(levels[currentLevel].mazeGenerator.cells, this.numRows, this.numCols, startingCell, targetCell);
      this.path.splice(0, 1);
      if(this.path.length>1){
        let dir = new JSVector(this.path[1].coordinates.x, this.path[1].coordinates.y);
        dir.multiply(this.scale).add(new JSVector(this.scale/2, this.scale/2));
        this.destination = dir;
      }
    }
  }
  let destinationPos = new JSVector(this.path[this.path.length-1].pos.x+this.scale/2, this.path[this.path.length-1].pos.y+this.scale/2);
  this.acc = JSVector.subGetNew(this.destination, this.pos).setMagnitude(1);
  let oldVel = this.vel.getMagnitude();
  this.vel.add(this.acc);
  this.vel.setMagnitude(oldVel);
  this.pos.add(this.vel);

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
  this.draw();
}
