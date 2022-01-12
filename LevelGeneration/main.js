window.addEventListener("load", init);

var cnv,ctx;

function init(){
    cnv = document.getElementById("cnv");
    ctx = cnv.getContext("2d");

    animate();
}

function animate() {
  ctx.clearRect(0,0,cnv.width,cnv.height);

  update();

  requestAnimationFrame(animate); // next cycle
}

function update(){

}
