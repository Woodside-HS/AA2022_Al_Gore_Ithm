function Title(cnv,ctx){
  this.cnv = cnv;
  this.ctx = ctx;
}

Title.prototype.update = function(){
  this.ctx.clearRect(0,0,cnv.width,cnv.height)
  this.ctx.font = cnv.height/16+'px serif'
  this.ctx.textAlign = 'center';
  this.ctx.fillText("Al-gore-ithm",cnv.width/2,cnv.height/8);
  this.ctx.fillText("Click anywhere to play",cnv.width/2,cnv.height/5.25);
  this.ctx.fillText("Instructions:",cnv.width/2,cnv.height/3.8);
  this.ctx.fillText("Use the WASD keys to move around.",cnv.width/2,cnv.height/3);
  this.ctx.fillText("Click and hold to defeat your enemies.",cnv.width/2,cnv.height/2.4);
  this.ctx.fillText("Press the spacebar to go to the world map.",cnv.width/2,cnv.height/2);
  this.ctx.fillText("Press M to toggle music and N to toggle SFX.",cnv.width/2,cnv.height/1.75);
  this.ctx.fillText("Avoid running into other enemies.",cnv.width/2,cnv.height/1.55);
  this.ctx.fillText("Collect items to gain approval rating,",cnv.width/2,cnv.height/1.4);
  this.ctx.fillText("output damage, and campaign funds.",cnv.width/2,cnv.height/1.275);
  this.ctx.fillText("Beat all five levels with enough",cnv.width/2,cnv.height/1.17);
  this.ctx.fillText("approval and funding to win!",cnv.width/2,cnv.height/1.08);
}
