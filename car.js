
var Car = {}

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
  }
  newcar.x = x;
  newcar.y = y;
  newcar.vx = 0;
  newcar.vy = 0;
  newcar.type = type;
  newcar.alive = true;
  return newcar;
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
    if (car.alive) {
      Graphics.car(car.x, car.y, 0, car.vx/Math.abs(car.vx));
    }
  }
}

