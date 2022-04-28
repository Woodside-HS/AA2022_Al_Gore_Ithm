window.addEventListener("load", init);

var mousePos,mouseStatus;
var keys, music, gameStarted;

window.addEventListener('keypress',keyDown);
window.addEventListener('keyup',keyUp);
window.addEventListener("mousedown",mouseDown);
window.addEventListener("mouseup",mouseUp);
window.addEventListener("mousemove",mouseMove);

function mouseDown(){
  mouseStatus = true;
}
function mouseUp(){
  mouseStatus = false;
}
function mouseMove(){
  mousePos = new JSVector(event.clientX, event.clientY);
}
function keyDown(e) { //testing next level function
  keys[e.code] = true;
}
function keyUp(e){
  keys[e.code] = false;
}

function init(){
  let cnv = document.getElementById("cnv");
  cnv.width = window.innerWidth-20;
  cnv.height = window.innerHeight-40;
  let ctx = cnv.getContext("2d");
  keys = [];
  mousePos = new JSVector(0,0);
  mouseStatus = false;
  gameStarted = false;
  music = new Sound('Files/Al-Gore-ithm_1.mp3');
  title = new Title(cnv,ctx);
  game = new Game(cnv,ctx);

  animate();
}

function animate(){
  update();

  requestAnimationFrame(animate);
}

function update(){
  if(!mouseStatus && !gameStarted){
    title.update();
  }
  else{
    game.update();
    gameStarted = true;
  }
}
