window.addEventListener("load", init);

var cnv,ctx;
var levelPath;
var keys;

document.addEventListener('keypress', keyDown);
document.addEventListener('keyup',keyUp);

function keyDown(e) { //testing next level function
  if(keys[e.code]==undefined){
    keys[e.code] = true;
  }
}
function keyUp(e){
  delete keys[e.code];
}

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  keys = [];

  levelPath = LevelPath.generateNewPath(10,ctx); //generates # of new levels and creates visual path

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas

  update();

  requestAnimationFrame(animate);
}

function update(){
  if(keys["Space"]){
    levelPath.nextLevel();
    keys["Space"] = false;
  }
  levelPath.display();
}
