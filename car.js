
var Car = {}

Car.viewmap = {
  player: 0,
  smallfry: 1
}

Car.initialize = function () {
  makeDomain(this);
}

Car.construct = function (newcar,x,y,type) {
  newcar.type = type;
  newcar.body = Body.create(x,y,type)
  newcar.sprite = Graphics.create("car_sprite", x, y, 16, 32,
                                  this.viewmap[type]*32, 0, 1, 1, 0);
  newcar.time = 0;
}

Car.destroy = function(car) {
  Graphics.remove(car.sprite);
  Body.remove(car.body);
}

Car.update = function () {
  for (var i = 0; i < Car.all.length; ++i) {
    var car = Car.all[i];
    if (car.alive) ++car.time;
  }
}

Car.bake = function () {
  for (var i = 0; i < Car.all.length; ++i) {
    var car = Car.all[i];
    if (car.alive) {
      car.sprite.x = car.body.x + SMOOTH*car.body.vx;
      car.sprite.y = car.body.y + SMOOTH*car.body.vy;
      var dir = 0;
      if (car.body.vx != 0) {
        dir = car.body.vx/Math.abs(car.body.vx);
        car.sprite.sx = -dir;
      } else car.sprite.sx = 1;
      car.sprite.r = dir*20*Math.PI/180;
      car.sprite.qx = this.viewmap[car.type]*32 + 16*dir*dir;
      car.sprite.qy = 32*(Math.floor(car.time/5)%2)
    }
  }
}

