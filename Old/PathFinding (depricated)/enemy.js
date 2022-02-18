function Enemy(x, y, rad, clr, maze, speed, life, cnv, ctx){
  Character.call(this, x, y, rad, clr, speed, life, ctx);
  this.acc = new JSVector(0, 0);
  this.maze = maze;
  this.scale = this.maze.cellSize;
  this.numRows = this.maze.rows;
  this.numCols = this.maze.cols;
  this.setPath();
  this.vel = JSVector.subGetNew(this.destination, this.pos).setMagnitude(this.speed);
}

Enemy.prototype = new Character();

Enemy.prototype.run = function(){
  this.findPath();
  this.update(this.maze);
}

Enemy.prototype.findPath = function(){
  if(this.path[1]==null||JSVector.subGetNew(this.path[1].coordinates, Pathfinder.getCoordinates(this.pos, this.scale)).getMagnitude()==0){
      this.setPath();
  }

  let oldVel = this.vel.getMagnitude();
  this.vel.add(this.acc);
  this.vel.setMagnitude(oldVel);
}

Enemy.prototype.setPath = function(){
  let startingCell = Pathfinder.getCell(game.levels[game.currentLevel].maze.cells, this.numCols, this.pos, this.scale);
  let targetCell = Pathfinder.getCell(game.levels[game.currentLevel].maze.cells, this.numCols, game.levels[game.currentLevel].player.pos, this.scale);
  this.path = new Pathfinder(game.levels[game.currentLevel].maze.cells, this.numRows, this.numCols, startingCell, targetCell);
  if(this.path[1]!=null){
    let dir = new JSVector(this.path[1].coordinates.x, this.path[1].coordinates.y);
    dir.multiply(this.scale).add(new JSVector(this.scale/2, this.scale/2));
    this.destination = dir;
  }
  else this.destination = game.levels[game.currentLevel].player.pos;

  this.acc = JSVector.subGetNew(this.destination, this.pos).setMagnitude(1);
}
