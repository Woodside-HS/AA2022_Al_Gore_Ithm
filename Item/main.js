window.addEventListener("load", init);
//window.addEventListener("click",clickListener);
//window.addEventListener("keypress", keyPressListener);
/*
const image = document.getElementById('powerup.png');
image.addEventListener('load', e => {
  drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
});
*/
var cnv, ctx, mouseX, mouseY;
var pickups = [];
//let img = document.getElementById("imgSource");
function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  loadItem(5); //change number to affect now many pickups are drawn
  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  //ctx.drawImage(img, 50, 50);
  update();
  window.requestAnimationFrame(animate);
}

function update(){
  for (let i = 0; i<pickups.length; i++){
    pickups[i].update(); //updates every pickup
    pickups[i].draw();
  }
}
function loadItem(n){
  for (let i = 0; i<n; i++){
    let itemRandomizer = Math.random()*2;
    let itemType = null;
    if(itemRandomizer<1){
      itemType = "tool"
    }
    else if (itemRandomizer>=1 && itemRandomizer<=2){ //randomizer determines if its a tool or powerup
      itemType = "powerup"
    }
    let rad = 20;
    let itemMessage = "Man Bear Pig is real"; //message but not yet implemented
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
