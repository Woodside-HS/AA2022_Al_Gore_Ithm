window.addEventListener("load", init);// wait for the page to finish loading with init as the callback
var healthbar;// global variables

function init(){
    let cnv = document.getElementById("cnv");
    let ctx = cnv.getContext("2d");
    healthbar = new Healthbar(cnv, ctx);
    animate();      // kick off the animation
}


function animate() {
    healthbar.run();
    requestAnimationFrame(animate); // next cycle
}
