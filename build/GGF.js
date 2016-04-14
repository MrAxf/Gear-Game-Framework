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
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      var entity = new (Function.prototype.bind.apply(_Entity2.default, [null].concat([this, stage], args)))();
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

var _Vector2D = require('./utils/Vector2D');

var _Vector2D2 = _interopRequireDefault(_Vector2D);

var _HitBox = require('./utils/HitBox');

var _HitBox2 = _interopRequireDefault(_HitBox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ggf = {}; /*jshint esnext: true */

ggf.Game = _Game2.default;
ggf.Stage = _Stage2.default;
ggf.Entity = _Entity2.default;
ggf.Spritesheet = _Spritesheet2.default;
ggf.Animation = _Animation2.default;
ggf.Vector2D = _Vector2D2.default;
ggf.HitBox = _HitBox2.default;

},{"./core/Animation":1,"./core/Entity":2,"./core/Game":3,"./core/Spritesheet":4,"./core/Stage":5,"./utils/HitBox":7,"./utils/Vector2D":8}],7:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })(); /*jshint esnext: true */

var _Vector2D = require('./Vector2D');

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HitBox = (function () {
  function HitBox(width, height, position, rotation) {
    _classCallCheck(this, HitBox);

    this.width = width;
    this.height = height;
    this.position = new _Vector2D2.default(position.x, position.y);
    this.rotation = rotation;
    this.vertexs = this.getVertexs();
    this.axes = this.getAxes();
  }

  _createClass(HitBox, [{
    key: 'getVertexs',
    value: function getVertexs() {
      var vertexInitial0 = new _Vector2D2.default(this.position.x - this.width / 2, this.position.y - this.height / 2);
      var vertexInitial1 = new _Vector2D2.default(vertexInitial0.x + this.width, vertexInitial0.y);
      var vertexInitial2 = new _Vector2D2.default(vertexInitial0.x + this.width, vertexInitial0.y + this.height);
      var vertexInitial3 = new _Vector2D2.default(vertexInitial0.x, vertexInitial0.y + this.height);
      var vertexs = new Array(4);
      vertexs[0] = vertexInitial0.rotate(this.rotation, this.position);
      vertexs[1] = vertexInitial1.rotate(this.rotation, this.position);
      vertexs[2] = vertexInitial2.rotate(this.rotation, this.position);
      vertexs[3] = vertexInitial3.rotate(this.rotation, this.position);
      return vertexs;
    }
  }, {
    key: 'getAxes',
    value: function getAxes() {
      var axes = new Array(2);
      axes[0] = new _Vector2D2.default(this.vertexs[1].x, this.vertexs[1].y, this.vertexs[0].x, this.vertexs[0].y);
      axes[1] = new _Vector2D2.default(this.vertexs[2].x, this.vertexs[2].y, this.vertexs[1].x, this.vertexs[1].y);
      return axes;
    }
  }, {
    key: 'moveVertexs',
    value: function moveVertexs(vector) {
      this.vertexs[0].x += vector.x;
      this.vertexs[0].y += vector.y;
      this.vertexs[1].x += vector.x;
      this.vertexs[1].y += vector.y;
      this.vertexs[2].x += vector.x;
      this.vertexs[2].y += vector.y;
      this.vertexs[3].x += vector.x;
      this.vertexs[3].y += vector.y;
    }
  }, {
    key: 'projection',
    value: function projection(proyectionVector) {
      var min = this.vertexs[0].projection(proyectionVector);
      var max = min;
      for (var i = 1; i < this.vertexs.length; i++) {
        var p = this.vertexs[i].projection(proyectionVector);
        if (p < min) min = p;else if (p > max) max = p;
      }
      return new Projection(min, max);
    }
  }, {
    key: 'overlap',
    value: function overlap(hitbox) {
      for (var i = 0; i < this.axes.length; i++) {
        var axis = this.axes[i];
        var projection1 = this.projection(axis);
        var projection2 = hitbox.projection(axis);
        if (!projection1.overlap(projection2)) return false;
      }

      for (var i = 0; i < hitbox.axes.length; i++) {
        var axis = hitbox.axes[i];
        var projection1 = this.projection(axis);
        var projection2 = hitbox.projection(axis);
        if (!projection1.overlap(projection2)) return false;
      }

      return true;
    }
  }, {
    key: 'update',
    value: function update(position, rotation) {
      position = new _Vector2D2.default(position.x, position.y);
      if (rotation != this.rotation) {
        this.rotation = rotation;
        this.position = position;
        this.vertexs = this.getVertexs();
        this.axes = this.getAxes();
      } else if (!position.equals(this.position)) {
        this.moveVertexs(new _Vector2D2.default(position.x, position.y, this.position.x, this.position.y));
        this.position = position;
      }
    }
  }]);

  return HitBox;
})();

