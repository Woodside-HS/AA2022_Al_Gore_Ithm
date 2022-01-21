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

    //TEST LEVEL
    let cellSize = 100;
    let life = 100;
    let player = new Character(cellSize/2,cellSize/2,15,new Color(255,0,0,1),7,life,ctx);
    let enemy1 = new Character(Math.random()*cnv.width,Math.random()*cnv.height,13,new Color(0,200,50,1),5,life,ctx);
    let enemy2 = new Character(Math.random()*cnv.width,Math.random()*cnv.height,13,new Color(0,200,50,1),5,life,ctx);
    let enemy3 = new Character(Math.random()*cnv.width,Math.random()*cnv.height,13,new Color(0,50,200,1),5,life,ctx);
    let enemy4 = new Character(Math.random()*cnv.width,Math.random()*cnv.height,13,new Color(0,50,200,1),5,life,ctx);
    let enemies = [enemy1,enemy2,enemy3,enemy4];
    let boss = new Character(Math.random()*cnv.width,Math.random()*cnv.height,17,new Color(25,25,50,1),9,life,ctx);

    let level1 = new Level(6,6,cellSize,enemies,boss,player,ctx) //creates new level with no enemies or boss parameters - null,null -

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
