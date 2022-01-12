function Cell(x,y,scale,color,ctx){
  this.pos = new JSVector(x,y);
  this.scale = scale;
  this.color = color;
  this.ctx = ctx;
  this.connectedTo = null;
  this.visited = false;
  this.neighbors = {
    n:null,
    e:null,
    w:null,
    s:null,
  };
  this.walls = {
    n:true,
    s:true,
    w:true,
    e:true
  }
}
Cell.prototype.loadNeighbors = function(world){ //FIX METHOD
  let r = (this.pos.y+world.dimensions.y/2)/this.scale;
  let c = (this.pos.x+world.dimensions.x/2)/this.scale;
  let rowSize = world.dimensions.x/this.scale;
  let index = c + r*rowSize;

  let top = index<rowSize //check if in top row
  let bottom = index>=world.cells.length-rowSize //check if in bottom row
  let left = index%rowSize == 0 //checks if in first column
  let right = (index+1)%rowSize == 0 //checks if in last column

  if(!top){
    this.neighbors.n = world.cells[index-rowSize];
  }
  if(!bottom){
    this.neighbors.s = world.cells[index+rowSize];
  }
  if(!right){
    this.neighbors.e = world.cells[index+1];
  }
  if(!left){
    this.neighbors.w = world.cells[index-1];
  }
}
Cell.prototype.buildMaze = function(world){
  this.visited = true;
  this.isPath = false;
  this.loadNeighbors(world);
  let neighborArr = [
    this.neighbors.n,
    this.neighbors.s,
    this.neighbors.e,
    this.neighbors.w,
  ];
  var neighbor;
  for(i = 0;i<neighborArr.length;i++){//selects random defined neighbor
    let randIndex = Math.floor(Math.random()*(neighborArr.length-i));
    neighbor = neighborArr[randIndex];

    if(neighbor!=null&&!neighbor.visited) break; //check if currently randomly selected neighbor is defined

    let temp = neighborArr[randIndex];
    neighborArr[randIndex] = neighborArr[neighborArr.length-i-1];
    neighborArr[neighborArr.length-i-1] = temp;
  }
  if(neighbor==null||neighbor.visited){
    if(this.connectedTo!=null){
      this.connectedTo.buildMaze(world);
    }
    return;
  }
  if(neighbor == this.neighbors.n){
    this.walls.n = false;
    this.neighbors.n.walls.s = false;
  }
  if(neighbor == this.neighbors.s){
    this.walls.s = false;
    this.neighbors.s.walls.n = false;
  }
  if(neighbor == this.neighbors.w){
    this.walls.w = false;
    this.neighbors.w.walls.e = false;
  }
  if(neighbor == this.neighbors.e){
    this.walls.e = false;
    this.neighbors.e.walls.w = false;
  }
  neighbor.connectedTo = this;
  neighbor.buildMaze(world);
}

Cell.prototype.draw = function(){

  this.ctx.strokeStyle = "black";
  this.ctx.lineWidth = 2;
  this.ctx.beginPath();
  if(this.walls.n){
    this.ctx.moveTo(this.pos.x,this.pos.y);
    this.ctx.lineTo(this.pos.x+this.scale,this.pos.y);
  }
  if(this.walls.s){
    this.ctx.moveTo(this.pos.x,this.pos.y+this.scale);
    this.ctx.lineTo(this.pos.x+this.scale,this.pos.y+this.scale);
  }
  if(this.walls.w){
    this.ctx.moveTo(this.pos.x,this.pos.y);
    this.ctx.lineTo(this.pos.x,this.pos.y+this.scale);
  }
  if(this.walls.e){
    this.ctx.moveTo(this.pos.x+this.scale,this.pos.y);
    this.ctx.lineTo(this.pos.x+this.scale,this.pos.y+this.scale);
  }
  this.ctx.stroke();
}
