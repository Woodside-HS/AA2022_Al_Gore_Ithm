const gameStates = new Enum(
  'WorldMap',
  'PlayingLevel'
);

function Game(cnv,ctx){
  this.cnv = cnv;
  this.ctx = ctx;
  this.levels = [];
  this.currentLevel = 0;
<<<<<<< Updated upstream
  this.knockSfx = new Sound('Files/enemy_knocked.mp3');
=======
  this.audioStarted

>>>>>>> Stashed changes
  let cellSize = 100;
  let zoomFactor = 2;

  this.generateLevel_1(cellSize,zoomFactor);
  this.generateLevel_2(cellSize,zoomFactor);
  this.generateLevel_3(cellSize,zoomFactor);
  this.generateLevel_4(cellSize,zoomFactor);
  this.generateLevel_5(cellSize,zoomFactor);

  for(var i = 0;i<this.levels.length;i++){
    this.levels[i].generateIcon(this.levels.length,i);
  }

  this.levelPath = new LevelPath(this.levels,this.levels[0].icon.rad/1.25,new Color(25,180,25,1),ctx);
  this.gameState = gameStates.PlayingLevel;
<<<<<<< Updated upstream
  this.music = new Sound('Files/Al-Gore-ithm_1.mp3');
  //this.knockSfx = new Sound('Files/enemy_knocked.mp3');
  this.music.loadMusic();
=======
>>>>>>> Stashed changes
  this.levels[this.currentLevel].load(); //loads the current level after setting up entire game
}

Game.prototype.generateLevel_1 = function(cellSize,zoomFactor){
  let enemies_1 = [];

  let num_enemy1 = 5;
  let num_enemy2 = 2;
  let num_enemy3 = 0;

  for(var i = 0;i<num_enemy1;i++){
    enemies_1.push(this.enemyPrefab1());
  }
  for(var i = 0;i<num_enemy2;i++){
    enemies_1.push(this.enemyPrefab2());
  }
  for(var i = 0;i<num_enemy3;i++){
    enemies_1.push(this.enemyPrefab3());
  }

  let pickups_1 = [];

  let num_healthIncrement = 3;
  let num_moneyIncrement = 3;

  for(let i=0;i<num_healthIncrement;i++){
    pickups_1.push(this.generateHealthPickup(cellSize));
  }
  for(let i=0;i<num_moneyIncrement;i++){
    pickups_1.push(this.generateMoneyPickup(cellSize));
  }

  let level1 = new Level(6,6,cellSize,enemies_1,pickups_1, null,this.cnv,this.ctx,zoomFactor,"Files/cell_level1.jpg",1);

  this.levels.push(level1);
}
Game.prototype.generateLevel_2 = function(cellSize,zoomFactor){
  let enemies_2 = [];

  let num_enemy1 = 4;
  let num_enemy2 = 4;
  let num_enemy3 = 1;

  for(var i = 0;i<num_enemy1;i++){
    enemies_2.push(this.enemyPrefab1());
  }
  for(var i = 0;i<num_enemy2;i++){
    enemies_2.push(this.enemyPrefab2());
  }
  for(var i = 0;i<num_enemy3;i++){
    enemies_2.push(this.enemyPrefab3());
  }

  let level2 = new Level(6,6,cellSize,enemies_2,null,null,this.cnv,this.ctx,zoomFactor,"Files/cell_level2.jpg",1);

  this.levels.push(level2);
}
Game.prototype.generateLevel_3 = function(cellSize,zoomFactor){
  let enemies_3 = [];

  let num_enemy1 = 5;
  let num_enemy2 = 5;
  let num_enemy3 = 2;

  for(var i = 0;i<num_enemy1;i++){
    enemies_3.push(this.enemyPrefab1());
  }
  for(var i = 0;i<num_enemy2;i++){
    enemies_3.push(this.enemyPrefab2());
  }
  for(var i = 0;i<num_enemy3;i++){
    enemies_3.push(this.enemyPrefab3());
  }

  let level3 = new Level(6,6,cellSize,enemies_3,null,null,this.cnv,this.ctx,zoomFactor,"Files/cell_level3.jpeg");

  this.levels.push(level3);
}
Game.prototype.generateLevel_4 = function(cellSize,zoomFactor){
  let enemies_4 = [];

  let num_enemy1 = 15;
  let num_enemy2 = 2;
  let num_enemy3 = 2;

  for(var i = 0;i<num_enemy1;i++){
    enemies_4.push(this.enemyPrefab1());
  }
  for(var i = 0;i<num_enemy2;i++){
    enemies_4.push(this.enemyPrefab2());
  }
  for(var i = 0;i<num_enemy3;i++){
    enemies_4.push(this.enemyPrefab3());
  }

  let level4 = new Level(6,6,cellSize,enemies_4,null,null,this.cnv,this.ctx,zoomFactor,"Files/cell_level4.png");

  this.levels.push(level4);
}
Game.prototype.generateLevel_5 = function(cellSize,zoomFactor){
  let enemies_5 = [];

  let num_enemy1 = 7;
  let num_enemy2 = 6;
  let num_enemy3 = 5;

  for(var i = 0;i<num_enemy1;i++){
    enemies_5.push(this.enemyPrefab1());
  }
  for(var i = 0;i<num_enemy2;i++){
    enemies_5.push(this.enemyPrefab2());
  }
  for(var i = 0;i<num_enemy3;i++){
    enemies_5.push(this.enemyPrefab3());
  }

  let level5 = new Level(6,6,cellSize,enemies_5,null,null,this.cnv,this.ctx,zoomFactor,"Files/cell_level5.jpeg");

  this.levels.push(level5);
}

