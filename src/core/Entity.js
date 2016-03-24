/*jshint esnext: true */

class Entity extends PIXI.Sprite{
  constructor(game, stage, ...args){
    super(...args);
    this.game = game;
    this.stage = stage;
    this.graphics = new PIXI.Graphics();
  }
  spawn(x, y){
    this.x=x;
    this.y=y;
    this.stage.graphics.addChild(this);
  }
}

module.exports = Entity;
