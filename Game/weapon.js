function Weapon(firingRateDelta,particleDamageDelta,x,y,label,cnv,ctx,rad,imgSrc){
  this.firingRateDelta = firingRateDelta; //scaling factor of rate of firing particles
  this.particleDamageDelta = particleDamageDelta; //constant increase of damage per particle

  Item.call(this,x,y,label,cnv,ctx,rad,imgSrc)
}

Weapon.prototype = new Item();

Weapon.prototype.execute = function(player){
  if(this.used) return;
  this.used = true;
  player.particleSystem.framePerParticle/=this.firingRateDelta;
  player.particleSystem.damage+=this.particleDamageDelta;
}

Weapon.prototype.drop = function(player){
  this.used = false;
  player.particleSystem.framePerParticle*=this.firingRateDelta;
  player.particleSystem.damage-=this.particleDamageDelta;
}
