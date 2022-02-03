window.addEventListener("load", init);
//window.addEventListener("click",clickListener);
//window.addEventListener("keypress", keyPressListener);
var cnv, ctx, mouseX, mouseY;
var pickups = [];
function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  loadItem();
  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();
  window.requestAnimationFrame(animate);
}

function update(){
  for (let i = 0; i<pickups.length; i++){
    pickups[i].update();
    pickups[i].draw();
  }
}
function loadItem(){
  let itemRandomizer = Math.random()*3;
  let itemType = null;
  if(itemRandomizer<1.5){
    itemType = "tool"
  }
  else if (itemRandomizer>=1.5 && itemRandomizer<=3){
    itemType = "powerup"
  }
  let itemMessage = "Man Bear Pig is real";
  let x = Math.random()*(this.cnv.width-200)+100;
  let y = Math.random()*(this.cnv.height-200)+100;
  pickups.push(new Pickup(itemType, itemMessage, x, y));
}
/*
function clickListener(event){
  mouseX = event.clientX-10;
  mouseY = event.clientY-10;
  loadItem();

}
*/
