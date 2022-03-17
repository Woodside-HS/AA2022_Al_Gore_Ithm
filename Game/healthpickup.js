function Healthpickup(x, y, rad, cnv, ctx, scale, power){
  this.img = new Image();
  this.img.src = "Files/health.png";
  this.power = power
  Pickups.call(this, x, y, rad, this.img.src, cnv,ctx, scale);
}

Healthpickup.prototype = new Pickups();

Healthpickup.prototype.run = function(player){
  this.checkforcollision(player);
  if(this.collected){
    if(player.life<1000-this.power){
      player.life+=this.power;
    }
    else player.life = 1000;
  }
  else{
    this.update();
  }
}
