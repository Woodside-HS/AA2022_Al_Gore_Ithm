window.addEventListener("load", init);

var mousePos,particleSystem, mouseStatus, cnv, ctx;

function init(){
    cnv = document.getElementById("cnv");
    ctx = cnv.getContext("2d");
    animate();
}

function update(){
  if(mouseStatus){
      particleSystem.run();
    }
}
function animate(){
    ctx.clearRect(0,0,cnv.width,cnv.height);
    update();
    requestAnimationFrame(animate);
}
