const Util = require('./utils');
const MovingObject = require("./moving_object");

function Asteroid(pos, vel, radius, color, game){
  Util._super(this)({pos: pos, vel: vel, size: radius, color: color, game: game});
}
Util.inherits(Asteroid, MovingObject);

Asteroid.random = function (maxX, maxY, asteroidCount, game){
  let speed = 2.5;
  let radiusRatioRange = Math.random() * (1 - 0.7) + 0.7 ;
  return new Asteroid(
    [maxX * Math.random(), maxY * Math.random()],
    [Math.random() * speed, Math.random() * speed],
    Asteroid.radius(maxX, maxY, asteroidCount) * radiusRatioRange,
    Asteroid.randomColor(),
    game
  );
}


Asteroid.radius = function (maxX, maxY, asteroidCount){
  //uniformly-sized asteroids should fill up 1/8 of the screen;
  let target_size = (maxX * maxY) / (8 * asteroidCount);
  return Math.sqrt(target_size/ Math.PI);
}

const HEX_DIGITS = "0123456789ABCDEF";

Asteroid.randomColor = function () {
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += HEX_DIGITS[Math.floor((Math.random() * 16))];
  }

  return color;
};

module.exports = Asteroid;
