window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;
})();
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
var ggf;
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esnext: true */

var Animation = (function (_PIXI$Sprite) {
  _inherits(Animation, _PIXI$Sprite);

  function Animation(frames, ticks) {
    _classCallCheck(this, Animation);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Animation).call(this, frames[0]));

    _this.frames = frames;
    _this.ticks = ticks;
    return _this;
  }

  _createClass(Animation, [{
    key: 'init',
    value: function init() {
      this.currentFrame = 0;
      if (Object.prototype.toString.call(this.ticks) === '[object Array]') {
        this.currentTick = 0;
        this.next = this.arrayNext;
        this.tickCounter = this.ticks[0];
      } else {
        this.next = this.numberNext;
        this.tickCounter = this.ticks;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.tickCounter--;
      if (this.tickCounter === 0) this.next();
    }
  }, {
    key: 'arrayNext',
    value: function arrayNext() {
      this.currentFrame++;
      this.currentTick++;
      if (this.currentFrame >= this.frames.length) {
        this.currentFrame = 0;
      }
      if (this.currentTick >= this.ticks.length) this.currentTick = 0;
      _set(Object.getPrototypeOf(Animation.prototype), 'texture', this.frames[this.currentFrame], this);
      this.tickCounter = this.ticks[this.currentTick];
    }
  }, {
    key: 'numberNext',
    value: function numberNext() {
      this.currentFrame++;
      if (this.currentFrame >= this.frames.length) {
        this.currentFrame = 0;
      }
      _set(Object.getPrototypeOf(Animation.prototype), 'texture', this.frames[this.currentFrame], this);
      this.tickCounter = this.ticks;
    }
  }]);

  return Animation;
})(PIXI.Sprite);

module.exports = Animation;

},{}],2:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esnext: true */

var Entity = (function (_PIXI$Sprite) {
  _inherits(Entity, _PIXI$Sprite);

  function Entity(game, stage) {
    var _Object$getPrototypeO;

    _classCallCheck(this, Entity);

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Entity)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.game = game;
    _this.stage = stage;
    _this.graphics = new PIXI.Graphics();
    return _this;
  }

  _createClass(Entity, [{
    key: "spawn",
    value: function spawn(x, y) {
      this.x = x;
      this.y = y;
      this.stage.graphics.addChild(this);
    }
  }]);

  return Entity;
})(PIXI.Sprite);

module.exports = Entity;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /*jshint esnext: true */

var _Stage = require('./Stage');

var _Stage2 = _interopRequireDefault(_Stage);

