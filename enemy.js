
var Enemy = {}

Enemy.initialize = function () {
  this.all = []
  this.free = []
  this.create("smallfry", "straight", W/2-100, H/8, [0,2,300]);
  this.create("smallfry", "straight", W/2, H/8,     [0,2,300]);
  this.create("smallfry", "straight", W/2+100, H/8, [0,2,300]);
}

Enemy.findAI = function () {
  var AIs = {};

  AIs.straight = function (dx, dy, t) {
    return function () {
      if (--t <= 0)
        Enemy.destroy(this);
      else {
        this.car.vx = dx;
        this.car.vy = dy;
      }
    }
  }

  return function (which, args) {
    return AIs[which].apply(Enemy, args);
  }
} ()

Enemy.create = function (type, ai, x, y, extra) {
  var newenemy;
  if (this.free.length > 0) {
    newenemy = this.all[free.shift()];
  } else {
    newenemy = {};
    this.all.push(newenemy);
  }
  newenemy.update = this.findAI(ai, extra).bind(newenemy);
  newenemy.car = Car.create(x, y, type);
  newenemy.alive = true;
}

Enemy.destroy = function(enemy) {
  enemy.alive = false;
  Car.destroy(enemy.car);
  this.free.push(enemy.id);
}

Enemy.update = function () {
  for (var i = 0; i < this.all.length; ++i) {
    var enemy = this.all[i];
    if (enemy.alive)
      enemy.update();
  }
}

