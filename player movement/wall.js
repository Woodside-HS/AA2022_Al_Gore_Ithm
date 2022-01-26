class Wall{
  constructor(x, y, lineWidth, wallLength, wallType, wallCount){
    this.pos = new JSVector(x,y);
    this.lineWidth = lineWidth;
    this.wallLength = wallLength;
    this.wallType = wallType;
    this.leftCol = false;
    this.rightCol = false;
    this.topCol = false;
    this.bottomCol = false;
    this.wallCount = wallCount;
    this.canvas = document.getElementById("cnv");
    this.ctx = this.canvas.getContext("2d");
  }
  run(){
    this.update();
    this.draw();
  }
  /*
  getPlayerCoords(x, y, playerSize){
    this.playerPos = new JSVector(x, y);
    this.playerSize = playerSize;
  }
  */
  update(){
    this.ctx.font = '24px serif';
/*
    if(this.pos.x-player.size/2-this.lineWidth/2<=player.posCalc.x && this.pos.x+player.size/2+this.lineWidth/2>=player.posCalc.x
    && this.pos.y-player.size/2<=player.posCalc.y && this.pos.y+this.wallLength+player.size/2>=player.posCalc.y && this.wallType == "vertical" ||
    this.pos.y-player.size/2-this.lineWidth/2<=player.posCalc.y && this.pos.y+player.size/2+this.lineWidth/2>=player.posCalc.y
    && this.pos.x-player.size/2<=player.posCalc.x && this.pos.x+this.wallLength+player.size/2>=player.posCalc.x && this.wallType == "horizontal"){
*/
    if(this.pos.x-player.size/2-this.lineWidth/2/* */<=player.posCalc.x && this.pos.x-player.size/2>player.posCalc.x && this.wallType == "vertical" &&
      this.pos.y-player.size/2<=player.posCalc.y && this.pos.y+this.wallLength+player.size/2>=player.posCalc.y ||
      this.pos.y-player.size/2-this.lineWidth/2<=player.posCalc.y && this.pos.y+player.size/2+this.lineWidth/2>player.posCalc.y && this.wallType == "horizontal" &&
      this.pos.x-player.size/2<=player.posCalc.x && this.pos.x+this.lineWidth/2-player.size/2>=player.posCalc.x){
      this.ctx.fillText("Collision: left", 30, 90);
      this.leftCol = true;
    }
      else{
        this.leftCol = false;
      }
    if(this.pos.x+player.size/2+this.lineWidth/2>=player.posCalc.x && this.pos.x+player.size/2<player.posCalc.x &&this.wallType == "vertical" &&
      this.pos.y-player.size/2<=player.posCalc.y && this.pos.y+player.size/2 + this.wallLength>=player.posCalc.y ||
      this.pos.y-player.size/2-this.lineWidth/2<=player.posCalc.y && this.pos.y+player.size/2+this.lineWidth/2>player.posCalc.y && this.wallType == "horizontal" &&
      this.pos.x+player.size/2+this.wallLength-this.lineWidth/2<=player.posCalc.x && this.pos.x+this.wallLength+player.size/2>=player.posCalc.x){
      this.ctx.fillText("Collision: right", 30, 120);
      this.rightCol = true;
    }
      else{
        this.rightCol = false;
      }
    if(this.pos.y-player.size/2<=player.posCalc.y && this.pos.y-player.size/2+this.lineWidth/2>player.posCalc.y && this.wallType == "vertical" &&
      this.pos.x-player.size/2-this.lineWidth/2<=player.posCalc.x && this.pos.x+player.size/2+this.lineWidth/2>player.posCalc.x ||
      this.pos.x-player.size/2<=player.posCalc.x && this.pos.x+player.size/2+this.wallLength>player.posCalc.x && this.wallType == "horizontal" &&
      this.pos.y-player.size/2-this.lineWidth/2<=player.posCalc.y && this.pos.y-player.size/2>player.posCalc.y){
      this.ctx.fillText("Collision: top", 30, 150);
      this.topCol = true;
    }
    else{
      this.topCol = false;
    }
    if(this.pos.y+this.wallLength+player.size/2>=player.posCalc.y && this.pos.y+this.wallLength+player.size/2-this.lineWidth/2<player.posCalc.y && this.wallType == "vertical" &&
      this.pos.x-player.size/2-this.lineWidth/2<=player.posCalc.x && this.pos.x+player.size/2+this.lineWidth/2>player.posCalc.x ||
      this.pos.x-player.size/2<=player.posCalc.x && this.pos.x+player.size/2+this.wallLength>player.posCalc.x && this.wallType == "horizontal" &&
      this.pos.y+player.size/2<=player.posCalc.y && this.pos.y+player.size/2+this.lineWidth/2>player.posCalc.y){
      this.ctx.fillText("Collision: bottom", 30, 180);
      this.bottomCol = true;
    }
    else{
      this.bottomCol = false;
    }



/*
    }
    else{
      this.ctx.fillText("Collision: none", 30, 90);
    }
    */
      this.ctx.fillText("WallX: "+ this.pos.x + "WallY: "+this.pos.y, 30, 60);
  }
  draw(){
    //this.ctx.font = '24px serif';
    //this.ctx.fillText("Touching wall? "+, 4, 20);
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.beginPath();
    if(this.wallType == "vertical"){
      this.ctx.moveTo(this.pos.x,this.pos.y);
      this.ctx.lineTo(this.pos.x,this.pos.y+this.wallLength);
    }
    else{
      this.ctx.moveTo(this.pos.x,this.pos.y);
      this.ctx.lineTo(this.pos.x+this.wallLength,this.pos.y);
    }
    this.ctx.closePath();
    this.ctx.stroke();
  }

}
