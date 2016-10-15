const Util = require("./utils");

function MovingObject(options){
  this.pos = options["pos"];
  this.vel = options["vel"];
  this.size = options["size"];
  this.color = options["color"];
  this.game = options["game"];
}

MovingObject.prototype.move = function(){
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.pos = this.game.wrap(this.pos);
}

MovingObject.prototype.draw = function(ctx){
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.size,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();
}

MovingObject.prototype.isCollidedWith = function(otherMovingObject){
  let radiusSum = this.size + otherMovingObject.size;
  let distanceBetween = Util.distanceBetween(this, otherMovingObject);
  return distanceBetween <= radiusSum;
}

module.exports = MovingObject;
