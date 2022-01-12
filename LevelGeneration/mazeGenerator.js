function MazeGenerator(pos,cellSize,row,col,ctx){
  this.ctx = ctx;
  this.cells = [];

  for(var i = 0;i<col;i++){
    for(var j = 0;j<row;j++){
      let x = pos.x+i*cellSize;
      let y = pos.y+j*cellSize;
      let cell = new Cell(x,y,cellSize,new Color(255,255,255,1),ctx);
      this.cells.push(cell);
    }
  }
}

MazeGenerator.prototype.loadCellNeighbors = function(){

}

MazeGenerator.prototype.update= function(){
  for(var i = 0;i<this.cells.length;i++){
    this.cells[i].draw();
  }
}
