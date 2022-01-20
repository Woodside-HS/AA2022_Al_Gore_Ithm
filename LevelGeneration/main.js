window.addEventListener("load", init);

var cnv,ctx;
var keys;
var level = [];
var currentLevel;

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
    let player = new Player(cellSize/2,cellSize/2,15,new Color(255,0,0,1),7,ctx);
    let level1 = new Level(6,6,cellSize,null,null,player,ctx) //creates new level with no enemies or boss parameters - null,null -

    currentLevel = 0;
    levels = [];
    levels.push(level1);

    reloadLevel();

    animate();
}

function reloadLevel(){
  levels[currentLevel].load();
}

function animate() {
  ctx.clearRect(0,0,cnv.width,cnv.height);

  update();

  requestAnimationFrame(animate); // next cycle
}

function update(){
  levels[currentLevel].update();
}
