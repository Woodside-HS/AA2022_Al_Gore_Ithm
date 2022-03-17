function Shield(damageBuffer,x,y,label,cnv,ctx,rad,imgSrc){
  this.damageBuffer = damageBuffer;

  Item.call(this,x,y,label,cnv,ctx,rad,imgSrc);
}

Shield.prototype = new Item();

Shield.prototype.execute = function(player){
  if(this.used) return;
  this.used = true;
  player.damageBuffer+=this.damageBuffer;
}

Shield.prototype.drop = function(player){
  this.used = false;
  player.damageBuffer-=this.damageBuffer;
}
