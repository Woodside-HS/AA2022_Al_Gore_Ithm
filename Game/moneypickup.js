function Moneypickup(x, y, rad, cnv, ctx, scale){
  this.img = new Image();
  this.img.src = "Files/money.png";
  Pickups.call(this, x, y, rad, this.img.src, cnv,ctx, scale);
}

Moneypickup.prototype = new Pickups();

Moneypickup.prototype.run = function(player){
  this.checkforcollision(player);
  if(!this.collected){
    this.update();
  }
  else{
    this.addMoney();
  }
}


Moneypickup.prototype.addMoney = function(){
/*

         TO BE IMPLEMENTED LATER

  */
}
