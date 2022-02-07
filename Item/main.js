window.addEventListener("load", init);
//window.addEventListener("click",clickListener);
//window.addEventListener("keypress", keyPressListener);
var cnv, ctx, mouseX, mouseY;
var pickups = [];
function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  loadItem(5);
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
function loadItem(n){
  for (let i = 0; i<n; i++){
    let itemRandomizer = Math.random()*3;
    let itemType = null;
    if(itemRandomizer<1){
      itemType = "tool"
    }
    else if (itemRandomizer>=1 && itemRandomizer<=2){
      itemType = "powerup"
    }
    let rad = 10;
    let itemMessage = "Man Bear Pig is real";
    let x = Math.random()*(this.cnv.width-200)+100;
    let y = Math.random()*(this.cnv.height-200)+100;
    pickups.push(new Pickup(itemType, itemMessage, x, y, ctx, cnv, rad));
  }
}
/*
function clickListener(event){
  mouseX = event.clientX-10;
  mouseY = event.clientY-10;
  loadItem();

}
*/
