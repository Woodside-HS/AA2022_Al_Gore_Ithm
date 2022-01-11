function Healthbar(cnv, ctx, startinghealth){
  this.cnv = cnv;
  this.ctx = ctx;
  this.pos = new JSVector(5, 5);
  this.health = startinghealth;
}


Healthbar.prototype.run = function(){
  this.gradFill(this.health);
  this.dispText(this.health);
}


Healthbar.prototype.incrementApproval = function(delta){
  this.health += delta;
  this.health = this.value_limit(this.health, 0, 1);
}

Healthbar.prototype.value_limit = function(val, min, max) {
  return val < min ? min : (val > max ? max : val);
}


Healthbar.prototype.gradFill = function(approval){
  var width = approval*(this.cnv.width-2*this.pos.x);
  var height = 20
  var grd=this.ctx.createLinearGradient(0,0,width,0);
  grd.addColorStop(0, new Color(255, 0, 0, 1));
  if(approval<=0.5){
    grd.addColorStop(1,new Color(255, 255-255*(1-2*approval), 0, 1));
  }
  else{
    grd.addColorStop(1,new Color(255-255*(2*approval-1), 255-105*(2*approval-1), 0, 1));
    grd.addColorStop(0.5/approval,new Color(255, 255, 0, 1));
  }
  this.ctx.fillStyle = grd;
  this.ctx.fillRect(this.pos.x,this.pos.y,width,height);
}



Healthbar.prototype.dispText = function(approval){
  this.ctx.font = "16px Times New Roman";
  this.ctx.fillStyle = "black";
  this.ctx.textAlign = "left";
  let approvalrating = Math.round(100*approval);
  this.ctx.fillText("Approval: "+approvalrating+"%", this.pos.x+5, this.pos.y+14);
  this.ctx.fillText(this.interpretApproval(approval), this.pos.x+5, this.pos.y+34);
}

Healthbar.prototype.interpretApproval = function(approval){
  if(approval<0.1){
    return "Prepare for a civilian revolt";
  }
  else if(approval<0.25){
    return "You can expect an impeachment";
  }
  else if (approval<0.45){
    return "America disapproves of you";
  }
  else if (approval<0.55){
    return "Your approval rating is acceptable";
  }
  else if (approval<0.75){
    return "America approves of you";
  }
  else if (approval<0.9){
    return "America worships you";
  }
  else return "You'll be reelected for a third term";
}
