function Pathfinder(cells, numRows, numCols, start, destination){

  this.cells = [];
  for(let c =0; c<numCols; c++){
    this.cells.push([]);
    for(let r = 0;r<numRows; r++){
      this.cells[c].push(cells[c*numCols+r]);
      this.cells[c][r].visited = false;
    }
  } //converts the 1D array (thanks shai) into a 2D array of cells, all of which are not visited yet



  start.visited = true; // a few initial conditions
  this.queue = [];
  this.path = [];

  this.findPath(start, destination); // executes the pathfinding algorithm (see below)

  return this.path; //returns an array of cells which, in order, make up the path from start to finish
}

Pathfinder.prototype.findPath = function(start, destination){

  if(start.pos.x==destination.pos.x&&start.pos.y==destination.pos.y){ // if the start and end cells are the same, the path has been found
    this.finishedPath(start); // calling te finished path method which takes the path and puts it in an array
    return; // stop the findPath() method
  }

/*    All cells have a right and bottom wall but no top or left wall, so checking the right wall of the cell to the left is like checking the left wall      */

  if(start.coordinates.x!=0){                                          // if the cell isn't in the leftmost column:
    let temp = this.cells[start.coordinates.y][start.coordinates.x-1]; // check the cell to the left
    this.checkCell(start, temp, temp.wallStatus.e);                    // check the right wall of the cell directly to the left
  }

  if(start.coordinates.y!=0){                                          // if the cell isn't in the top row:
    let temp = this.cells[start.coordinates.y-1][start.coordinates.x]; // check the cell above it
    this.checkCell(start, temp, temp.wallStatus.s);                    // check the bottom wall of the cell directly above
  }

  if(start.coordinates.x!=this.cells[0].length-1){                     // if the cell isn't in the rightmost column:
    let temp = this.cells[start.coordinates.y][start.coordinates.x+1]; // check the cell to the right
    this.checkCell(start, temp, start.wallStatus.e);                   // check the right wall of this cell
  }

  if(start.coordinates.y!=this.cells.length-1){                        // if the cell isn't in the bottom row:
    let temp = this.cells[start.coordinates.y+1][start.coordinates.x]; // check the cell below it
    this.checkCell(start, temp, start.wallStatus.s);                   // check the bottom wall of this cell
  }

  let newCell = this.queue[0];          //
  this.queue.splice(0, 1);              // executes the same method for the first cell in the queue and removes that cell from the queue
  this.findPath(newCell, destination);  //
}

Pathfinder.prototype.checkCell = function(currentCell, cellToCheck, wallToCheck){
  if(!wallToCheck && !cellToCheck.visited){ //if there isn't a wall between the current cell and the next one, and if the next one isn't already visited or in the queue:
    cellToCheck.previousCell = currentCell; //making a linked list
    cellToCheck.visited = true;
    this.queue.push(cellToCheck);           //the next cell is added to the queue and is marked as visited
  }
}

Pathfinder.prototype.finishedPath = function(cell){ //this method is called once the destination cell is reached
  this.path.unshift(cell); //adds the cell to the beginning of the path[] array
  if(cell.previousCell != null){ //if there is a previous cell, call the same method with that cell
    this.finishedPath(cell.previousCell);
  }
  //once this recursive function is broken, this.path[] will be an array of cells which, in order, contain the path
}

Pathfinder.getCoordinates = function(pos, scale){
  return new JSVector(Math.floor(pos.x/scale), Math.floor(pos.y/scale));
}

Pathfinder.getCell = function(cells, numCols, pos, scale){
  let coordinates = this.getCoordinates(pos, scale);
  return cells[numCols*coordinates.y+coordinates.x];
}
