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
  var key = String.fromCharCode(e.charCode || e.keyCode);
  if (key == 37)
    Player.moveLeft(true);
  else if (key == 39)
    Player.moveRight(true);
};

Game.keyReleased = function(e) {
  
};

Game.update = function() {
  // Your code goes here

  // =====
  // Example
  //this.rect_x += 1
  //if (this.rect_x >= 800) {
  //  this.rect_x = -100
  //}

  //this.rect_y += 1
  //if (this.rect_y >= 600) {
  //  this.rect_y = -100
  //}
  // =====
};

Game.draw = function() {
  Graphics.clear()

  // Your code goes here

  // =====
  // Example
  Graphics.car(Player.x, Player.y, 0, 0)
  //=====
};

