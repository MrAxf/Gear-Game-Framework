/*jshint esnext: true */
import Stage from './Stage';
import Entity from './Entity';

class Game{
  constructor(idContainer, width, height, options = {}){

    this.idContainer = idContainer;
    this.width = width;
    this.height = height;

    this.stages = {};
    this.entities = {};

    if(options.fps) this.fps = options.fps;
    else this.fps = -1;

    if(options.tps) this.tps = options.tps;
    else this.tps = 60;

    if(options.initStage)  this.loadStage(options.initStage);
    else this.currStage = new Stage();

    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, {backgroundColor : 0x6e6e6e});

    this.then = Date.now();

    switch (this.fps) {

      case this.tps:
        this.frameInterval = 1000/this.fps;
  			this.loop = this.simpleLoop;
        this.delta = 0;
  			break;

      case -1:
        this.ticksInterval = 1000/this.tps;
        this.lag = 0;
  			this.loop = this.fpsUnlimitedLoop;
  		  break;

      default:
        this.frameInterval = 1000/this.fps;
        this.ticksInterval = 1000/this.tps;
        this.thenAux = Date.now();
        this.delta = 0;
        this.lag = 0;
  			this.loop = this.fpsLockedLoop;
        break;
  	}

    document.getElementById(this.idContainer).appendChild(this.renderer.view);
  }

  simpleLoop(){
  	this.frame = window.requestAnimationFrame(this.loop.bind(this));
  	let now = Date.now();
  	this.delta = now - this.then;
  	if (this.delta > this.frameInterval) {
  		this.update();
  		//updateInputs();
  		this.render();
  		this.then = now - (this.delta % this.frameInterval);
  	}
  }

  fpsUnlimitedLoop(){
  	this.frame = window.requestAnimationFrame(this.loop.bind(this));
  	let now = Date.now();
  	this.lag += now - this.then;
  	this.then = now;
  	while(this.ticksInterval < this.lag){
  		this.update();
  		//updateInputs();
  		this.lag -= this.ticksInterval;
  	}
  	this.render();
  }

  fpsLockedLoop(){
  	this.frame = window.requestAnimationFrame(this.loop.bind(this));
  	let now = Date.now();
  	this.lag += now - this.then;
  	this.delta = now - this.thenAux;
  	this.then = now;
  	while(this.ticksInterval < this.lag){
  		this.update();
  		//updateInputs();
  		this.lag -= this.ticksInterval;
  	}
  	if (this.delta > this.frameInterval) {
  		this.render();
  		this.thenAux = now - (this.delta % this.frameInterval);
  	}
  }

  update(){
    this.currStage.update();
  }

  render(){
    this.renderer.render(this.currStage.graphics);
  }

  loadStage(stage){
    this.currStage = stage;
    this.currStage.init();
  }

  start(){
    this.loop();
  }

  stop(){
    window.cancelAnimationFrame(this.frame);
  }

  createStage(name, prop){
    this.stages[name] = prop;
  }

  createEntity(name, prop){
    this.entities[name] = prop;
  }

  getStage(name){
    let stage = new Stage(this);
    let prop = this.stages[name];
    for(let key in prop){
      stage[key] = prop[key];
    }
    return stage;
  }

  loadEntity(name, stage){
    let entity = new Entity(this, stage);
    let prop = this.entities[name];
    for(let key in prop){
      entity[key] = prop[key];
    }
    return entity;
  }

}

module.exports = Game;
