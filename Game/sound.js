function Sound(src){
  this.music = new Audio(src);
  //this.knockSfx = new Audio('Files/enemy_knocked.mp3');
  //music.loop = true;
}
Sound.prototype.loadMusic = function(){
  this.music.play();
  this.music.loop = true;
}
Sound.prototype.playSFX = function(soundEvent){
  this.soundEvent = soundEvent;
  if(this.soundEvent = "knock"){this.music.cloneNode(true).play();}
} //i may remove the idea of sound events since i dont think its very needed
