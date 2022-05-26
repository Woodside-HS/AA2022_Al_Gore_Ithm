function LevelPath(levels,rad,indicatorClr,ctx){
  this.ctx = ctx;
  this.levels = levels;
  this.pathSegments = [];
  this.currentIcon = this.levels[0].icon;
  this.path = -1;
  this.segment = 0;
  this.followPath = false;
  this.speedScale = 0.5;//scale 0 to 1 for speed of path following
  this.frame = 0;
  this.levelUp = new Sound('Files/stage_clear_placeholder.mp3');
  this.generatePath(10/this.levels.length);//generates path where path generator acceleration dependent on amount of levels to ensure consistent curvature
  this.levelIndicator = new LevelIndicator(this.levels[0].icon.pos,rad,indicatorClr,this.ctx); //creates indicator that points to the current level
}

LevelPath.prototype.generatePath = function(acc){ //simulates an object attracted to each level icon to create a curve path that the level indicator follows
  let vel = new JSVector(0,-acc*4);//creates velocity for pathSegments follower
  for(var i = 0;i<this.levels.length-1;i++){
    this.pathSegments.push([]);
    let levelIcon = this.levels[i].icon;

    let pos = new JSVector(levelIcon.pos.x,levelIcon.pos.y);//pathSegments follower initial position set to current level
    while(pos.distance(this.levels[i+1].icon.pos)>vel.getMagnitude()){

      let prevPos = new JSVector(pos.x,pos.y);
      this.pathSegments[i].push(prevPos);

      if(pos.distance(levelIcon.pos)>levelIcon.rad){ //pathSegments follower attracted to next level icon when not intersecting the icon
        let velDelta = JSVector.subGetNew(this.levels[i+1].icon.pos,pos);
        velDelta.setMagnitude(acc);
        let mag = vel.getMagnitude();
        vel.add(velDelta);
        vel.setMagnitude(mag);
      }
      pos.add(vel);
    }
  }
}

LevelPath.prototype.setNextLevel = function(){
  this.currentIcon = this.levels[this.path+1].icon;
  this.levelIndicator.assignTargetPos(this.currentIcon.pos.x,this.currentIcon.pos.y); //interpolates to the level icon position if the current path is complete
}

LevelPath.prototype.display = function(){
  this.frame++;
  //displays each icon and generates a smooth pathSegments between the icons by using a pathSegments follower
  for(var i = 0;i<this.pathSegments.length;i++){
    for(var j = 0;j<this.pathSegments[i].length-1;j++){
      let pos0 = this.pathSegments[i][j];
      let pos1 = this.pathSegments[i][j+1];
      //displays segment of path
      this.ctx.beginPath();
      this.ctx.moveTo(pos0.x,pos0.y);
      this.ctx.lineTo(pos1.x,pos1.y);
      this.ctx.strokeStyle = "white";
      this.ctx.stroke();
    }
  }
  for(var i = 0;i<this.levels.length;i++){
    this.levels[i].icon.display();
  }
  if(this.path>=0){
    if(this.segment<this.pathSegments[this.path].length-1){ //checks if any remainder of path can be followed
      let pos = this.pathSegments[this.path][this.segment];
      this.levelIndicator.assignTargetPos(pos.x,pos.y); //assigns target position of indicator to next segment in pathway
      this.followPath = true;
    }
    else{
      this.setNextLevel();
      this.followPath = false; //stops following path since path complete
    }
  }
  else{
    this.setNextLevel();
  }
  if(this.frame*this.speedScale>=1&&this.followPath){
    this.frame = 0;
    this.segment++;
  }
  this.levelIndicator.update();
}

LevelPath.prototype.nextLevel = function(){
  var index = this.path>=this.pathSegments.length-1?-1:this.path+1; //goes to first level if next level called on last level
  this.levelUp.playSFX();
  this.setPath(index);
}
LevelPath.prototype.setPath = function(index){
  this.path = index;
  this.segment = 0;
}
