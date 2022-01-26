window.addEventListener("load", init);

var cnv,ctx;
var player;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  player = new Player();
  
  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas

  update();

  requestAnimationFrame(animate);
}

function update(){

}
