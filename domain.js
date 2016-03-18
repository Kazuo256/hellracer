
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

