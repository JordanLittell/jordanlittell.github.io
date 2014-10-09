(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Bullet = Asteroids.Bullet = function (game, pos, vel) {  
    Asteroids.MovingObject.call(this,
      {
        game: game,
        pos: pos,
        vel: vel,
        color : Bullet.COLOR,
        radius: Bullet.RADIUS 
      }
    );  
  }

  Asteroids.Utils.inherits(Asteroids.MovingObject, Bullet);
    
  Bullet.COLOR = "#00FF00";
  Bullet.RADIUS = 2;
  
  Bullet.prototype.isWrappable = false;
})();