
var Enemy = {}

Enemy.initialize = function () {
  makeDomain(this);
  this.create("smallfry", "straight", W/2-100, H/8, [1,2,300]);
  this.create("smallfry", "straight", W/2, H/8,     [0,2,300]);
  this.create("smallfry", "straight", W/2+100, H/8, [-1,2,300]);
}

Enemy.findAI = function () {
  var AIs = {};

  AIs.straight = function (dx, dy, t) {
    return function () {
      if (--t <= 0)
        Enemy.destroy(this);
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
}

