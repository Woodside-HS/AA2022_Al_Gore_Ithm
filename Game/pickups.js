function Pickups(x, y, rad, imgSrc, cnv, ctx, scale){
  this.cnv = cnv;
  this.ctx = ctx;
  this.scale = scale;
  this.pos = new JSVector(x, y);
  this.rad = rad;
  this.img = new Image();
  if(imgSrc!=undefined) this.img.src = imgSrc;

  this.time = 0;
}

Pickups.prototype.run = function(){
  this.time++;
  if(this.time%120==0) this.time = 0;
  let actualPos = new JSVector(this.pos.x, this.pos.y+this.scale*Math.sin(this.time*Math.PI/60));
  this.draw(actualPos);
}
Pickups.prototype.draw = function(pos){
  if(this.img.src!=undefined&&this.img.src!="") this.ctx.drawImage(this.img,0,0,this.img.width,this.img.height,pos.x-this.rad,pos.y-this.rad,this.rad*2,this.rad*2);
}
