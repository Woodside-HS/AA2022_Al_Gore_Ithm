function LevelPath(levelIcons,rad,indicatorClr,ctx){
  this.ctx = ctx;
  this.levelIcons = levelIcons;
  this.pathSegments = [];
  this.currentLevel = levelIcons[0];
  this.path = -1;
  this.segment = 0;
  this.followPath = false;
  this.speedScale = 0.5;//scale 0 to 1 for speed of path following
  this.frame = 0;

  this.generatePath(10/this.levelIcons.length);//generates path where path generator acceleration dependent on amount of levels to ensure consistent curvature
  this.levelIndicator = new LevelIndicator(this.levelIcons[0].pos,rad,indicatorClr,this.ctx); //creates indicator that points to the current level
}

LevelPath.prototype.generatePath = function(acc){ //simulates an object attracted to each level icon to create a curve path that the level indicator follows
  let vel = new JSVector(0,-acc*4);//creates velocity for pathSegments follower
  for(var i = 0;i<this.levelIcons.length-1;i++){
    this.pathSegments.push([]);
    let level = this.levelIcons[i];

    let pos = new JSVector(level.pos.x,level.pos.y);//pathSegments follower initial position set to current level
    while(pos.distance(this.levelIcons[i+1].pos)>vel.getMagnitude()){

      let prevPos = new JSVector(pos.x,pos.y);
      this.pathSegments[i].push(prevPos);

      if(pos.distance(level.pos)>level.rad){ //pathSegments follower attracted to next level icon when not intersecting the icon
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

LevelPath.prototype.setNextLevel = function(){
  this.currentLevel = this.levelIcons[this.path+1];
  this.levelIndicator.assignTargetPos(this.currentLevel.pos.x,this.currentLevel.pos.y); //interpolates to the level icon position if the current path is complete
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
  for(var i = 0;i<this.levelIcons.length;i++){
    this.levelIcons[i].display();
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
  this.path = this.path>=this.pathSegments.length-1?-1:this.path+1; //goes to first level if next level called on last level
  this.segment = 0;
}

LevelPath.generateNewPath = function(n,ctx){
  var levels = [];
  let rad = 150/n;
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
  return new LevelPath(levels,rad/1.75,new Color(25,25,220,1),ctx);
}
