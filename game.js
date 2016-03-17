var Game = {};

var W = 800;
var H = 600;
var KEY = null;
Game.fps = 30;

Game.initialize = function() {
  document.addEventListener("keydown", this.keyPressed.bind(this), false);
  document.addEventListener("keyup", this.keyReleased.bind(this), false);
  Player.initialize();
  Graphics.initialize(document.getElementById("canvas").getContext("2d"));
  this.speed = 1;
  this.active = true;
};

Game.keyChanged = function(key,state) {
  if (key == '37')
    Player.moveLeft(state);
  else if (key == '39')
    Player.moveRight(state);
  else if (key == '38')
    Player.moveUp(state);
  else if (key == '40')
    Player.moveDown(state);
  else if (key == '27' && state)
    this.active = !this.active;
}

Game.keyPressed = function(e) {
  this.keyChanged(e.keyCode, true);
}

Game.keyReleased = function(e) {
  this.keyChanged(e.keyCode, false);
}

Game.update = function() {
  if (this.active) {
    Player.update();
    Graphics.update();
    this.speed += 0.01/this.fps;
  }
};

Game.draw = function() {
  Graphics.clear()
  Graphics.car(Player.x, Player.y, 0, Player.vx)
};

