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

  let level1 = new Level(6,6,cellSize,null,null,this.cnv,this.ctx) //creates new level with no enemies or boss parameters - null,null -
  let level2 = new Level(6,6,cellSize,null,null,this.cnv,this.ctx)

  this.levels.push(level1);
  this.levels.push(level2);

  for(var i = 0;i<this.levels.length;i++){
    this.levels[i].generateIcon(this.levels.length,i);
  }

  this.levelPath = new LevelPath(this.levels,this.levels[0].icon.rad/1.25,new Color(25,25,220,1),ctx);
  this.gameState = gameStates.PlayingLevel;
}

Game.prototype.update = function(){
  this.ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas

  if(keys["Space"]){
   this.levelPath.nextLevel(); //TESTING
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
