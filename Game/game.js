const gameStates = new Enum(
  'WorldMap',
  'PlayingLevel'
);

function Game(cnv,ctx){
  this.cnv = cnv;
  this.ctx = ctx;
  this.levels = [];
  this.currentLevel = 0;

  let cellSize = 100;
  let zoomFactor = 3;

  //LEVEL 1 GENERATION**************************//
  let enemies_1 = [ //populates enemy array with test enemies
    new Character(0,0,10,Color.generateRandomColor(255,1,1,false),2,1,this.ctx),
    new Character(0,0,10,Color.generateRandomColor(255,1,1,false),2,1,this.ctx),
    new Character(0,0,10,Color.generateRandomColor(255,1,1,false),2,1,this.ctx),
  ];
  let level1 = new Level(6,6,cellSize,enemies_1,null,this.cnv,this.ctx,zoomFactor,"../Files/cell_level1.jpeg") //creates new level with no enemies or boss parameters - null,null -
  //*******************************************//

  this.levels.push(level1);

  for(var i = 0;i<this.levels.length;i++){
    this.levels[i].generateIcon(this.levels.length,i);
  }

  this.levelPath = new LevelPath(this.levels,this.levels[0].icon.rad/1.25,new Color(25,25,220,1),ctx);
  this.gameState = gameStates.PlayingLevel;

  this.levels[this.currentLevel].load(); //loads the current level after setting up entire game
}

Game.prototype.update = function(){
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(0,0,this.cnv.width,this.cnv.height); //clears canvas

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
      break;
    default:
      console.log("No status");
  }
}
