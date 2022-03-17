function Pickups(x, y, rad, imgSrc, cnv, ctx, scale){
  this.cnv = cnv;
  this.ctx = ctx;
  this.scale = scale;
  this.basePos = new JSVector(x,y);
  this.pos = new JSVector(x, y);
  this.rad = rad;
  this.img = new Image();
  if(imgSrc!=undefined) this.img.src = imgSrc;

  this.frame = 0;
  this.frame+=Math.floor(Math.random()*120);

  this.collected = false;
}

Pickups.prototype.update = function(){
  this.frame++;
  if(this.frame%120==0) this.time = 0;
  this.pos = new JSVector(this.basePos.x, this.basePos.y+this.scale*Math.sin(this.frame*Math.PI/60));
  this.draw();
}
Pickups.prototype.draw = function(){
  if(this.img.src!=undefined&&this.img.src!="") this.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.pos.x-this.rad,this.pos.y-this.rad,this.rad*2,this.rad*2);
}


Pickups.prototype.checkforcollision = function(player){
  if(this.pos.distance(player.pos)<this.rad+player.rad){
    this.collected = true;
  }
}
