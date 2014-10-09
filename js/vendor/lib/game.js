(function() {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
    
  var Game = Asteroids.Game = function () {
    this.state = null;
    this.changeState(new Asteroids.MenuState(this));
    
    this.img = new Image();
    this.img.src = "stars3.jpg"
    this.img.width = Game.DIM_X+100;
    this.img.height = Game.DIM_Y+100;
  };
  
  Game.DIM_X = Asteroids.Utils.getDocWidth(500); 
  Game.DIM_Y = Asteroids.Utils.getDocHeight(500);
  Game.NUM_ASTEROIDS = 15;
  
  Game.prototype.changeState = function (newState) {
    if (this.state != null) {
      this.state.exit();
    }
    this.state = newState;
    this.state.enter();
  };
    
  Game.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, 0, 0);
    
    this.state.draw(ctx);
  };
  
  Game.prototype.step = function () {
    this.state.step();
  };
})();