function Level(r,c,cellSize,enemies,boss,cnv,ctx){
  this.cnv = cnv;
  this.ctx = ctx;
    //Generates maze for level
  this.maze = new Maze(cellSize,r,c,ctx,new Color(0,0,0,1));
  this.enemies = enemies;
  this.boss = boss; //To do: create enemy class
  this.player = new Player(cellSize/2,cellSize/2,cellSize/8,new Color(255,0,0,1),5,100,this.cnv,this.ctx);
}

Level.prototype.update = function(){
  this.ctx.save();
  this.ctx.translate(-this.player.pos.x,-this.player.pos.y);
  this.processInput();

  this.maze.update();

  if(this.enemies!=null){
    for(var i = 0;i<this.enemies.length;i++){ //updates enemies
      if(!this.enemies[i].update(this.maze)){
        this.enemies.splice(i,1);
        i--;
      }
    }
  }

  if(this.boss!=null) this.boss.update(this.maze); //updates boss

  this.ctx.restore();
  this.player.run(this.maze); //updates player
  this.player.healthbar.run();
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

  let cellSize = this.maze.cellSize;

  this.maze.regenerate();
  this.player.pos = new JSVector(cellSize/2,cellSize/2); //top left of maze
  this.player.particleSystem.pos = this.player.pos;
  //this.boss.pos = new JSVector(c*cellSize-cellSize/2,r*cellSize-cellSize/2); //bottom right of maze
  this.scatterEnemies();
}

Level.prototype.scatterEnemies = function(){
  if(this.enemies==null) return;

  let cellIndexes = [];

  for(var i = 0;i<this.enemies.length;i++){ //assigns enemy to a random cell that is not already assigned an enemy
    if(cellIndexes.length==0){
      for(var k = 1;k<this.maze.cells.length-1;k++){//loads all cells except for first cell(player start) and last cell(boss)
        cellIndexes.push(k);
      }
    }
    let len = cellIndexes.length;
    let index = Math.floor(Math.random()*len);
    let cell = this.maze.cells[cellIndexes[index]];
    this.enemies[i].pos = new JSVector(cell.pos.x+cell.scale/2,cell.pos.y+cell.scale/2); //assigns enemy to random cell in maze
    this.enemies[i].targetPos = new JSVector(this.enemies[i].pos.x,this.enemies[i].pos.y);
    cellIndexes.splice(index,1); //makes sure that only one enemy is assigned per cell
  }
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

  this.icon = new LevelIcon(this.ctx,x,y,clr,rad,label)
}
