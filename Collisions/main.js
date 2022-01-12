window.addEventListener("load", init);// wait for the page to finish loading with init as the callback

var wall, ball;// global variables

function init(){
    let cnv = document.getElementById("cnv");
    let ctx = cnv.getContext("2d");
    wall = new Wall(cnv, ctx);
    ball = new Ball(cnv, ctx);
    animate();      // kick off the animation
}


function animate() {
    wall.ctx.clearRect(0, 0, wall.cnv.width, wall.cnv.height);
    wall.run();
    ball.run();
    requestAnimationFrame(animate); // next cycle
}
