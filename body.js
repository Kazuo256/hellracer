
var Body = {}

Body.initialize = function () {
  makeDomain(this);
  Body.groups = {
    player:{}, smallfry:{}, bullet:{}
  };
}

Body.construct = function (newbody,x,y,group) {
  newbody.x = x;
  newbody.y = y;
  newbody.vx = 0;
  newbody.vy = 0;
  newbody.group = group
  this.groups[group][newbody.id] = true;
}

Body.destroy = function(body) {
  this.groups[body.group][body.id] = null;
}

Body.update = function () {
  for (var i = 0; i < Body.all.length; ++i) {
    var body = Body.all[i];
    if (body.alive) {
      body.x += body.vx;
      body.y += body.vy;
    }
  }
}

Body.checkCollisions = function (body, group_name) {
  var group = this.groups[group_name]
  var body_ids = Object.keys(group);
  for (var i = 0; i < body_ids.length; ++i) {
    var other = this.all[body_ids[i]];
    if (group[other.id] == true && other.id != body.id) {
      var dx = body.x - other.x;
      var dy = body.y - other.y;
      if (dx*dx + dy*dy < 16*16)
        return true;
    }
  }
  return false;
}

