window.addEventListener("load", init);

var cnv,ctx;
var characters;

function init(){
    cnv = document.getElementById("cnv");
    ctx = cnv.getContext("2d");

    characters = [];

    animate();
}

function animate() {
  ctx.clearRect(0,0,cnv.width,cnv.height);

  update();

  requestAnimationFrame(animate); // next cycle
}

function update(){
  for(var i = 0;i<characters.length;i++){
    characters[i].update();
  }
}
