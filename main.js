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
  Graphics.update();
  this.speed += 0.01/this.fps;
};

Game.draw = function() {
  Graphics.clear()

  // Your code goes here

  // =====
  // Example
  Graphics.car(Player.x, Player.y, 0, Player.axisH())
  //=====
};


var Graphics = {}


Graphics.initialize = function (ctx) {
  this.ctx = ctx
  this.car_sprite = document.getElementById("car_sprite")
}

Graphics.scroll = 0;
Graphics.car_size = 8;

Graphics.update = function () {
  this.scroll += Game.speed/50;
  while (this.scroll >= 1) {
    this.scroll -= 1
  }
}

Graphics.setIdentity = function () {
  this.ctx.setTransform(1,0,0,1,0,0);
}

Graphics.clear = function () {
  this.setIdentity()
  this.ctx.fillStyle = "#000";
  this.ctx.fillRect(0, 0, 800, 600);
  this.ctx.fillStyle = "#101510";
  this.ctx.fillRect(200, 0, 400, 600);
  // Draw stripes
  this.ctx.translate(W/2, -H*(1 - this.scroll));
  for (var i = 0; i < 10; ++i) {
    this.ctx.fillStyle = "#aba";
    this.ctx.fillRect(-4, i*H/10, 8, H/30);
    this.ctx.fillRect(-4, (10+i)*H/10, 8, H/30);
  }
  this.setIdentity()
}

Graphics.car = function (x, y, size, dir) {
  this.setIdentity()
  this.ctx.translate(x, y);
  if (dir > 0) {
    this.ctx.rotate(20*Math.PI/180);
    this.ctx.scale(-1,1)
    this.ctx.drawImage(this.car_sprite, 16, 0, 16, 32, -8, -16, 16, 32)
    this.ctx.scale(-1,1)
  } else if (dir < 0) {
    this.ctx.rotate(-20*Math.PI/180);
    this.ctx.drawImage(this.car_sprite, 16, 0, 16, 32, -8, -16, 16, 32)
  } else
    this.ctx.drawImage(this.car_sprite, 0, 0, 16, 32, -8, -16, 16, 32)
}


var Player = {};

Player.speed = 6

Player.initialize = function () {
  this.x = W/2;
  this.y = H*6/8;
  this.vx = 0;
  this.vy = 0;
  this.move = {
    left: false, right: false
  }
}

Player.moveLeft = function (set) {
  this.move.left = !!set
}

Player.moveRight = function (set) {
  this.move.right = !!set
}

Player.moveUp = function (set) {
  this.move.up = !!set
}

Player.moveDown = function (set) {
  this.move.down = !!set
}

Player.axisH = function () {
  return (this.move.right ? 1 : 0) - (this.move.left ? 1 : 0)
}

Player.axisV = function () {
  return (this.move.down ? 1 : 0) - (this.move.up ? 1 : 0)
}

Player.update = function () {
  this.vx = this.speed*this.axisH()
  this.vy = this.speed*this.axisV()
  this.x = Math.max(Math.min(this.x + this.vx, W-200), 200)
  this.y = Math.max(Math.min(this.y + this.vy, H), 0)
}