var _Entity = require('./Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = (function () {
  function Game(idContainer, width, height) {
    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    _classCallCheck(this, Game);

    this.idContainer = idContainer;
    this.width = width;
    this.height = height;

    this.stages = {};
    this.entities = {};

    if (options.fps) this.fps = options.fps;else this.fps = -1;

    if (options.tps) this.tps = options.tps;else this.tps = 60;

    if (options.initStage) this.loadStage(options.initStage);else this.currStage = new _Stage2.default();

    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, { backgroundColor: 0x6e6e6e });

    this.then = Date.now();

    switch (this.fps) {

      case this.tps:
        this.frameInterval = 1000 / this.fps;
        this.loop = this.simpleLoop;
        this.delta = 0;
        break;

      case -1:
        this.ticksInterval = 1000 / this.tps;
        this.lag = 0;
        this.loop = this.fpsUnlimitedLoop;
        break;

      default:
        this.frameInterval = 1000 / this.fps;
        this.ticksInterval = 1000 / this.tps;
        this.thenAux = Date.now();
        this.delta = 0;
        this.lag = 0;
        this.loop = this.fpsLockedLoop;
        break;
    }

    document.getElementById(this.idContainer).appendChild(this.renderer.view);
  }

  _createClass(Game, [{
    key: 'simpleLoop',
    value: function simpleLoop() {
      this.frame = window.requestAnimationFrame(this.loop.bind(this));
      var now = Date.now();
      this.delta = now - this.then;
      if (this.delta > this.frameInterval) {
        this.update();
        //updateInputs();
        this.render();
        this.then = now - this.delta % this.frameInterval;
      }
    }
  }, {
    key: 'fpsUnlimitedLoop',
    value: function fpsUnlimitedLoop() {
      this.frame = window.requestAnimationFrame(this.loop.bind(this));
      var now = Date.now();
      this.lag += now - this.then;
      this.then = now;
      while (this.ticksInterval < this.lag) {
        this.update();
        //updateInputs();
        this.lag -= this.ticksInterval;
      }
      this.render();
    }
  }, {
    key: 'fpsLockedLoop',
    value: function fpsLockedLoop() {
      this.frame = window.requestAnimationFrame(this.loop.bind(this));
      var now = Date.now();
      this.lag += now - this.then;
      this.delta = now - this.thenAux;
      this.then = now;
      while (this.ticksInterval < this.lag) {
        this.update();
        //updateInputs();
        this.lag -= this.ticksInterval;
      }
      if (this.delta > this.frameInterval) {
        this.render();
        this.thenAux = now - this.delta % this.frameInterval;
      }
    }
  }, {
    key: 'update',
    value: function update() {
      this.currStage.update();
    }
  }, {
    key: 'render',
    value: function render() {
      this.renderer.render(this.currStage.graphics);
    }
  }, {
    key: 'loadStage',
    value: function loadStage(stage) {
      this.currStage = stage;
      this.currStage.init();
    }
  }, {
    key: 'start',
    value: function start() {
      this.loop();
    }
  }, {
    key: 'stop',
    value: function stop() {
      window.cancelAnimationFrame(this.frame);
    }
  }, {
    key: 'createStage',
    value: function createStage(name, prop) {
      this.stages[name] = prop;
    }
  }, {
    key: 'createEntity',
    value: function createEntity(name, prop) {
      this.entities[name] = prop;
    }
  }, {
    key: 'getStage',
    value: function getStage(name) {
      var stage = new _Stage2.default(this);
      var prop = this.stages[name];
      for (var key in prop) {
        stage[key] = prop[key];
      }
      return stage;
    }
  }, {
    key: 'loadEntity',
    value: function loadEntity(name, stage) {
      var entity = new _Entity2.default(this, stage);
      var prop = this.entities[name];
      for (var key in prop) {
        entity[key] = prop[key];
      }
      return entity;
    }
  }]);

  return Game;
})();

module.exports = Game;

},{"./Entity":2,"./Stage":5}],4:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esnext: true */

var Spritesheet = (function () {
  function Spritesheet(image, width, height, rows, cols) {
    _classCallCheck(this, Spritesheet);

    this.game = game;
    this.texture = new PIXI.Texture.fromImage(image);
    this.width = width;
    this.height = height;
    this.rows = rows;
    this.cols = cols;
    this.spriteWidth = this.width / cols;
    this.spriteHeight = this.height / rows;
    this.sprites = new Array(this.rows);
    for (var i = 0; i < this.rows; i++) {
      this.sprites[i] = new Array(this.cols);
      for (var j = 0; j < this.cols; j++) {
        this.sprites[i][j] = new PIXI.Texture(this.texture, new PIXI.Rectangle(j * this.spriteWidth, i * this.spriteHeight, this.spriteWidth, this.spriteHeight));
      }
    }
  }

  _createClass(Spritesheet, [{
    key: "getSprite",
    value: function getSprite(row, col) {
      if (row < 0 || col < 0 || row >= this.rows || col >= this.cols) return false;
      return this.sprites[row][col];
    }
  }, {
    key: "getRow",
    value: function getRow(row) {
      if (row < 0 || row >= this.rows) return false;
      return this.sprites[row];
    }
  }]);

  return Spritesheet;
})();

module.exports = Spritesheet;

},{}],5:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esnext: true */

var Stage = function Stage(game) {
  _classCallCheck(this, Stage);

  this.game = game;
  this.graphics = new PIXI.Container();
};

