
var Graphics = {}

Graphics.initialize = function (ctx) {
  makeDomain(this);
  this.ctx = ctx;
  this.scroll = 0;
  this.car_sprite = document.getElementById("car_sprite");
  this.explo_sprite = document.getElementById("explo_sprite");
  this.explo = false;
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

Graphics.explode = function (x, y) {
  this.explo = { x:x, y:y, t:30 }
}

Graphics.update = function () {
  this.scroll += Game.speed/60;
  while (this.scroll >= 1) {
    this.scroll -= 1
  }
  if (this.explo != false && --this.explo.t <= 0)
    this.explo = false;
}

Graphics.setIdentity = function () {
  this.ctx.setTransform(1,0,0,1,0,0);
}

Graphics.background = function (smooth) {
  this.setIdentity();
  // Draw road
  this.ctx.fillStyle = "#050505";
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
}

Graphics.formatTime = function (time) {
  var minutes = Math.floor(time/60);
  var seconds = Math.floor(time%60);
  minutes = minutes > 9 ? minutes : "0" + "" + minutes;
  seconds = seconds > 9 ? seconds : "0" + "" + seconds;
  return minutes + ":" + seconds;
}

Graphics.ordinals = ["1st", "2nd", "3rd", "4th", "5th"];

Graphics.foreground = function () {
  // Draw cars
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
  // Draw explosion
  if (this.explo != false) {
    this.setIdentity();
    this.ctx.translate(this.explo.x, this.explo.y);
    var step = Math.floor((30 - this.explo.t)/7.5);
    this.ctx.drawImage(this.explo_sprite, step*16, 0, 16, 16, -8, -8, 16, 16);
  }
  // Lateral columns
  this.setIdentity()
  this.ctx.fillStyle = "#050505";
  this.ctx.fillRect(0, 0, 200, 600);
  this.ctx.fillRect(600, 0, 200, 600);
  // Draw HUD
  this.setIdentity();
  this.ctx.fillStyle = "#eee";
  this.ctx.font = "24px Helvetica";
  this.ctx.textBaseline = 'top';
  // Left column
  this.ctx.textAlign = 'left';
  this.ctx.fillText("Time", 16, 16);
  this.ctx.fillText("Speed", 16, 64);
  this.ctx.fillText("High Scores", 600+16, 16);
  for (var i = 0; i < this.ordinals.length; ++i)
    this.ctx.fillText(this.ordinals[i], 600+16, 64 + 32*i);
  // Right column
  this.ctx.textAlign = 'right';
  this.ctx.fillText(this.formatTime(Game.getTime()), 200-16, 16);
  this.ctx.fillText(Math.floor(Game.speed*100) + "%", 200-16, 64);
  for (var i = 0; i < Game.scores.length; ++i) {
    var score = Game.scores[i];
    if (score.last) this.ctx.fillStyle = "#4e8";
    this.ctx.fillText(this.formatTime(score.value), 800-16, 64 + 32*i);
    if (score.last) this.ctx.fillStyle = "#eee";
  }
  for (var i = Game.scores.length; i < 5; ++i)
    this.ctx.fillText("--:--", 800-16, 64 + 32*i);
}

Graphics.pauseOverlay = function () {
  this.setIdentity();
  this.ctx.font = "50px Helvetica";
  this.ctx.textAlign = 'center';
  this.ctx.textBaseline = 'middle';
  this.ctx.fillStyle = "#eee";
  this.ctx.fillText("PAUSE", 400, 300);
}

Graphics.titleOverlay = function () {
  this.ctx.font = "50px Helvetica";
  this.ctx.textAlign = 'center';
  this.ctx.textBaseline = 'middle';
  this.ctx.fillStyle = "#eee";
  this.ctx.fillText("Press ENTER to start", 400, 300);
}

