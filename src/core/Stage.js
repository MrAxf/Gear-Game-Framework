/*jshint esnext: true */

class Stage{
  constructor(game){
    this.game = game;
    this.graphics = new PIXI.Container();
  }
}

module.exports = Stage;
