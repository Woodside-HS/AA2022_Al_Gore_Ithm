function Enemy(x, y, rad, clr, speed, life, cnv, ctx){
  Character.call(this, x, y, rad, clr, speed, life, ctx);
  this.acc = new JSVector(0, 0);
  this.path = [];
}

Enemy.prototype = new Character();

Enemy.prototype.run = function(maze, targetPos){
  this.findPath(maze, targetPos);
  this.update(maze);
}

Enemy.prototype.findPath = function(maze, targetPos){
  if(this.path[1]==null||JSVector.subGetNew(this.path[1].coordinates, Pathfinder.getCoordinates(this.pos, this.scale)).getMagnitude()==0){
      this.setPath(maze, targetPos);
  }

  let oldVel = this.vel.getMagnitude();
  this.vel.add(this.acc);
  this.vel.setMagnitude(oldVel);
}

Enemy.prototype.setPath = function(maze, targetPos){
  let startingCell = Pathfinder.getCell(maze.cells, maze.cols, this.pos, maze.cellSize);
  let targetCell = Pathfinder.getCell(maze.cells, maze.cols, targetPos, maze.cellSize);
  this.path = new Pathfinder(maze.cells, maze.rows, maze.cols, startingCell, targetCell);
  if(this.path[1]!=null){
    let dir = new JSVector(this.path[1].coordinates.x, this.path[1].coordinates.y);
    dir.multiply(this.scale).add(new JSVector(maze.cellSize/2, maze.cellSize/2));
    this.destination = dir;
  }
  else this.destination = targetPos;

  this.acc = JSVector.subGetNew(this.destination, this.pos).setMagnitude(1);
}
