function Level(r,c,cellSize,enemies,boss,player,ctx){
    //Generates maze for level
    this.maze = new Maze(cellSize,r,c,ctx,new Color(0,0,0,1));
    this.enemies = enemies;
    this.boss = boss; //To do: create enemy class
    this.player = player;
    this.ctx = ctx;
}

Level.prototype.update = function(){
  this.maze.update();

  /*for(var i = 0;i<this.enemies.length;i++){
    this.enemies[i].update(this.maze)
  }
  this.boss.update(this.maze);
  *///IMPLEMENT LATER

  this.player.update(this.maze);
}

Level.prototype.load = function(){
  let cellSize = this.maze.cellSize;
  let c = this.maze.cols;
  let r = this.maze.rows;

  this.player.pos = new JSVector(cellSize/2,cellSize/2); //top left of maze
  //this.boss.pos = new JSVector(c*cellSize-cellSize/2,r*cellSize-cellSize/2); //bottom right of maze
  this.scatterEnemies();
}

Level.prototype.scatterEnemies = function(){
  //IMPLEMENT LATER
}
