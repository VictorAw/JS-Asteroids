/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1)
	__webpack_require__(3)
	__webpack_require__(4)
	const Game = __webpack_require__(5)
	const GameView = __webpack_require__(6)

	document.addEventListener("DOMContentLoaded", () => {
	  let canvas = document.getElementById("game-canvas");
	  let game = new Game();
	  canvas.width = game.windowWidth;
	  canvas.height = game.windowHeight;
	  let game_view = new GameView(game, canvas.getContext("2d"));
	  game_view.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(2);
	const MovingObject = __webpack_require__(1);

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(2);
	const MovingObject = __webpack_require__(1);

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


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(4);

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


/***/ },
/* 6 */
/***/ function(module, exports) {

	function GameView(game, ctx){
	  this.game = game;
	  this.ctx = ctx;
	}

	GameView.prototype.start = function(){
	  setInterval(() => {
	    this.game.update();
	    this.game.draw(this.ctx);
	  }, 20);
	}

	module.exports = GameView;


/***/ }
/******/ ]);