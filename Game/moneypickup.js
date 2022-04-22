function Moneypickup(x, y, rad, cnv, ctx, scale){
  this.img = new Image();
  this.img.src = "Files/money.png";
  this.moneySound = new Sound("Files/money_placeholder.mp3");
  Pickups.call(this, x, y, rad, this.img.src, cnv,ctx, scale,true);
}

Moneypickup.prototype = new Pickups();

Moneypickup.prototype.execute = function(player){
  if(!this.collected){
    this.collected = true;
  }
  this.moneySound.playSFX();
}

Moneypickup.prototype.drop = function(player){
  this.collected = false;
}

Moneypickup.prototype.addMoney = function(){
/*

         TO BE IMPLEMENTED LATER

  */
}
