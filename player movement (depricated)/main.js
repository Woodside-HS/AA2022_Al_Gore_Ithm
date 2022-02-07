var canvas, ctx;
var walls = [];
var keys;

window.addEventListener("load", init);
window.addEventListener('keypress', keyDown);
window.addEventListener('keyup', keyUp);

function keyDown(e) { //testing next level function
  keys[e.code] = true;
}
function keyUp(e){
  keys[e.code] = false;
}

function init(){
  canvas = document.getElementById("cnv");
  ctx = canvas.getContext("2d");
  keys = [];
  loadPlayer();
  loadWalls(5);
  animate();
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  update();

  requestAnimationFrame(animate);
}

function update(){
  checkPlayerInput();
  player.run();
  for (let i = 0; i<walls.length; i++){
    walls[i].run();
  }
  checkCollisions();
}

function checkPlayerInput(){
  if(keys["KeyA"]){
    //player.vel.x = -4;
    player.controlLeft = true;
    player.controlRight = false;
  }
  else if(keys["KeyD"]){
    //player.vel.x = 4;
    player.controlRight = true;
    player.controlLeft = false;
  }
  else{
    player.vel.x = 0;
  }

  if(keys["KeyW"]){
    //player.vel.y = -4;
    player.controlUp = true;
    player.controlDown = false;
  }
  else if(keys["KeyS"]){
    //player.vel.y = 4;
    player.controlDown = true;
    player.controlUp = false;
  }
  else{
    player.vel.y = 0;
  }
}

function loadPlayer(){
  let x = 100;
  let y = 100;
  let size = 50;
  let color = "red";
  player = new Player(x, y, color, size);
}
function loadWalls(n){
  for (let i = 0; i<n; i++){
    let x = Math.floor(Math.random()*canvas.width*2/3+100);//592 420
    let y = Math.floor(Math.random()*canvas.height*2/3+100);//138 230
    let lineWidth = 10;
    let wallLength = 75;
    let wallCount = n;
    let wallType = "vertical";
    if(Math.random()<0.5){
      wallType = "horizontal";
    }
    else{
      wallType = "vertical";
    }
    walls.push(new Wall(x, y, lineWidth, wallLength, wallType, wallCount));
  }
}

function (event){
  if(player.controlUp){
    player.wallScore = 0;
    for (let i = 0; i<walls[0].wallCount; i++){
      if(walls[i].bottomCol){
        player.wallScore++;
      }
    }
    if (player.wallScore != 0){
      player.vel.y = 0;
    }
    else{
      player.vel.y = -4;
    }
  }
  if(player.controlRight){
    player.wallScore = 0;
    for (let i = 0; i<walls[0].wallCount; i++){
      if(walls[i].leftCol){
        player.wallScore++;
      }
    }
    if (player.wallScore != 0){
      player.vel.x = 0;
    }
    else{
      player.vel.x = 4;
    }
  }
  if(player.controlLeft){
    player.wallScore = 0;
    for (let i = 0; i<walls[0].wallCount; i++){
      if(walls[i].rightCol){
        player.wallScore++;
      }
    }
    if (player.wallScore != 0){
      player.vel.x = 0;
    }
    else{
      player.vel.x = -4;
    }
  }
  if(player.controlDown){
    player.wallScore = 0;
    for (let i = 0; i<walls[0].wallCount; i++){
      if(walls[i].topCol){
        player.wallScore++;
      }
    }
    if (player.wallScore != 0){
      player.vel.y = 0;
    }
    else{
      player.vel.y = 4;
    }
  }
}
*/
