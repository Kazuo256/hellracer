
var Graphics = {}

Graphics.initialize = function (ctx) {
  makeDomain(this);
  this.ctx = ctx;
  this.scroll = 0;
  this.car_sprite = document.getElementById("car_sprite")
}

Graphics.car_size = 8;

Graphics.construct = function (newsprite, img, x, y, w, h, qx, qy, sx, sy, r) {
  newsprite.img = document.getElementById(img);
  newsprite.x = x;
  newsprite.y = y;
  newsprite.w = w;
  newsprite.h = h;
  newsprite.qx = qx;
  newsprite.qy = qy;
  newsprite.sx = sx;
  newsprite.sy = sy;
  newsprite.r = r;
}

Graphics.destroy = function (sprite) {
  // nothing
}

Graphics.update = function () {
  this.scroll += Game.speed/60;
  while (this.scroll >= 1) {
    this.scroll -= 1
  }
}

Graphics.setIdentity = function () {
  this.ctx.setTransform(1,0,0,1,0,0);
}

Graphics.clear = function (smooth) {
  this.setIdentity();
  // Draw road
  this.ctx.fillStyle = "#000";
  this.ctx.fillRect(0, 0, 800, 600);
  this.ctx.fillStyle = "#101510";
  this.ctx.fillRect(200, 0, 400, 600);
  // Draw stripes
  this.ctx.translate(W/2, -H*(1 - (this.scroll + SMOOTH*Game.speed/60)));
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

Graphics.draw = function () {
  for (var i = 0; i < this.all.length; ++i) {
    var sprite = this.all[i];
    if (sprite.alive) {
      this.setIdentity();
      this.ctx.translate(sprite.x, sprite.y);
      this.ctx.rotate(sprite.r);
      this.ctx.scale(sprite.sx, sprite.sy);
      this.ctx.drawImage(sprite.img, sprite.qx, sprite.qy, sprite.w, sprite.h,
                         -sprite.w/2, -sprite.h/2, sprite.w, sprite.h);
    }
  }
}

