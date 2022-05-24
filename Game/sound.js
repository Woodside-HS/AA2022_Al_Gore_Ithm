let enableSFX = true;
let enableMusic = true;

function Sound(src){
  this.music = new Audio(src);
  //this.knockSfx = new Audio('Files/enemy_knocked.mp3');
  //music.loop = true
}
Sound.prototype.loadMusic = function(){
  this.music.play();
  this.music.loop = true;
}
Sound.prototype.toggleMusic = function(){
  if(this.music.loop){
    this.music.pause();
    this.music.currentTime = 0;
    this.music.loop = false;
  }
  else{
    this.music.play();
    this.music.loop = true;

  }
}
Sound.prototype.playSFX = function(){
  console.log("play: " + enableSFX);
  if(enableSFX){
    this.music.cloneNode(true).play(); //allows for the same effect to be played multiple times without interrupting one that is currently playing.
  }
} //useful for if one kills multiple enemies at the same time

Sound.prototype.toggleSFX = function(){
  if(enableSFX){
    enableSFX = false;
  }
  else{
    enableSFX = true;
  }
}

//Sound.prototype.enableSFX = true;
