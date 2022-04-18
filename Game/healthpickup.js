function Healthpickup(x, y, rad, cnv, ctx, scale, power){
  this.img = new Image();
  this.img.src = "Files/health.png";
  this.power = power;
  Pickups.call(this, x, y, rad, this.img.src, cnv,ctx, scale,true);
}

Healthpickup.prototype = new Pickups();

Healthpickup.prototype.execute = function(player){
  if(!this.collected){
    if(player.life<1000-this.power){
      player.life+=this.power;
    }
    else player.life = 1000;
    this.collected = true;
  }
}

Healthpickup.prototype.drop = function(player){
  this.collected = false;
}
