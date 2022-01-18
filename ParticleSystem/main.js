window.addEventListener("load", init);

let particleSystems = [];
var mouseStatus;
var mousePos, cnv, ctx;

function init(){

    cnv = document.getElementById("cnv");
    ctx = cnv.getContext("2d");

    mousePos = new JSVector(0,0);
    let pos = new JSVector(cnv.width/2,cnv.height/2);
    let acc = JSVector.subGetNew(new JSVector(0,0),pos);
    acc.normalize();
    acc.setMagnitude(.8);

    animate()
}
function update(){
  if(mouseStatus){
    for(let i = 0; i < particleSystems.length; i++){
      particleSystems[i].run();
    }
    mousePos = new JSVector(MouseEvent.clientX, MouseEvent.clientY);
    //particleSystems.push(new ParticleSystem(cnv.width/2,cnv.height/2, .8, mousePos));
  }

}
function animate(){
    ctx.clearRect(0,0,cnv.width,cnv.height);
    update();
    requestAnimationFrame(animate);
}
