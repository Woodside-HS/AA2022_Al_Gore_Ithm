function Keypickup(x, y, rad, cnv, ctx, scale){
  this.img = new Image();
  this.img.src = "Game/Files/key.png";
  this.label = "key";
  Pickups.call(this, x, y, rad, this.img.src, cnv,ctx, scale, true);
}

Keypickup.prototype = new Pickups();

Keypickup.prototype.execute = function(player){
  if(!this.collected){
    this.collected = true;
  }
}

Keypickup.prototype.drop = function(player){
  this.collected = false;
}
