function LevelPath(levelIcons){
  this.levelIcons = levelIcons;
  this.path = [];
  this.generatePath(25/this.levelIcons.length);
}
LevelPath.prototype.generatePath = function(acc){
  let vel = new JSVector(0,-acc*2.5);//creates velocity for path follower
  for(var i = 0;i<this.levelIcons.length-1;i++){
    let level = this.levelIcons[i];

    let pos = new JSVector(level.pos.x,level.pos.y);//path follower initial position set to current level
    while(pos.distance(this.levelIcons[i+1].pos)>vel.getMagnitude()){

      let prevPos = new JSVector(pos.x,pos.y);
      this.path.push(prevPos);

      if(pos.distance(level.pos)>level.rad){ //path follower attracted to next level icon when not intersecting the icon
        let velDelta = JSVector.subGetNew(this.levelIcons[i+1].pos,pos);
        velDelta.setMagnitude(acc);
        let mag = vel.getMagnitude();
        vel.add(velDelta);
        vel.setMagnitude(mag);
      }
      pos.add(vel);
    }
  }
}

LevelPath.prototype.display = function(){
  //displays each icon and generates a smooth path between the icons by using a path follower
  for(var i = 0;i<this.path.length-1;i++){
    let pos0 = this.path[i];
    let pos1 = this.path[i+1];

    ctx.beginPath();
    ctx.moveTo(pos0.x,pos0.y);
    ctx.lineTo(pos1.x,pos1.y);
    ctx.strokestyle = "black";
    ctx.stroke();
  }
  for(var i = 0;i<this.levelIcons.length;i++){
    this.levelIcons[i].display();
  }
}
