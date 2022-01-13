function MazeGenerator(pos,cellSize,rows,cols,ctx){
  this.ctx = ctx;
  this.rows = rows;
  this.cols = cols;
  this.cellSize = cellSize;
  this.pos = pos;
  this.cells = [];

  this.resetGrid();
  this.generateMaze(0);
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

    this.removeDoubleWalls();
    for(var i = 0;i<this.cells.length;i++){
      this.cells[i].generateWalls();
    }
    return;
  }
  if(neighbor == n){
    this.cells[cell].wallStatus.n = false;
    this.cells[neighbor].wallStatus.s = false;
  }
  if(neighbor == s){
    this.cells[cell].wallStatus.s = false;
    this.cells[neighbor].wallStatus.n = false;
  }
  if(neighbor == w){
    this.cells[cell].wallStatus.w = false;
    this.cells[neighbor].wallStatus.e = false;
  }
  if(neighbor == e){
    this.cells[cell].wallStatus.e = false;
    this.cells[neighbor].wallStatus.w = false;
  }
  this.cells[neighbor].connectedTo = cell;

  this.generateMaze(neighbor);
}

MazeGenerator.prototype.resetGrid = function(){
  this.cells = [];
  for(var j = 0;j<this.rows;j++){
    for(var i = 0;i<this.cols;i++){
      let x = i*this.cellSize;
      let y = j*this.cellSize;
      let cell = new Cell(x,y,this.cellSize,ctx);
      this.cells.push(cell);
    }
  }
}

MazeGenerator.prototype.update= function(){
  this.ctx.save();
  this.ctx.translate(this.pos.x,this.pos.y);
  for(var i = 0;i<this.cells.length;i++){
    this.cells[i].draw();
  }
  this.ctx.restore();
}

MazeGenerator.prototype.removeDoubleWalls = function(){
  for(var i = 0;i<this.cells.length;i++){
    if(this.cells[i].wallStatus.n){
      let n = i-this.rows;
      if(n>=0) this.cells[n].wallStatus.s = false;
    }
    if(this.cells[i].wallStatus.s){
      let s = i+this.rows;
      if(s<this.cells.length) this.cells[s].wallStatus.n = false;
    }
    if(this.cells[i].wallStatus.e){
      let e = i+1;
      if(e%this.rows!=0) this.cells[e].wallStatus.w = false;
    }
    if(this.cells[i].wallStatus.w){
      let w = i-1;
      if((w+1)%this.rows!=0) this.cells[w].wallStatus.e = false;
    }
  }
}
