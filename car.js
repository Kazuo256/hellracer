
var Car = {}

Car.viewmap = {
  player: 0,
  smallfry: 1
}

Car.initialize = function () {
  makeDomain(this);
}

Car.construct = function (newcar,x,y,type) {
  newcar.x = x;
  newcar.y = y;
  newcar.vx = 0;
  newcar.vy = 0;
  newcar.type = type;
  newcar.sprite = Graphics.create("car_sprite", x, y, 16, 32,
                                  this.viewmap[type]*32, 0, 1, 1, 0);
}

Car.destroy = function(car) {
  Graphics.remove(car.sprite);
}

Car.update = function () {
  for (var i = 0; i < Car.all.length; ++i) {
    var car = Car.all[i];
    if (car.alive) {
      if (car.type == "player") {
        var dx = 200+16
        var dy = 32
        car.x = Math.max(Math.min(car.x + car.vx, W-dx), dx)
        car.y = Math.max(Math.min(car.y + car.vy, H-dy), dy)
      } else {
        car.x += car.vx;
        car.y += car.vy;
      }
    }
  }
}

Car.checkCollisions = function (car) {
  for (var i = 0; i < Car.all.length; ++i) {
    if (i != car.id) {
      var other = this.all[i];
      var dx = car.x - other.x;
      var dy = car.y - other.y;
      if (dx*dx + dy*dy < 8*8)
        return true;
    }
  }
  return false;
}

Car.bake = function () {
  for (var i = 0; i < Car.all.length; ++i) {
    var car = Car.all[i];
    if (car.alive) {
      car.sprite.x = car.x + SMOOTH*car.vx;
      car.sprite.y = car.y + SMOOTH*car.vy;
      var dir = 0;
      if (car.vx != 0) {
        dir = car.vx/Math.abs(car.vx);
        car.sprite.sx = -dir;
      } else car.sprite.sx = 1;
      car.sprite.r = dir*20*Math.PI/180;
      car.sprite.qx = this.viewmap[car.type]*32 + 16*dir*dir;
    }
  }
}

