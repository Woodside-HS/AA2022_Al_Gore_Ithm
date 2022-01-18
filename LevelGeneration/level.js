function Level(player,r,c,cellSize,enemies,boss,ctx){
    this.mazeGenerator = new MazeGenerator(cellSize,r,c,ctx,new Color(0,0,0,1));
    this.enemies = enemies;
    this.boss = boss;
    this.ctx = ctx;
}

Level.prototype.update = function(){

}
