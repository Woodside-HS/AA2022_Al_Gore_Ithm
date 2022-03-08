function Level(r,c,cellSize,enemies,boss,cnv,ctx,zoomFactor,cellImgSrc){
  this.cnv = cnv;
  this.ctx = ctx;
    //Generates maze for level
  this.maze = new Maze(cellSize,r,c,ctx,new Color(50,50,50,1),cellImgSrc);
  this.enemies = enemies;
  this.boss = boss; //To do: create enemy class

  let playerImg = "Files/algore.jpeg";
  this.playerInitPos = new JSVector(cellSize/2,cellSize/2);
  this.player = new Player(this.playerInitPos.x,this.playerInitPos.y,cellSize/8,new Color(0,0,255,1),3,1000,this.cnv,this.ctx,playerImg,3,1);
  this.zoomFactor = zoomFactor;
  this.detectPause = false;
  this.drawPauseScreen = 0;
}

Level.prototype.update = function(){

 this.processInput();

  this.ctx.save();
  let x = -this.player.pos.x+this.cnv.width/2/this.zoomFactor;
  let y = -this.player.pos.y+this.cnv.height/2/this.zoomFactor;
  this.ctx.scale(this.zoomFactor,this.zoomFactor);
  this.ctx.translate(x,y);

  this.maze.update();
  this.player.run(this.maze); //updates player

  if(this.enemies!=null){
    for(var i = 0;i<this.enemies.length;i++){ //updates enemies
      if(this.enemies[i].life<0) continue; //kills enemies if life < 0
      this.enemies[i].run(this.maze, this.player.pos, this.player.particleSystem);
      this.player.detectParticles(this.enemies[i].particleSystem);
  }
}

  if(this.boss!=null) this.boss.update(this.maze); //updates boss
  this.ctx.restore();
  this.player.healthbar.run(true); //runs healthbar with text display enabled set to true
  this.pauseButton();
}

Level.prototype.detectLoss = function(){
  return this.player.life<=0;
}

Level.prototype.checkLevelStatus = function(){
  if(this.detectLoss()){
    return true;
  }
  else{
    for(var i = 0;i<this.enemies.length;i++){
      if(this.enemies[i].life>0) return false;
    }
    return true;
  }
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
  this.player.setVel(dx,dy);
}

Level.prototype.load = function(){
  keys = [];
  mousePos = new JSVector(0,0);
  mouseStatus = false;

  this.player.life = this.player.initialLife;
  this.player.pos = new JSVector(this.playerInitPos.x,this.playerInitPos.y);
  this.player.targetPos = new JSVector(this.player.pos.x,this.player.pos.y);
  this.player.setVel(0,0);

  let cellSize = this.maze.cellSize;

  this.maze.regenerate();
  //this.boss.pos = new JSVector(c*cellSize-cellSize/2,r*cellSize-cellSize/2); //bottom right of maze
  for(var i = 0;i<this.enemies.length;i++){
    this.enemies[i].life = this.enemies[i].initialLife;
    this.enemies[i].path = [];
  }
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
  //let clr = new Color((1-i/n)*225,i/n*225,0,1);
  let clr = new Color((i/n)*200+55,(i/n)*200+55,(i/n)*200+55,1);

  let label = "Level " + (i+1);

  if(i==0||i==n-1) x = cnv.width/2; //centers first and last icons
  if(i==n-1) rad*=1.2; //final level has larger icon

  this.icon = new LevelIcon(this.ctx,x,y,clr,rad,label)
}
Level.prototype.pauseButton = function(){
  let rectX = 10;
  let rectY = 30;

  this.ctx.beginPath();
  this.ctx.fillStyle = Color.generateRandomColor(255,255,255,0);
  this.ctx.rect(rectX, rectY, 45, 30);
  this.ctx.fill();
  this.ctx.stroke();

  if(mousePos.x < 55 && mousePos.x > 10 && mousePos.y < 60 && mousePos.y > 30 && mouseStatus === true){
    this.detectPause = true;
    this.drawPauseScreen = 1;
  }
  if(this.drawPauseScreen == 1){
    this.ctx.beginPath();
    this.ctx.fillRect(10,90,100,125);
  }
  this.fillStyle = Color.generateRandomColor(0,0,0,0);
  this.ctx.font = "16px Times New Roman";
  this.ctx.textAlign = "left";
  this.ctx.fillText("Pause", rectX+45/2,rectY+15);

  //resume button//
  if(mousePos.x < 60 && mousePos.x > 10 && mousePos.y < 165 && mousePos.y > 90 && mouseStatus === true){
    this.detectPause = false;
    this.drawPauseScreen = 0;
  }
  if(mousePos.x < 110 && mousePos.x > 60 && mousePos.y < 215 && mousePos.y > 165 && mouseStatus === true){
    this.detectPause = false;
    this.drawPauseScreen = 0;
    this.player.life = 0;
  }
}
