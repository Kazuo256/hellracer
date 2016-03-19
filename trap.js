
var Trap = {}

Trap.initialize = function () {
  makeDomain(this);
}

Trap.construct = function (newtrap,x,y) {
  newtrap.body = Body.create(x,y,'trap');
  newtrap.body.vy = Game.speed;
  newtrap.sprite = Graphics.create("trap_sprite", x, y, 8, 8,
                                     0, 0, 1, 1, 0);
  newtrap.time = 600;
}

Trap.destroy = function(trap) {
  Graphics.remove(trap.sprite);
  Body.remove(trap.body);
}

Trap.update = function () {
  for (var i = 0; i < Trap.all.length; ++i) {
    var trap = Trap.all[i];
    if (trap.alive) {
      --trap.time;
      if (trap.time <= 0 || trap.body.hit == true)
        this.remove(trap);
    }
  }
}

Trap.bake = function () {
  for (var i = 0; i < Trap.all.length; ++i) {
    var trap = Trap.all[i];
    if (trap.alive) {
      trap.sprite.x = trap.body.x + SMOOTH*trap.body.vx;
      trap.sprite.y = trap.body.y + SMOOTH*trap.body.vy;
    }
  }
}


