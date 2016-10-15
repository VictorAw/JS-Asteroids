const Util = require("./utils");
const MovingObject = require("./moving_object");

function Ship(pos, vel, hitCircleRadius, color, game) {
  Util._super(this)({pos: pos,
                     vel: vel,
                     size: hitCircleRadius,
                     color: color,
                     game: game});

  this.ship_draw = function(ctx) {
    ctx.fillStyle = this.color;

    let pos = this.pos;
    let x = pos[0];
    let y = pos[1];
    let size = this.size;

    let tip1 = [x - size, y];
    let tip2 = [x, y - size];
    let tip3 = [x, y + size];

    ctx.beginPath();
    ctx.moveTo(...tip1);
    ctx.lineTo(...tip2);
    ctx.arcTo(tip2[0], tip2[1], tip3[0], tip3[1], size);
    ctx.lineTo(...tip1);
    ctx.closePath();
    ctx.fill();
  }
}

// Ship.prototype.ship_draw = function(ctx) {
//   ctx.fillStyle = this.color;
//
//   let pos = this.pos;
//   let x = pos[0];
//   let y = pos[1];
//   let size = this.size;
//
//   let tip1 = [x - size, y];
//   let tip2 = [x, y - size];
//   let tip3 = [x, y + size];
//
//   ctx.beginPath();
//   ctx.moveTo(...tip1);
//   ctx.lineTo(...tip2);
//   ctx.arcTo(tip2[0], tip2[1], tip3[0], tip3[1], size);
//   ctx.closePath();
//  //  ctx.lineTo(...tip1);
//   ctx.fill();
// }

Util.inherits(Ship, MovingObject);

module.exports = Ship;
