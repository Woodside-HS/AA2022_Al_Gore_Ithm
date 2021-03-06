const gameStates = new Enum(
  'WorldMap',
  'PlayingLevel'
);

function Game(cnv,ctx){
  this.cnv = cnv;
  this.ctx = ctx;
  this.levels = [];
  this.currentLevel = 0;
  this.audioStarted
  let cellSize = 100;
  let zoomFactor = 2;

  let playerImg = "Game/Files/algore.png";
  let player = new Player(0,0,cellSize/8,3,1000,this.cnv,this.ctx,playerImg,3,2, 0);
  this.generateLevel_1(cellSize,zoomFactor,player);
  this.generateLevel_2(cellSize,zoomFactor,player);
  this.generateLevel_3(cellSize,zoomFactor,player);
  this.generateLevel_4(cellSize,zoomFactor,player);
  this.generateLevel_5(cellSize,zoomFactor,player);

  for(var i = 0;i<this.levels.length;i++){
    this.levels[i].generateIcon(this.levels.length,i);
  }

  this.levelPath = new LevelPath(this.levels,this.levels[0].icon.rad/1.25,new Color(25,180,25,1),ctx);
  this.gameState = gameStates.PlayingLevel;
  this.music = new Sound('Game/Files/Al-Gore-ithm_1.mp3');

  this.levels[this.currentLevel].load(); //loads the current level after setting up entire game
}

Game.prototype.generateLevel_1 = function(cellSize,zoomFactor,player){
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
  let moneyValue = 50000;

  for(let i=0;i<num_healthIncrement;i++){
    pickups_1.push(this.generateHealthPickup(cellSize, Math.floor(Math.random()*100+50)));
  }
  for(let i=0;i<num_moneyIncrement;i++){
    pickups_1.push(this.generateMoneyPickup(cellSize, moneyValue));
  }

  let sword = this.generateWeaponPickup(cellSize,1.2,3,"Game/Files/sword.png","Sword")
  pickups_1.push(sword);

  let level1 = new Level(4,4,cellSize,enemies_1,pickups_1, null,this.cnv,this.ctx,zoomFactor,"Game/Files/cell_level1.jpg",player);

  this.levels.push(level1);
}
Game.prototype.generateLevel_2 = function(cellSize,zoomFactor,player){
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

  let pickups_2 = [];

  let num_healthIncrement = 3;
  let num_moneyIncrement = 3;
  let moneyValue = 60000;

  for(let i=0;i<num_healthIncrement;i++){
    pickups_2.push(this.generateHealthPickup(cellSize, Math.floor(Math.random()*100+50)));
  }
  for(let i=0;i<num_moneyIncrement;i++){
    pickups_2.push(this.generateMoneyPickup(cellSize, moneyValue));
  }

  let sword = this.generateWeaponPickup(cellSize,1.2,5,"Game/Files/pirateblade.png","Blade");
  pickups_2.push(sword);

  let level2 = new Level(5,5,cellSize,enemies_2,pickups_2,null,this.cnv,this.ctx,zoomFactor,"Game/Files/cell_level2.jpg",player);

  this.levels.push(level2);
}
Game.prototype.generateLevel_3 = function(cellSize,zoomFactor,player){
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

  let pickups_3 = [];

  let num_healthIncrement = 3;
  let num_moneyIncrement = 3;
  let moneyValue = 70000;

  for(let i=0;i<num_healthIncrement;i++){
    pickups_3.push(this.generateHealthPickup(cellSize, Math.floor(Math.random()*100+50)));
  }
  for(let i=0;i<num_moneyIncrement;i++){
    pickups_3.push(this.generateMoneyPickup(cellSize, moneyValue));
  }

  let sword = this.generateWeaponPickup(cellSize,1.3,8,"Game/Files/powderbag.png","Powder Bag");
  pickups_3.push(sword);

  let level3 = new Level(6,6,cellSize,enemies_3,pickups_3,null,this.cnv,this.ctx,zoomFactor,"Game/Files/cell_level3.jpeg",player);

  this.levels.push(level3);
}
Game.prototype.generateLevel_4 = function(cellSize,zoomFactor,player){
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

  let pickups_4 = [];

  let num_healthIncrement = 3;
  let num_moneyIncrement = 3;
  let moneyValue = 80000;

  for(let i=0;i<num_healthIncrement;i++){
    pickups_4.push(this.generateHealthPickup(cellSize, Math.floor(Math.random()*100+50)));
  }
  for(let i=0;i<num_moneyIncrement;i++){
    pickups_4.push(this.generateMoneyPickup(cellSize, moneyValue));
  }

  let sword = this.generateWeaponPickup(cellSize,1.4,9,"Game/Files/bowarrows.png","Bow & Arrows");
  pickups_4.push(sword);

  let level4 = new Level(8,8,cellSize,enemies_4,pickups_4,null,this.cnv,this.ctx,zoomFactor,"Game/Files/cell_level4.png",player);

  this.levels.push(level4);
}
Game.prototype.generateLevel_5 = function(cellSize,zoomFactor,player){
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

  let pickups_5 = [];

  let num_healthIncrement = 6;
  let num_moneyIncrement = 3;
  let moneyValue = 100000;

  for(let i=0;i<num_healthIncrement;i++){
    pickups_5.push(this.generateHealthPickup(cellSize, Math.floor(Math.random()*100+50)));
  }
  for(let i=0;i<num_moneyIncrement;i++){
    pickups_5.push(this.generateMoneyPickup(cellSize, moneyValue));
  }

  let sword = this.generateWeaponPickup(cellSize,1.5,10,"Game/Files/elixir.png","Elixir");
  pickups_5.push(sword);

  let level5 = new Level(10,10,cellSize,enemies_5,pickups_5,null,this.cnv,this.ctx,zoomFactor,"Game/Files/cell_level5.jpeg",player);

  this.levels.push(level5);
}

