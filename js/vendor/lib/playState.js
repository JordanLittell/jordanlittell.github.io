(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var PlayState = Asteroids.PlayState = function (game) {
    this.game = game;
    this.lives = PlayState.LIVES;
    this.score = 0;
    this.ship = new Asteroids.Ship(this);
    this.bullets = [];
    this.asteroids = [];
    this.createAsteroids();
  };
  
  PlayState.LIVES = 5;

  
  PlayState.prototype.enter = function () {
    key('w', function () { this.ship.power([0, -1]); }.bind(this));
    key('s', function () { this.ship.power([0, 1]);  }.bind(this));
    key('a', function () { this.ship.power([-1, 0]); }.bind(this));
    key('d', function () { this.ship.power([1, 0]);  }.bind(this));
    key('z', function () { this.ship.fireBullets();  }.bind(this));
    
    key('up', function () { this.ship.power([0, -1]); }.bind(this));
    key('down', function () { this.ship.power([0, 1]);  }.bind(this));
    key('left', function () { this.ship.power([-1, 0]); }.bind(this));
    key('right', function () { this.ship.power([1, 0]);  }.bind(this));
    key('space', function () { this.ship.fireBullets();  }.bind(this));
  };
  
  PlayState.prototype.exit = function () {
    key.unbind('w');
    key.unbind('s');
    key.unbind('a');
    key.unbind('d');
    key.unbind('z');
    
    key.unbind('up');
    key.unbind('down');
    key.unbind('left');
    key.unbind('right');
    key.unbind('space');
  };
  
  PlayState.prototype.createAsteroids = function () {
    for (var i = 0; i < Asteroids.Game.NUM_ASTEROIDS; ++i) {
      this.add(new Asteroids.Asteroid(this, this.randomPosition()));
    }
  };
  
  PlayState.prototype.randomPosition = function () {
    return [Asteroids.Game.DIM_X * Math.random(), Asteroids.Game.DIM_Y * Math.random()];
  };
  
  PlayState.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    } else if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }
  };
  
  PlayState.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Bullet) {
      var index = this.bullets.indexOf(obj);
      if (index > -1) {
        this.bullets.splice(index, 1);
      }
    } else if (obj instanceof Asteroids.Asteroid) {
      var index = this.asteroids.indexOf(obj);
      if (index > -1) {
        this.asteroids.splice(index, 1);
      }
    }
  };
  
  PlayState.prototype.allObjects = function () {
    return this.asteroids.concat(this.ship).concat(this.bullets);
  };
  
  PlayState.prototype.draw = function (ctx) {
    var objs = this.allObjects();
    var length = objs.length;
    
    for (var i = 0; i < length; ++i) {
      objs[i].draw(ctx);
    }
    
    var scoreString = "Score:" + this.score;
    var livesString = "Lives:" + this.lives;
    
    this.renderText(ctx, scoreString, livesString);
  };
  
  PlayState.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
  };
  
  PlayState.prototype.renderText = function() {
    var args = [].slice.call(arguments);
    var ctx = args[0];
    var y = 30
    var params = args.slice(1,args.length);
    params.forEach(function(param){
      ctx.fillText(param, 30, y);
      y += 50;
    })
  }
  
  PlayState.prototype.moveObjects = function() {
    var objs = this.allObjects();
    var length = objs.length;

    for (var i = 0; i < length; ++i) {
      objs[i].move();
    }
  };

  Object.prototype.isA = function (what) {
    return (this instanceof what);
  };
    
  PlayState.prototype.checkCollisions = function () {
    var objs = this.allObjects();
    var length = objs.length;

    var asteroid = Asteroids.Asteroid;
    var bullet = Asteroids.Bullet;
    var ship = Asteroids.Ship;
    
    for (var i = 0, obj1 = objs[i]; i < length; obj1 = objs[++i]) {
      for (var j = i + 1, obj2 = objs[j]; j < length; obj2 = objs[++j]) {
        if (obj1.collidesWith(obj2)) {
          if (obj1.isA(asteroid) && obj2.isA(asteroid)) {
            obj1.invertVel(obj2);
          } else if (obj1.isA(asteroid) && obj2.isA(bullet) || 
                     obj1.isA(bullet) && obj2.isA(asteroid)) {
            this.remove(obj1);
            this.remove(obj2);
            this.score++;
          } else if (obj1.isA(ship) && obj2.isA(asteroid) || 
                     obj1.isA(asteroid) && obj2.isA(ship)) {
                       this.ship.relocate();
                       if(--this.lives === 0) {
                         this.game.changeState(new Asteroids.GameOverState(this.game));
                       } 
          }
        }
      }
    }
  };
  
  PlayState.prototype.isOutOfBounds = function (pos) {
    return (pos[0] < 0 || pos[0] > Asteroids.Game.DIM_X || pos[1] < 0 ||
            pos[1] > Asteroids.Game.DIM_Y);
  };
  
  PlayState.prototype.wrap = function (pos) {
    if(pos[0] > Asteroids.Game.DIM_X) pos[0] = 0;
    if(pos[1]> Asteroids.Game.DIM_Y) pos[1] = 0;
    if(pos[0] < 0) pos[0] = Asteroids.Game.DIM_X;
    if(pos[1] < 0) pos[1] = Asteroids.Game.DIM_Y;
  };
})();