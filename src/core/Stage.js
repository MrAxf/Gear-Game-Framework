/*jshint esnext: true */

class Stage{
  constructor(game, init, update){
    this.game = game;
    this.container.render();
    this.renderContainer = new PIXI.Container();
    this.init = init;
    this.stageUpdate = update;
  }

  init(){

  }

  update(){
    this.container.update();
    this.stageUpdate();
  }
}

module.exports = Stage;
