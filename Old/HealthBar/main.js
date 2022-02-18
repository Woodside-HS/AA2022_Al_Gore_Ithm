window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
document.addEventListener('keydown', event => {
    if (event.code === 'ArrowRight') healthbar.incrementApproval(0.01);
    else if (event.code === 'ArrowLeft') healthbar.incrementApproval(-0.01);
  })
var healthbar;// global variables

function init(){
    let cnv = document.getElementById("cnv");
    let ctx = cnv.getContext("2d");
    healthbar = new Healthbar(cnv, ctx, 0.4);
    animate();      // kick off the animation
}


function animate() {
    healthbar.ctx.clearRect(0, 0, healthbar.cnv.width, healthbar.cnv.height);
    healthbar.run();
    requestAnimationFrame(animate); // next cycle
}
