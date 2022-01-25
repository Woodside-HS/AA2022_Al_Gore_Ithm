window.addEventListener("load", init);


var canvas;
var context, contextMini;
var world;

function init(){
  canvas = document.getElementById("cnv");
  canvasMini = document.getElementById("cnv2");
  context = canvas.getContext("2d");
  contextMini = canvasMini.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 0, canvas.width, canvas.height);
  contextMini.fillRect(810, 600, canvasMini.width, canvasMini.height);

  world = new World();


  animate();
}
function animate() {

    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);

    contextMini.fillStyle = "white";
    contextMini.fillRect(0, 0, canvasMini.width, canvasMini.height);

    world.draw();

    requestAnimationFrame(animate);

}
