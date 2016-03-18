
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

Graphics.car = function (x, y, v, dir, side) {
  this.setIdentity()
  this.ctx.translate(x, y);
  this.ctx.scale(1,side);
  if (Math.abs(dir) > 0.01) {
    this.ctx.rotate(dir*20*Math.PI/180);
    this.ctx.scale(-dir,1)
    this.ctx.drawImage(this.car_sprite, v*32+16, 0, 16, 32, -8, -16, 16, 32)
    this.ctx.scale(-dir,1)
  } else
    this.ctx.drawImage(this.car_sprite, v*32+0, 0, 16, 32, -8, -16, 16, 32)
}

