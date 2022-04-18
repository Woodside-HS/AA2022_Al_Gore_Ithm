function Weapon(firingRateDelta,particleDamageDelta,x,y,label,cnv,ctx,rad,imgSrc,scale){
  this.firingRateDelta = firingRateDelta; //scaling factor of rate of firing particles
  this.particleDamageDelta = particleDamageDelta; //constant increase of damage per particle]
  this.label = label;
  Pickups.call(this,x,y,10,imgSrc,cnv,ctx,scale,false);
}

Weapon.prototype = new Pickups();

Weapon.prototype.execute = function(player){
  if(this.collected) return;
  this.collected = true;
  player.particleSystem.framePerParticle/=this.firingRateDelta;
  player.particleSystem.damage+=this.particleDamageDelta;
}

Weapon.prototype.drop = function(player){
  this.collected = false;
  player.particleSystem.framePerParticle*=this.firingRateDelta;
  player.particleSystem.damage-=this.particleDamageDelta;
}
