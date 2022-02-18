function Ball(cnv, ctx){
  this.ctx = ctx;
  this.cnv = cnv;
  this.rad = Math.random()*40+40;
  this.pos = new JSVector(Math.random()*(this.cnv.width-2*this.rad)+this.rad, Math.random()*(this.cnv.height-2*this.rad)+this.rad);
  this.vel = new JSVector(Math.random()*8-4, Math.random()*8-4);
  this.vel.setMagnitude(10);
}
Ball.prototype.checkedges = function(){
  if(this.pos.x<this.rad||this.pos.x>this.cnv.width-this.rad){
    this.vel.x *=-1;
  }
  if(this.pos.y<this.rad||this.pos.y>this.cnv.height-this.rad){
    this.vel.y *=-1;
  }
}
Ball.prototype.update = function(){
  this.pos.add(this.vel);
}
Ball.prototype.draw = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2*Math.PI);
  if(wall.isColliding(this.pos, this.rad)) this.color = "red";
  else this.color = "blue";
  this.ctx.fillStyle = this.color;
  this.ctx.fill();
  this.ctx.closePath();
}
Ball.prototype.run = function(){
  this.checkedges();
  this.update();
  this.draw();
}
