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
  Body.initialize();
  Car.initialize();
  Bullet.initialize();
  Trap.initialize();
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

Game.loseTime = function (amount) {
  this.time = Math.max(0, this.time - amount*this.fps);
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
    Bullet.update();
    Trap.update();
    Body.update();
    Graphics.update();
    ++this.time;
    if (Math.floor(this.getTime()) >= ((this.speed-1)/0.2+1)*10)
      this.speed = 1 + 0.2*Math.floor(this.getTime()/10);
  }
};

Game.draw = function() {
  if (this.state != 'active') SMOOTH = 0;
  Graphics.background();
  Car.bake();      
  Bullet.bake();      
  Trap.bake();      
  Graphics.foreground();
  if (this.state == 'paused') {
    Graphics.pauseOverlay();
  } else if (this.state == 'title') {
    Graphics.titleOverlay();
  }
};

