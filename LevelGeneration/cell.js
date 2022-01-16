function Cell(x,y,scale,ctx,wallClr){
  this.pos = new JSVector(x,y);
  this.scale = scale;
  this.ctx = ctx;
  this.connectedTo = -1;
  this.visited = false;
  this.wallStatus = {
    s:true,
    e:true
  }
  this.walls = [];
  this.wallClr = wallClr;
}

Cell.prototype.draw = function(){
  for(var i = 0;i<this.walls.length;i++){
    this.walls[i].run();
  }
}

Cell.prototype.generateWalls = function(){
  this.walls = [];
  if(this.wallStatus.s){
    this.addWall(this.pos.x,this.pos.y+this.scale,0,this.scale);
  }
  if(this.wallStatus.e){
    this.addWall(this.pos.x+this.scale,this.pos.y,90,this.scale);
  }
}

Cell.prototype.addWall = function(x,y,angle,length){
  let wall = new Wall(this.ctx,x,y,angle,length,this.wallClr);
  this.walls.push(wall);
}
