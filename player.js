
var Player = {};

Player.speed = 6

Player.initialize = function () {
  this.car = Car.create(W/2, H*6/8, "player");
  this.alive = true;
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
  if (this.alive) {
    if (Body.checkCollisions(this.car.body, "smallfry")) {
      // Shinde shimatta
      this.alive = false;
      Graphics.explode(this.car.body.x, this.car.body.y);
      Car.remove(this.car);
    }
    var dx = 200+16
    var dy = 32
    this.car.body.x = Math.max(Math.min(this.car.body.x, W-dx), dx)
    this.car.body.y = Math.max(Math.min(this.car.body.y, H-dy), dy)
    this.car.body.vx = this.speed*this.axisH()
    this.car.body.vy = this.speed*this.axisV()
  } else if (Graphics.explo == false) {
    Game.title()
  }
}

