/*jshint esnext: true */

class EntityGroup extends PIXI.Sprite{
  constructor(game, stage, ...args){
    super(...args);
    this.game = game;
    this.stage = stage;
    this.x = 0;
    this.y = 0;
    this.entitySet = new Set();
  }
  update(){
    for(let entity of this.entitySet) entity.update();
  }
  spawn(){
    this.stage.graphics.addChild(this);
  }
  addFromResource(resource, x, y, rotation, ...args){
    let entity = this.game.getResource('Entity', resource, ...args);
    entity.containerGroup = this;
    entity.destroy = function(){
      this.containerGroup.removeChild(this);
      this.containerGroup.delete(this);
    };
    entity.spawn = function(x, y, rotation){
      this.x = x;
      this.y = y;
      this.rotation = rotation;
      this.containerGroup.addChild(this);
    };
    entity.init();
    entity.spawn(x, y, rotation);
    console.log(entity.x);
    console.log(entity.y);
    console.log(entity.rotation);
    console.log(entity.v);
    return this.entitySet.add(entity);
  }
  delete(entity){
    return this.entitySet.delete(entity);
  }
  has(entity){
    return this.entitySet.has(entity);
  }
}

module.exports = EntityGroup;
