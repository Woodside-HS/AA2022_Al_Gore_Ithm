/*
    IMPORTANT:

    THIS CLASS IS FOR TESTING PURPOSES ONLY. IT WILL NOT BE IMPLEMENTED IN THE FINAL PROJECT

*/

function Actor(cnv, ctx, scale, numRows, numCols){
  this.ctx = ctx;
  this.cnv = cnv;
  this.scale = scale;
  this.color = "blue";
  this.rad = 10;
  let startingCoordinates = new JSVector(Math.floor(Math.random()*numRows), Math.floor(Math.random()*numCols));
  //console.log(startingCoordinates);
  this.pos = new JSVector(startingCoordinates.x*scale+scale/2, startingCoordinates.y*scale+scale/2);
  let startingCell = levels[currentLevel].mazeGenerator.cells[startingCoordinates.y*numCols+startingCoordinates.x];
  let endingCell = levels[currentLevel].mazeGenerator.cells[0];
  this.path = new Pathfinder(levels[currentLevel].mazeGenerator.cells, numRows, numCols, startingCell, endingCell);

}

Actor.prototype.update = function(){
  if(this.path.length>1){
    let dir = new JSVector(this.path[1].coordinates.x, this.path[1].coordinates.y);
    dir.multiply(this.scale).add(new JSVector(this.scale/2, this.scale/2));
    this.destination = dir;
    let currentCell = new JSVector(Math.floor(this.pos.x/this.scale), Math.floor(this.pos.y/this.scale));
    if(JSVector.subGetNew(this.path[1].coordinates, currentCell).getMagnitude()==0&&this.path.length>2){
      this.path.splice(0, 1);
      let dir = new JSVector(this.path[1].coordinates.x, this.path[1].coordinates.y);
      dir.multiply(this.scale).add(new JSVector(this.scale/2, this.scale/2));
      this.destination = dir;
    }
  }
  let diff = JSVector.subGetNew(this.destination, this.pos);
  if(diff.getMagnitude()>0.2){
    this.pos.add(diff.divide(15));
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
  this.draw();
}
