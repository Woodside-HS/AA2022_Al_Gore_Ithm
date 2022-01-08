function LevelIcon(ctx,x,y,clr,rad,label){
  this.ctx = ctx;
  this.pos = new JSVector(x,y);
  this.clr = clr;
  this.rad = rad;
  this.text = label;
}

LevelIcon.prototype.display = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2);
  this.ctx.fillStyle = this.clr.toString();
  this.ctx.fill();
}
