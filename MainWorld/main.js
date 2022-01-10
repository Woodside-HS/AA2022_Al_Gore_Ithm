window.addEventListener("load", init);

var cnv,ctx;
var levelPath;

document.addEventListener('keypress', keyListener);

function keyListener(e) { //testing next level function
  if(e.code=="Space"&&!e.repeat){
    levelPath.nextLevel();
  }
}

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  levelPath = LevelPath.generateNewPath(5,ctx); //generates # of new levels and creates visual path

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas

  update();

  requestAnimationFrame(animate);
}

function update(){
  levelPath.display();
}
