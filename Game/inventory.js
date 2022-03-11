function Inventory(x,y,w,h,cnv,ctx){
  this.pos = new JSVector(x,y);
  this.scale = new JSVector(w,h);
  this.cnv = cnv;
  this.ctx = ctx;
  this.items = [];
}

Inventory.prototype.display = function(){
  this.ctx.strokeStyle = "white";
  this.ctx.lineWidth = 5;
  this.ctx.strokeRect(this.pos.x,this.pos.y,this.scale.x,this.scale.y);
  let size = 60;
  this.ctx.lineWidth = 1;
  this.ctx.font = size/2+"px serif";
  this.ctx.strokeText("Inventory",this.pos.x+size,this.pos.y+size/2);
}

Inventory.prototype.addItem = function(item){
  this.items.push(item);
}

Inventory.prototype.removeItem = function(index){
  this.items.splice(index,1);
}
