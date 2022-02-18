function Level(r,c,cellSize,enemies,boss,player,ctx){
  this.mazeGenerator = new MazeGenerator(cellSize,r,c,ctx,new Color(0,0,0,1));
  this.enemies = enemies;
  this.boss = boss; //To do: create enemy class
  this.player = player;
  this.ctx = ctx;
}

Level.prototype.update = function(){

  this.processInput();

  this.mazeGenerator.update();

  for(var i = 0;i<this.enemies.length;i++){
    if(!this.enemies[i].update(this.mazeGenerator)){
      this.enemies.splice(i,1);
      i--;
    }
  }
  this.boss.update(this.mazeGenerator);

  this.player.update(this.mazeGenerator);
}

Level.prototype.processInput = function(){
  let dx,dy = 0;

  if(keys["KeyW"]){
    dy = -1;
  }
  else if(keys["KeyS"]){
    dy = 1;
  }
  if(keys["KeyD"]){
    dx = 1;
  }
  else if(keys["KeyA"]){
    dx = -1;
  }

  this.player.vel = new JSVector(dx,dy);
}

Level.prototype.load = function(){
  let cellSize = this.mazeGenerator.cellSize;
  let c = this.mazeGenerator.cols;
  let r = this.mazeGenerator.rows;

  this.player.pos = new JSVector(cellSize/2,cellSize/2); //top left of maze
  //this.boss.pos = new JSVector(c*cellSize-cellSize/2,r*cellSize-cellSize/2); //bottom right of maze
  this.scatterEnemies();
}

Level.prototype.scatterEnemies = function(){
  //IMPLEMENT LATER
}
