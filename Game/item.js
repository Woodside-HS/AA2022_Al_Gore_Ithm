function Item(x,y,label,cnv,ctx,rad,imgSrc){
  Pickup.call(this, null,null, x, y, ctx, cnv, rad, imgSrc);
  this.label = label;
  this.used = false;
}

Item.prototype = new Pickup();
