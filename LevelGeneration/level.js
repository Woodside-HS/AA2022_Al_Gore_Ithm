function Level(r,c,cellSize,enemies,boss,ctx){
    this.mazeGenerator = new MazeGenerator(cellSize,r,c,ctx,new Color(0,0,0,1));
    this.enemies = enemies;
    this.boss = boss; //To do: create enemy class
    this.ctx = ctx;
}

Level.prototype.update = function(){
  this.mazeGenerator.update();
  player.update(this.mazeGenerator);
}
