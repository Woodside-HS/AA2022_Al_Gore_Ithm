function Healthbar(cnv, ctx){
  this.cnv = cnv;
  this.ctx = ctx;
  this.pos = new JSVector(5, 5);
}
Healthbar.prototype.run = function(){
  this.ctx.fillStyle = "black";
  this.ctx.fillRect(this.pos.x, this.pos.y, 790, 20);
}
