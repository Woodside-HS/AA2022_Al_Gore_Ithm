function Pathfinder(cells, numRows, numCols, start, destination){
  this.cells = [];

  for(let c =0; c<numCols; c++){
    this.cells.push([]);
    for(let r = 0;r<numRows; r++){
      this.cells[c].push(cells[c*numCols+r]);
    }
  }

  this.visited = [];
  this.queue = [];
  this.destination = destination;
  this.numRows = numRows;
  this.numCols = numCols;
  this.path = [];

  this.findPath(start, destination, null);

  return this.path;
}
Pathfinder.prototype.findPath = function(start, destination, previous){
  start.previousCell = previous;
  this.visited.push(start);
  if(start.pos.x==destination.pos.x&&start.pos.y==destination.pos.y){
    this.finishedPath(start);
    return;
  }

  let cellsToCheck = [];

  if(start.coordinates.x!=0){
    let temp = this.cells[start.coordinates.y][start.coordinates.x-1];
    if(!temp.wallStatus.e){
      cellsToCheck.push(temp);
    }
  }

  if(start.coordinates.y!=0){
    let temp = this.cells[start.coordinates.y-1][start.coordinates.x];
    if(!temp.wallStatus.s){
      cellsToCheck.push(temp);
    }
  }

  if(start.coordinates.x!=this.numRows-1){
    if(!start.wallStatus.e){
      cellsToCheck.push(this.cells[start.coordinates.y][start.coordinates.x+1]);
    }
  }

  if(start.coordinates.y!=this.numCols-1){
    if(!start.wallStatus.s){
      cellsToCheck.push(this.cells[start.coordinates.y+1][start.coordinates.x]);
    }
  }

  for(let k = 0; k<cellsToCheck.length;k++){
    let visited = false;
    for(let i=0;i<this.visited.length;i++){
      if(this.visited[i].pos.x==cellsToCheck[k].pos.x&&this.visited[i].pos.y==cellsToCheck[k].pos.y){
        visited = true;
      }
    }
    if(!visited){
      this.queue.push(cellsToCheck[k], start);
    }
  }

  this.update();
}
Pathfinder.prototype.update = function(){
  if(this.queue.length>1){
    let temp = this.queue[0];
    let current = this.queue[1];
    this.queue.splice(0, 2);
    this.findPath(temp, this.destination, current);
  }
  else console.log("couldn't find a path");
}

Pathfinder.prototype.finishedPath = function(cell){
  this.path.unshift(cell);
  if(cell.previousCell != null){
    this.finishedPath(cell.previousCell);
  }

}
