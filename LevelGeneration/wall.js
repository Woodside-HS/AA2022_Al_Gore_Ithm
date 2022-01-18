function Wall(ctx,x,y,angle,length,clr){
  this.ctx = ctx;
  this.pos = new JSVector(x,y);
  this.angle = angle*Math.PI/180;
  this.length = length;
  this.width = 2;
  this.clr = clr;
}
Wall.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.moveTo(this.pos.x, this.pos.y);
  this.ctx.lineTo(this.pos.x+this.length*Math.cos(this.angle), this.pos.y+this.length*Math.sin(this.angle));
  this.ctx.lineWidth = this.width;
  this.ctx.strokeStyle = this.clr.toString();
  this.ctx.stroke();
}
Wall.prototype.isColliding = function(pos, rad){
  let centerpos = new JSVector(Math.cos(this.angle), Math.sin(this.angle)); // represent the angle as a vector with magnitude 1
  centerpos.multiply(this.length/2); // set the magnitude to half the length
  centerpos.add(this.pos); // add the end position, making centerpos represent the position of the middle of the wall segment
  if(JSVector.subGetNew(centerpos, pos).getMagnitude()>this.length/2+rad){ // if the ball isn't close enough to the wall, return false automatically
    return false;
  }


  let dist = Math.abs(pos.x*Math.tan(this.angle)-pos.y+this.pos.y-this.pos.x*Math.tan(this.angle));
  dist*= Math.abs(Math.cos(this.angle));
// the previous 2 lines use this formula to calculate the shortest distance from the ball to the wall:
// https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line


  return dist<rad; // if the distance calculated above is less than the radius, this means that it's colliding
}
