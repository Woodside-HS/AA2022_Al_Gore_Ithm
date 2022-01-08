window.addEventListener("load", init);

var cnv,ctx;
var levels;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  levels = [];
  generateLevels(6); //generates (parameter)# of new levels

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height); //clears canvas

  update();

  requestAnimationFrame(animate);
}

function update(){
  display();
}

function generateLevels(n){
  for(var i = 0;i<n;i++){
    let rad = 25;
    let dist = rad*4;

    //determines random distance away from the y axis
    let distFromCenter = 0.2;
    let delta = Math.random()*cnv.width*distFromCenter/2+cnv.width*distFromCenter/2-rad;
    let sign = Math.random()>0.5?1:-1;

    let x = cnv.width/2 + delta*sign;
    let y = cnv.height/2 + dist*(n-1)/2.0 - i*dist;

    //create color gradient where as i increases, the icon color becomes darker
    let val = 150 - i/n*100;
    let clr = new Color(val,val,val,1);
    let label = "Level " + (i+1);

    if(i==0||i==n-1) x = cnv.width/2; //centers first and last icons
    if(i==n-1) rad*=1.2; //final level has larger icon
    let level = new LevelIcon(ctx,x,y,clr,rad,label)
    levels.push(level);
  }
}

function display(){
  //displays each icon and generates a smooth path between the icons by using a path follower
  let acc = 5;
  let vel = new JSVector(0,-acc*2.5);//creates velocity for path follower
  for(var i = 0;i<levels.length-1;i++){
    let level = levels[i];

    let pos = new JSVector(level.pos.x,level.pos.y);//path follower initial position set to current level
    while(pos.distance(levels[i+1].pos)>vel.getMagnitude()){
      let prevPos = new JSVector(pos.x,pos.y);

      if(pos.distance(levels[i].pos)>levels[i].rad){ //path follower attracted to next level icon when not intersecting the icon
        let velDelta = JSVector.subGetNew(levels[i+1].pos,pos);
        velDelta.setMagnitude(acc);
        let mag = vel.getMagnitude();
        vel.add(velDelta);
        vel.setMagnitude(mag);
      }
      pos.add(vel);

      //draws path between previous and last position of path follower
      ctx.beginPath();
      ctx.moveTo(prevPos.x,prevPos.y);
      ctx.lineTo(pos.x,pos.y);
      ctx.strokestyle = "black";
      ctx.stroke();
    }

    level.display();
  }
  if(levels.length>0) levels[levels.length-1].display();
}
