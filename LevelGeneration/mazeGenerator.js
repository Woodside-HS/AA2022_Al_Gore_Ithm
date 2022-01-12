function MazeGenerator(pos,cellSize,rows,cols,ctx){
  this.ctx = ctx;
  this.rows = rows;
  this.cols = cols;
  this.cellSize = cellSize;
  this.pos = pos;
  this.cells = [];

  this.resetGrid();
  this.generateMaze(0);
  this.removeDoubleWalls();
}

MazeGenerator.prototype.generateMaze = function(cell){
  this.cells[cell].visited = true;

  let n = cell-this.rows;
  let s = cell+this.rows;
  let e = cell+1;
  let w = cell-1;

  let neighborArr = [];

  if(n>=0) neighborArr.push(n);
  if(s<this.cells.length) neighborArr.push(s);
  if(e%this.rows!=0) neighborArr.push(e);
  if((w+1)%this.rows!=0) neighborArr.push(w);

  var neighbor = -1;
  for(i = 0;i<neighborArr.length;i++){//selects random defined neighbor
    let randIndex = Math.floor(Math.random()*(neighborArr.length-i));
    let index = neighborArr[randIndex];
    if(this.cells[index]!=null){
      if(!this.cells[index].visited){ //check if currently randomly selected neighbor is defined
        neighbor = index;
        break;
      }
    }

    let temp = neighborArr[randIndex];
    neighborArr[randIndex] = neighborArr[neighborArr.length-i-1];
    neighborArr[neighborArr.length-i-1] = temp;
  }
  if(neighbor<0){
    if(this.cells[cell].connectedTo>=0){
      this.generateMaze(this.cells[cell].connectedTo);
    }
    return;
  }
  if(neighbor == n){
    this.cells[cell].walls.n = false;
    this.cells[neighbor].walls.s = false;
  }
  if(neighbor == s){
    this.cells[cell].walls.s = false;
    this.cells[neighbor].walls.n = false;
  }
  if(neighbor == w){
    this.cells[cell].walls.w = false;
    this.cells[neighbor].walls.e = false;
  }
  if(neighbor == e){
    this.cells[cell].walls.e = false;
    this.cells[neighbor].walls.w = false;
  }
  this.cells[neighbor].connectedTo = cell;

  this.generateMaze(neighbor);
}

MazeGenerator.prototype.resetGrid = function(){
  this.cells = [];
  for(var i = 0;i<this.cols;i++){
    for(var j = 0;j<this.rows;j++){
      let x = this.pos.x+j*this.cellSize;
      let y = this.pos.y+i*this.cellSize;
      let cell = new Cell(x,y,this.cellSize,ctx);
      this.cells.push(cell);
    }
  }
}

MazeGenerator.prototype.update= function(){
  for(var i = 0;i<this.cells.length;i++){
    this.cells[i].draw();
  }
}

MazeGenerator.prototype.removeDoubleWalls = function(){
  for(var i = 0;i<this.cells;i++){
    if(this.cells[i].walls.n){
      let n = i-this.rows;
      if(n>=0) this.cells[n].walls.s = false;
    }
    if(this.cells[i].walls.s){
      let s = i+this.rows;
      if(s<this.cells.length) this.cells[s].walls.n = false;
    }
    if(this.cells[i].walls.e){
      let e = i+1;
      if(e%this.rows!=0) this.cells[e].walls.w = false;
    }
    if(this.cells[i].walls.w){
      let w = i-1;
      if((w+1)%this.rows!=0) this.cells[w].walls.e = false;
    }
  }
}