module.exports = Stage;

},{}],6:[function(require,module,exports){
'use strict';

var _Game = require('./core/Game');

var _Game2 = _interopRequireDefault(_Game);

var _Stage = require('./core/Stage');

var _Stage2 = _interopRequireDefault(_Stage);

var _Entity = require('./core/Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _Spritesheet = require('./core/Spritesheet');

var _Spritesheet2 = _interopRequireDefault(_Spritesheet);

var _Animation = require('./core/Animation');

var _Animation2 = _interopRequireDefault(_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ggf = {}; /*jshint esnext: true */

ggf.Game = _Game2.default;
ggf.Stage = _Stage2.default;
ggf.Entity = _Entity2.default;
ggf.Spritesheet = _Spritesheet2.default;
ggf.Animation = _Animation2.default;

},{"./core/Animation":1,"./core/Entity":2,"./core/Game":3,"./core/Spritesheet":4,"./core/Stage":5}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXEFuaW1hdGlvbi5qcyIsInNyY1xcY29yZVxcRW50aXR5LmpzIiwic3JjXFxjb3JlXFxHYW1lLmpzIiwic3JjXFxjb3JlXFxTcHJpdGVzaGVldC5qcyIsInNyY1xcY29yZVxcU3RhZ2UuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNFTSxTQUFTO1lBQVQsU0FBUzs7QUFDYixXQURJLFNBQVMsQ0FDRCxNQUFNLEVBQUUsS0FBSyxFQUFDOzBCQUR0QixTQUFTOzt1RUFBVCxTQUFTLGFBRUwsTUFBTSxDQUFDLENBQUMsQ0FBQzs7QUFDZixVQUFLLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsVUFBSyxLQUFLLEdBQUcsS0FBSyxDQUFDOztHQUNwQjs7ZUFMRyxTQUFTOzsyQkFPUDtBQUNKLFVBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLFVBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtBQUNsRSxZQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNyQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDM0IsWUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2xDLE1BQUk7QUFDSCxZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDNUIsWUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO09BQy9CO0tBQ0Y7Ozs2QkFFTztBQUNOLFVBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNuQixVQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssQ0FBQyxFQUFFLElB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Vyx3QkFBYyxDQUFDO0FBQzlCLEdBQUcsQ0FBQyxTQUFTLHNCQUFZLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5jbGFzcyBBbmltYXRpb24gZXh0ZW5kcyBQSVhJLlNwcml0ZXtcclxuICBjb25zdHJ1Y3RvcihmcmFtZXMsIHRpY2tzKXtcclxuICAgIHN1cGVyKGZyYW1lc1swXSk7XHJcbiAgICB0aGlzLmZyYW1lcyA9IGZyYW1lcztcclxuICAgIHRoaXMudGlja3MgPSB0aWNrcztcclxuICB9XHJcblxyXG4gIGluaXQoKXtcclxuICAgIHRoaXMuY3VycmVudEZyYW1lID0gMDtcclxuICAgIGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0aGlzLnRpY2tzKSA9PT0gJ1tvYmplY3QgQXJyYXldJyApe1xyXG4gICAgICB0aGlzLmN1cnJlbnRUaWNrID0gMDtcclxuICAgICAgdGhpcy5uZXh0ID0gdGhpcy5hcnJheU5leHQ7XHJcbiAgICAgIHRoaXMudGlja0NvdW50ZXIgPSB0aGlzLnRpY2tzWzBdO1xyXG4gICAgfWVsc2V7XHJcbiAgICAgIHRoaXMubmV4dCA9IHRoaXMubnVtYmVyTmV4dDtcclxuICAgICAgdGhpcy50aWNrQ291bnRlciA9IHRoaXMudGlja3M7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKXtcclxuICAgIHRoaXMudGlja0NvdW50ZXItLTtcclxuICAgIGlmKHRoaXMudGlja0NvdW50ZXIgPT09IDApIHRoaXMubmV4dCgpO1xyXG4gIH1cclxuXHJcbiAgYXJyYXlOZXh0KCl7XHJcbiAgICB0aGlzLmN1cnJlbnRGcmFtZSsrO1xyXG4gICAgdGhpcy5jdXJyZW50VGljaysrO1xyXG4gICAgaWYodGhpcy5jdXJyZW50RnJhbWUgPj0gdGhpcy5mcmFtZXMubGVuZ3RoKXtcclxuICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSAwO1xyXG4gICAgfVxyXG4gICAgaWYodGhpcy5jdXJyZW50VGljayA+PSB0aGlzLnRpY2tzLmxlbmd0aCkgdGhpcy5jdXJyZW50VGljayA9IDA7XHJcbiAgICBzdXBlci50ZXh0dXJlID0gdGhpcy5mcmFtZXNbdGhpcy5jdXJyZW50RnJhbWVdO1xyXG4gICAgdGhpcy50aWNrQ291bnRlciA9IHRoaXMudGlja3NbdGhpcy5jdXJyZW50VGlja107XHJcbiAgfVxyXG5cclxuICBudW1iZXJOZXh0KCl7XHJcbiAgICB0aGlzLmN1cnJlbnRGcmFtZSsrO1xyXG4gICAgaWYodGhpcy5jdXJyZW50RnJhbWUgPj0gdGhpcy5mcmFtZXMubGVuZ3RoKXtcclxuICAgICAgdGhpcy5jdXJyZW50RnJhbWUgPSAwO1xyXG4gICAgfVxyXG4gICAgc3VwZXIudGV4dHVyZSA9IHRoaXMuZnJhbWVzW3RoaXMuY3VycmVudEZyYW1lXTtcclxuICAgIHRoaXMudGlja0NvdW50ZXIgPSB0aGlzLnRpY2tzO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBbmltYXRpb247XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuY2xhc3MgRW50aXR5IGV4dGVuZHMgUElYSS5TcHJpdGV7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgc3RhZ2UsIC4uLmFyZ3Mpe1xyXG4gICAgc3VwZXIoLi4uYXJncyk7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG4gICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgfVxyXG4gIHNwYXduKHgsIHkpe1xyXG4gICAgdGhpcy54PXg7XHJcbiAgICB0aGlzLnk9eTtcclxuICAgIHRoaXMuc3RhZ2UuZ3JhcGhpY3MuYWRkQ2hpbGQodGhpcyk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eTtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcbmltcG9ydCBTdGFnZSBmcm9tICcuL1N0YWdlJztcclxuaW1wb3J0IEVudGl0eSBmcm9tICcuL0VudGl0eSc7XHJcblxyXG5jbGFzcyBHYW1le1xyXG4gIGNvbnN0cnVjdG9yKGlkQ29udGFpbmVyLCB3aWR0aCwgaGVpZ2h0LCBvcHRpb25zID0ge30pe1xyXG5cclxuICAgIHRoaXMuaWRDb250YWluZXIgPSBpZENvbnRhaW5lcjtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cclxuICAgIHRoaXMuc3RhZ2VzID0ge307XHJcbiAgICB0aGlzLmVudGl0aWVzID0ge307XHJcblxyXG4gICAgaWYob3B0aW9ucy5mcHMpIHRoaXMuZnBzID0gb3B0aW9ucy5mcHM7XHJcbiAgICBlbHNlIHRoaXMuZnBzID0gLTE7XHJcblxyXG4gICAgaWYob3B0aW9ucy50cHMpIHRoaXMudHBzID0gb3B0aW9ucy50cHM7XHJcbiAgICBlbHNlIHRoaXMudHBzID0gNjA7XHJcblxyXG4gICAgaWYob3B0aW9ucy5pbml0U3RhZ2UpICB0aGlzLmxvYWRTdGFnZShvcHRpb25zLmluaXRTdGFnZSk7XHJcbiAgICBlbHNlIHRoaXMuY3VyclN0YWdlID0gbmV3IFN0YWdlKCk7XHJcblxyXG4gICAgdGhpcy5yZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB7YmFja2dyb3VuZENvbG9yIDogMHg2ZTZlNmV9KTtcclxuXHJcbiAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpO1xyXG5cclxuICAgIHN3aXRjaCAodGhpcy5mcHMpIHtcclxuXHJcbiAgICAgIGNhc2UgdGhpcy50cHM6XHJcbiAgICAgICAgdGhpcy5mcmFtZUludGVydmFsID0gMTAwMC90aGlzLmZwcztcclxuICBcdFx0XHR0aGlzLmxvb3AgPSB0aGlzLnNpbXBsZUxvb3A7XHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IDA7XHJcbiAgXHRcdFx0YnJlYWs7XHJcblxyXG4gICAgICBjYXNlIC0xOlxyXG4gICAgICAgIHRoaXMudGlja3NJbnRlcnZhbCA9IDEwMDAvdGhpcy50cHM7XHJcbiAgICAgICAgdGhpcy5sYWcgPSAwO1xyXG4gIFx0XHRcdHRoaXMubG9vcCA9IHRoaXMuZnBzVW5saW1pdGVkTG9vcDtcclxuICBcdFx0ICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5mcmFtZUludGVydmFsID0gMTAwMC90aGlzLmZwcztcclxuICAgICAgICB0aGlzLnRpY2tzSW50ZXJ2YWwgPSAxMDAwL3RoaXMudHBzO1xyXG4gICAgICAgIHRoaXMudGhlbkF1eCA9IERhdGUubm93KCk7XHJcbiAgICAgICAgdGhpcy5kZWx0YSA9IDA7XHJcbiAgICAgICAgdGhpcy5sYWcgPSAwO1xyXG4gIFx0XHRcdHRoaXMubG9vcCA9IHRoaXMuZnBzTG9ja2VkTG9vcDtcclxuICAgICAgICBicmVhaztcclxuICBcdH1cclxuXHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0aGlzLmlkQ29udGFpbmVyKS5hcHBlbmRDaGlsZCh0aGlzLnJlbmRlcmVyLnZpZXcpO1xyXG4gIH1cclxuXHJcbiAgc2ltcGxlTG9vcCgpe1xyXG4gIFx0dGhpcy5mcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG4gIFx0bGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgXHR0aGlzLmRlbHRhID0gbm93IC0gdGhpcy50aGVuO1xyXG4gIFx0aWYgKHRoaXMuZGVsdGEgPiB0aGlzLmZyYW1lSW50ZXJ2YWwpIHtcclxuICBcdFx0dGhpcy51cGRhdGUoKTtcclxuICBcdFx0Ly91cGRhdGVJbnB1dHMoKTtcclxuICBcdFx0dGhpcy5yZW5kZXIoKTtcclxuICBcdFx0dGhpcy50aGVuID0gbm93IC0gKHRoaXMuZGVsdGEgJSB0aGlzLmZyYW1lSW50ZXJ2YWwpO1xyXG4gIFx0fVxyXG4gIH1cclxuXHJcbiAgZnBzVW5saW1pdGVkTG9vcCgpe1xyXG4gIFx0dGhpcy5mcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG4gIFx0bGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgXHR0aGlzLmxhZyArPSBub3cgLSB0aGlzLnRoZW47XHJcbiAgXHR0aGlzLnRoZW4gPSBub3c7XHJcbiAgXHR3aGlsZSh0aGlzLnRpY2tzSW50ZXJ2YWwgPCB0aGlzLmxhZyl7XHJcbiAgXHRcdHRoaXMudXBkYXRlKCk7XHJcbiAgXHRcdC8vdXBkYXRlSW5wdXRzKCk7XHJcbiAgXHRcdHRoaXMubGFnIC09IHRoaXMudGlja3NJbnRlcnZhbDtcclxuICBcdH1cclxuICBcdHRoaXMucmVuZGVyKCk7XHJcbiAgfVxyXG5cclxuICBmcHNMb2NrZWRMb29wKCl7XHJcbiAgXHR0aGlzLmZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgXHRsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICBcdHRoaXMubGFnICs9IG5vdyAtIHRoaXMudGhlbjtcclxuICBcdHRoaXMuZGVsdGEgPSBub3cgLSB0aGlzLnRoZW5BdXg7XHJcbiAgXHR0aGlzLnRoZW4gPSBub3c7XHJcbiAgXHR3aGlsZSh0aGlzLnRpY2tzSW50ZXJ2YWwgPCB0aGlzLmxhZyl7XHJcbiAgXHRcdHRoaXMudXBkYXRlKCk7XHJcbiAgXHRcdC8vdXBkYXRlSW5wdXRzKCk7XHJcbiAgXHRcdHRoaXMubGFnIC09IHRoaXMudGlja3NJbnRlcnZhbDtcclxuICBcdH1cclxuICBcdGlmICh0aGlzLmRlbHRhID4gdGhpcy5mcmFtZUludGVydmFsKSB7XHJcbiAgXHRcdHRoaXMucmVuZGVyKCk7XHJcbiAgXHRcdHRoaXMudGhlbkF1eCA9IG5vdyAtICh0aGlzLmRlbHRhICUgdGhpcy5mcmFtZUludGVydmFsKTtcclxuICBcdH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpe1xyXG4gICAgdGhpcy5jdXJyU3RhZ2UudXBkYXRlKCk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKXtcclxuICAgIHRoaXMucmVuZGVyZXIucmVuZGVyKHRoaXMuY3VyclN0YWdlLmdyYXBoaWNzKTtcclxuICB9XHJcblxyXG4gIGxvYWRTdGFnZShzdGFnZSl7XHJcbiAgICB0aGlzLmN1cnJTdGFnZSA9IHN0YWdlO1xyXG4gICAgdGhpcy5jdXJyU3RhZ2UuaW5pdCgpO1xyXG4gIH1cclxuXHJcbiAgc3RhcnQoKXtcclxuICAgIHRoaXMubG9vcCgpO1xyXG4gIH1cclxuXHJcbiAgc3RvcCgpe1xyXG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuZnJhbWUpO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlU3RhZ2UobmFtZSwgcHJvcCl7XHJcbiAgICB0aGlzLnN0YWdlc1tuYW1lXSA9IHByb3A7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVFbnRpdHkobmFtZSwgcHJvcCl7XHJcbiAgICB0aGlzLmVudGl0aWVzW25hbWVdID0gcHJvcDtcclxuICB9XHJcblxyXG4gIGdldFN0YWdlKG5hbWUpe1xyXG4gICAgbGV0IHN0YWdlID0gbmV3IFN0YWdlKHRoaXMpO1xyXG4gICAgbGV0IHByb3AgPSB0aGlzLnN0YWdlc1tuYW1lXTtcclxuICAgIGZvcihsZXQga2V5IGluIHByb3Ape1xyXG4gICAgICBzdGFnZVtrZXldID0gcHJvcFtrZXldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHN0YWdlO1xyXG4gIH1cclxuXHJcbiAgbG9hZEVudGl0eShuYW1lLCBzdGFnZSl7XHJcbiAgICBsZXQgZW50aXR5ID0gbmV3IEVudGl0eSh0aGlzLCBzdGFnZSk7XHJcbiAgICBsZXQgcHJvcCA9IHRoaXMuZW50aXRpZXNbbmFtZV07XHJcbiAgICBmb3IobGV0IGtleSBpbiBwcm9wKXtcclxuICAgICAgZW50aXR5W2tleV0gPSBwcm9wW2tleV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZW50aXR5O1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5jbGFzcyBTcHJpdGVzaGVldHtcclxuICBjb25zdHJ1Y3RvcihpbWFnZSwgd2lkdGgsIGhlaWdodCwgcm93cywgY29scyl7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy50ZXh0dXJlID0gbmV3IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UoaW1hZ2UpO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnJvd3MgPSByb3dzO1xyXG4gICAgdGhpcy5jb2xzID0gY29scztcclxuICAgIHRoaXMuc3ByaXRlV2lkdGggPSB0aGlzLndpZHRoL2NvbHM7XHJcbiAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHRoaXMuaGVpZ2h0L3Jvd3M7XHJcbiAgICB0aGlzLnNwcml0ZXMgPSBuZXcgQXJyYXkodGhpcy5yb3dzKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKyl7XHJcbiAgICAgIHRoaXMuc3ByaXRlc1tpXSA9IG5ldyBBcnJheSh0aGlzLmNvbHMpO1xyXG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5jb2xzOyBqKyspe1xyXG4gICAgICAgIHRoaXMuc3ByaXRlc1tpXVtqXSA9IG5ldyBQSVhJLlRleHR1cmUodGhpcy50ZXh0dXJlLCBuZXcgUElYSS5SZWN0YW5nbGUoaip0aGlzLnNwcml0ZVdpZHRoLCBpKnRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFNwcml0ZShyb3csIGNvbCl7XHJcbiAgICBpZihyb3cgPCAwIHx8IGNvbCA8IDAgfHwgcm93ID49IHRoaXMucm93cyB8fCBjb2wgPj0gdGhpcy5jb2xzKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdGhpcy5zcHJpdGVzW3Jvd11bY29sXTtcclxuICB9XHJcbiAgZ2V0Um93KHJvdyl7XHJcbiAgICBpZihyb3cgPCAwIHx8IHJvdyA+PSB0aGlzLnJvd3MpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0aGlzLnNwcml0ZXNbcm93XTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlc2hlZXQ7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuY2xhc3MgU3RhZ2V7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSl7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdGFnZTtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5pbXBvcnQgR2FtZSBmcm9tICcuL2NvcmUvR2FtZSc7XHJcbmltcG9ydCBTdGFnZSBmcm9tICcuL2NvcmUvU3RhZ2UnO1xyXG5pbXBvcnQgRW50aXR5IGZyb20gJy4vY29yZS9FbnRpdHknO1xyXG5pbXBvcnQgU3ByaXRlc2hlZXQgZnJvbSAnLi9jb3JlL1Nwcml0ZXNoZWV0JztcclxuaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuL2NvcmUvQW5pbWF0aW9uJztcclxuXHJcbmdnZiA9IHt9O1xyXG5nZ2YuR2FtZSA9IEdhbWU7XHJcbmdnZi5TdGFnZSA9IFN0YWdlO1xyXG5nZ2YuRW50aXR5ID0gRW50aXR5O1xyXG5nZ2YuU3ByaXRlc2hlZXQgPSBTcHJpdGVzaGVldDtcclxuZ2dmLkFuaW1hdGlvbiA9IEFuaW1hdGlvbjtcclxuIl19
