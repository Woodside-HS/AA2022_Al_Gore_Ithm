function Title(cnv,ctx){
  this.cnv = cnv;
  this.ctx = ctx;
}

Title.prototype.update = function(){
  this.ctx.clearRect(0,0,cnv.width,cnv.height)
  this.ctx.font = cnv.height/15+'px serif'
  this.ctx.textAlign = 'center';
  this.ctx.fillText("Al-gore-ithm",cnv.width/2,cnv.height/3);
  this.ctx.fillText("Click anywhere to play",cnv.width/2,cnv.height/2);
}
