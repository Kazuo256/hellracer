var Game = {};

var W = 800;
var H = 600;
var KEY = null;
Game.fps = 30;

Game.initialize = function() {
  document.addEventListener("keydown", this.keyPressed.bind(this), false);
  document.addEventListener("keyup", this.keyReleased.bind(this), false);
  var bgm = document.getElementById("bgm");
  bgm.loop = true;
  bgm.play();
  this.setup();
};

Game.setup = function () {
  Graphics.initialize(document.getElementById("canvas").getContext("2d"));
  Car.initialize();
  Player.initialize();
  Enemy.initialize();
  this.speed = 1;
  this.state = 'active';
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
      this.play()
  }
}

Game.pause = function () {
  this.state = 'paused';
}

Game.play = function () {
  this.state = 'active';
}

Game.title = function () {
  this.state = 'title';
}

Game.keyPressed = function(e) {
  this.keyChanged(e.keyCode, true);
}

Game.keyReleased = function(e) {
  this.keyChanged(e.keyCode, false);
}

Game.update = function() {
  if (this.state == 'active') {
    Player.update();
    Enemy.update();
    Car.update();
    Graphics.update();
    this.speed += 0.01/this.fps;
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