Game.prototype.enemyPrefab1 = function(){
  return new Enemy(0,0,10,2,100,this.cnv, this.ctx,"Game/Files/newt.jpg",1,3);
}
Game.prototype.enemyPrefab2 = function(){
  return new Enemy(0,0,15,1.5,250,this.cnv, this.ctx,"Game/Files/cheney.jpg",1,2);
}
Game.prototype.enemyPrefab3 = function(){
  return new Enemy(0,0,20,2,500,this.cnv, this.ctx,"Game/Files/dubbya.png",2,2);
}
Game.prototype.generateHealthPickup = function(cellSize, power){
  return new Healthpickup(0, 0, 16, this.cnv, this.ctx, cellSize/8, power);
}
Game.prototype.generateMoneyPickup = function(cellSize, moneyValue){
  return new Moneypickup(0, 0, 16, this.cnv, this.ctx, cellSize/8, moneyValue);
}
Game.prototype.generateWeaponPickup = function(cellSize,firingRateDelta,particleDamageDelta,imgSrc,label){
  return new Weapon(firingRateDelta,particleDamageDelta,0,0,label,this.cnv,this.ctx,10,imgSrc,cellSize/8);
}

Game.prototype.nextLevel = function(){
  if(this.currentLevel<this.levels.length-1){
    this.currentLevel++;
    this.levelPath.nextLevel();
  }
  else{
    if(this.levels[this.currentLevel].player.money>1000000){
      if(this.levels[this.currentLevel].player.life>500){
        alert("You had enough money and a high enough approval rating to win reelection! You win!")
      }
      else{
        alert("You had enough money, but your approval rating wasn't high enough to win reelection. You lose.");
      }
    }
    else{
      if(this.levels[this.currentLevel].player.life>500){
        alert("Although your approval rating was high enough, you didn't have enough campaign funding and had to drop out of the election. You lose.")
      }
      else{
        alert("You had neither enough campaign funding nor a high enough approval rating to win reelection. You lose.");
      }
    }
    this.levels[this.currentLevel].load();
  }
}

Game.prototype.setLevel = function(loss){
  if(loss) this.levels[this.currentLevel].executeLoss();
  else this.nextLevel();

  this.levels[this.currentLevel].load();
  this.gameState = gameStates.WorldMap;
}

Game.prototype.update = function(){
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,this.cnv.width,this.cnv.height); //clears canvas
  if (mouseStatus && !this.audioStarted){
      this.audioStarted = true;
      this.music = new Sound('Game/Files/Al-Gore-ithm_1.mp3');
      this.music.loadMusic();
  }

  if(keys["Space"]){
   this.gameState = this.gameState==gameStates.WorldMap?gameStates.PlayingLevel:gameStates.WorldMap; //Press space to switch between world map view and level view
   keys["Space"] = false;
  }
  if(keys["KeyM"]){
    this.music.toggleMusic();
    keys["KeyM"] = false;
  }
  if(keys["KeyN"]){
    enableSFX = !enableSFX
    keys["KeyN"] = false;
  }
  switch(this.gameState){
    case gameStates.WorldMap:
      this.levelPath.display();
      break;
    case gameStates.PlayingLevel:
      this.levels[this.currentLevel].update();
      if(this.levels[this.currentLevel].checkLevelStatus()){
        this.setLevel(this.levels[this.currentLevel].detectLoss());
      }
      break;
    default:
      console.log("No status");
  }
}
