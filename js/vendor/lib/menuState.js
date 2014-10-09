(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var MenuState = Asteroids.MenuState = function (game) {
    this.game = game;
  };
    
  MenuState.prototype.enter = function () {
    key('enter', function () { this.playGame(); }.bind(this));
  };
  
  MenuState.prototype.exit = function () {
    key.unbind('enter');
  };
    
  MenuState.prototype.draw = function (ctx) {
    ctx.font = "36pt Arial";
    ctx.fillStyle = "#FF00FF";
    
    var txt = "Press [ENTER] to play. . .";
    var size = ctx.measureText(txt);
    var x = Asteroids.Game.DIM_X / 2 - (size.width / 2);
    var y = Asteroids.Game.DIM_Y / 2 - 18;
    ctx.fillText(txt, x, y);
  };
  
  MenuState.prototype.step = function () {
  };
  
  MenuState.prototype.playGame = function () {
    game.changeState(new Asteroids.PlayState(this.game));
  };
})();