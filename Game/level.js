function Level(r,c,cellSize,enemies,boss,player,ctx){
    //Generates maze for level
    this.maze = new Maze(cellSize,r,c,ctx,new Color(0,0,0,1));
    this.enemies = enemies;
    this.boss = boss; //To do: create enemy class
    this.player = player;
    this.ctx = ctx;
}

Level.prototype.update = function(){

  this.processInput();

  this.maze.update();

  /*for(var i = 0;i<this.enemies.length;i++){
    if(!this.enemies[i].update(this.maze)){
      this.enemies.splice(i,1);
      i--;
    }
  }
  this.boss.update(this.maze);*/

  this.player.update(this.maze);
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

Level.prototype.generateIcon = function(n,i){
  let rad = 150/n;
  let dist = n>1?(cnv.height-rad*4)/(n-1):0;

  //determines random distance away from the y axis
  let distFromCenter = 0.2;
  let delta = Math.random()*cnv.width*distFromCenter/2+cnv.width*distFromCenter/2-rad;
  let sign = Math.random()>0.5?1:-1;

  let x = cnv.width/2 + delta*sign;
  let y = cnv.height/2 + dist*(n-1)/2.0 - i*dist;

  //create color gradient where as i increases, the icon color becomes darker
  let val = 150 - i/n*100;
  let clr = new Color((1-i/n)*225,i/n*225,0,1);
  let label = "Level " + (i+1);

  if(i==0||i==n-1) x = cnv.width/2; //centers first and last icons
  if(i==n-1) rad*=1.2; //final level has larger icon

  this.icon = new LevelIcon(ctx,x,y,clr,rad,label)
}
