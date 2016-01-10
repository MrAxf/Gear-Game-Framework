/*jshint esnext: true */

class Entity extends PIXI.Sprite{
  constructor(game, init, update){
    this.game = game;
    this.init = init();
    this.update = update();
  }
  init(){

  }
  update(){

  }
}

module.exports = Entity;
