/*jshint esnext: true */

class Animation extends PIXI.Sprite{
  constructor(frames, ticks){
    super(frames[0]);
    this.frames = frames;
    this.ticks = ticks;
  }

  init(){
    this.currentFrame = 0;
    if(Object.prototype.toString.call(this.ticks) === '[object Array]' ){
      this.currentTick = 0;
      this.next = this.arrayNext;
      this.tickCounter = this.ticks[0];
    }else{
      this.next = this.numberNext;
      this.tickCounter = this.ticks;
    }
  }

  update(){
    this.tickCounter--;
    if(this.tickCounter === 0) this.next();
  }

  arrayNext(){
    this.currentFrame++;
    this.currentTick++;
    if(this.currentFrame >= this.frames.length){
      this.currentFrame = 0;
    }
    if(this.currentTick >= this.ticks.length) this.currentTick = 0;
    super.texture = this.frames[this.currentFrame];
    this.tickCounter = this.ticks[this.currentTick];
  }

  numberNext(){
    this.currentFrame++;
    if(this.currentFrame >= this.frames.length){
      this.currentFrame = 0;
    }
    super.texture = this.frames[this.currentFrame];
    this.tickCounter = this.ticks;
  }
}

module.exports = Animation;
