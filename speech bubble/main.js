window.addEventListener("load", init);
window.addEventListener("click",clickListener);
//window.addEventListener("keypress", keyPressListener);
var cnv, ctx, mouseX, mouseY;
var bubbles = [];
function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");
  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);
  update();
  window.requestAnimationFrame(animate);
}

function update(){
  for (let i = 0; i<bubbles.length; i++){
    bubbles[i].run();
    if(bubbles[i].life<=0){
      bubbles.splice(i, 1); //removes from array if life is below zero
      i--;
    }
  }
}
function loadBubble(){
  let width = 7; //how many lines of text should be printed. If the entire string can't fit on the given lines, it will print as far as it can.
  let length = 20; //how many characters should fit. tbh i could have done this a little better but 1 length = about 2.5 charatcers
  let fontSize = 14; //the font size that the text should be
  let life = 300; //right now, they disappear after five seconds. we can later change it so it fades/advances on keypress
  let message = "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal."
  bubbles.push(new Bubble(mouseX, mouseY, length, width, fontSize, message, life)); //test string xD also if we want to have multiple texts we can make messages an array and put in all the messages
} //pushes to array so mutliple bubbles can be onscreen at once
function clickListener(event){
  mouseX = event.clientX-10;
  mouseY = event.clientY-10;
  loadBubble(); //loads a bubble on click and puts one wherever the mouse position is.
  //I just did it this way to demonstrate how it's versatile in being placed anbywhere, but we can change this

}
