window.addEventListener("load", init);

var cnv,ctx;
var mousePos,mouseStatus;
var keys;
var player;

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
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  keys = [];
  mousePos = new JSVector(0,0);
  mouseStatus = false;

  player = new Player(cnv.width/2,cnv.height/2,15,new Color(255,0,0,1),5,100,ctx);

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas

  update();

  requestAnimationFrame(animate);
}

function update(){
  player.run();
}
