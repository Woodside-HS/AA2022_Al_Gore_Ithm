window.addEventListener("load", init);

var cnv,ctx;
var mazeGenerator;
var keys;
var player;

window.addEventListener('keypress',keyDown);
window.addEventListener('keyup',keyUp);

function keyDown(e) { //testing next level function
  keys[e.code] = true;
}
function keyUp(e){
  keys[e.code] = false;
}

function init(){
    cnv = document.getElementById("cnv");
    ctx = cnv.getContext("2d");

    keys = [];

    let cellSize = 100;
    mazeGenerator = new MazeGenerator(new JSVector(0,0),cellSize,cnv.height/cellSize,cnv.width/cellSize,ctx);

    player = new Player(cellSize/2,cellSize/2,cellSize/10,new Color(255,0,0,1),5,ctx);

    animate();
}

function animate() {
  ctx.clearRect(0,0,cnv.width,cnv.height);

  update();

  requestAnimationFrame(animate); // next cycle
}

function update(){
  mazeGenerator.update();
  processInput();
  player.update();
}

function processInput(){
  let dx = 0;
  let dy = 0;
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
  player.changeTarget(dx,dy,mazeGenerator.cells);
}
