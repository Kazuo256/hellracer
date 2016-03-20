
var Enemy = {}

Enemy.initialize = function () {
  makeDomain(this);
  this.bonus = 0;
}

Enemy.findAI = function () {
  var AIs = {};

  AIs.straight = function (dx, dy, t) {
    return function () {
      if (--t <= 0)
        Enemy.remove(this);
      else {
        this.car.body.vx = Game.speed*dx;
        this.car.body.vy = Game.speed*dy;
      }
    }
  }

  AIs.bend1 = function (tx, t) {
    var count = 0;
    return function () {
      if (++count > t)
        Enemy.remove(this);
      else if(this.car.body.y <= 200) {
        this.car.body.vx = 0;
        this.car.body.vy = Game.speed*4; 
      } else {
        this.car.body.vx = Game.speed*(tx-this.car.body.x)/(t/2);
        this.car.body.vy = Game.speed*4;
      }
      if (count == Math.floor(15/Game.speed) && Math.random() < 0.25) {
        Bullet.create(this.car.body.x, this.car.body.y,
                      Player.car.body.x, Player.car.body.y);
      }
      if (count == Math.floor(Math.random()*120/Game.speed)
          && Math.random() < 0.1) {
        Trap.create(this.car.body.x, this.car.body.y);
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

Enemy.danger = function () {
  this.bonus = 1;
}

Enemy.update = function () {
  for (var i = 0; i < this.all.length; ++i) {
    var enemy = this.all[i];
    if (enemy.alive)
      enemy.update();
  }
  if (Math.random() < 0.20 + this.bonus*0.20) {
    var n = Math.floor(Math.random()*(10+10*this.bonus));
    for (var i = 0; i < n; ++i);
      this.create("smallfry", "bend1", 200 + 400*Math.random(), -32,
                  [200+400*Math.random(), 420]);
  }
  this.bonus = Math.max(0, this.bonus - 0.1/Game.fps);
}

