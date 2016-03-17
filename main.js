
var Car = {}

Car.initialize = function () {
  Car.all = []
  Car.free = []
}

Car.create = function (x,y,type) {
  var newcar
  if (this.free.length > 0) {
    newcar = this.all[free.shift()];
  } else {
    newcar = {}
    this.all.push(newcar)
  }
  newcar.x = x;
  newcar.y = y;
  newcar.vx = 0;
  newcar.vy = 0;
  newcar.type = type;
  newcar.alive = true;
  return newcar;
}

Car.update = function () {
  for (var i = 0; i < Car.all.length; ++i) {
    var car = Car.all[i];
    if (car.alive) {
      car.x = Math.max(Math.min(car.x + car.vx, W-200), 200)
      car.y = Math.max(Math.min(car.y + car.vy, H), 0)
    }
  }
}

Car.draw = function () {
  for (var i = 0; i < Car.all.length; ++i) {
    var car = Car.all[i];
    if (car.alive) {
      Graphics.car(car.x, car.y, 0, car.vx/Math.abs(car.vx));
    }
  }
}


var Enemy = {}

Enemy.all = []

Enemy.initialize = function () {

}

var Game = {};

var W = 800;
var H = 600;
var KEY = null;
Game.fps = 30;

Game.initialize = function() {
  document.addEventListener("keydown", this.keyPressed.bind(this), false);
  document.addEventListener("keyup", this.keyReleased.bind(this), false);
  Car.initialize();
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
    Car.update();
    Graphics.update();
    this.speed += 0.01/this.fps;
  }
};

Game.draw = function() {
  Graphics.clear();
  Car.draw();
};


var Graphics = {}


Graphics.initialize = function (ctx) {
  this.ctx = ctx
  this.car_sprite = document.getElementById("car_sprite")
}

Graphics.scroll = 0;
Graphics.car_size = 8;

Graphics.update = function () {
  this.scroll += Game.speed/60;
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
  this.ctx.fillStyle = "#232";
  for (var i = 0; i < 10; ++i) {
    this.ctx.fillRect(-4, i*H/10, 8, H/30);
    this.ctx.fillRect(-4, (10+i)*H/10, 8, H/30);
  }
  // Draw HUD
  this.setIdentity();
  this.ctx.fillStyle = "#eee";
  this.ctx.font = "32px Helvetica";
  this.ctx.fillText(Math.floor(Game.speed*100) + "%", 16, 48);
  this.setIdentity();
}

Graphics.car = function (x, y, size, dir) {
  this.setIdentity()
  this.ctx.translate(x, y);
  if (Math.abs(dir) > 0.01) {
    this.ctx.rotate(dir*20*Math.PI/180);
    this.ctx.scale(-dir,1)
    this.ctx.drawImage(this.car_sprite, 16, 0, 16, 32, -8, -16, 16, 32)
    this.ctx.scale(-dir,1)
  } else
    this.ctx.drawImage(this.car_sprite, 0, 0, 16, 32, -8, -16, 16, 32)
}


var Player = {};

Player.speed = 6

Player.initialize = function () {
  this.car = Car.create(W/2, H*6/8, "player");
  this.move = {
    left: false, right: false, up: false, down: false
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

Player.stop = function () {
  this.move.left = false
  this.move.right = false
  this.move.up = false
  this.move.down = false
}

Player.axisH = function () {
  return (this.move.right ? 1 : 0) - (this.move.left ? 1 : 0)
}

Player.axisV = function () {
  return (this.move.down ? 1 : 0) - (this.move.up ? 1 : 0)
}

Player.update = function () {
  this.car.vx = this.speed*this.axisH()
  this.car.vy = this.speed*this.axisV()
}

