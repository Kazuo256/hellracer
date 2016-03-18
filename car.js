
var Car = {}

Car.viewmap = {
  player: 0,
  smallfry: 1
}

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
    newcar.id = this.all.length - 1
  }
  newcar.x = x;
  newcar.y = y;
  newcar.vx = 0;
  newcar.vy = 0;
  newcar.type = type;
  newcar.alive = true;
  return newcar;
}

Car.destroy = function(car) {
  car.alive = false;
  this.free.push(car.id);
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
    if (car.alive)
      Graphics.car(car.x, car.y, this.viewmap[car.type],
                   car.vx/Math.abs(car.vx),
                   car.type == "player" ? 1 : -1);
  }
}

