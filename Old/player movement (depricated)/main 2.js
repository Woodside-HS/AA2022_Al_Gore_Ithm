window.addEventListener("load", init);
var canvas, ctx;
var walls = [];
function init(){
  canvas = document.getElementById("cnv");
  ctx = canvas.getContext("2d");
  window.addEventListener("keydown", keyDownHandler);
  window.addEventListener("keyup", keyUpHandler);
  window.addEventListener("keydown", collisionChecker);
  loadPlayer();
  loadWalls(5);
  animate();
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  player.run();
  for (let i = 0; i<walls.length; i++){
    walls[i].run();
  }
  collisionChecker();
  window.requestAnimationFrame(animate);
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
function keyDownHandler(event){

  if(event.code == "KeyW"){
    //player.vel.y = -4;
    player.controlUp = true;
  }
  if(event.code == "KeyS"){
    //player.vel.y = 4;
    player.controlDown = true;
  }
  if(event.code == "KeyA"){
    //player.vel.x = -4;
    player.controlLeft = true;
  }
  if(event.code == "KeyD"){
    //player.vel.x = 4;
    player.controlRight = true;
  }
  //the collision only works properly if you're stopped and coliding.
  //if you hold the key down you'll go straight through.
}
function keyUpHandler(event){
  if(event.code == "KeyW"){
    player.vel.y = 0;
    player.controlUp = false;
  }
  if(event.code == "KeyS"){
    player.vel.y = 0;
    player.controlDown = false;
  }
  if(event.code == "KeyA"){
    player.vel.x = 0;
    player.controlLeft = false;
  }
  if(event.code == "KeyD"){
    player.vel.x = 0;
    player.controlRight = false;
  }
}
function collisionChecker(event){
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
