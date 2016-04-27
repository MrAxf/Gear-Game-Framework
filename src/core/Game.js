/*jshint esnext: true */
import Stage from './Stage';
import Entity from './Entity';

class Game{
  constructor(idContainer, width, height, options = {}){

    this.idContainer = idContainer;
    this.width = width;
    this.height = height;

    this.resources = new Map();
    this.resources.set('Stage', new Map());
    this.resources.set('Entity', new Map());

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

  createResource(type, resourceName, resource){
    this.resources.get(type).set(resourceName, resource);
  }

  getResource(type, name, ...args){
    let resource;
    switch (type) {
      case 'Stage':
        resource = new Stage(this);
        break;

      case 'Entity':
        resource = new Entity(this, ...args);
        break;

      default:
        return false;

    }
    let prop = this.resources.get(type).get(name);
    for(let key in prop){
      resource[key] = prop[key];
    }
    return resource;
  }

}

module.exports = Game;