var Projection = (function () {
  function Projection(min, max) {
    _classCallCheck(this, Projection);

    this.min = min;
    this.max = max;
  }

  _createClass(Projection, [{
    key: 'overlap',
    value: function overlap(projection) {
      return this.max > projection.min && projection.max > this.min;
    }
  }]);

  return Projection;
})();

module.exports = HitBox;

},{"./Vector2D":8}],8:[function(require,module,exports){
"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esnext: true */

var Vector2D = (function () {
  function Vector2D(x, y) {
    var x2 = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
    var y2 = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

    _classCallCheck(this, Vector2D);

    this.x = x - x2;
    this.y = y - y2;
  }

  _createClass(Vector2D, [{
    key: "normal",
    value: function normal() {
      return new Vector2D(-this.y, this.x);
    }
  }, {
    key: "magnitude",
    value: function magnitude() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
  }, {
    key: "projection",
    value: function projection(proyectionVector) {
      var proyectionVectorMagnitude = proyectionVector.magnitude();
      return this.x * (proyectionVector.x / proyectionVectorMagnitude) + this.y * (proyectionVector.y / proyectionVectorMagnitude);
    }
  }, {
    key: "rotate",
    value: function rotate(angle) {
      var originPoint = arguments.length <= 1 || arguments[1] === undefined ? new Vector2D(0, 0) : arguments[1];

      var newX = (this.x - originPoint.x) * Math.cos(angle) - (this.y - originPoint.y) * Math.sin(angle) + originPoint.x;
      var newY = (this.x - originPoint.x) * Math.sin(angle) + (this.y - originPoint.y) * Math.cos(angle) + originPoint.y;
      return new Vector2D(newX, newY);
    }
  }, {
    key: "equals",
    value: function equals(vector) {
      if (this.x == vector.x && this.y == vector.y) return true;
      return false;
    }
  }]);

  return Vector2D;
})();

module.exports = Vector2D;

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXEFuaW1hdGlvbi5qcyIsInNyY1xcY29yZVxcRW50aXR5LmpzIiwic3JjXFxjb3JlXFxHYW1lLmpzIiwic3JjXFxjb3JlXFxTcHJpdGVzaGVldC5qcyIsInNyY1xcY29yZVxcU3RhZ2UuanMiLCJzcmNcXGluZGV4LmpzIiwic3JjXFx1dGlsc1xcSGl0Qm94LmpzIiwic3JjXFx1dGlsc1xcVmVjdG9yMkQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztJQ0VNLFNBQVM7WUFBVCxTQUFTOztBQUNiLFdBREksU0FBUyxDQUNELE1BQU0sRUFBRSxLQUFLLEVBQUM7MEJBRHRCLFNBQVM7O3VFQUFULFNBQVMsYUFFTCxNQUFNLENBQUMsQ0FBQyxDQUFDOztBQUNmLFVBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixVQUFLLEtBQUssR0FBRyxLQUFLLENBQUM7O0dBQ3BCOztlQUxHLFNBQVM7OzJCQU9QO0FBQ0osVUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDdEIsVUFBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixFQUFFO0FBQ2xFLFlBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMzQixZQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDbEMsTUFBSTtBQUNILFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUM1QixZQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7T0FDL0I7S0FDRjs7OzZCQUVPO0FBQ04sVUFBSSxDQUFDLFdBQVcsRUFB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Ozs7MkJBQ00sS0FBSyxFQUFrQztVQUFoQyxXQUFXLHlEQUFHLElBQUksUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7O0FBQzNDLFVBQUksSUFBSSxHQUFHLEFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUEsR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFBLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQUFBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDbkgsVUFBSSxJQUFJLEdBQUcsQUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQSxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUEsR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxBQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNuSCxhQUFPLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqQzs7OzJCQUNNLE1BQU0sRUFBQztBQUNaLFVBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQztBQUN6RCxhQUFPLEtBQUssQ0FBQztLQUNkOzs7U0F2QkcsUUFBUTs7O0FBMEJkLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuY2xhc3MgQW5pbWF0aW9uIGV4dGVuZHMgUElYSS5TcHJpdGV7XHJcbiAgY29uc3RydWN0b3IoZnJhbWVzLCB0aWNrcyl7XHJcbiAgICBzdXBlcihmcmFtZXNbMF0pO1xyXG4gICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XHJcbiAgICB0aGlzLnRpY2tzID0gdGlja3M7XHJcbiAgfVxyXG5cclxuICBpbml0KCl7XHJcbiAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XHJcbiAgICBpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcy50aWNrcykgPT09ICdbb2JqZWN0IEFycmF5XScgKXtcclxuICAgICAgdGhpcy5jdXJyZW50VGljayA9IDA7XHJcbiAgICAgIHRoaXMubmV4dCA9IHRoaXMuYXJyYXlOZXh0O1xyXG4gICAgICB0aGlzLnRpY2tDb3VudGVyID0gdGhpcy50aWNrc1swXTtcclxuICAgIH1lbHNle1xyXG4gICAgICB0aGlzLm5leHQgPSB0aGlzLm51bWJlck5leHQ7XHJcbiAgICAgIHRoaXMudGlja0NvdW50ZXIgPSB0aGlzLnRpY2tzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCl7XHJcbiAgICB0aGlzLnRpY2tDb3VudGVyLS07XHJcbiAgICBpZih0aGlzLnRpY2tDb3VudGVyID09PSAwKSB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGFycmF5TmV4dCgpe1xyXG4gICAgdGhpcy5jdXJyZW50RnJhbWUrKztcclxuICAgIHRoaXMuY3VycmVudFRpY2srKztcclxuICAgIGlmKHRoaXMuY3VycmVudEZyYW1lID49IHRoaXMuZnJhbWVzLmxlbmd0aCl7XHJcbiAgICAgIHRoaXMuY3VycmVudEZyYW1lID0gMDtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuY3VycmVudFRpY2sgPj0gdGhpcy50aWNrcy5sZW5ndGgpIHRoaXMuY3VycmVudFRpY2sgPSAwO1xyXG4gICAgc3VwZXIudGV4dHVyZSA9IHRoaXMuZnJhbWVzW3RoaXMuY3VycmVudEZyYW1lXTtcclxuICAgIHRoaXMudGlja0NvdW50ZXIgPSB0aGlzLnRpY2tzW3RoaXMuY3VycmVudFRpY2tdO1xyXG4gIH1cclxuXHJcbiAgbnVtYmVyTmV4dCgpe1xyXG4gICAgdGhpcy5jdXJyZW50RnJhbWUrKztcclxuICAgIGlmKHRoaXMuY3VycmVudEZyYW1lID49IHRoaXMuZnJhbWVzLmxlbmd0aCl7XHJcbiAgICAgIHRoaXMuY3VycmVudEZyYW1lID0gMDtcclxuICAgIH1cclxuICAgIHN1cGVyLnRleHR1cmUgPSB0aGlzLmZyYW1lc1t0aGlzLmN1cnJlbnRGcmFtZV07XHJcbiAgICB0aGlzLnRpY2tDb3VudGVyID0gdGhpcy50aWNrcztcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQW5pbWF0aW9uO1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIEVudGl0eSBleHRlbmRzIFBJWEkuU3ByaXRle1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHN0YWdlLCAuLi5hcmdzKXtcclxuICAgIHN1cGVyKC4uLmFyZ3MpO1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gIH1cclxuICBzcGF3bih4LCB5KXtcclxuICAgIHRoaXMueD14O1xyXG4gICAgdGhpcy55PXk7XHJcbiAgICB0aGlzLnN0YWdlLmdyYXBoaWNzLmFkZENoaWxkKHRoaXMpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHk7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9TdGFnZSc7XHJcbmltcG9ydCBFbnRpdHkgZnJvbSAnLi9FbnRpdHknO1xyXG5cclxuY2xhc3MgR2FtZXtcclxuICBjb25zdHJ1Y3RvcihpZENvbnRhaW5lciwgd2lkdGgsIGhlaWdodCwgb3B0aW9ucyA9IHt9KXtcclxuXHJcbiAgICB0aGlzLmlkQ29udGFpbmVyID0gaWRDb250YWluZXI7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICB0aGlzLnN0YWdlcyA9IHt9O1xyXG4gICAgdGhpcy5lbnRpdGllcyA9IHt9O1xyXG5cclxuICAgIGlmKG9wdGlvbnMuZnBzKSB0aGlzLmZwcyA9IG9wdGlvbnMuZnBzO1xyXG4gICAgZWxzZSB0aGlzLmZwcyA9IC0xO1xyXG5cclxuICAgIGlmKG9wdGlvbnMudHBzKSB0aGlzLnRwcyA9IG9wdGlvbnMudHBzO1xyXG4gICAgZWxzZSB0aGlzLnRwcyA9IDYwO1xyXG5cclxuICAgIGlmKG9wdGlvbnMuaW5pdFN0YWdlKSAgdGhpcy5sb2FkU3RhZ2Uob3B0aW9ucy5pbml0U3RhZ2UpO1xyXG4gICAgZWxzZSB0aGlzLmN1cnJTdGFnZSA9IG5ldyBTdGFnZSgpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwge2JhY2tncm91bmRDb2xvciA6IDB4NmU2ZTZlfSk7XHJcblxyXG4gICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZnBzKSB7XHJcblxyXG4gICAgICBjYXNlIHRoaXMudHBzOlxyXG4gICAgICAgIHRoaXMuZnJhbWVJbnRlcnZhbCA9IDEwMDAvdGhpcy5mcHM7XHJcbiAgXHRcdFx0dGhpcy5sb29wID0gdGhpcy5zaW1wbGVMb29wO1xyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAwO1xyXG4gIFx0XHRcdGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAtMTpcclxuICAgICAgICB0aGlzLnRpY2tzSW50ZXJ2YWwgPSAxMDAwL3RoaXMudHBzO1xyXG4gICAgICAgIHRoaXMubGFnID0gMDtcclxuICBcdFx0XHR0aGlzLmxvb3AgPSB0aGlzLmZwc1VubGltaXRlZExvb3A7XHJcbiAgXHRcdCAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuZnJhbWVJbnRlcnZhbCA9IDEwMDAvdGhpcy5mcHM7XHJcbiAgICAgICAgdGhpcy50aWNrc0ludGVydmFsID0gMTAwMC90aGlzLnRwcztcclxuICAgICAgICB0aGlzLnRoZW5BdXggPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAwO1xyXG4gICAgICAgIHRoaXMubGFnID0gMDtcclxuICBcdFx0XHR0aGlzLmxvb3AgPSB0aGlzLmZwc0xvY2tlZExvb3A7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgXHR9XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZENvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci52aWV3KTtcclxuICB9XHJcblxyXG4gIHNpbXBsZUxvb3AoKXtcclxuICBcdHRoaXMuZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuICBcdGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gIFx0dGhpcy5kZWx0YSA9IG5vdyAtIHRoaXMudGhlbjtcclxuICBcdGlmICh0aGlzLmRlbHRhID4gdGhpcy5mcmFtZUludGVydmFsKSB7XHJcbiAgXHRcdHRoaXMudXBkYXRlKCk7XHJcbiAgXHRcdC8vdXBkYXRlSW5wdXRzKCk7XHJcbiAgXHRcdHRoaXMucmVuZGVyKCk7XHJcbiAgXHRcdHRoaXMudGhlbiA9IG5vdyAtICh0aGlzLmRlbHRhICUgdGhpcy5mcmFtZUludGVydmFsKTtcclxuICBcdH1cclxuICB9XHJcblxyXG4gIGZwc1VubGltaXRlZExvb3AoKXtcclxuICBcdHRoaXMuZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuICBcdGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gIFx0dGhpcy5sYWcgKz0gbm93IC0gdGhpcy50aGVuO1xyXG4gIFx0dGhpcy50aGVuID0gbm93O1xyXG4gIFx0d2hpbGUodGhpcy50aWNrc0ludGVydmFsIDwgdGhpcy5sYWcpe1xyXG4gIFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG4gIFx0XHQvL3VwZGF0ZUlucHV0cygpO1xyXG4gIFx0XHR0aGlzLmxhZyAtPSB0aGlzLnRpY2tzSW50ZXJ2YWw7XHJcbiAgXHR9XHJcbiAgXHR0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgZnBzTG9ja2VkTG9vcCgpe1xyXG4gIFx0dGhpcy5mcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG4gIFx0bGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgXHR0aGlzLmxhZyArPSBub3cgLSB0aGlzLnRoZW47XHJcbiAgXHR0aGlzLmRlbHRhID0gbm93IC0gdGhpcy50aGVuQXV4O1xyXG4gIFx0dGhpcy50aGVuID0gbm93O1xyXG4gIFx0d2hpbGUodGhpcy50aWNrc0ludGVydmFsIDwgdGhpcy5sYWcpe1xyXG4gIFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG4gIFx0XHQvL3VwZGF0ZUlucHV0cygpO1xyXG4gIFx0XHR0aGlzLmxhZyAtPSB0aGlzLnRpY2tzSW50ZXJ2YWw7XHJcbiAgXHR9XHJcbiAgXHRpZiAodGhpcy5kZWx0YSA+IHRoaXMuZnJhbWVJbnRlcnZhbCkge1xyXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xyXG4gIFx0XHR0aGlzLnRoZW5BdXggPSBub3cgLSAodGhpcy5kZWx0YSAlIHRoaXMuZnJhbWVJbnRlcnZhbCk7XHJcbiAgXHR9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKXtcclxuICAgIHRoaXMuY3VyclN0YWdlLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLmN1cnJTdGFnZS5ncmFwaGljcyk7XHJcbiAgfVxyXG5cclxuICBsb2FkU3RhZ2Uoc3RhZ2Upe1xyXG4gICAgdGhpcy5jdXJyU3RhZ2UgPSBzdGFnZTtcclxuICAgIHRoaXMuY3VyclN0YWdlLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCl7XHJcbiAgICB0aGlzLmxvb3AoKTtcclxuICB9XHJcblxyXG4gIHN0b3AoKXtcclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVN0YWdlKG5hbWUsIHByb3Ape1xyXG4gICAgdGhpcy5zdGFnZXNbbmFtZV0gPSBwcm9wO1xyXG4gIH1cclxuXHJcbiAgY3JlYXRlRW50aXR5KG5hbWUsIHByb3Ape1xyXG4gICAgdGhpcy5lbnRpdGllc1tuYW1lXSA9IHByb3A7XHJcbiAgfVxyXG5cclxuICBnZXRTdGFnZShuYW1lKXtcclxuICAgIGxldCBzdGFnZSA9IG5ldyBTdGFnZSh0aGlzKTtcclxuICAgIGxldCBwcm9wID0gdGhpcy5zdGFnZXNbbmFtZV07XHJcbiAgICBmb3IobGV0IGtleSBpbiBwcm9wKXtcclxuICAgICAgc3RhZ2Vba2V5XSA9IHByb3Bba2V5XTtcclxuICAgIH1cclxuICAgIHJldHVybiBzdGFnZTtcclxuICB9XHJcblxyXG4gIGxvYWRFbnRpdHkobmFtZSwgc3RhZ2UsIC4uLmFyZ3Mpe1xyXG4gICAgbGV0IGVudGl0eSA9IG5ldyBFbnRpdHkodGhpcywgc3RhZ2UsIC4uLmFyZ3MpO1xyXG4gICAgbGV0IHByb3AgPSB0aGlzLmVudGl0aWVzW25hbWVdO1xyXG4gICAgZm9yKGxldCBrZXkgaW4gcHJvcCl7XHJcbiAgICAgIGVudGl0eVtrZXldID0gcHJvcFtrZXldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGVudGl0eTtcclxuICB9XHJcblxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWU7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuY2xhc3MgU3ByaXRlc2hlZXR7XHJcbiAgY29uc3RydWN0b3IoaW1hZ2UsIHdpZHRoLCBoZWlnaHQsIHJvd3MsIGNvbHMpe1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMudGV4dHVyZSA9IG5ldyBQSVhJLlRleHR1cmUuZnJvbUltYWdlKGltYWdlKTtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy5yb3dzID0gcm93cztcclxuICAgIHRoaXMuY29scyA9IGNvbHM7XHJcbiAgICB0aGlzLnNwcml0ZVdpZHRoID0gdGhpcy53aWR0aC9jb2xzO1xyXG4gICAgdGhpcy5zcHJpdGVIZWlnaHQgPSB0aGlzLmhlaWdodC9yb3dzO1xyXG4gICAgdGhpcy5zcHJpdGVzID0gbmV3IEFycmF5KHRoaXMucm93cyk7XHJcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5yb3dzOyBpKyspe1xyXG4gICAgICB0aGlzLnNwcml0ZXNbaV0gPSBuZXcgQXJyYXkodGhpcy5jb2xzKTtcclxuICAgICAgZm9yKGxldCBqID0gMDsgaiA8IHRoaXMuY29sczsgaisrKXtcclxuICAgICAgICB0aGlzLnNwcml0ZXNbaV1bal0gPSBuZXcgUElYSS5UZXh0dXJlKHRoaXMudGV4dHVyZSwgbmV3IFBJWEkuUmVjdGFuZ2xlKGoqdGhpcy5zcHJpdGVXaWR0aCwgaSp0aGlzLnNwcml0ZUhlaWdodCwgdGhpcy5zcHJpdGVXaWR0aCwgdGhpcy5zcHJpdGVIZWlnaHQpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICBnZXRTcHJpdGUocm93LCBjb2wpe1xyXG4gICAgaWYocm93IDwgMCB8fCBjb2wgPCAwIHx8IHJvdyA+PSB0aGlzLnJvd3MgfHwgY29sID49IHRoaXMuY29scykgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRoaXMuc3ByaXRlc1tyb3ddW2NvbF07XHJcbiAgfVxyXG4gIGdldFJvdyhyb3cpe1xyXG4gICAgaWYocm93IDwgMCB8fCByb3cgPj0gdGhpcy5yb3dzKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdGhpcy5zcHJpdGVzW3Jvd107XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNwcml0ZXNoZWV0O1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIFN0YWdle1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUpe1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3RhZ2U7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuaW1wb3J0IEdhbWUgZnJvbSAnLi9jb3JlL0dhbWUnO1xyXG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9jb3JlL1N0YWdlJztcclxuaW1wb3J0IEVudGl0eSBmcm9tICcuL2NvcmUvRW50aXR5JztcclxuaW1wb3J0IFNwcml0ZXNoZWV0IGZyb20gJy4vY29yZS9TcHJpdGVzaGVldCc7XHJcbmltcG9ydCBBbmltYXRpb24gZnJvbSAnLi9jb3JlL0FuaW1hdGlvbic7XHJcbmltcG9ydCBWZWN0b3IyRCBmcm9tICcuL3V0aWxzL1ZlY3RvcjJEJztcclxuaW1wb3J0IEhpdEJveCBmcm9tICcuL3V0aWxzL0hpdEJveCc7XHJcblxyXG5nZ2YgPSB7fTtcclxuZ2dmLkdhbWUgPSBHYW1lO1xyXG5nZ2YuU3RhZ2UgPSBTdGFnZTtcclxuZ2dmLkVudGl0eSA9IEVudGl0eTtcclxuZ2dmLlNwcml0ZXNoZWV0ID0gU3ByaXRlc2hlZXQ7XHJcbmdnZi5BbmltYXRpb24gPSBBbmltYXRpb247XHJcbmdnZi5WZWN0b3IyRCA9IFZlY3RvcjJEO1xyXG5nZ2YuSGl0Qm94ID0gSGl0Qm94O1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuaW1wb3J0IFZlY3RvcjJEIGZyb20gJy4vVmVjdG9yMkQnO1xyXG5cclxuY2xhc3MgSGl0Qm94e1xyXG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uLCByb3RhdGlvbil7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yMkQocG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICB0aGlzLnZlcnRleHMgPSB0aGlzLmdldFZlcnRleHMoKTtcclxuICAgIHRoaXMuYXhlcyA9IHRoaXMuZ2V0QXhlcygpO1xyXG4gIH1cclxuICBnZXRWZXJ0ZXhzKCl7XHJcbiAgICBsZXQgdmVydGV4SW5pdGlhbDAgPSBuZXcgVmVjdG9yMkQodGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yLCB0aGlzLnBvc2l0aW9uLnkgLSB0aGlzLmhlaWdodC8yKTtcclxuICAgIGxldCB2ZXJ0ZXhJbml0aWFsMSA9IG5ldyBWZWN0b3IyRCh2ZXJ0ZXhJbml0aWFsMC54ICsgdGhpcy53aWR0aCwgdmVydGV4SW5pdGlhbDAueSk7XHJcbiAgICBsZXQgdmVydGV4SW5pdGlhbDIgPSBuZXcgVmVjdG9yMkQodmVydGV4SW5pdGlhbDAueCArIHRoaXMud2lkdGgsIHZlcnRleEluaXRpYWwwLnkgKyB0aGlzLmhlaWdodCk7XHJcbiAgICBsZXQgdmVydGV4SW5pdGlhbDMgPSBuZXcgVmVjdG9yMkQodmVydGV4SW5pdGlhbDAueCwgdmVydGV4SW5pdGlhbDAueSArIHRoaXMuaGVpZ2h0KTtcclxuICAgIGxldCB2ZXJ0ZXhzID0gbmV3IEFycmF5KDQpO1xyXG4gICAgdmVydGV4c1swXSA9IHZlcnRleEluaXRpYWwwLnJvdGF0ZSh0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIHZlcnRleHNbMV0gPSB2ZXJ0ZXhJbml0aWFsMS5yb3RhdGUodGhpcy5yb3RhdGlvbiwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICB2ZXJ0ZXhzWzJdID0gdmVydGV4SW5pdGlhbDIucm90YXRlKHRoaXMucm90YXRpb24sIHRoaXMucG9zaXRpb24pO1xyXG4gICAgdmVydGV4c1szXSA9IHZlcnRleEluaXRpYWwzLnJvdGF0ZSh0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIHJldHVybiB2ZXJ0ZXhzO1xyXG4gIH1cclxuICBnZXRBeGVzKCl7XHJcbiAgICBsZXQgYXhlcyA9IG5ldyBBcnJheSgyKTtcclxuICAgIGF4ZXNbMF0gPSBuZXcgVmVjdG9yMkQodGhpcy52ZXJ0ZXhzWzFdLngsIHRoaXMudmVydGV4c1sxXS55LCB0aGlzLnZlcnRleHNbMF0ueCwgdGhpcy52ZXJ0ZXhzWzBdLnkpO1xyXG4gICAgYXhlc1sxXSA9IG5ldyBWZWN0b3IyRCh0aGlzLnZlcnRleHNbMl0ueCwgdGhpcy52ZXJ0ZXhzWzJdLnksIHRoaXMudmVydGV4c1sxXS54LCB0aGlzLnZlcnRleHNbMV0ueSk7XHJcbiAgICByZXR1cm4gYXhlcztcclxuICB9XHJcbiAgbW92ZVZlcnRleHModmVjdG9yKXtcclxuICAgIHRoaXMudmVydGV4c1swXS54ICs9IHZlY3Rvci54O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzBdLnkgKz0gdmVjdG9yLnk7XHJcbiAgICB0aGlzLnZlcnRleHNbMV0ueCArPSB2ZWN0b3IueDtcclxuICAgIHRoaXMudmVydGV4c1sxXS55ICs9IHZlY3Rvci55O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzJdLnggKz0gdmVjdG9yLng7XHJcbiAgICB0aGlzLnZlcnRleHNbMl0ueSArPSB2ZWN0b3IueTtcclxuICAgIHRoaXMudmVydGV4c1szXS54ICs9IHZlY3Rvci54O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzNdLnkgKz0gdmVjdG9yLnk7XHJcbiAgfVxyXG4gIHByb2plY3Rpb24ocHJveWVjdGlvblZlY3Rvcil7XHJcbiAgICBsZXQgbWluID0gdGhpcy52ZXJ0ZXhzWzBdLnByb2plY3Rpb24ocHJveWVjdGlvblZlY3Rvcik7XHJcbiAgICBsZXQgbWF4ID0gbWluO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnZlcnRleHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IHAgPSB0aGlzLnZlcnRleHNbaV0ucHJvamVjdGlvbihwcm95ZWN0aW9uVmVjdG9yKTtcclxuICAgICAgaWYgKHAgPCBtaW4pIG1pbiA9IHA7XHJcbiAgICAgIGVsc2UgaWYgKHAgPiBtYXgpIG1heCA9IHA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFByb2plY3Rpb24obWluLCBtYXgpO1xyXG4gIH1cclxuICBvdmVybGFwKGhpdGJveCl7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgYXhpcyA9IHRoaXMuYXhlc1tpXTtcclxuICAgICAgbGV0IHByb2plY3Rpb24xID0gdGhpcy5wcm9qZWN0aW9uKGF4aXMpO1xyXG4gICAgICBsZXQgcHJvamVjdGlvbjIgPSBoaXRib3gucHJvamVjdGlvbihheGlzKTtcclxuICAgICAgaWYgKCFwcm9qZWN0aW9uMS5vdmVybGFwKHByb2plY3Rpb24yKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGl0Ym94LmF4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGF4aXMgPSBoaXRib3guYXhlc1tpXTtcclxuICAgICAgbGV0IHByb2plY3Rpb24xID0gdGhpcy5wcm9qZWN0aW9uKGF4aXMpO1xyXG4gICAgICBsZXQgcHJvamVjdGlvbjIgPSBoaXRib3gucHJvamVjdGlvbihheGlzKTtcclxuICAgICAgaWYgKCFwcm9qZWN0aW9uMS5vdmVybGFwKHByb2plY3Rpb24yKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICB1cGRhdGUocG9zaXRpb24sIHJvdGF0aW9uKXtcclxuICAgIHBvc2l0aW9uID0gbmV3IFZlY3RvcjJEKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xyXG4gICAgaWYocm90YXRpb24gIT0gdGhpcy5yb3RhdGlvbil7XHJcbiAgICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICB0aGlzLnZlcnRleHMgPSB0aGlzLmdldFZlcnRleHMoKTtcclxuICAgICAgdGhpcy5heGVzID0gdGhpcy5nZXRBeGVzKCk7XHJcbiAgICB9ZWxzZSBpZighcG9zaXRpb24uZXF1YWxzKHRoaXMucG9zaXRpb24pKXtcclxuICAgICAgdGhpcy5tb3ZlVmVydGV4cyhuZXcgVmVjdG9yMkQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpKTtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUHJvamVjdGlvbntcclxuICBjb25zdHJ1Y3RvcihtaW4sIG1heCl7XHJcbiAgICB0aGlzLm1pbiA9IG1pbjtcclxuICAgIHRoaXMubWF4ID0gbWF4O1xyXG4gIH1cclxuICBvdmVybGFwKHByb2plY3Rpb24pe1xyXG4gICAgcmV0dXJuIHRoaXMubWF4ID4gcHJvamVjdGlvbi5taW4gJiYgcHJvamVjdGlvbi5tYXggPiB0aGlzLm1pbjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGl0Qm94O1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIFZlY3RvcjJEe1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHgyID0gMCwgeTIgPSAwKXtcclxuICAgIHRoaXMueCA9IHggLSB4MjtcclxuICAgIHRoaXMueSA9IHkgLSB5MjtcclxuICB9XHJcbiAgbm9ybWFsKCl7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKC10aGlzLnksIHRoaXMueCk7XHJcbiAgfVxyXG4gIG1hZ25pdHVkZSgpe1xyXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLngsIDIpICsgTWF0aC5wb3codGhpcy55LCAyKSk7XHJcbiAgfVxyXG4gIHByb2plY3Rpb24ocHJveWVjdGlvblZlY3Rvcil7XHJcbiAgICBsZXQgcHJveWVjdGlvblZlY3Rvck1hZ25pdHVkZSA9IHByb3llY3Rpb25WZWN0b3IubWFnbml0dWRlKCk7XHJcbiAgICByZXR1cm4gKHRoaXMueCAqIChwcm95ZWN0aW9uVmVjdG9yLngvcHJveWVjdGlvblZlY3Rvck1hZ25pdHVkZSkpICsgKHRoaXMueSAqIChwcm95ZWN0aW9uVmVjdG9yLnkvcHJveWVjdGlvblZlY3Rvck1hZ25pdHVkZSkpO1xyXG4gIH1cclxuICByb3RhdGUoYW5nbGUsIG9yaWdpblBvaW50ID0gbmV3IFZlY3RvcjJEKDAsMCkpe1xyXG4gICAgbGV0IG5ld1ggPSAoKHRoaXMueCAtIG9yaWdpblBvaW50LngpKk1hdGguY29zKGFuZ2xlKSkgLSAoKHRoaXMueSAtIG9yaWdpblBvaW50LnkpKk1hdGguc2luKGFuZ2xlKSkgKyBvcmlnaW5Qb2ludC54O1xyXG4gICAgbGV0IG5ld1kgPSAoKHRoaXMueCAtIG9yaWdpblBvaW50LngpKk1hdGguc2luKGFuZ2xlKSkgKyAoKHRoaXMueSAtIG9yaWdpblBvaW50LnkpKk1hdGguY29zKGFuZ2xlKSkgKyBvcmlnaW5Qb2ludC55O1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRChuZXdYLCBuZXdZKTtcclxuICB9XHJcbiAgZXF1YWxzKHZlY3Rvcil7XHJcbiAgICBpZih0aGlzLnggPT0gdmVjdG9yLnggJiYgdGhpcy55ID09IHZlY3Rvci55KSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yMkQ7XHJcbiJdfQ==
