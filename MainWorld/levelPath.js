function LevelPath(levelIcons){
  this.levelIcons = levelIcons;
}

LevelPath.prototype.display = function(){
  //displays each icon and generates a smooth path between the icons by using a path follower
  let acc = 5;
  let vel = new JSVector(0,-acc*2.5);//creates velocity for path follower
  for(var i = 0;i<this.levelIcons.length-1;i++){
    let level = this.levelIcons[i];

    let pos = new JSVector(level.pos.x,level.pos.y);//path follower initial position set to current level
    while(pos.distance(this.levelIcons[i+1].pos)>vel.getMagnitude()){
      let prevPos = new JSVector(pos.x,pos.y);

      if(pos.distance(level.pos)>level.rad){ //path follower attracted to next level icon when not intersecting the icon
        let velDelta = JSVector.subGetNew(this.levelIcons[i+1].pos,pos);
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
  if(this.levelIcons.length>0) this.levelIcons[this.levelIcons.length-1].display();
}
