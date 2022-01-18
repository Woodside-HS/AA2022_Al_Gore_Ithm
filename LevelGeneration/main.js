window.addEventListener("load", init);

var cnv,ctx;
var mazeGenerator;
var keys;
var controls;
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

    controls = new JSVector(0,0);

    keys = [];

    let cellSize = 50;
    mazeGenerator = new MazeGenerator(cellSize,cnv.height/cellSize,cnv.width/cellSize,ctx,new JSVector(0,0,0,1));

    player = new Player(cellSize/2,cellSize/2,7,new Color(255,0,0,1),7,ctx);

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
}

function processInput(){
  controls.x = 0;
  controls.y = 0;
  if(keys["KeyW"]){
    controls.y = -1;
  }
  else if(keys["KeyS"]){
    controls.y = 1;
  }
  if(keys["KeyD"]){
    controls.x = 1;
  }
  else if(keys["KeyA"]){
    controls.x = -1;
  }
  player.update(mazeGenerator);
}
