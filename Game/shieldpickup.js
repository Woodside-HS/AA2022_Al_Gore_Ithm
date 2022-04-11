function ShieldPickup(damageBuffer, x, y, rad, cnv, ctx, scale){
  this.damageBuffer = damageBuffer;
  this.img = new Image();
  this.img.src = "Files/shield.png";
  Pickups.call(this, x, y, rad, this.img.src, cnv,ctx, scale,true);
}

ShieldPickup.prototype = new Pickups();

ShieldPickup.prototype.execute = function(player){
  if(!this.collected){
    this.collected = true;
    player.damageBuffer+=this.damageBuffer;
  }
}

ShieldPickup.prototype.drop = function(player){
  this.collected = false;
  player.damageBuffer-=this.damageBuffer;
}
