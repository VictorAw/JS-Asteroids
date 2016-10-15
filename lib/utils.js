const Util = {
  inherits(Subclass, Superclass){
    function Surrogate (){}
    Surrogate.prototype = Superclass.prototype;
    Subclass.prototype = new Surrogate();
    Subclass.prototype.constructor = Subclass;
  },

  distanceBetween(obj1, obj2) {
    let xSquared = Math.pow((obj1.pos[0] - obj2.pos[0]), 2);
    let ySquared = Math.pow((obj1.pos[1] - obj2.pos[1]), 2);
    return Math.sqrt(xSquared + ySquared);
  },

  _super(caller) {
    return caller.__proto__.__proto__.constructor.bind(caller);
  }
}

module.exports = Util;

// Distance test
// obj1 = {
//   pos: [1, 0]
// }
//
// obj2 = {
//   pos: [0, 1]
// }
//
// console.log(Util.distanceBetween(obj1, obj2));
