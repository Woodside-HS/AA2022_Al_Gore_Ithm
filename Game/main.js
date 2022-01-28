window.addEventListener("load", init);

var cnv,ctx;
var keys;
var game;

window.addEventListener('keypress', keyDown);
window.addEventListener('keyup',keyUp);

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

  game = new Game(ctx);

  animate();
}

function animate(){
  //ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,cnv.width,cnv.height);

  update();

  requestAnimationFrame(animate);
}

function update(){
  if(keys["Space"]){
   game.levelPath.nextLevel(); //TESTING
    keys["Space"] = false;
  }

  game.update();
}
