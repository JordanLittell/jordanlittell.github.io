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
    var canvas = document.getElementById("game-canvas");
    var ctx = canvas.getContext('2d');
    var game = new Asteroids.Game();
    canvas.width = Asteroids.Game.DIM_X - 100;
    canvas.height = Asteroids.Game.DIM_Y - 100;
    var view = new Asteroids.GameView(game, ctx);
    view.start();
  };
    
  GameOverState.prototype.draw = function (ctx) {
    ctx.font = "36pt Arial";
    var that = this;
    ctx.fillStyle = "#FF00FF";
    
    var txt = "GAME OVER, YOU LOSE";
    var size = ctx.measureText(txt);
    var x = Asteroids.Game.DIM_X / 2 - (size.width / 2);
    var y = Asteroids.Game.DIM_Y / 2 - 18;
    ctx.fillText(txt, x, y);
    window.onclick = function () {
      that.exit();
    }
  };
  
  GameOverState.prototype.step = function () {
  };
})();