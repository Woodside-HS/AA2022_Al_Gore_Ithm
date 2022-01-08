window.addEventListener("load", init);
var canvas, ctx;
function init(){
  canvas = document.getElementById("cnv");
  ctx = canvas.getContext("2d");
  window.addEventListener("keydown", keyDownHandler);
  window.addEventListener("keyup", keyUpHandler);
  loadPlayer();
  animate();
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  player.run();
  window.requestAnimationFrame(animate);
}
function loadPlayer(){
  let x = 100;
  let y = 100;
  let color = "red";
  player = new Player(x, y, color)
}

function keyDownHandler(event){
  if(event.code == "KeyW"){
    player.vel.y = -4;
  }
  if(event.code == "KeyS"){
    player.vel.y = 4;
  }
  if(event.code == "KeyA"){
    player.vel.x = -4;
  }
  if(event.code == "KeyD"){
    player.vel.x = 4;
  }
}
function keyUpHandler(event){
  if(event.code == "KeyW"){
    player.vel.y = 0;
  }
  if(event.code == "KeyS"){
    player.vel.y = 0;
  }
  if(event.code == "KeyA"){
    player.vel.x = 0;
  }
  if(event.code == "KeyD"){
    player.vel.x = 0;
  }
}
