const gameStates = new Enum(
  'WorldMap',
  'PlayingLevel'
);

function Game(ctx){
  this.levels = [];
  this.currentLevel = 0;

  let cellSize = 100;
  let player = null;//new Player(cellSize/2,cellSize/2,15,new Color(255,0,0,1),7,ctx);
  let level1 = new Level(6,6,cellSize,null,null,player,ctx) //creates new level with no enemies or boss parameters - null,null -
  let level2 = new Level(6,6,cellSize,null,null,player,ctx)

  this.levels.push(level1);
  this.levels.push(level2);

  for(var i = 0;i<this.levels.length;i++){
    this.levels[i].generateIcon(this.levels.length,i);
  }

  this.levelPath = new LevelPath(this.levels,this.levels[0].icon.rad/1.25,new Color(25,25,220,1),ctx);
  this.gameState = gameStates.WorldMap;
}

Game.prototype.update = function(){
  switch(this.gameState){
    case gameStates.WorldMap:
      this.levelPath.display();
      break;
    case gameStates.PlayingLevel:
      this.levels[this.currentLevel].update;
      break;
    default:
      console.log("No status");
  }
}
