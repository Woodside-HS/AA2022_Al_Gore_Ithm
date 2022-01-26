function LevelIcon(ctx,x,y,clr,rad,label){
  this.ctx = ctx;
  this.pos = new JSVector(x,y);
  this.clr = clr;
  this.rad = rad;
  this.label = label;
}

LevelIcon.prototype.display = function(){
  this.ctx.beginPath();
  this.ctx.arc(this.pos.x,this.pos.y,this.rad,0,Math.PI*2); //draws circle icon to represent level
  this.ctx.fillStyle = this.clr.toString();
  this.ctx.fill();
  /*this.ctx.fillStyle = "white";
  this.ctx.font = "20px serif";
  this.ctx.fillText(this.label,this.pos.x + this.rad + 10,this.pos.y);*/
}
