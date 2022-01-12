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

MazeGenerator.prototype.generateMaze = function(i){
  this.cells[i].visited = true;
  let n = i-this.rows;
  let s = i+this.rows;
  let e = i+1;
  let w = i-1;
  let neighborArr = [
    n,s,e,w
  ];

  var neighbor;
  for(i = 0;i<neighborArr.length;i++){//selects random defined neighbor
    let randIndex = Math.floor(Math.random()*(neighborArr.length-i));
    neighbor = neighborArr[randIndex];

    if(this.cells[neighbor]!=null&&!this.cells[neighbor ].visited) break; //check if currently randomly selected neighbor is defined

    let temp = neighborArr[randIndex];
    neighborArr[randIndex] = neighborArr[neighborArr.length-i-1];
    neighborArr[neighborArr.length-i-1] = temp;
  }
  if(this.cells[neighbor]==null||this.cells[neighbor].visited){
    if(this.cells[i].connectedTo>=0){
      this.generateMaze(this.cells[i].connectedTo);
    }
    return;
  }
  if(neighbor == n){
    this.cells[i].walls.n = false;
    this.cells[neighbor].walls.s = false;
  }
  if(neighbor == s){
    this.cells[i].walls.s = false;
    this.cells[neighbor].walls.n = false;
  }
  if(neighbor == w){
    this.cells[i].walls.w = false;
    this.cells[neighbor].walls.e = false;
  }
  if(neighbor == e){
    this.cells[i].walls.e = false;
    this.cells[neighbor].walls.w = false;
  }
  this.cells[neighbor].connectedTo = i;

  this.generateMaze(neighbor);
}

MazeGenerator.prototype.resetGrid = function(){
  this.cells = [];
  for(var i = 0;i<this.cols;i++){
    for(var j = 0;j<this.rows;j++){
      let x = this.pos.x+i*this.cellSize;
      let y = this.pos.y+j*this.cellSize;
      let cell = new Cell(x,y,this.cellSize,new Color(255,255,255,1),ctx);
      this.cells.push(cell);
    }
  }
}

MazeGenerator.prototype.update= function(){
  for(var i = 0;i<this.cells.length;i++){
    this.cells[i].draw();
  }
}
