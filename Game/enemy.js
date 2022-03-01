function Enemy(x, y, rad, clr, speed, life, cnv, ctx,imgSrc){
  Character.call(this, x, y, rad, clr, speed, life, cnv,ctx,imgSrc,50,10,new Color(2,0.1,0.1,false));
  this.acc = new JSVector(0, 0);
  this.path = [];
  this.rad = rad;
  this.triggered = false;
}

Enemy.prototype = new Character();

Enemy.prototype.run = function(maze, targetPos, particleSystem){
  this.update(maze);
  this.findPath(maze, targetPos);
  this.shoot(maze, targetPos);
  this.detectParticles(particleSystem);

  this.healthbar.pos = new JSVector(this.pos.x-this.healthbar.width/2,this.pos.y-this.rad-this.healthbar.height*1.1); //sets position of healthbar relative to position of enemy
  this.healthbar.run(false); //runs healthbar with text display enabled set to false
}

Enemy.prototype.findPath = function(maze, targetPos){ //creates shortest path in maze to the target position
  if(this.path[1]==null||JSVector.subGetNew(this.path[1].coordinates, Pathfinder.getCoordinates(this.pos, maze.cellSize)).getMagnitude()==0){
      this.setPath(maze, targetPos);
  }

  let dist = this.pos.distance(targetPos);
  if(dist < 250){
    this.triggered = true;
  }
  if(this.triggered){ //if triggered by player begin moving down path to player
    if(this.vel.getMagnitude()<=Number.EPSILON) this.vel = new JSVector(0,this.speed);
    let oldVel = this.vel.getMagnitude();
    this.vel.add(this.acc);
    this.vel.setMagnitude(oldVel);
  }
}

Enemy.prototype.setPath = function(maze, targetPos){ //sets the movement within the path smoothly by using attraction physics
  let startingCell = Pathfinder.getCell(maze.cells, maze.cols, this.pos, maze.cellSize);
  let targetCell = Pathfinder.getCell(maze.cells, maze.cols, targetPos, maze.cellSize);
  this.path = new Pathfinder(maze.cells, maze.rows, maze.cols, startingCell, targetCell);
  if(this.path[1]!=null){
    let dir = new JSVector(this.path[1].coordinates.x, this.path[1].coordinates.y);
    dir.multiply(maze.cellSize).add(new JSVector(maze.cellSize/2, maze.cellSize/2));
    this.destination = dir;
  }
  else this.destination = targetPos;

  this.acc = JSVector.subGetNew(this.destination, this.pos).setMagnitude(1);
}
Enemy.prototype.shoot = function(maze, targetPos){ //shoots particle system at target position
  this.particleSystem.pos = new JSVector(this.pos.x, this.pos.y);
  let dist = this.pos.distance(targetPos);
  if(dist < 100){
    this.particleSystem.generateParticles(targetPos, this.vel);
  }
  this.particleSystem.update(maze);
}
