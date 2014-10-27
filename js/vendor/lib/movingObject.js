(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var MovingObject = Asteroids.MovingObject = function (options) {
    this.game = options["game"];
    this.pos = options["pos"];
    this.vel = options["vel"];
    this.radius = options["radius"];
    this.color = options["color"];
  };
  
  MovingObject.prototype.isWrappable = true;
  
  MovingObject.prototype.draw = function (ctx) {
    if (this.role === "SHIP") {
      this.draw();
    } else {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  };
  
  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    
    if (this.game.isOutOfBounds(this.pos)) {
      if (this.isWrappable) {
        this.game.wrap(this.pos);
      } else {
        this.game.remove(this);
      } 
    }
  };
  
  MovingObject.prototype.collidesWith = function (obj) {
    var dy = Math.pow(this.pos[1] - obj.pos[1], 2);
    var dx = Math.pow(this.pos[0] - obj.pos[0], 2);
    var dc = Math.sqrt(dy + dx);
    
    return dc < (this.radius + obj.radius);
  };
  
  MovingObject.prototype.invertVel = function (obj) {
    this.vel[0] *= -1;
    this.vel[1] *= -1;
    this.move();

    obj.vel[0] *= -1;
    obj.vel[1] *= -1;
    obj.move();
  };
})();