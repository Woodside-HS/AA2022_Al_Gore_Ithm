window.addEventListener("load", init);

var cnv,ctx;
var levelPath;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  generateLevels(5); //generates (parameter)# of new levels

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas

  update();

  requestAnimationFrame(animate);
}

function update(){
  levelPath.display();
}

function generateLevels(n){
  var levels = [];
  let rad = 25;
  let dist = (cnv.height-rad*4)/(n-1);

  for(var i = 0;i<n;i++){
    //determines random distance away from the y axis
    let distFromCenter = 0.2;
    let delta = Math.random()*cnv.width*distFromCenter/2+cnv.width*distFromCenter/2-rad;
    let sign = Math.random()>0.5?1:-1;

    let x = cnv.width/2 + delta*sign;
    let y = cnv.height/2 + dist*(n-1)/2.0 - i*dist;

    //create color gradient where as i increases, the icon color becomes darker
    let val = 150 - i/n*100;
    let clr = new Color((1-i/n)*225,i/n*225,0,1);
    let label = "Level " + (i+1);

    if(i==0||i==n-1) x = cnv.width/2; //centers first and last icons
    if(i==n-1) rad*=1.2; //final level has larger icon
    let level = new LevelIcon(ctx,x,y,clr,rad,label)
    levels.push(level);
  }
  levelPath = new LevelPath(levels);
}
