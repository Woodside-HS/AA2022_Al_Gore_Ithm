window.addEventListener("load", init);
//Listener to determine when click to make particle system
window.addEventListener("mousedown", ()=>{
  mouseStatus = true;
});
//Listener to determine when to stop running particle System
window.addEventListener("mouseup", ()=>{
  mouseStatus = false;
});
//Listner to track mouse movement to be able to drag and shoot.
window.addEventListener("mousemove", (event) => {
  mousePos = new JSVector(event.clientX, event.clientY);
})

var mousePos,particleSystem, mouseStatus, cnv, ctx;

function init(){
    cnv = document.getElementById("cnv");
    ctx = cnv.getContext("2d");
    mousePos = new JSVector(0,0);
    mousStatus = false;
    particleSystem = new ParticleSystem(cnv.width/2,cnv.height/2);
    animate();
}

function update(){
  particleSystem.run();

}
function animate(){
    ctx.clearRect(0,0,cnv.width,cnv.height);
    update();
    requestAnimationFrame(animate);
}
