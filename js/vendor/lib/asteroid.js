(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (game, pos) {
    Asteroids.MovingObject.call(this, 
      {
        game: game,
        pos: pos, 
        vel: [this.randomSpeed(), this.randomSpeed()], 
        color: Asteroid.COLOR, 
        radius: Asteroid.RADIUS
      }
    );
  };

  Asteroids.Utils.inherits(Asteroids.MovingObject, Asteroid);
  
  Asteroid.COLOR = '#FF00FF';
  Asteroid.RADIUS = 10;
  Asteroid.MAX_SPEED = 10;
  
  Asteroid.prototype.randomSpeed = function () {
    return -Asteroid.MAX_SPEED + (Math.random() * (Asteroid.MAX_SPEED * 2));
  };
})();