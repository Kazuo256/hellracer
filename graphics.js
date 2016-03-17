
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
  if (dir > 0) {
    this.ctx.scale(-1,1)
    this.ctx.drawImage(this.car_sprite, 16, 0, 16, 32, -8, -16, 16, 32)
    this.ctx.scale(-1,1)
  } else if (dir < 0)
    this.ctx.drawImage(this.car_sprite, 16, 0, 16, 32, -8, -16, 16, 32)
  else
    this.ctx.drawImage(this.car_sprite, 0, 0, 16, 32, -8, -16, 16, 32)
}

