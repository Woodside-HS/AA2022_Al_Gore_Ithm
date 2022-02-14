class Pickup{
  constructor(itemType, itemMessage, x, y, ctx, cnv, rad){
    this.cnv = cnv;
    this.ctx = ctx;
    this.pos = new JSVector(x,y);
    this.itemType = itemType;
    this.itemMessage = itemMessage;
    this.vel = new JSVector(0,0);
    this.acc = new JSVector(0,0);
    this.clock = 0; //movement is based on a cycle, this keeps track of time
    this.rad = rad;
    this.img = new Image(); //kinda dumb dont know why you do this but just followed the YT vid
  }
  run(){
    this.update();
    this.draw();
  }
  update(){
    this.vel.y = Math.sin(this.clock)/6; //cycle based movement, operates on a clock
    this.pos.add(this.vel); //adding pos to vel
    this.clock+= .05; //increments the clock which therfore affects velocity above
    if (this.clock>6.25){this.clock =0;} //length of period is around 6.25 seconds on the clock; itll reset when it hits zero
  }
  draw(){
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.rad,0,Math.PI*2); //draws circle
    if(this.itemType == "powerup"){
        this.img.src = "IMG_4373.jpg"; //when we merge to main, i'll get this in the files system and rewrite the code. just looked at linked YT vid for saying img.src
        this.ctx.drawImage(this.img, this.pos.x-this.rad, this.pos.y-this.rad, this.rad*2, this.rad*2); //sets the image
        //items that are classified as powerups will have an image drawn, those that aren't will just be a circle.

        //https://www.youtube.com/watch?v=BBvXJsDDYMc godly vid explains how i did this
    }
    this.ctx.stroke();
  }
}
