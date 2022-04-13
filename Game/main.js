window.addEventListener("load", init);

var mousePos,mouseStatus;
<<<<<<< Updated upstream
var keys;
var audio;
=======
var keys, music;
>>>>>>> Stashed changes

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
  let ctx = cnv.getContext("2d");
  keys = [];
  mousePos = new JSVector(0,0);
  mouseStatus = false;
  //mouseDown.dispatchEvent("mouseDown")
  music = new Sound('Files/Al-Gore-ithm_1.mp3');
  //music.loadMusic();

  game = new Game(cnv,ctx);
  //audio = new Audio('')
  animate();
}

function animate(){
  update();

  requestAnimationFrame(animate);
}

function update(){
  game.update();
}
