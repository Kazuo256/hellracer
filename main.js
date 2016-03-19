
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
  newcar.time = 0
}

Car.destroy = function(car) {
  Graphics.remove(car.sprite);
}

Car.update = function () {
  for (var i = 0; i < Car.all.length; ++i) {
    var car = Car.all[i];
    if (car.alive) {
      ++car.time;
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
      if (dx*dx + dy*dy < 16*16)
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
      car.sprite.qy = 32*(Math.floor(car.time/5)%2)
    }
  }
}


var makeDomain = function (domain) {
  domain.all = []
  domain.free = []
  
  domain.create = function () {
    var newelement
    if (this.free.length > 0) {
      newelement = this.all[this.free.shift()];
    } else {
      newelement = {}
      this.all.push(newelement)
      newelement.id = this.all.length - 1
    }
    this.construct.apply(
        this, [newelement].concat(Array.prototype.slice.call(arguments))
    );
    newelement.alive = true;
    return newelement;
  }
  
  domain.remove = function(element) {
    this.destroy.apply(this, [element]);
    element.alive = false;
    this.free.push(element.id);
  }
}


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

  AIs.bend1 = function (tx, ty, t) {
    var count = 0;
    return function () {
      if (++count > t)
        Enemy.remove(this);
      else if(this.car.y <= 200) {
        this.car.vx = 0;
        this.car.vy = Game.speed*4; 
      } else {
        this.car.vx = Game.speed*(tx-this.car.x)/(t/2);
        this.car.vy = Game.speed*4;
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
      this.create("smallfry", "bend1", 200 + 400*Math.random(), -32,
                  [200+400*Math.random(), 632, 420]);
  }
}

var Game = {};

var W = 800;
var H = 600;
var KEY = null;
Game.fps = 30;

Game.initialize = function() {
  document.addEventListener("keydown", this.keyPressed.bind(this), false);
  document.addEventListener("keyup", this.keyReleased.bind(this), false);
  this.bgm = document.getElementById("bgm");
  this.bgm.loop = true;
  this.scores = [];
  this.state = 'title';
  this.setup();
};

Game.setup = function () {
  Graphics.initialize(document.getElementById("canvas").getContext("2d"));
  Car.initialize();
  Player.initialize();
  Enemy.initialize();
  this.speed = 1;
  this.time = 0;
  for (var i = 0; i < this.scores.length; ++i)
    this.scores[i].last = false;
}

Game.keyChanged = function(key,state) {
  if (key == '37')
    Player.moveLeft(state);
  else if (key == '39')
    Player.moveRight(state);
  else if (key == '38')
    Player.moveUp(state);
  else if (key == '40')
    Player.moveDown(state);
  else if (key == '27' && state) {
    if (this.state == 'active')
      this.pause();
    else if (this.state == 'paused')
      this.play();
  } else if (key == '13' && this.state == 'title') {
    this.play();
  }
}

Game.pause = function () {
  this.state = 'paused';
  this.bgm.pause();
}

Game.play = function () {
  if (this.state == 'title')
    Game.setup();
  this.state = 'active';
  this.bgm.play();
}

Game.title = function () {
  if (this.state == 'active')
    this.addScore();
  this.state = 'title';
  this.bgm.currentTime = 0;
  this.bgm.pause();
}

Game.keyPressed = function(e) {
  this.keyChanged(e.keyCode, true);
}

Game.keyReleased = function(e) {
  this.keyChanged(e.keyCode, false);
}

Game.getTime = function () {
  return this.time/this.fps;
}

Game.addScore = function () {
  this.scores.push({ value: this.getTime(), last: true});
  this.scores.sort(function (a,b) { return b.value - a.value });
  while (this.scores.length > 5)
    this.scores.pop();
}

Game.update = function() {
  if (this.state == 'active') {
    Player.update();
    Enemy.update();
    Car.update();
    Graphics.update();
    this.speed += 0.02/this.fps;
    ++this.time;
  }
};

Game.draw = function() {
  if (this.state != 'active') SMOOTH = 0;
  Graphics.background();
  Car.bake();      
  Graphics.foreground();
  if (this.state == 'paused') {
    Graphics.pauseOverlay();
  } else if (this.state == 'title') {
    Graphics.titleOverlay();
  }
};


var Graphics = {}

Graphics.initialize = function (ctx) {
  makeDomain(this);
  this.ctx = ctx;
  this.scroll = 0;
  this.car_sprite = document.getElementById("car_sprite")
}

Graphics.car_size = 8;

Graphics.construct = function (newsprite, img, x, y, w, h, qx, qy, sx, sy, r) {
  newsprite.img = document.getElementById(img);
  newsprite.x = x;
  newsprite.y = y;
  newsprite.w = w;
  newsprite.h = h;
  newsprite.qx = qx;
  newsprite.qy = qy;
  newsprite.sx = sx;
  newsprite.sy = sy;
  newsprite.r = r;
}

Graphics.destroy = function (sprite) {
  // nothing
}

Graphics.update = function () {
  this.scroll += Game.speed/60;
  while (this.scroll >= 1) {
    this.scroll -= 1
  }
}

Graphics.setIdentity = function () {
  this.ctx.setTransform(1,0,0,1,0,0);
}

Graphics.background = function (smooth) {
  this.setIdentity();
  // Draw road
  this.ctx.fillStyle = "#050505";
  this.ctx.fillRect(0, 0, 800, 600);
  this.ctx.fillStyle = "#101510";
  this.ctx.fillRect(200, 0, 400, 600);
  // Draw stripes
  this.ctx.translate(W/2, -H*(1 - (this.scroll + SMOOTH*Game.speed/60)));
  this.ctx.fillStyle = "#232";
  for (var i = 0; i < 10; ++i) {
    this.ctx.fillRect(-4, i*H/10, 8, H/30);
    this.ctx.fillRect(-4, (10+i)*H/10, 8, H/30);
  }
}

Graphics.formatTime = function (time) {
  var minutes = Math.floor(time/60);
  var seconds = Math.floor(time%60);
  minutes = minutes > 9 ? minutes : "0" + "" + minutes;
  seconds = seconds > 9 ? seconds : "0" + "" + seconds;
  return minutes + ":" + seconds;
}

Graphics.ordinals = ["1st", "2nd", "3rd", "4th", "5th"];

Graphics.foreground = function () {
  for (var i = 0; i < this.all.length; ++i) {
    var sprite = this.all[i];
    if (sprite.alive) {
      this.setIdentity();
      this.ctx.translate(sprite.x, sprite.y);
      this.ctx.rotate(sprite.r);
      this.ctx.scale(sprite.sx, sprite.sy);
      this.ctx.drawImage(sprite.img, sprite.qx, sprite.qy, sprite.w, sprite.h,
                         -sprite.w/2, -sprite.h/2, sprite.w, sprite.h);
    }
  }
  // Lateral columns
  this.setIdentity()
  this.ctx.fillStyle = "#050505";
  this.ctx.fillRect(0, 0, 200, 600);
  this.ctx.fillRect(600, 0, 200, 600);
  // Draw HUD
  this.setIdentity();
  this.ctx.fillStyle = "#eee";
  this.ctx.font = "24px Helvetica";
  this.ctx.textBaseline = 'top';
  // Left column
  this.ctx.textAlign = 'left';
  this.ctx.fillText("Time", 16, 16);
  this.ctx.fillText("Speed", 16, 64);
  this.ctx.fillText("High Scores", 600+16, 16);
  for (var i = 0; i < this.ordinals.length; ++i)
    this.ctx.fillText(this.ordinals[i], 600+16, 64 + 32*i);
  // Right column
  this.ctx.textAlign = 'right';
  this.ctx.fillText(this.formatTime(Game.getTime()), 200-16, 16);
  this.ctx.fillText(Math.floor(Game.speed*100) + "%", 200-16, 64);
  for (var i = 0; i < Game.scores.length; ++i) {
    var score = Game.scores[i];
    if (score.last) this.ctx.fillStyle = "#4e8";
    this.ctx.fillText(this.formatTime(score.value), 800-16, 64 + 32*i);
    if (score.last) this.ctx.fillStyle = "#eee";
  }
  for (var i = Game.scores.length; i < 5; ++i)
    this.ctx.fillText("--:--", 800-16, 64 + 32*i);
}

Graphics.pauseOverlay = function () {
  this.setIdentity();
  this.ctx.font = "50px Helvetica";
  this.ctx.textAlign = 'center';
  this.ctx.textBaseline = 'middle';
  this.ctx.fillStyle = "#eee";
  this.ctx.fillText("PAUSE", 400, 300);
}

Graphics.titleOverlay = function () {
  this.ctx.font = "50px Helvetica";
  this.ctx.textAlign = 'center';
  this.ctx.textBaseline = 'middle';
  this.ctx.fillStyle = "#eee";
  this.ctx.fillText("Press ENTER to start", 400, 300);
}


var Player = {};

Player.speed = 6

Player.initialize = function () {
  this.car = Car.create(W/2, H*6/8, "player");
  this.alive = true;
  this.move = {
    left: false, right: false, up: false, down: false
  }
}

Player.moveLeft = function (set) {
  this.move.left = !!set
}

Player.moveRight = function (set) {
  this.move.right = !!set
}

Player.moveUp = function (set) {
  this.move.up = !!set
}

Player.moveDown = function (set) {
  this.move.down = !!set
}

Player.stop = function () {
  this.move.left = false
  this.move.right = false
  this.move.up = false
  this.move.down = false
}

Player.axisH = function () {
  return (this.move.right ? 1 : 0) - (this.move.left ? 1 : 0)
}

Player.axisV = function () {
  return (this.move.down ? 1 : 0) - (this.move.up ? 1 : 0)
}

Player.update = function () {
  if (Car.checkCollisions(this.car)) {
    // Shinde shimatta
    Game.title()
  }
  if (this.alive) {
    this.car.vx = this.speed*this.axisH()
    this.car.vy = this.speed*this.axisV()
  }
}

