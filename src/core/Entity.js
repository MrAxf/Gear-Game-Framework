/*jshint esnext: true */

class Entity extends PIXI.Sprite{
  constructor(game, stage, ...args){
    super(...args);
    this.game = game;
    this.stage = stage;
  }
  spawn(x, y){
    this.x=x;
    this.y=y;
    this.stage.graphics.addChild(this);
  }
}

module.exports = Entity;
