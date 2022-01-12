window.addEventListener("load", init);

var cnv,ctx;
var mazeGenerator;

function init(){
    cnv = document.getElementById("cnv");
    ctx = cnv.getContext("2d");

    let cellSize = 50;
    mazeGenerator = new MazeGenerator(new JSVector(0,0),cellSize,cnv.height/cellSize,cnv.width/cellSize,ctx);

    animate();
}

function animate() {
  ctx.clearRect(0,0,cnv.width,cnv.height);

  update();

  requestAnimationFrame(animate); // next cycle
}

function update(){
  mazeGenerator.update();
}
