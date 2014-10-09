(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Ship = Asteroids.Ship = function (game) {
    Asteroids.MovingObject.call(this, {
        game: game,
        pos: [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2], 
        vel: [0,0],
        radius: Ship.RADIUS,
        color: Ship.COLOR
      }
    );
  }
  
  Asteroids.Utils.inherits(Asteroids.MovingObject, Ship);

  Ship.MAX_SPEED = 4;
  Ship.RADIUS = 10;
  Ship.COLOR = "#33ffff";

  Ship.prototype.relocate = function () {
    this.pos = [Asteroids.Game.DIM_X / 2, Asteroids.Game.DIM_Y / 2];
    this.vel[0] = this.vel[1] = 0;
  };
  
  Ship.prototype.power = function (impulse) {
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    if(this.vel[0] > Ship.MAX_SPEED) this.vel[0] = Ship.MAX_SPEED;
    if(this.vel[1] > Ship.MAX_SPEED) this.vel[1] = Ship.MAX_SPEED;
    if(this.vel[0] < -Ship.MAX_SPEED) this.vel[0] = -Ship.MAX_SPEED;
    if(this.vel[1] < -Ship.MAX_SPEED) this.vel[1] = -Ship.MAX_SPEED;
  };
  
  Ship.prototype.fireBullets = function () {
    var mod = [0, -1];
    
    switch (this.getDirection()) {
      case 'W': mod = [-1, 0]; break;
      case 'E': mod = [1, 0]; break;
      case 'S': mod = [0, 1]; break;
      case 'NW': mod = [-1, -1]; break;
      case 'NE': mod = [1, -1]; break;
      case 'SW': mod = [-1, 1]; break;
      case 'SE': mod = [1, 1]; break;
    }
    
    var pos = [this.pos[0] + mod[0] * (this.radius + 1),
               this.pos[1] + mod[1] * (this.radius + 1)];
    var vel = [this.vel[0] + mod[0], this.vel[1] + mod[1]];
    
    this.game.add(new Asteroids.Bullet(this.game, pos, vel));
  };
  
  Ship.prototype.getDirection = function () {
    var x = this.vel[0];
    var y = this.vel[1];
    
    if (x < 0 && y == 0) return 'W';
    if (x > 0 && y == 0) return 'E';
    if (x == 0 && y > 0) return 'S';
    if (x < 0 && y < 0) return 'NW';
    if (x > 0 && y < 0) return 'NE';
    if (x < 0 && y > 0) return 'SW';
    if (x > 0 && y > 0) return 'SE';
    // default
    return 'N';
  };
})();