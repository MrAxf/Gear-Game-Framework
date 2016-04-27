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

    this.resources = new Map();
    this.resources.set('Stage', new Map());
    this.resources.set('Entity', new Map());

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
    key: 'createResource',
    value: function createResource(type, resourceName, resource) {
      this.resources.get(type).set(resourceName, resource);
    }
  }, {
    key: 'getResource',
    value: function getResource(type, name) {
      var resource = undefined;
      switch (type) {
        case 'Stage':
          resource = new _Stage2.default(this);
          break;

        case 'Entity':
          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          resource = new (Function.prototype.bind.apply(_Entity2.default, [null].concat([this], args)))();
          break;

        default:
          return false;

      }
      var prop = this.resources.get(type).get(name);
      for (var key in prop) {
        resource[key] = prop[key];
      }
      return resource;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXEFuaW1hdGlvbi5qcyIsInNyY1xcY29yZVxcRW50aXR5LmpzIiwic3JjXFxjb3JlXFxHYW1lLmpzIiwic3JjXFxjb3JlXFxTcHJpdGVzaGVldC5qcyIsInNyY1xcY29yZVxcU3RhZ2UuanMiLCJzcmNcXGluZGV4LmpzIiwic3JjXFx1dGlsc1xcSGl0Qm94LmpzIiwic3JjXFx1dGlsc1xcVmVjdG9yMkQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztJQ0VNLFNBQVM7WUFBVCxTQUFTOztBQUNiLFdBREksU0FBUyxDQUNELE1BQU0sRUFBRSxLQUFLLEVBQUM7MEJBRHRCLFNBQVM7O3VFQUFULFNBQVMsYUFFTCxNQUFNLENBQUMsQ0FBQyxDQUFDOztBQUNmLFVBQUssTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixVQUFLLEtBQUssR0FBRyxLQUFLLENBQUM7O0dBQ3BCOztlQUxHLFNBQVM7OzJCQU9QO0FBQ0osVUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7QUFDdEIsVUFBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLGdCQUFnQixFQUFFO0FBQ2xFLFlBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMzQixZQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7T0FDbEMsTUFBSTtBQUNILFlBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUM1QixZQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7T0FDL0I7S0FDRjs7OzZCQUVPO0FBQ04sVUFBSSxDQUFDLFdBQVcsRUFB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LENBQUMsR0FBQyx5QkFBeUIsQ0FBQSxBQUFDLEFBQUMsQ0FBQztLQUM5SDs7OzJCQUNNLEtBQUssRUFBa0M7VUFBaEMsV0FBVyx5REFBRyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDOztBQUMzQyxVQUFJLElBQUksR0FBRyxBQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFBLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQSxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEFBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQ25ILFVBQUksSUFBSSxHQUFHLEFBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUEsR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFBLEdBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQUFBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDbkgsYUFBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FDakM7OzsyQkFDTSxNQUFNLEVBQUM7QUFDWixVQUFHLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDekQsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1NBdkJHLFFBQVE7OztBQTBCZCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIEFuaW1hdGlvbiBleHRlbmRzIFBJWEkuU3ByaXRle1xyXG4gIGNvbnN0cnVjdG9yKGZyYW1lcywgdGlja3Mpe1xyXG4gICAgc3VwZXIoZnJhbWVzWzBdKTtcclxuICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xyXG4gICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpe1xyXG4gICAgdGhpcy5jdXJyZW50RnJhbWUgPSAwO1xyXG4gICAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMudGlja3MpID09PSAnW29iamVjdCBBcnJheV0nICl7XHJcbiAgICAgIHRoaXMuY3VycmVudFRpY2sgPSAwO1xyXG4gICAgICB0aGlzLm5leHQgPSB0aGlzLmFycmF5TmV4dDtcclxuICAgICAgdGhpcy50aWNrQ291bnRlciA9IHRoaXMudGlja3NbMF07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGhpcy5uZXh0ID0gdGhpcy5udW1iZXJOZXh0O1xyXG4gICAgICB0aGlzLnRpY2tDb3VudGVyID0gdGhpcy50aWNrcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpe1xyXG4gICAgdGhpcy50aWNrQ291bnRlci0tO1xyXG4gICAgaWYodGhpcy50aWNrQ291bnRlciA9PT0gMCkgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBhcnJheU5leHQoKXtcclxuICAgIHRoaXMuY3VycmVudEZyYW1lKys7XHJcbiAgICB0aGlzLmN1cnJlbnRUaWNrKys7XHJcbiAgICBpZih0aGlzLmN1cnJlbnRGcmFtZSA+PSB0aGlzLmZyYW1lcy5sZW5ndGgpe1xyXG4gICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmN1cnJlbnRUaWNrID49IHRoaXMudGlja3MubGVuZ3RoKSB0aGlzLmN1cnJlbnRUaWNrID0gMDtcclxuICAgIHN1cGVyLnRleHR1cmUgPSB0aGlzLmZyYW1lc1t0aGlzLmN1cnJlbnRGcmFtZV07XHJcbiAgICB0aGlzLnRpY2tDb3VudGVyID0gdGhpcy50aWNrc1t0aGlzLmN1cnJlbnRUaWNrXTtcclxuICB9XHJcblxyXG4gIG51bWJlck5leHQoKXtcclxuICAgIHRoaXMuY3VycmVudEZyYW1lKys7XHJcbiAgICBpZih0aGlzLmN1cnJlbnRGcmFtZSA+PSB0aGlzLmZyYW1lcy5sZW5ndGgpe1xyXG4gICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XHJcbiAgICB9XHJcbiAgICBzdXBlci50ZXh0dXJlID0gdGhpcy5mcmFtZXNbdGhpcy5jdXJyZW50RnJhbWVdO1xyXG4gICAgdGhpcy50aWNrQ291bnRlciA9IHRoaXMudGlja3M7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFuaW1hdGlvbjtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5jbGFzcyBFbnRpdHkgZXh0ZW5kcyBQSVhJLlNwcml0ZXtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCBzdGFnZSwgLi4uYXJncyl7XHJcbiAgICBzdXBlciguLi5hcmdzKTtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XHJcbiAgICB0aGlzLmdyYXBoaWNzID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICB9XHJcbiAgc3Bhd24oeCwgeSl7XHJcbiAgICB0aGlzLng9eDtcclxuICAgIHRoaXMueT15O1xyXG4gICAgdGhpcy5zdGFnZS5ncmFwaGljcy5hZGRDaGlsZCh0aGlzKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW50aXR5O1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuaW1wb3J0IFN0YWdlIGZyb20gJy4vU3RhZ2UnO1xyXG5pbXBvcnQgRW50aXR5IGZyb20gJy4vRW50aXR5JztcclxuXHJcbmNsYXNzIEdhbWV7XHJcbiAgY29uc3RydWN0b3IoaWRDb250YWluZXIsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgdGhpcy5pZENvbnRhaW5lciA9IGlkQ29udGFpbmVyO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5yZXNvdXJjZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB0aGlzLnJlc291cmNlcy5zZXQoJ1N0YWdlJywgbmV3IE1hcCgpKTtcclxuICAgIHRoaXMucmVzb3VyY2VzLnNldCgnRW50aXR5JywgbmV3IE1hcCgpKTtcclxuXHJcbiAgICBpZihvcHRpb25zLmZwcykgdGhpcy5mcHMgPSBvcHRpb25zLmZwcztcclxuICAgIGVsc2UgdGhpcy5mcHMgPSAtMTtcclxuXHJcbiAgICBpZihvcHRpb25zLnRwcykgdGhpcy50cHMgPSBvcHRpb25zLnRwcztcclxuICAgIGVsc2UgdGhpcy50cHMgPSA2MDtcclxuXHJcbiAgICBpZihvcHRpb25zLmluaXRTdGFnZSkgIHRoaXMubG9hZFN0YWdlKG9wdGlvbnMuaW5pdFN0YWdlKTtcclxuICAgIGVsc2UgdGhpcy5jdXJyU3RhZ2UgPSBuZXcgU3RhZ2UoKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHtiYWNrZ3JvdW5kQ29sb3IgOiAweDZlNmU2ZX0pO1xyXG5cclxuICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmZwcykge1xyXG5cclxuICAgICAgY2FzZSB0aGlzLnRwczpcclxuICAgICAgICB0aGlzLmZyYW1lSW50ZXJ2YWwgPSAxMDAwL3RoaXMuZnBzO1xyXG4gIFx0XHRcdHRoaXMubG9vcCA9IHRoaXMuc2ltcGxlTG9vcDtcclxuICAgICAgICB0aGlzLmRlbHRhID0gMDtcclxuICBcdFx0XHRicmVhaztcclxuXHJcbiAgICAgIGNhc2UgLTE6XHJcbiAgICAgICAgdGhpcy50aWNrc0ludGVydmFsID0gMTAwMC90aGlzLnRwcztcclxuICAgICAgICB0aGlzLmxhZyA9IDA7XHJcbiAgXHRcdFx0dGhpcy5sb29wID0gdGhpcy5mcHNVbmxpbWl0ZWRMb29wO1xyXG4gIFx0XHQgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLmZyYW1lSW50ZXJ2YWwgPSAxMDAwL3RoaXMuZnBzO1xyXG4gICAgICAgIHRoaXMudGlja3NJbnRlcnZhbCA9IDEwMDAvdGhpcy50cHM7XHJcbiAgICAgICAgdGhpcy50aGVuQXV4ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmRlbHRhID0gMDtcclxuICAgICAgICB0aGlzLmxhZyA9IDA7XHJcbiAgXHRcdFx0dGhpcy5sb29wID0gdGhpcy5mcHNMb2NrZWRMb29wO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gIFx0fVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWRDb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIudmlldyk7XHJcbiAgfVxyXG5cclxuICBzaW1wbGVMb29wKCl7XHJcbiAgXHR0aGlzLmZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgXHRsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICBcdHRoaXMuZGVsdGEgPSBub3cgLSB0aGlzLnRoZW47XHJcbiAgXHRpZiAodGhpcy5kZWx0YSA+IHRoaXMuZnJhbWVJbnRlcnZhbCkge1xyXG4gIFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG4gIFx0XHQvL3VwZGF0ZUlucHV0cygpO1xyXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xyXG4gIFx0XHR0aGlzLnRoZW4gPSBub3cgLSAodGhpcy5kZWx0YSAlIHRoaXMuZnJhbWVJbnRlcnZhbCk7XHJcbiAgXHR9XHJcbiAgfVxyXG5cclxuICBmcHNVbmxpbWl0ZWRMb29wKCl7XHJcbiAgXHR0aGlzLmZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgXHRsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICBcdHRoaXMubGFnICs9IG5vdyAtIHRoaXMudGhlbjtcclxuICBcdHRoaXMudGhlbiA9IG5vdztcclxuICBcdHdoaWxlKHRoaXMudGlja3NJbnRlcnZhbCA8IHRoaXMubGFnKXtcclxuICBcdFx0dGhpcy51cGRhdGUoKTtcclxuICBcdFx0Ly91cGRhdGVJbnB1dHMoKTtcclxuICBcdFx0dGhpcy5sYWcgLT0gdGhpcy50aWNrc0ludGVydmFsO1xyXG4gIFx0fVxyXG4gIFx0dGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGZwc0xvY2tlZExvb3AoKXtcclxuICBcdHRoaXMuZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuICBcdGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gIFx0dGhpcy5sYWcgKz0gbm93IC0gdGhpcy50aGVuO1xyXG4gIFx0dGhpcy5kZWx0YSA9IG5vdyAtIHRoaXMudGhlbkF1eDtcclxuICBcdHRoaXMudGhlbiA9IG5vdztcclxuICBcdHdoaWxlKHRoaXMudGlja3NJbnRlcnZhbCA8IHRoaXMubGFnKXtcclxuICBcdFx0dGhpcy51cGRhdGUoKTtcclxuICBcdFx0Ly91cGRhdGVJbnB1dHMoKTtcclxuICBcdFx0dGhpcy5sYWcgLT0gdGhpcy50aWNrc0ludGVydmFsO1xyXG4gIFx0fVxyXG4gIFx0aWYgKHRoaXMuZGVsdGEgPiB0aGlzLmZyYW1lSW50ZXJ2YWwpIHtcclxuICBcdFx0dGhpcy5yZW5kZXIoKTtcclxuICBcdFx0dGhpcy50aGVuQXV4ID0gbm93IC0gKHRoaXMuZGVsdGEgJSB0aGlzLmZyYW1lSW50ZXJ2YWwpO1xyXG4gIFx0fVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCl7XHJcbiAgICB0aGlzLmN1cnJTdGFnZS51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5jdXJyU3RhZ2UuZ3JhcGhpY3MpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFN0YWdlKHN0YWdlKXtcclxuICAgIHRoaXMuY3VyclN0YWdlID0gc3RhZ2U7XHJcbiAgICB0aGlzLmN1cnJTdGFnZS5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5sb29wKCk7XHJcbiAgfVxyXG5cclxuICBzdG9wKCl7XHJcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVSZXNvdXJjZSh0eXBlLCByZXNvdXJjZU5hbWUsIHJlc291cmNlKXtcclxuICAgIHRoaXMucmVzb3VyY2VzLmdldCh0eXBlKS5zZXQocmVzb3VyY2VOYW1lLCByZXNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvdXJjZSh0eXBlLCBuYW1lLCAuLi5hcmdzKXtcclxuICAgIGxldCByZXNvdXJjZTtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdTdGFnZSc6XHJcbiAgICAgICAgcmVzb3VyY2UgPSBuZXcgU3RhZ2UodGhpcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdFbnRpdHknOlxyXG4gICAgICAgIHJlc291cmNlID0gbmV3IEVudGl0eSh0aGlzLCAuLi5hcmdzKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIH1cclxuICAgIGxldCBwcm9wID0gdGhpcy5yZXNvdXJjZXMuZ2V0KHR5cGUpLmdldChuYW1lKTtcclxuICAgIGZvcihsZXQga2V5IGluIHByb3Ape1xyXG4gICAgICByZXNvdXJjZVtrZXldID0gcHJvcFtrZXldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc291cmNlO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5jbGFzcyBTcHJpdGVzaGVldHtcclxuICBjb25zdHJ1Y3RvcihpbWFnZSwgd2lkdGgsIGhlaWdodCwgcm93cywgY29scyl7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy50ZXh0dXJlID0gbmV3IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UoaW1hZ2UpO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnJvd3MgPSByb3dzO1xyXG4gICAgdGhpcy5jb2xzID0gY29scztcclxuICAgIHRoaXMuc3ByaXRlV2lkdGggPSB0aGlzLndpZHRoL2NvbHM7XHJcbiAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHRoaXMuaGVpZ2h0L3Jvd3M7XHJcbiAgICB0aGlzLnNwcml0ZXMgPSBuZXcgQXJyYXkodGhpcy5yb3dzKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKyl7XHJcbiAgICAgIHRoaXMuc3ByaXRlc1tpXSA9IG5ldyBBcnJheSh0aGlzLmNvbHMpO1xyXG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5jb2xzOyBqKyspe1xyXG4gICAgICAgIHRoaXMuc3ByaXRlc1tpXVtqXSA9IG5ldyBQSVhJLlRleHR1cmUodGhpcy50ZXh0dXJlLCBuZXcgUElYSS5SZWN0YW5nbGUoaip0aGlzLnNwcml0ZVdpZHRoLCBpKnRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFNwcml0ZShyb3csIGNvbCl7XHJcbiAgICBpZihyb3cgPCAwIHx8IGNvbCA8IDAgfHwgcm93ID49IHRoaXMucm93cyB8fCBjb2wgPj0gdGhpcy5jb2xzKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdGhpcy5zcHJpdGVzW3Jvd11bY29sXTtcclxuICB9XHJcbiAgZ2V0Um93KHJvdyl7XHJcbiAgICBpZihyb3cgPCAwIHx8IHJvdyA+PSB0aGlzLnJvd3MpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0aGlzLnNwcml0ZXNbcm93XTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlc2hlZXQ7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuY2xhc3MgU3RhZ2V7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSl7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdGFnZTtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5pbXBvcnQgR2FtZSBmcm9tICcuL2NvcmUvR2FtZSc7XHJcbmltcG9ydCBTdGFnZSBmcm9tICcuL2NvcmUvU3RhZ2UnO1xyXG5pbXBvcnQgRW50aXR5IGZyb20gJy4vY29yZS9FbnRpdHknO1xyXG5pbXBvcnQgU3ByaXRlc2hlZXQgZnJvbSAnLi9jb3JlL1Nwcml0ZXNoZWV0JztcclxuaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuL2NvcmUvQW5pbWF0aW9uJztcclxuaW1wb3J0IFZlY3RvcjJEIGZyb20gJy4vdXRpbHMvVmVjdG9yMkQnO1xyXG5pbXBvcnQgSGl0Qm94IGZyb20gJy4vdXRpbHMvSGl0Qm94JztcclxuXHJcbmdnZiA9IHt9O1xyXG5nZ2YuR2FtZSA9IEdhbWU7XHJcbmdnZi5TdGFnZSA9IFN0YWdlO1xyXG5nZ2YuRW50aXR5ID0gRW50aXR5O1xyXG5nZ2YuU3ByaXRlc2hlZXQgPSBTcHJpdGVzaGVldDtcclxuZ2dmLkFuaW1hdGlvbiA9IEFuaW1hdGlvbjtcclxuZ2dmLlZlY3RvcjJEID0gVmVjdG9yMkQ7XHJcbmdnZi5IaXRCb3ggPSBIaXRCb3g7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5pbXBvcnQgVmVjdG9yMkQgZnJvbSAnLi9WZWN0b3IyRCc7XHJcblxyXG5jbGFzcyBIaXRCb3h7XHJcbiAgY29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgcG9zaXRpb24sIHJvdGF0aW9uKXtcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG4gICAgdGhpcy5wb3NpdGlvbiA9IG5ldyBWZWN0b3IyRChwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcclxuICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgIHRoaXMudmVydGV4cyA9IHRoaXMuZ2V0VmVydGV4cygpO1xyXG4gICAgdGhpcy5heGVzID0gdGhpcy5nZXRBeGVzKCk7XHJcbiAgfVxyXG4gIGdldFZlcnRleHMoKXtcclxuICAgIGxldCB2ZXJ0ZXhJbml0aWFsMCA9IG5ldyBWZWN0b3IyRCh0aGlzLnBvc2l0aW9uLnggLSB0aGlzLndpZHRoLzIsIHRoaXMucG9zaXRpb24ueSAtIHRoaXMuaGVpZ2h0LzIpO1xyXG4gICAgbGV0IHZlcnRleEluaXRpYWwxID0gbmV3IFZlY3RvcjJEKHZlcnRleEluaXRpYWwwLnggKyB0aGlzLndpZHRoLCB2ZXJ0ZXhJbml0aWFsMC55KTtcclxuICAgIGxldCB2ZXJ0ZXhJbml0aWFsMiA9IG5ldyBWZWN0b3IyRCh2ZXJ0ZXhJbml0aWFsMC54ICsgdGhpcy53aWR0aCwgdmVydGV4SW5pdGlhbDAueSArIHRoaXMuaGVpZ2h0KTtcclxuICAgIGxldCB2ZXJ0ZXhJbml0aWFsMyA9IG5ldyBWZWN0b3IyRCh2ZXJ0ZXhJbml0aWFsMC54LCB2ZXJ0ZXhJbml0aWFsMC55ICsgdGhpcy5oZWlnaHQpO1xyXG4gICAgbGV0IHZlcnRleHMgPSBuZXcgQXJyYXkoNCk7XHJcbiAgICB2ZXJ0ZXhzWzBdID0gdmVydGV4SW5pdGlhbDAucm90YXRlKHRoaXMucm90YXRpb24sIHRoaXMucG9zaXRpb24pO1xyXG4gICAgdmVydGV4c1sxXSA9IHZlcnRleEluaXRpYWwxLnJvdGF0ZSh0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIHZlcnRleHNbMl0gPSB2ZXJ0ZXhJbml0aWFsMi5yb3RhdGUodGhpcy5yb3RhdGlvbiwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICB2ZXJ0ZXhzWzNdID0gdmVydGV4SW5pdGlhbDMucm90YXRlKHRoaXMucm90YXRpb24sIHRoaXMucG9zaXRpb24pO1xyXG4gICAgcmV0dXJuIHZlcnRleHM7XHJcbiAgfVxyXG4gIGdldEF4ZXMoKXtcclxuICAgIGxldCBheGVzID0gbmV3IEFycmF5KDIpO1xyXG4gICAgYXhlc1swXSA9IG5ldyBWZWN0b3IyRCh0aGlzLnZlcnRleHNbMV0ueCwgdGhpcy52ZXJ0ZXhzWzFdLnksIHRoaXMudmVydGV4c1swXS54LCB0aGlzLnZlcnRleHNbMF0ueSk7XHJcbiAgICBheGVzWzFdID0gbmV3IFZlY3RvcjJEKHRoaXMudmVydGV4c1syXS54LCB0aGlzLnZlcnRleHNbMl0ueSwgdGhpcy52ZXJ0ZXhzWzFdLngsIHRoaXMudmVydGV4c1sxXS55KTtcclxuICAgIHJldHVybiBheGVzO1xyXG4gIH1cclxuICBtb3ZlVmVydGV4cyh2ZWN0b3Ipe1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzBdLnggKz0gdmVjdG9yLng7XHJcbiAgICB0aGlzLnZlcnRleHNbMF0ueSArPSB2ZWN0b3IueTtcclxuICAgIHRoaXMudmVydGV4c1sxXS54ICs9IHZlY3Rvci54O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzFdLnkgKz0gdmVjdG9yLnk7XHJcbiAgICB0aGlzLnZlcnRleHNbMl0ueCArPSB2ZWN0b3IueDtcclxuICAgIHRoaXMudmVydGV4c1syXS55ICs9IHZlY3Rvci55O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzNdLnggKz0gdmVjdG9yLng7XHJcbiAgICB0aGlzLnZlcnRleHNbM10ueSArPSB2ZWN0b3IueTtcclxuICB9XHJcbiAgcHJvamVjdGlvbihwcm95ZWN0aW9uVmVjdG9yKXtcclxuICAgIGxldCBtaW4gPSB0aGlzLnZlcnRleHNbMF0ucHJvamVjdGlvbihwcm95ZWN0aW9uVmVjdG9yKTtcclxuICAgIGxldCBtYXggPSBtaW47XHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMudmVydGV4cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgcCA9IHRoaXMudmVydGV4c1tpXS5wcm9qZWN0aW9uKHByb3llY3Rpb25WZWN0b3IpO1xyXG4gICAgICBpZiAocCA8IG1pbikgbWluID0gcDtcclxuICAgICAgZWxzZSBpZiAocCA+IG1heCkgbWF4ID0gcDtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUHJvamVjdGlvbihtaW4sIG1heCk7XHJcbiAgfVxyXG4gIG92ZXJsYXAoaGl0Ym94KXtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5heGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBheGlzID0gdGhpcy5heGVzW2ldO1xyXG4gICAgICBsZXQgcHJvamVjdGlvbjEgPSB0aGlzLnByb2plY3Rpb24oYXhpcyk7XHJcbiAgICAgIGxldCBwcm9qZWN0aW9uMiA9IGhpdGJveC5wcm9qZWN0aW9uKGF4aXMpO1xyXG4gICAgICBpZiAoIXByb2plY3Rpb24xLm92ZXJsYXAocHJvamVjdGlvbjIpKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoaXRib3guYXhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgYXhpcyA9IGhpdGJveC5heGVzW2ldO1xyXG4gICAgICBsZXQgcHJvamVjdGlvbjEgPSB0aGlzLnByb2plY3Rpb24oYXhpcyk7XHJcbiAgICAgIGxldCBwcm9qZWN0aW9uMiA9IGhpdGJveC5wcm9qZWN0aW9uKGF4aXMpO1xyXG4gICAgICBpZiAoIXByb2plY3Rpb24xLm92ZXJsYXAocHJvamVjdGlvbjIpKSByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG4gIHVwZGF0ZShwb3NpdGlvbiwgcm90YXRpb24pe1xyXG4gICAgcG9zaXRpb24gPSBuZXcgVmVjdG9yMkQocG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XHJcbiAgICBpZihyb3RhdGlvbiAhPSB0aGlzLnJvdGF0aW9uKXtcclxuICAgICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICAgIHRoaXMudmVydGV4cyA9IHRoaXMuZ2V0VmVydGV4cygpO1xyXG4gICAgICB0aGlzLmF4ZXMgPSB0aGlzLmdldEF4ZXMoKTtcclxuICAgIH1lbHNlIGlmKCFwb3NpdGlvbi5lcXVhbHModGhpcy5wb3NpdGlvbikpe1xyXG4gICAgICB0aGlzLm1vdmVWZXJ0ZXhzKG5ldyBWZWN0b3IyRChwb3NpdGlvbi54LCBwb3NpdGlvbi55LCB0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSkpO1xyXG4gICAgICB0aGlzLnBvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBQcm9qZWN0aW9ue1xyXG4gIGNvbnN0cnVjdG9yKG1pbiwgbWF4KXtcclxuICAgIHRoaXMubWluID0gbWluO1xyXG4gICAgdGhpcy5tYXggPSBtYXg7XHJcbiAgfVxyXG4gIG92ZXJsYXAocHJvamVjdGlvbil7XHJcbiAgICByZXR1cm4gdGhpcy5tYXggPiBwcm9qZWN0aW9uLm1pbiAmJiBwcm9qZWN0aW9uLm1heCA+IHRoaXMubWluO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBIaXRCb3g7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuY2xhc3MgVmVjdG9yMkR7XHJcbiAgY29uc3RydWN0b3IoeCwgeSwgeDIgPSAwLCB5MiA9IDApe1xyXG4gICAgdGhpcy54ID0geCAtIHgyO1xyXG4gICAgdGhpcy55ID0geSAtIHkyO1xyXG4gIH1cclxuICBub3JtYWwoKXtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMkQoLXRoaXMueSwgdGhpcy54KTtcclxuICB9XHJcbiAgbWFnbml0dWRlKCl7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHRoaXMueCwgMikgKyBNYXRoLnBvdyh0aGlzLnksIDIpKTtcclxuICB9XHJcbiAgcHJvamVjdGlvbihwcm95ZWN0aW9uVmVjdG9yKXtcclxuICAgIGxldCBwcm95ZWN0aW9uVmVjdG9yTWFnbml0dWRlID0gcHJveWVjdGlvblZlY3Rvci5tYWduaXR1ZGUoKTtcclxuICAgIHJldHVybiAodGhpcy54ICogKHByb3llY3Rpb25WZWN0b3IueC9wcm95ZWN0aW9uVmVjdG9yTWFnbml0dWRlKSkgKyAodGhpcy55ICogKHByb3llY3Rpb25WZWN0b3IueS9wcm95ZWN0aW9uVmVjdG9yTWFnbml0dWRlKSk7XHJcbiAgfVxyXG4gIHJvdGF0ZShhbmdsZSwgb3JpZ2luUG9pbnQgPSBuZXcgVmVjdG9yMkQoMCwwKSl7XHJcbiAgICBsZXQgbmV3WCA9ICgodGhpcy54IC0gb3JpZ2luUG9pbnQueCkqTWF0aC5jb3MoYW5nbGUpKSAtICgodGhpcy55IC0gb3JpZ2luUG9pbnQueSkqTWF0aC5zaW4oYW5nbGUpKSArIG9yaWdpblBvaW50Lng7XHJcbiAgICBsZXQgbmV3WSA9ICgodGhpcy54IC0gb3JpZ2luUG9pbnQueCkqTWF0aC5zaW4oYW5nbGUpKSArICgodGhpcy55IC0gb3JpZ2luUG9pbnQueSkqTWF0aC5jb3MoYW5nbGUpKSArIG9yaWdpblBvaW50Lnk7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKG5ld1gsIG5ld1kpO1xyXG4gIH1cclxuICBlcXVhbHModmVjdG9yKXtcclxuICAgIGlmKHRoaXMueCA9PSB2ZWN0b3IueCAmJiB0aGlzLnkgPT0gdmVjdG9yLnkpIHJldHVybiB0cnVlO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBWZWN0b3IyRDtcclxuIl19
