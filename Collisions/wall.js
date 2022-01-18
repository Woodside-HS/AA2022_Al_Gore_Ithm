function Wall(cnv, ctx){
  this.cnv = cnv;
  this.ctx = ctx;
  this.pos = new JSVector(Math.random()*800, Math.random()*600);
  this.angle = Math.random()*Math.PI*2;
  this.length = Math.random()*100+100;
}
Wall.prototype.run = function(){
  this.ctx.beginPath();
  this.ctx.moveTo(this.pos.x, this.pos.y);
  this.ctx.lineTo(this.pos.x+this.length*Math.cos(this.angle), this.pos.y+this.length*Math.sin(this.angle));
  this.ctx.lineWidth = 5;
  this.ctx.strokeStyle = "black";
  this.ctx.stroke();
  this.ctx.closePath();
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
