window.addEventListener("load", init);

let particleSystems = [];
var mouseStatus;
var mousePos;
var canvas, context;

function init(){

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");

    mousePos = new JSVector(0,0);
    let pos = new JSVector(canvas.width/2,canvas.height/2);
    let acc = JSVector.subGetNew(new JSVector(0,0),pos);
    acc.normalize();
    acc.setMagnitude(.8);


    canvas.addEventListener("mousedown", ()=>{
      mouseStatus = true;
      mousePos = new JSVector(event.offsetX, event.offsetY);
      console.log("x: "+(mousePos.x-400)+", y: "+(mousePos.y-300));
      particleSystems.push(new ParticleSystem(canvas.width/2,canvas.height/2, 0.8, mousePos));
    });
    canvas.addEventListener("mouseup", ()=>{
      mouseStatus = false;
      particleSystems.splice(0, 1);
    });

    animate()
}
function update(){
  if(mouseStatus){
    for(let i = 0; i < particleSystems.length; i++){
      //particleSystems[i].setDir(mousePos);
      particleSystems[i].run();
    }
  }
}
function animate(){
    context.clearRect(0,0,canvas.width,canvas.height);
    update();
    requestAnimationFrame(animate);
}
