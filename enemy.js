
var Enemy = {}

Enemy.initialize = function () {
  makeDomain(this);
}

Enemy.findAI = function () {
  var AIs = {};

  AIs.straight = function (dx, dy, t) {
    return function () {
      if (--t <= 0)
        Enemy.remove(this);
      else {
        this.car.vx = Game.speed*dx;
        this.car.vy = Game.speed*dy;
      }
    }
  }

  return function (which, args) {
    return AIs[which].apply(Enemy, args);
  }
} ()

Enemy.construct = function (newenemy, type, ai, x, y, extra) {
  newenemy.update = this.findAI(ai, extra).bind(newenemy);
  newenemy.car = Car.create(x, y, type);
}

Enemy.destroy = function(enemy) {
  Car.remove(enemy.car);
}

Enemy.update = function () {
  for (var i = 0; i < this.all.length; ++i) {
    var enemy = this.all[i];
    if (enemy.alive)
      enemy.update();
  }
  if (Math.random() > 0.80) {
    var n = Math.floor(Math.random()*10);
    for (var i = 0; i < n; ++i);
      this.create("smallfry", "straight", 200 + 400*Math.random(), -32,
                  [1-2*Math.random(), 4, 420]);
  }
}

