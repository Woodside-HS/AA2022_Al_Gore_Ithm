function MazeGenerator(cellSize,rows,cols,ctx,wallClr){
  this.ctx = ctx;
  this.rows = rows;
  this.cols = cols;
  this.cellSize = cellSize;
  this.cells = [];
  this.borderWalls = [];
  this.wallClr = wallClr

  this.resetGrid();
  this.generateMaze(0);

  for(var i = 0;i<this.cells.length;i++){
    this.cells[i].generateWalls();
  }
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
  if(neighbor<0){ //checks if there is no available neighbor
    if(this.cells[cell].connectedTo>=0){
      this.generateMaze(this.cells[cell].connectedTo);
    }
    return;
  }
  if(neighbor == n){ //removes northern wall
    this.cells[neighbor].wallStatus.s = false;
  }
  if(neighbor == s){ //removes southern wall
    this.cells[cell].wallStatus.s = false;
  }
  if(neighbor == w){ //removes western wall
    this.cells[neighbor].wallStatus.e = false;
  }
  if(neighbor == e){ //removes eastern wall
    this.cells[cell].wallStatus.e = false;
  }
  this.cells[neighbor].connectedTo = cell; //links next cell to the current cell

  this.generateMaze(neighbor); //recursively calls maze generation in the next cell
}

MazeGenerator.prototype.resetGrid = function(){
  //makes 1d array for grid cells
  this.cells = [];
  for(var j = 0;j<this.rows;j++){
    for(var i = 0;i<this.cols;i++){
      let x = i*this.cellSize;
      let y = j*this.cellSize;
      let cell = new Cell(x,y,this.cellSize,ctx,this.wallClr);
      this.cells.push(cell);
    }
  }

  let width = this.cols*this.cellSize;
  let height = this.rows*this.cellSize;

  //gives world a border

  let n = new Wall(this.ctx,0,0,0,width,this.wallClr);
  let w = new Wall(this.ctx,0,0,90,height,this.wallClr);

  this.borderWalls = [n,w];
}

MazeGenerator.prototype.update = function(){
  for(var i = 0;i<this.cells.length;i++){
    this.cells[i].draw();
  }
  for(var i = 0;i<this.borderWalls.length;i++){
    this.borderWalls[i].draw();
  }
}

MazeGenerator.prototype.detectCharacterCollision = function(dx,dy,character,prevMove){
  let shiftedPos = new JSVector(character.pos.x-this.cellSize/2,character.pos.y-this.cellSize/2); //position of character shifted to center of cell

  let closeCells = [];

  let r = Math.floor((shiftedPos.y+this.cellSize/2)/this.cellSize);
  let c = Math.floor((shiftedPos.x+this.cellSize/2)/this.cellSize);
  let i_center = Math.round(c + r*this.cols);
  let i_n = i_center-this.cols;
  let i_w = i_center-1;
  let i_s = i_center+this.cols;
  let i_e = i_center+1;
  let i_nw = i_n-1;
  let i_ne = i_n+1;
  let i_sw = i_s-1;
  let i_se = i_s+1;

  //loads all surrounding cells *******************//
  let center = this.cells[i_center]; //current cell
  let n = this.cells[i_n]; //top cell
  let w = this.cells[i_w]; //left cell
  let s = this.cells[i_s];
  let e = this.cells[i_e];
  let nw = this.cells[i_nw];
  let ne = this.cells[i_ne];
  let sw = this.cells[i_sw];
  let se = this.cells[i_se];

  let northBorder = i_n<0;
  let southBorder = i_s>=this.cells.length;
  let eastBorder = i_e%this.cols==0;
  let westBorder = i_center%this.cols==0;

  if(center!=undefined){
    closeCells.push(center);
  }

  if(!northBorder){
    closeCells.push(n);

    if(!westBorder) closeCells.push(nw);
    if(!eastBorder) closeCells.push(ne);
  }

  if(!southBorder){
    closeCells.push(s);

    if(!westBorder) closeCells.push(sw);
    if(!eastBorder) closeCells.push(se);
  }

  if(!westBorder) closeCells.push(w);
  if(!eastBorder) closeCells.push(e);

  //*************************************************//

  let walls = [];
  //loads all walls surrounding the current cell
  for(var i = 0;i<closeCells.length;i++){
    for(var k = 0;k<closeCells[i].walls.length;k++){
      walls.push(closeCells[i].walls[k]);
    }
  }
  //loads broder walls of world
  for(var i = 0;i<this.borderWalls.length;i++){
    walls.push(this.borderWalls[i]);
  }
  //checks if character is colliding any walls and updates velocity depending on angle of walls
  for(var i = 0;i<walls.length;i++){
    if(walls[i].isColliding(character.pos,character.rad)){

      dx*=Math.cos(walls[i].angle);
      dy*=Math.sin(walls[i].angle);
      character.pos.sub(prevMove);
      character.targetPos = new JSVector(character.pos.x,character.pos.y);
    }
  }

  return new JSVector(dx,dy); //return chenged velocity depending on wall collisions
}
