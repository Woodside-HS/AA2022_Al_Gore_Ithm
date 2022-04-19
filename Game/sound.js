function Sound(src){
  this.music = new Audio(src);
  //this.knockSfx = new Audio('Files/enemy_knocked.mp3');
  //music.loop = true;
}
Sound.prototype.loadMusic = function(){
  this.music.play();
  this.music.loop = true;
}
Sound.prototype.playSFX = function(){
  this.music.cloneNode(true).play(); //allows for the same effect to be played multiple times without interrupting one that is currently playing.
} //useful for if one kills multiple enemies at the same time
