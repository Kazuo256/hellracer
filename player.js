
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
  this.vx = this.speed*this.axisH()
  this.vy = this.speed*this.axisV()
  this.x = Math.max(Math.min(this.x + this.vx, W-200), 200)
  this.y = Math.max(Math.min(this.y + this.vy, H), 0)
}

