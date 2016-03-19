
var Bullet = {}

Bullet.initialize = function () {
  makeDomain(this);
}

Bullet.construct = function (newbullet,x,y,tx,ty) {
  newbullet.body = Body.create(x,y,'bullet');
  var vx = tx - x;
  var vy = ty - y;
  var len = Math.sqrt(vx*vx + vy*vy);
  newbullet.body.vx = 8*vx/len;
  newbullet.body.vy = 8*vy/len;
  newbullet.sprite = Graphics.create("bullet_sprite", x, y, 8, 8,
                                     0, 0, 1, 1, 0);
  newbullet.time = 400;
}

Bullet.destroy = function(bullet) {
  Graphics.remove(bullet.sprite);
  Body.remove(bullet.body);
}

Bullet.update = function () {
  for (var i = 0; i < Bullet.all.length; ++i) {
    var bullet = Bullet.all[i];
    if (bullet.alive) {
      --bullet.time;
      if (bullet.time <= 0 || bullet.body.hit == true)
        this.remove(bullet);
    }
  }
}

Bullet.bake = function () {
  for (var i = 0; i < Bullet.all.length; ++i) {
    var bullet = Bullet.all[i];
    if (bullet.alive) {
      bullet.sprite.x = bullet.body.x + SMOOTH*bullet.body.vx;
      bullet.sprite.y = bullet.body.y + SMOOTH*bullet.body.vy;
    }
  }
}

