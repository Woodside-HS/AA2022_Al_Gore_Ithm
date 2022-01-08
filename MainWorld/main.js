window.addEventListener("load", init);

var cnv,ctx;
var levels;

function init(){
  cnv = document.getElementById("cnv");
  ctx = cnv.getContext("2d");

  levels = [];
  var n = 6;
  for(var i = 0;i<n;i++){
    let rad = 25;
    let dist = rad*4;
    let x = cnv.width/2 + (Math.random()-0.5)*(cnv.width*0.75-2*rad);
    let y = cnv.height/2 + dist*(n-1)/2.0 - i*dist;
    let val = 150 - i/n*100;
    let clr = new Color(val,val,val,1);
    let label = "Level " + (i+1);
    if(i==0||i==n-1) x = cnv.width/2;
    if(i==n-1) rad*=1.2;
    let level = new LevelIcon(ctx,x,y,clr,rad,label)
    levels.push(level);
  }

  animate();
}

function animate(){
  ctx.clearRect(0,0,cnv.width,cnv.height);

  update();

  requestAnimationFrame(animate);
}

function update(){
  display();
}

function display(){
  let acc = 5;
  let vel = new JSVector(0,-acc*2);
  for(var i = 0;i<levels.length-1;i++){
    let level = levels[i];

    let pos = new JSVector(level.pos.x,level.pos.y);
    while(pos.distance(levels[i+1].pos)>vel.getMagnitude()){
      let prevPos = new JSVector(pos.x,pos.y);

      if(pos.distance(levels[i].pos)>levels[i].rad){
        let velDelta = JSVector.subGetNew(levels[i+1].pos,pos);
        velDelta.setMagnitude(acc);
        let mag = vel.getMagnitude();
        vel.add(velDelta);
        vel.setMagnitude(mag);
      }
      pos.add(vel);

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
