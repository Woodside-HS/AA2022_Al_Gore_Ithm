function Item(x,y,label,cnv,ctx,rad,imgSrc,scale){
  Pickups.call(this, x, y, 10,imgSrc,cnv,ctx,scale);
  this.label = label;
  this.used = false;
}

Item.prototype = new Pickups();
