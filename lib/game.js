const Asteroid = require("./asteroid");
const Ship = require("./ship");

function Game(windowWidth = 1024, windowHeight = 768, numAsteroids = 15){
  this.windowWidth = windowWidth;
  this.windowHeight = windowHeight;
  this.numAsteroids = numAsteroids;
  this.asteroids = [];
  this.addAsteroids();
  let shipSize = 20;
  this.ship = new Ship([this.windowWidth/2 + shipSize/2,
                        this.windowHeight/2 + shipSize/2],
                       [0,0],
                       shipSize,
                       "#000000",
                       this);
}

Game.prototype.addAsteroids = function(){
  for (let i = 0; i < 20; i++ ){
    this.asteroids.push(Asteroid.random(this.windowWidth,
                                        this.windowHeight,
                                        this.numAsteroids,
                                        this));
  }
}

Game.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, this.windowWidth, this.windowHeight);
  this.ship.ship_draw(ctx);
  this.asteroids.forEach(el => el.draw(ctx));
}

Game.prototype.update = function(){

  this.asteroids.forEach(el => el.move());
}

Game.prototype.wrap = function(pos) {
  return [pos[0] % this.windowWidth, pos[1] % this.windowHeight]
}

Game.prototype.checkCollisions = function() {

}

module.exports = Game;
