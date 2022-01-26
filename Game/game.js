function Game(){
  this.levels = [];
  this.gameState = GameState.WorldMap;
}

enum GameState{
  WorldMap,
  Level
}

Game.prototype.newLevel = function{
  for(var i = 0; i < levels.length; i++){
      this.levels[i] = this.levelIcons[i];//level of maze connected to level icons in world map
      switch(this.gameState){//switch between maze levels
        case levels[i]:
          levels[i].update;//go to next level
    }
  }
}

Game.prototype.update = function{
  for(var i = 0; i < levels.length; i++){
    levels[i]++;//next level
  }
}

Game.prototype.run = function{
  this.newLevel();
  this.update();
}
