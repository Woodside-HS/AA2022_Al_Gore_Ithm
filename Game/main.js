window.addEventListener("load", init);

var mousePos,mouseStatus;
var keys;

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

  game = new Game(cnv,ctx);

  animate();
}

function animate(){
  update();

  requestAnimationFrame(animate);
}

function update(){
  game.update();
}

// function play(){
//   //<button onclick="play()">Play Audio</button>
//   var audio = new Audio('https://static.wikia.nocookie.net/annex/images/0/01/ReaganBeginsBombingRussia.ogg/revision/latest?cb=20090801083034');
//   audio.play();
// }
