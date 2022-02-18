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
  let zoomFactor = 2;

  this.generateLevel_1(cellSize,zoomFactor);
  this.generateLevel_2(cellSize,zoomFactor);
  this.generateLevel_3(cellSize,zoomFactor);

  for(var i = 0;i<this.levels.length;i++){
    this.levels[i].generateIcon(this.levels.length,i);
  }

  this.levelPath = new LevelPath(this.levels,this.levels[0].icon.rad/1.25,new Color(25,25,220,1),ctx);
  this.gameState = gameStates.PlayingLevel;

  this.levels[this.currentLevel].load(); //loads the current level after setting up entire game
}

Game.prototype.generateLevel_1 = function(cellSize,zoomFactor){
  let enemies_1 = [ //populates enemy array with test enemies
    new Enemy(0,0,15,Color.generateRandomColor(255,1,1,false),1.5,250,this.cnv, this.ctx,"Files/cheney.jpg"),

    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg"),
    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg"),
    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg")
  ];

  let level1 = new Level(6,6,cellSize,enemies_1,null,this.cnv,this.ctx,zoomFactor,"Files/cell_level1.jpeg");

  this.levels.push(level1);
}
Game.prototype.generateLevel_2 = function(cellSize,zoomFactor){
  let enemies_2 = [ //populates enemy array with test enemies
    new Enemy(0,0,20,Color.generateRandomColor(255,1,1,false),2,500,this.cnv, this.ctx,"Files/dubbya.jpeg"),

    new Enemy(0,0,15,Color.generateRandomColor(255,1,1,false),1.5,250,this.cnv, this.ctx,"Files/cheney.jpg"),
    new Enemy(0,0,15,Color.generateRandomColor(255,1,1,false),1.5,250,this.cnv, this.ctx,"Files/cheney.jpg"),

    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg"),
    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg"),
    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg")
  ];
  let level2 = new Level(6,6,cellSize,enemies_2,null,this.cnv,this.ctx,zoomFactor,"Files/cell_level1.jpeg");

  this.levels.push(level2);
}
Game.prototype.generateLevel_3 = function(cellSize,zoomFactor){
  let enemies_3 = [ //populates enemy array with test enemies
    new Enemy(0,0,20,Color.generateRandomColor(255,1,1,false),2,500,this.cnv, this.ctx,"Files/dubbya.jpeg"),
    new Enemy(0,0,20,Color.generateRandomColor(255,1,1,false),2,500,this.cnv, this.ctx,"Files/dubbya.jpeg"),

    new Enemy(0,0,15,Color.generateRandomColor(255,1,1,false),1.5,250,this.cnv, this.ctx,"Files/cheney.jpg"),
    new Enemy(0,0,15,Color.generateRandomColor(255,1,1,false),1.5,250,this.cnv, this.ctx,"Files/cheney.jpg"),
    new Enemy(0,0,15,Color.generateRandomColor(255,1,1,false),1.5,250,this.cnv, this.ctx,"Files/cheney.jpg"),

    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg"),
    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg"),
    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg"),
    new Enemy(0,0,10,Color.generateRandomColor(255,1,1,false),1,100,this.cnv, this.ctx,"Files/newt.jpg")
  ];
  let level3 = new Level(6,6,cellSize,enemies_3,null,this.cnv,this.ctx,zoomFactor,"Files/cell_level1.jpeg");

  this.levels.push(level3);
}

Game.prototype.nextLevel = function(){
  if(this.currentLevel<this.levels.length-1){
    this.setLevel(this.currentLevel+1);
    this.levelPath.nextLevel();
  }
}

Game.prototype.setLevel = function(level){
  this.currentLevel = level;
  this.levels[this.currentLevel].load();
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
      if(this.levels[this.currentLevel].checkLevelStatus()){
        this.nextLevel();
        this.gameState = gameStates.WorldMap;
      }
      break;
    default:
      console.log("No status");
  }
}
