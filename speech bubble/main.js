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
  let message = "The FitnessGram™ Pacer Test is a multistage aerobic capacity test that progressively gets more difficult as it continues. The 20 meter pacer test will begin in 30 seconds. Line up at the start. The running speed starts slowly, but gets faster each minute after you hear this signal. [beep] A single lap should be completed each time you hear this sound. [ding] Remember to run in a straight line, and run as long as possible. The second time you fail to complete a lap before the sound, your test is over. The test will begin on the word start. On your mark, get ready, start."
  //let messageLength = message.length;
  //let ratio = 5; //121 characters - width is 1/6 of the length, so width = 18 chars bc of ceiling
  //length: this.length/2.4 *this.fontSize*1.1, width: this.width*this.fontSize*1.3
  let length = 48;
  let width = Math.ceil(message.length/length);//Math.ceil(length/ratio/2.84);//Math.ceil(length/Math.pow(ratio,1.3)); //this should be the only thing needed because the text already wraps correctly
  //console.log(width);
  let fontSize = 14; //the font size that the text should be
  let life = 300; //right now, they disappear after five seconds. we can later change it so it fades/advances on keypress
  bubbles.push(new Bubble(mouseX, mouseY, length, width, fontSize, message, life)); //test string xD also if we want to have multiple texts we can make messages an array and put in all the messages
} //pushes to array so mutliple bubbles can be onscreen at once
function clickListener(event){
  mouseX = event.clientX-10;
  mouseY = event.clientY-10;
  loadBubble(); //loads a bubble on click and puts one wherever the mouse position is.
  //I just did it this way to demonstrate how it's versatile in being placed anbywhere, but we can change this

}