Game.prototype.enemyPrefab1 = function(){
  return new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),2,100,this.cnv, this.ctx,"Files/newt.jpg",1,3);
}
Game.prototype.enemyPrefab2 = function(){
  return new Enemy(0,0,15,Color.generateRandomColor(255,1,1,false),1.5,250,this.cnv, this.ctx,"Files/cheney.jpg",1,2);
}
Game.prototype.enemyPrefab3 = function(){
  return new Enemy(0,0,20,Color.generateRandomColor(255,1,1,false),2,500,this.cnv, this.ctx,"Files/dubbya.jpeg",2,2);
}
Game.prototype.generateHealthPickup = function(cellSize){
  return new Pickups(0, 0, 8, "Files/key.png", this.cnv, this.ctx, cellSize/4);
}
Game.prototype.generateMoneyPickup = function(cellSize){
  return new Pickups(0, 0, 8, "Files/key.png", this.cnv, this.ctx, cellSize/4);
}
Game.prototype.nextLevel = function(){
  if(this.currentLevel<this.levels.length-1){
    this.setLevel(this.currentLevel+1);
    this.levelPath.nextLevel();
  }
  else{
    alert("You Win!!!");
    this.levels[this.currentLevel].load();
  }
}

Game.prototype.setLevel = function(level){
  this.currentLevel = level;
  this.levels[this.currentLevel].load();
}

Game.prototype.update = function(){
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,this.cnv.width,this.cnv.height); //clears canvas
<<<<<<< Updated upstream
=======
  if (mouseStatus && !this.audioStarted){
      this.audioStarted = true;
      this.music = new Sound('Files/Al-Gore-ithm_1.mp3');
      this.music.loadMusic();
  }

>>>>>>> Stashed changes
  if(keys["Space"]){
   this.gameState = this.gameState==gameStates.WorldMap?gameStates.PlayingLevel:gameStates.WorldMap; //Press space to switch between world map view and level view
   keys["Space"] = false;
  }

  switch(this.gameState){
    case gameStates.WorldMap:
      this.levelPath.display();
      break;
    case gameStates.PlayingLevel:
      this.levels[this.currentLevel].update();
      if(this.levels[this.currentLevel].checkLevelStatus()){
        if(!this.levels[this.currentLevel].detectLoss()) this.nextLevel();
        else this.setLevel(this.currentLevel);
        this.gameState = gameStates.WorldMap;
      }
      break;
    default:
      console.log("No status");
  }
}
