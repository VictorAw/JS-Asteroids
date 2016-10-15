require("./moving_object")
require("./asteroid")
require("./ship")
const Game = require("./game")
const GameView = require("./game_view")

document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("game-canvas");
  let game = new Game();
  canvas.width = game.windowWidth;
  canvas.height = game.windowHeight;
  let game_view = new GameView(game, canvas.getContext("2d"));
  game_view.start();
});
