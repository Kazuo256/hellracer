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
};

Game.keyPressed = function(e) {
  var key = e.keyCode;
  if (key == '37')
    Player.moveLeft(true);
  else if (key == '39')
    Player.moveRight(true);
  else if (key == '38')
    Player.moveUp(true);
  else if (key == '40')
    Player.moveDown(true);
};

Game.keyReleased = function(e) {
  var key = e.keyCode;
  if (key == '37')
    Player.moveLeft(false);
  else if (key == '39')
    Player.moveRight(false);
  else if (key == '38')
    Player.moveUp(false);
  else if (key == '40')
    Player.moveDown(false);
};

Game.update = function() {
  Player.update();
};

Game.draw = function() {
  Graphics.clear()

  // Your code goes here

  // =====
  // Example
  Graphics.car(Player.x, Player.y, 0, Player.axisH())
  //=====
};

