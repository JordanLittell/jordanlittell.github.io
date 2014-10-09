(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var GameOverState = Asteroids.GameOverState = function (game) {
    this.game = game;
  };
    
  GameOverState.prototype.enter = function () {
  };
  
  GameOverState.prototype.exit = function () {
  };
    
  GameOverState.prototype.draw = function (ctx) {
    ctx.font = "36pt Arial";
    ctx.fillStyle = "#FF00FF";
    
    var txt = "GAME OVER, YOU LOSE";
    var size = ctx.measureText(txt);
    var x = Asteroids.Game.DIM_X / 2 - (size.width / 2);
    var y = Asteroids.Game.DIM_Y / 2 - 18;
    ctx.fillText(txt, x, y);
  };
  
  GameOverState.prototype.step = function () {
  };
})();