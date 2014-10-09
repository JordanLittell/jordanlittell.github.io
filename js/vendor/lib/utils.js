(function(){
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }
  
  var Utils = Asteroids.Utils = {};

  Utils.inherits = function (sup, sub) {
    function Surrogate () {}
    Surrogate.prototype = sup.prototype;
    sub.prototype = new Surrogate();
  };
  
  Utils.getDocWidth = function (fallback) {
    return Math.max(document.documentElement.clientWidth, 
      window.innerWidth || fallback);
  };
  
  Utils.getDocHeight = function (fallback) {
    return Math.max(document.documentElement.clientHeight, 
      window.innerHeight || fallback);
  };
})();