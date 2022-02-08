function Wall(ctx,x,y,angle,length,clr,imgSrc,width){
  this.ctx = ctx;
  this.pos = new JSVector(x,y);
  this.angle = angle*Math.PI/180;
  this.length = length;
  this.width = width;
  this.clr = clr;
  this.img = new Image();
  this.imgSet = false;
  if(imgSrc!=undefined){
    this.img.src = imgSrc;
    this.imgSet = true;
  }
}
Wall.prototype.displayLine = function(){ //displays wall as a line
  this.ctx.beginPath();
  let yShift = this.width/2*Math.sin(this.angle);
  let xShift = -this.width/2*Math.cos(this.angle);
  let len = this.length-xShift;
  this.ctx.moveTo(this.pos.x+xShift,this.pos.y+yShift);
  this.ctx.lineTo(this.pos.x+len*Math.cos(this.angle), this.pos.y+len*Math.sin(this.angle));
  this.ctx.closePath();
  this.ctx.lineWidth = this.width;
  this.ctx.strokeStyle = this.clr.toString();
  this.ctx.stroke();
}
Wall.prototype.displayImage = function(){ //displays wall image rather than black line
  var sx = this.img.width*0.005;
  var sy = this.img.height*0.005;
  let shift = this.width*Math.cos(this.angle);
  var x = this.pos.x+this.width/2-shift;
  var y = this.pos.y-this.width/2;//*Math.cos(this.angle);
  let focus = 8; //sharpness of image displayed
  var imgCropWidth = (this.length+this.width/2+shift)*focus;
  var imgCropHeight = this.width/2*focus;
  this.ctx.translate(x, y);
  this.ctx.rotate(this.angle);
  this.ctx.drawImage(this.img,sx,sy,imgCropWidth,imgCropHeight,0,0,this.length+shift,this.width);
  this.ctx.rotate(-this.angle);
  this.ctx.translate(-x, -y);
}
Wall.prototype.draw = function(){
  if(!this.imgSet) this.displayLine();
  else this.displayImage();
}
Wall.prototype.getDist = function(pos){
  let dist = pos.x*Math.tan(this.angle)-pos.y+this.pos.y-this.pos.x*Math.tan(this.angle);
  dist*= Math.abs(Math.cos(this.angle));
  // https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line

  return dist;
}
Wall.prototype.isColliding = function(pos,rad){
  let centerpos = new JSVector(Math.cos(this.angle), Math.sin(this.angle)); // represent the angle as a vector with magnitude 1
  centerpos.multiply(this.length/2); // set the magnitude to half the length
  centerpos.add(this.pos); // add the end position, making centerpos represent the position of the middle of the wall segment
  if(JSVector.subGetNew(centerpos, pos).getMagnitude()>this.length/2+rad+this.width/2){ // if the ball isn't close enough to the wall, return false automatically
    return false;
  }

  let dist = Math.abs(this.getDist(pos));

  return dist<rad+this.width/2; // if the distance calculated above is less than the radius, this means that it's colliding
}
Wall.prototype.getMinPos = function(pos,rad){ //gives closest possible position between object and wall

  let dist = this.getDist(pos);
  let minDist = rad+this.width*0.5;

  let delta = Math.sign(dist)*(Math.abs(dist)-minDist);

  let x = pos.x+Math.sin(-this.angle)*delta;
  let y = pos.y+Math.cos(-this.angle)*delta;

  return new JSVector(x,y);
}
