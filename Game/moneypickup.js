function Moneypickup(x, y, rad, cnv, ctx, scale, valueScale){
  this.img = new Image();
  this.img.src = "Game/Files/money.png";
  this.value = ((Math.floor(Math.random()*10))+10)*valueScale/10;
  this.moneySound = new Sound("Game/Files/money_placeholder.mp3");
  Pickups.call(this, x, y, rad, this.img.src, cnv,ctx, scale,true);
}

Moneypickup.prototype = new Pickups();

Moneypickup.prototype.execute = function(player){
  if(!this.collected){
    this.collected = true;
    this.addMoney(player);
  }
  this.moneySound.playSFX();
}

Moneypickup.prototype.drop = function(player){
  this.collected = false;
}

Moneypickup.prototype.addMoney = function(player){
  player.money+=this.value;
}

Moneypickup.dispMoney = function(money, pos, ctx){
  ctx.font = "25px serif";
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.strokeText("Campaign Funding: $"+ this.interpretMoney(money), pos.x+5, pos.y+34);
}

Moneypickup.interpretMoney = function(money){
  if(money/1000000>1){
    let temp = money/1000000;
    temp = Math.floor(temp*100)/100;
    return temp+" million";
  }
  else{
    let temp = money/1000;
    return temp + "k";
  }
}
