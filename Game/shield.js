function Shield(damageBuffer,x,y,label,cnv,ctx,rad,imgSrc){
  this.damageBuffer = damageBuffer;
  this.label = label;
  Pickups.call(this,x,y,10,imgSrc,cnv,ctx,scale,false);
}

Shield.prototype = new Pickups();

Shield.prototype.execute = function(player){
  if(this.used) return;
  this.used = true;
  player.damageBuffer+=this.damageBuffer;
}

Shield.prototype.drop = function(player){
  this.used = false;
  player.damageBuffer-=this.damageBuffer;
}
