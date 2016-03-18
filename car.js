
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
}

Car.destroy = function(car) {
  // nothing
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

Car.checkCollisions = function (car) {
  var collisions = []
  for (var i = 0; i < Car.all.length; ++i) {
    if (i != car.id) {
      var other = this.all[i];
      var dx = car.x - other.x;
      var dy = car.y - other.y;
      if (dx*dx + dy*dy < 4*4)
        collisions.push(other);
    }
  }
  return collisions;
}

Car.draw = function () {
  for (var i = 0; i < Car.all.length; ++i) {
    var car = Car.all[i];
    if (car.alive)
      Graphics.car(car.x + SMOOTH*car.vx, car.y + SMOOTH*car.vy,
                   this.viewmap[car.type], car.vx/Math.abs(car.vx));
  }
}

