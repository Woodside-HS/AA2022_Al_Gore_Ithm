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
  game.update();



  //PATH FINDING AND FOLLOWING TEST CODE:

  let pos = new JSVector(Math.floor(Math.random()*6), Math.floor(Math.random()*6));
  let scale = game.levels[0].maze.cellSize
  pos.multiply(scale);
  pos.add(new JSVector(scale/2, scale/2))
  enemy = new Enemy(pos.x, pos.y, 15, "blue", game.levels[0].maze, 3, 1, cnv, ctx);


  //
  animate();
}

function animate(){
  update();

  requestAnimationFrame(animate);
}

function update(){
  game.update();
  enemy.run();
}
