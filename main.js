
Player = {};

Player.initialize = function () {
  this.x = W/2;
  this.y = H*6/8;
  this.vx = 0;
  this.vy = 0;
}

Player.moveLeft = function (set) {

}

Player.moveRight = function (set) {

}


var Graphics = {}


Graphics.initialize = function (ctx) {
  this.ctx = ctx
  this.car_sprite = document.getElementById("car_sprite")
}

Graphics.car_size = 8;

Graphics.clear = function () {
  this.ctx.setTransform(1,0,0,1,0,0);
  this.ctx.fillStyle = "#000";
  this.ctx.fillRect(0, 0, 800, 600);
  this.ctx.fillStyle = "#101510";
  this.ctx.fillRect(200, 0, 400, 600);
}

Graphics.car = function (x, y, size, dir) {
  this.ctx.translate(x, y);
  this.ctx.drawImage(this.car_sprite, 0, 0, 16, 32, -8, -16, 16, 32)
}

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

