function Cell(x,y,scale,ctx,wallClr,imgSrc){
  this.pos = new JSVector(x,y);
  this.scale = scale;
  this.ctx = ctx;
  this.connectedTo = -1;
  this.visited = false;
  this.wallStatus = {
    n:false,
    w:false,
    s:true,
    e:true
  }
  this.walls = [];
  this.wallClr = wallClr;

  this.img = new Image();
  this.img.src = imgSrc;
  this.wallWidth = 10;
}

Cell.prototype.draw = function(){
  let shift = -this.wallWidth/2;
  let area = 1;//(this.scale-this.wallWidth)/this.scale;
  if(this.img.src!=null) this.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.pos.x+this.scale*(1-area)/2+shift,this.pos.y+this.scale*(1-area)/2+shift,this.scale*area,this.scale*area);

  for(var i = 0;i<this.walls.length;i++){
    this.walls[i].draw();
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
  if(this.wallStatus.n){
    this.addWall(this.pos.x,this.pos.y,0,this.scale);
  }
  if(this.wallStatus.w){
    this.addWall(this.pos.x,this.pos.y,90,this.scale);
  }
}

Cell.prototype.addWall = function(x,y,angle,length){

  let num_walls =  5; //5 different jpeg walls
  let rand_wall = Math.ceil(Math.random()*num_walls);
  let wallImgSrc = "../Files/Walls/wall"+rand_wall+".png";
  let wall = new Wall(this.ctx,x,y,angle,length,this.wallClr,wallImgSrc,this.wallWidth);
  this.walls.push(wall);
}
