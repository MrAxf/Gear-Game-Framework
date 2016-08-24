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
    return _this;
  }

  _createClass(Entity, [{
    key: "spawn",
    value: function spawn(x, y) {
      this.x = x;
      this.y = y;
      this.stage.graphics.addChild(this);
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "setAnchor",
    value: function setAnchor(x, y) {
      this.anchor.x = x;
      this.anchor.y = y;
    }
  }]);

  return Entity;
})(PIXI.Sprite);

module.exports = Entity;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*jshint esnext: true */

var EntityGroup = (function (_PIXI$Sprite) {
  _inherits(EntityGroup, _PIXI$Sprite);

  function EntityGroup(game, stage) {
    var _Object$getPrototypeO;

    _classCallCheck(this, EntityGroup);

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(EntityGroup)).call.apply(_Object$getPrototypeO, [this].concat(args)));

    _this.game = game;
    _this.stage = stage;
    _this.x = 0;
    _this.y = 0;
    _this.entitySet = new Set();
    return _this;
  }

  _createClass(EntityGroup, [{
    key: 'update',
    value: function update() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.entitySet[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entity = _step.value;
          entity.update();
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'spawn',
    value: function spawn() {
      this.stage.graphics.addChild(this);
    }
  }, {
    key: 'addEntity',
    value: function addEntity(entity, x, y, rotation) {
      entity.containerGroup = this;
      entity.destroy = function () {
        this.containerGroup.removeChild(this);
        this.containerGroup.delete(this);
      };
      entity.spawn = function (x, y, rotation) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.containerGroup.addChild(this);
      };
      entity.init();
      entity.spawn(x, y, rotation);
      return this.entitySet.add(entity);
    }
  }, {
    key: 'addFromResource',
    value: function addFromResource(resource, x, y, rotation) {
      var _game;

      for (var _len2 = arguments.length, args = Array(_len2 > 4 ? _len2 - 4 : 0), _key2 = 4; _key2 < _len2; _key2++) {
        args[_key2 - 4] = arguments[_key2];
      }

      var entity = (_game = this.game).getResource.apply(_game, ['Entity', resource].concat(args));
      entity.containerGroup = this;
      entity.destroy = function () {
        this.containerGroup.removeChild(this);
        this.containerGroup.delete(this);
      };
      entity.spawn = function (x, y, rotation) {
        this.x = x;
        this.y = y;
        this.rotation = rotation;
        this.containerGroup.addChild(this);
      };
      entity.init();
      entity.spawn(x, y, rotation);
      return this.entitySet.add(entity);
    }
  }, {
    key: 'delete',
    value: function _delete(entity) {
      return this.entitySet.delete(entity);
    }
  }, {
    key: 'has',
    value: function has(entity) {
      return this.entitySet.has(entity);
    }
  }]);

  return EntityGroup;
})(PIXI.Sprite);

module.exports = EntityGroup;

},{}],4:[function(require,module,exports){
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
      var prop = this.resources.get(type).get(name);
      switch (type) {
        case 'Stage':
          resource = new _Stage2.default(this);
          break;

        case 'Entity':
          for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
            args[_key - 2] = arguments[_key];
          }

          if (prop.initialTexture) resource = new (Function.prototype.bind.apply(_Entity2.default, [null].concat([this], args, [prop.initialTexture])))();else resource = new (Function.prototype.bind.apply(_Entity2.default, [null].concat([this], args)))();
          break;

        default:
          return false;

      }
      for (var key in prop) {
        resource[key] = prop[key];
      }
      return resource;
    }
  }]);

  return Game;
})();

module.exports = Game;

},{"./Entity":2,"./Stage":6}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esnext: true */

var Stage = function Stage(game) {
  _classCallCheck(this, Stage);

  this.game = game;
  this.graphics = new PIXI.Container();
};

module.exports = Stage;

},{}],7:[function(require,module,exports){
'use strict';

var _Game = require('./core/Game');

var _Game2 = _interopRequireDefault(_Game);

var _Stage = require('./core/Stage');

var _Stage2 = _interopRequireDefault(_Stage);

var _Entity = require('./core/Entity');

var _Entity2 = _interopRequireDefault(_Entity);

var _Animation = require('./core/Animation');

var _Animation2 = _interopRequireDefault(_Animation);

var _Spritesheet = require('./core/Spritesheet');

var _Spritesheet2 = _interopRequireDefault(_Spritesheet);

var _EntityGroup = require('./core/EntityGroup');

var _EntityGroup2 = _interopRequireDefault(_EntityGroup);

var _HitBox = require('./utils/HitBox');

var _HitBox2 = _interopRequireDefault(_HitBox);

var _Vector2D = require('./utils/Vector2D');

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*jshint esnext: true */

ggf = {};
ggf.Game = _Game2.default;
ggf.Stage = _Stage2.default;
ggf.Entity = _Entity2.default;
ggf.Animation = _Animation2.default;
ggf.Spritesheet = _Spritesheet2.default;
ggf.EntityGroup = _EntityGroup2.default;
ggf.HitBox = _HitBox2.default;
ggf.Vector2D = _Vector2D2.default;

},{"./core/Animation":1,"./core/Entity":2,"./core/EntityGroup":3,"./core/Game":4,"./core/Spritesheet":5,"./core/Stage":6,"./utils/HitBox":8,"./utils/Vector2D":9}],8:[function(require,module,exports){
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

},{"./Vector2D":9}],9:[function(require,module,exports){
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

},{}]},{},[7])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXEFuaW1hdGlvbi5qcyIsInNyY1xcY29yZVxcRW50aXR5LmpzIiwic3JjXFxjb3JlXFxFbnRpdHlHcm91cC5qcyIsInNyY1xcY29yZVxcR2FtZS5qcyIsInNyY1xcY29yZVxcU3ByaXRlc2hlZXQuanMiLCJzcmNcXGNvcmVcXFN0YWdlLmpzIiwic3JjXFxpbmRleC5qcyIsInNyY1xcdXRpbHNcXEhpdEJveC5qcyIsInNyY1xcdXRpbHNcXFZlY3RvcjJELmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNFTSxTQUFTO1lBQVQsU0FBUzs7QUFDYixXQURJLFNBQVMsQ0FDRCxNQUFNLEVBQUUsS0FBSyxFQUFDOzBCQUR0QixTQUFTOzt1RUFBVCxTQUFTLGFBRUwsTUFBTSxDQUFDLENBQUMsQ0FBQzs7QUFDZixVQUFLLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsVUFBSyxLQUFLLEdBQUcsS0FBSyxDQUFDOztHQUNwQjs7ZUFMRyxTQUFTOzsyQkFPUDtBQUNKLFVBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLFVBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtBQUNsRSxZQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNyQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDM0IsWUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2xDLE1BQUk7QUFDSCxZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDNUIsWUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO09BQy9CO0tBQ0Y7Ozs2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LENBQUMsQUFBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUM7QUFDbkgsVUFBSSxJQUFJLEdBQUcsQUFBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQSxHQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUEsR0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxBQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztBQUNuSCxhQUFPLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNqQzs7OzJCQUNNLE1BQU0sRUFBQztBQUNaLFVBQUcsSUFBSSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQztBQUN6RCxhQUFPLEtBQUssQ0FBQztLQUNkOzs7U0F2QkcsUUFBUTs7O0FBMEJkLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuY2xhc3MgQW5pbWF0aW9uIGV4dGVuZHMgUElYSS5TcHJpdGV7XHJcbiAgY29uc3RydWN0b3IoZnJhbWVzLCB0aWNrcyl7XHJcbiAgICBzdXBlcihmcmFtZXNbMF0pO1xyXG4gICAgdGhpcy5mcmFtZXMgPSBmcmFtZXM7XHJcbiAgICB0aGlzLnRpY2tzID0gdGlja3M7XHJcbiAgfVxyXG5cclxuICBpbml0KCl7XHJcbiAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XHJcbiAgICBpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodGhpcy50aWNrcykgPT09ICdbb2JqZWN0IEFycmF5XScgKXtcclxuICAgICAgdGhpcy5jdXJyZW50VGljayA9IDA7XHJcbiAgICAgIHRoaXMubmV4dCA9IHRoaXMuYXJyYXlOZXh0O1xyXG4gICAgICB0aGlzLnRpY2tDb3VudGVyID0gdGhpcy50aWNrc1swXTtcclxuICAgIH1lbHNle1xyXG4gICAgICB0aGlzLm5leHQgPSB0aGlzLm51bWJlck5leHQ7XHJcbiAgICAgIHRoaXMudGlja0NvdW50ZXIgPSB0aGlzLnRpY2tzO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCl7XHJcbiAgICB0aGlzLnRpY2tDb3VudGVyLS07XHJcbiAgICBpZih0aGlzLnRpY2tDb3VudGVyID09PSAwKSB0aGlzLm5leHQoKTtcclxuICB9XHJcblxyXG4gIGFycmF5TmV4dCgpe1xyXG4gICAgdGhpcy5jdXJyZW50RnJhbWUrKztcclxuICAgIHRoaXMuY3VycmVudFRpY2srKztcclxuICAgIGlmKHRoaXMuY3VycmVudEZyYW1lID49IHRoaXMuZnJhbWVzLmxlbmd0aCl7XHJcbiAgICAgIHRoaXMuY3VycmVudEZyYW1lID0gMDtcclxuICAgIH1cclxuICAgIGlmKHRoaXMuY3VycmVudFRpY2sgPj0gdGhpcy50aWNrcy5sZW5ndGgpIHRoaXMuY3VycmVudFRpY2sgPSAwO1xyXG4gICAgc3VwZXIudGV4dHVyZSA9IHRoaXMuZnJhbWVzW3RoaXMuY3VycmVudEZyYW1lXTtcclxuICAgIHRoaXMudGlja0NvdW50ZXIgPSB0aGlzLnRpY2tzW3RoaXMuY3VycmVudFRpY2tdO1xyXG4gIH1cclxuXHJcbiAgbnVtYmVyTmV4dCgpe1xyXG4gICAgdGhpcy5jdXJyZW50RnJhbWUrKztcclxuICAgIGlmKHRoaXMuY3VycmVudEZyYW1lID49IHRoaXMuZnJhbWVzLmxlbmd0aCl7XHJcbiAgICAgIHRoaXMuY3VycmVudEZyYW1lID0gMDtcclxuICAgIH1cclxuICAgIHN1cGVyLnRleHR1cmUgPSB0aGlzLmZyYW1lc1t0aGlzLmN1cnJlbnRGcmFtZV07XHJcbiAgICB0aGlzLnRpY2tDb3VudGVyID0gdGhpcy50aWNrcztcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQW5pbWF0aW9uO1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIEVudGl0eSBleHRlbmRzIFBJWEkuU3ByaXRle1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHN0YWdlLCAuLi5hcmdzKXtcclxuICAgIHN1cGVyKC4uLmFyZ3MpO1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuICB9XHJcbiAgc3Bhd24oeCwgeSl7XHJcbiAgICB0aGlzLng9eDtcclxuICAgIHRoaXMueT15O1xyXG4gICAgdGhpcy5zdGFnZS5ncmFwaGljcy5hZGRDaGlsZCh0aGlzKTtcclxuICB9XHJcbiAgc2V0UG9zaXRpb24oeCx5KXtcclxuICAgIHRoaXMueD14O1xyXG4gICAgdGhpcy55PXk7XHJcbiAgfVxyXG4gIHNldEFuY2hvcih4LHkpe1xyXG4gICAgdGhpcy5hbmNob3IueD14O1xyXG4gICAgdGhpcy5hbmNob3IueT15O1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHk7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuY2xhc3MgRW50aXR5R3JvdXAgZXh0ZW5kcyBQSVhJLlNwcml0ZXtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCBzdGFnZSwgLi4uYXJncyl7XHJcbiAgICBzdXBlciguLi5hcmdzKTtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XHJcbiAgICB0aGlzLnggPSAwO1xyXG4gICAgdGhpcy55ID0gMDtcclxuICAgIHRoaXMuZW50aXR5U2V0ID0gbmV3IFNldCgpO1xyXG4gIH1cclxuICB1cGRhdGUoKXtcclxuICAgIGZvcihsZXQgZW50aXR5IG9mIHRoaXMuZW50aXR5U2V0KSBlbnRpdHkudXBkYXRlKCk7XHJcbiAgfVxyXG4gIHNwYXduKCl7XHJcbiAgICB0aGlzLnN0YWdlLmdyYXBoaWNzLmFkZENoaWxkKHRoaXMpO1xyXG4gIH1cclxuICBhZGRFbnRpdHkoZW50aXR5LHgsIHksIHJvdGF0aW9uKXtcclxuICAgIGVudGl0eS5jb250YWluZXJHcm91cCA9IHRoaXM7XHJcbiAgICBlbnRpdHkuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMuY29udGFpbmVyR3JvdXAucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgIHRoaXMuY29udGFpbmVyR3JvdXAuZGVsZXRlKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIGVudGl0eS5zcGF3biA9IGZ1bmN0aW9uKHgsIHksIHJvdGF0aW9uKXtcclxuICAgICAgdGhpcy54ID0geDtcclxuICAgICAgdGhpcy55ID0geTtcclxuICAgICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gICAgICB0aGlzLmNvbnRhaW5lckdyb3VwLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIGVudGl0eS5pbml0KCk7XHJcbiAgICBlbnRpdHkuc3Bhd24oeCwgeSwgcm90YXRpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMuZW50aXR5U2V0LmFkZChlbnRpdHkpO1xyXG4gIH1cclxuICBhZGRGcm9tUmVzb3VyY2UocmVzb3VyY2UsIHgsIHksIHJvdGF0aW9uLCAuLi5hcmdzKXtcclxuICAgIGxldCBlbnRpdHkgPSB0aGlzLmdhbWUuZ2V0UmVzb3VyY2UoJ0VudGl0eScsIHJlc291cmNlLCAuLi5hcmdzKTtcclxuICAgIGVudGl0eS5jb250YWluZXJHcm91cCA9IHRoaXM7XHJcbiAgICBlbnRpdHkuZGVzdHJveSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXMuY29udGFpbmVyR3JvdXAucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbiAgICAgIHRoaXMuY29udGFpbmVyR3JvdXAuZGVsZXRlKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIGVudGl0eS5zcGF3biA9IGZ1bmN0aW9uKHgsIHksIHJvdGF0aW9uKXtcclxuICAgICAgdGhpcy54ID0geDtcclxuICAgICAgdGhpcy55ID0geTtcclxuICAgICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gICAgICB0aGlzLmNvbnRhaW5lckdyb3VwLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgfTtcclxuICAgIGVudGl0eS5pbml0KCk7XHJcbiAgICBlbnRpdHkuc3Bhd24oeCwgeSwgcm90YXRpb24pO1xyXG4gICAgcmV0dXJuIHRoaXMuZW50aXR5U2V0LmFkZChlbnRpdHkpO1xyXG4gIH1cclxuICBkZWxldGUoZW50aXR5KXtcclxuICAgIHJldHVybiB0aGlzLmVudGl0eVNldC5kZWxldGUoZW50aXR5KTtcclxuICB9XHJcbiAgaGFzKGVudGl0eSl7XHJcbiAgICByZXR1cm4gdGhpcy5lbnRpdHlTZXQuaGFzKGVudGl0eSk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eUdyb3VwO1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuaW1wb3J0IFN0YWdlIGZyb20gJy4vU3RhZ2UnO1xyXG5pbXBvcnQgRW50aXR5IGZyb20gJy4vRW50aXR5JztcclxuXHJcbmNsYXNzIEdhbWV7XHJcbiAgY29uc3RydWN0b3IoaWRDb250YWluZXIsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgdGhpcy5pZENvbnRhaW5lciA9IGlkQ29udGFpbmVyO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5yZXNvdXJjZXMgPSBuZXcgTWFwKCk7XHJcbiAgICB0aGlzLnJlc291cmNlcy5zZXQoJ1N0YWdlJywgbmV3IE1hcCgpKTtcclxuICAgIHRoaXMucmVzb3VyY2VzLnNldCgnRW50aXR5JywgbmV3IE1hcCgpKTtcclxuXHJcbiAgICBpZihvcHRpb25zLmZwcykgdGhpcy5mcHMgPSBvcHRpb25zLmZwcztcclxuICAgIGVsc2UgdGhpcy5mcHMgPSAtMTtcclxuXHJcbiAgICBpZihvcHRpb25zLnRwcykgdGhpcy50cHMgPSBvcHRpb25zLnRwcztcclxuICAgIGVsc2UgdGhpcy50cHMgPSA2MDtcclxuXHJcbiAgICBpZihvcHRpb25zLmluaXRTdGFnZSkgIHRoaXMubG9hZFN0YWdlKG9wdGlvbnMuaW5pdFN0YWdlKTtcclxuICAgIGVsc2UgdGhpcy5jdXJyU3RhZ2UgPSBuZXcgU3RhZ2UoKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHtiYWNrZ3JvdW5kQ29sb3IgOiAweDZlNmU2ZX0pO1xyXG5cclxuICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmZwcykge1xyXG5cclxuICAgICAgY2FzZSB0aGlzLnRwczpcclxuICAgICAgICB0aGlzLmZyYW1lSW50ZXJ2YWwgPSAxMDAwL3RoaXMuZnBzO1xyXG4gIFx0XHRcdHRoaXMubG9vcCA9IHRoaXMuc2ltcGxlTG9vcDtcclxuICAgICAgICB0aGlzLmRlbHRhID0gMDtcclxuICBcdFx0XHRicmVhaztcclxuXHJcbiAgICAgIGNhc2UgLTE6XHJcbiAgICAgICAgdGhpcy50aWNrc0ludGVydmFsID0gMTAwMC90aGlzLnRwcztcclxuICAgICAgICB0aGlzLmxhZyA9IDA7XHJcbiAgXHRcdFx0dGhpcy5sb29wID0gdGhpcy5mcHNVbmxpbWl0ZWRMb29wO1xyXG4gIFx0XHQgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLmZyYW1lSW50ZXJ2YWwgPSAxMDAwL3RoaXMuZnBzO1xyXG4gICAgICAgIHRoaXMudGlja3NJbnRlcnZhbCA9IDEwMDAvdGhpcy50cHM7XHJcbiAgICAgICAgdGhpcy50aGVuQXV4ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmRlbHRhID0gMDtcclxuICAgICAgICB0aGlzLmxhZyA9IDA7XHJcbiAgXHRcdFx0dGhpcy5sb29wID0gdGhpcy5mcHNMb2NrZWRMb29wO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gIFx0fVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWRDb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIudmlldyk7XHJcbiAgfVxyXG5cclxuICBzaW1wbGVMb29wKCl7XHJcbiAgXHR0aGlzLmZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgXHRsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICBcdHRoaXMuZGVsdGEgPSBub3cgLSB0aGlzLnRoZW47XHJcbiAgXHRpZiAodGhpcy5kZWx0YSA+IHRoaXMuZnJhbWVJbnRlcnZhbCkge1xyXG4gIFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG4gIFx0XHQvL3VwZGF0ZUlucHV0cygpO1xyXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xyXG4gIFx0XHR0aGlzLnRoZW4gPSBub3cgLSAodGhpcy5kZWx0YSAlIHRoaXMuZnJhbWVJbnRlcnZhbCk7XHJcbiAgXHR9XHJcbiAgfVxyXG5cclxuICBmcHNVbmxpbWl0ZWRMb29wKCl7XHJcbiAgXHR0aGlzLmZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgXHRsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICBcdHRoaXMubGFnICs9IG5vdyAtIHRoaXMudGhlbjtcclxuICBcdHRoaXMudGhlbiA9IG5vdztcclxuICBcdHdoaWxlKHRoaXMudGlja3NJbnRlcnZhbCA8IHRoaXMubGFnKXtcclxuICBcdFx0dGhpcy51cGRhdGUoKTtcclxuICBcdFx0Ly91cGRhdGVJbnB1dHMoKTtcclxuICBcdFx0dGhpcy5sYWcgLT0gdGhpcy50aWNrc0ludGVydmFsO1xyXG4gIFx0fVxyXG4gIFx0dGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGZwc0xvY2tlZExvb3AoKXtcclxuICBcdHRoaXMuZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuICBcdGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gIFx0dGhpcy5sYWcgKz0gbm93IC0gdGhpcy50aGVuO1xyXG4gIFx0dGhpcy5kZWx0YSA9IG5vdyAtIHRoaXMudGhlbkF1eDtcclxuICBcdHRoaXMudGhlbiA9IG5vdztcclxuICBcdHdoaWxlKHRoaXMudGlja3NJbnRlcnZhbCA8IHRoaXMubGFnKXtcclxuICBcdFx0dGhpcy51cGRhdGUoKTtcclxuICBcdFx0Ly91cGRhdGVJbnB1dHMoKTtcclxuICBcdFx0dGhpcy5sYWcgLT0gdGhpcy50aWNrc0ludGVydmFsO1xyXG4gIFx0fVxyXG4gIFx0aWYgKHRoaXMuZGVsdGEgPiB0aGlzLmZyYW1lSW50ZXJ2YWwpIHtcclxuICBcdFx0dGhpcy5yZW5kZXIoKTtcclxuICBcdFx0dGhpcy50aGVuQXV4ID0gbm93IC0gKHRoaXMuZGVsdGEgJSB0aGlzLmZyYW1lSW50ZXJ2YWwpO1xyXG4gIFx0fVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCl7XHJcbiAgICB0aGlzLmN1cnJTdGFnZS51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5jdXJyU3RhZ2UuZ3JhcGhpY3MpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFN0YWdlKHN0YWdlKXtcclxuICAgIHRoaXMuY3VyclN0YWdlID0gc3RhZ2U7XHJcbiAgICB0aGlzLmN1cnJTdGFnZS5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5sb29wKCk7XHJcbiAgfVxyXG5cclxuICBzdG9wKCl7XHJcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVSZXNvdXJjZSh0eXBlLCByZXNvdXJjZU5hbWUsIHJlc291cmNlKXtcclxuICAgIHRoaXMucmVzb3VyY2VzLmdldCh0eXBlKS5zZXQocmVzb3VyY2VOYW1lLCByZXNvdXJjZSk7XHJcbiAgfVxyXG5cclxuICBnZXRSZXNvdXJjZSh0eXBlLCBuYW1lLCAuLi5hcmdzKXtcclxuICAgIGxldCByZXNvdXJjZTtcclxuICAgIGxldCBwcm9wID0gdGhpcy5yZXNvdXJjZXMuZ2V0KHR5cGUpLmdldChuYW1lKTtcclxuICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICBjYXNlICdTdGFnZSc6XHJcbiAgICAgICAgcmVzb3VyY2UgPSBuZXcgU3RhZ2UodGhpcyk7XHJcbiAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICBjYXNlICdFbnRpdHknOlxyXG4gICAgICAgIGlmKHByb3AuaW5pdGlhbFRleHR1cmUpIHJlc291cmNlID0gbmV3IEVudGl0eSh0aGlzLCAuLi5hcmdzLCBwcm9wLmluaXRpYWxUZXh0dXJlKTtcclxuICAgICAgICBlbHNlIHJlc291cmNlID0gbmV3IEVudGl0eSh0aGlzLCAuLi5hcmdzKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAgIH1cclxuICAgIGZvcihsZXQga2V5IGluIHByb3Ape1xyXG4gICAgICByZXNvdXJjZVtrZXldID0gcHJvcFtrZXldO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHJlc291cmNlO1xyXG4gIH1cclxuXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZTtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5jbGFzcyBTcHJpdGVzaGVldHtcclxuICBjb25zdHJ1Y3RvcihpbWFnZSwgd2lkdGgsIGhlaWdodCwgcm93cywgY29scyl7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy50ZXh0dXJlID0gbmV3IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UoaW1hZ2UpO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnJvd3MgPSByb3dzO1xyXG4gICAgdGhpcy5jb2xzID0gY29scztcclxuICAgIHRoaXMuc3ByaXRlV2lkdGggPSB0aGlzLndpZHRoL2NvbHM7XHJcbiAgICB0aGlzLnNwcml0ZUhlaWdodCA9IHRoaXMuaGVpZ2h0L3Jvd3M7XHJcbiAgICB0aGlzLnNwcml0ZXMgPSBuZXcgQXJyYXkodGhpcy5yb3dzKTtcclxuICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnJvd3M7IGkrKyl7XHJcbiAgICAgIHRoaXMuc3ByaXRlc1tpXSA9IG5ldyBBcnJheSh0aGlzLmNvbHMpO1xyXG4gICAgICBmb3IobGV0IGogPSAwOyBqIDwgdGhpcy5jb2xzOyBqKyspe1xyXG4gICAgICAgIHRoaXMuc3ByaXRlc1tpXVtqXSA9IG5ldyBQSVhJLlRleHR1cmUodGhpcy50ZXh0dXJlLCBuZXcgUElYSS5SZWN0YW5nbGUoaip0aGlzLnNwcml0ZVdpZHRoLCBpKnRoaXMuc3ByaXRlSGVpZ2h0LCB0aGlzLnNwcml0ZVdpZHRoLCB0aGlzLnNwcml0ZUhlaWdodCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIGdldFNwcml0ZShyb3csIGNvbCl7XHJcbiAgICBpZihyb3cgPCAwIHx8IGNvbCA8IDAgfHwgcm93ID49IHRoaXMucm93cyB8fCBjb2wgPj0gdGhpcy5jb2xzKSByZXR1cm4gZmFsc2U7XHJcbiAgICByZXR1cm4gdGhpcy5zcHJpdGVzW3Jvd11bY29sXTtcclxuICB9XHJcbiAgZ2V0Um93KHJvdyl7XHJcbiAgICBpZihyb3cgPCAwIHx8IHJvdyA+PSB0aGlzLnJvd3MpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0aGlzLnNwcml0ZXNbcm93XTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3ByaXRlc2hlZXQ7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuY2xhc3MgU3RhZ2V7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSl7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5ncmFwaGljcyA9IG5ldyBQSVhJLkNvbnRhaW5lcigpO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdGFnZTtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5pbXBvcnQgR2FtZSBmcm9tICcuL2NvcmUvR2FtZSc7XHJcbmltcG9ydCBTdGFnZSBmcm9tICcuL2NvcmUvU3RhZ2UnO1xyXG5pbXBvcnQgRW50aXR5IGZyb20gJy4vY29yZS9FbnRpdHknO1xyXG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4vY29yZS9BbmltYXRpb24nO1xyXG5pbXBvcnQgU3ByaXRlc2hlZXQgZnJvbSAnLi9jb3JlL1Nwcml0ZXNoZWV0JztcclxuaW1wb3J0IEVudGl0eUdyb3VwIGZyb20gJy4vY29yZS9FbnRpdHlHcm91cCc7XHJcbmltcG9ydCBIaXRCb3ggZnJvbSAnLi91dGlscy9IaXRCb3gnO1xyXG5pbXBvcnQgVmVjdG9yMkQgZnJvbSAnLi91dGlscy9WZWN0b3IyRCc7XHJcblxyXG5nZ2YgPSB7fTtcclxuZ2dmLkdhbWUgPSBHYW1lO1xyXG5nZ2YuU3RhZ2UgPSBTdGFnZTtcclxuZ2dmLkVudGl0eSA9IEVudGl0eTtcclxuZ2dmLkFuaW1hdGlvbiA9IEFuaW1hdGlvbjtcclxuZ2dmLlNwcml0ZXNoZWV0ID0gU3ByaXRlc2hlZXQ7XHJcbmdnZi5FbnRpdHlHcm91cCA9IEVudGl0eUdyb3VwO1xyXG5nZ2YuSGl0Qm94ID0gSGl0Qm94O1xyXG5nZ2YuVmVjdG9yMkQgPSBWZWN0b3IyRDtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcbmltcG9ydCBWZWN0b3IyRCBmcm9tICcuL1ZlY3RvcjJEJztcclxuXHJcbmNsYXNzIEhpdEJveHtcclxuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCBwb3NpdGlvbiwgcm90YXRpb24pe1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgICB0aGlzLnBvc2l0aW9uID0gbmV3IFZlY3RvcjJEKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uO1xyXG4gICAgdGhpcy52ZXJ0ZXhzID0gdGhpcy5nZXRWZXJ0ZXhzKCk7XHJcbiAgICB0aGlzLmF4ZXMgPSB0aGlzLmdldEF4ZXMoKTtcclxuICB9XHJcbiAgZ2V0VmVydGV4cygpe1xyXG4gICAgbGV0IHZlcnRleEluaXRpYWwwID0gbmV3IFZlY3RvcjJEKHRoaXMucG9zaXRpb24ueCAtIHRoaXMud2lkdGgvMiwgdGhpcy5wb3NpdGlvbi55IC0gdGhpcy5oZWlnaHQvMik7XHJcbiAgICBsZXQgdmVydGV4SW5pdGlhbDEgPSBuZXcgVmVjdG9yMkQodmVydGV4SW5pdGlhbDAueCArIHRoaXMud2lkdGgsIHZlcnRleEluaXRpYWwwLnkpO1xyXG4gICAgbGV0IHZlcnRleEluaXRpYWwyID0gbmV3IFZlY3RvcjJEKHZlcnRleEluaXRpYWwwLnggKyB0aGlzLndpZHRoLCB2ZXJ0ZXhJbml0aWFsMC55ICsgdGhpcy5oZWlnaHQpO1xyXG4gICAgbGV0IHZlcnRleEluaXRpYWwzID0gbmV3IFZlY3RvcjJEKHZlcnRleEluaXRpYWwwLngsIHZlcnRleEluaXRpYWwwLnkgKyB0aGlzLmhlaWdodCk7XHJcbiAgICBsZXQgdmVydGV4cyA9IG5ldyBBcnJheSg0KTtcclxuICAgIHZlcnRleHNbMF0gPSB2ZXJ0ZXhJbml0aWFsMC5yb3RhdGUodGhpcy5yb3RhdGlvbiwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICB2ZXJ0ZXhzWzFdID0gdmVydGV4SW5pdGlhbDEucm90YXRlKHRoaXMucm90YXRpb24sIHRoaXMucG9zaXRpb24pO1xyXG4gICAgdmVydGV4c1syXSA9IHZlcnRleEluaXRpYWwyLnJvdGF0ZSh0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIHZlcnRleHNbM10gPSB2ZXJ0ZXhJbml0aWFsMy5yb3RhdGUodGhpcy5yb3RhdGlvbiwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICByZXR1cm4gdmVydGV4cztcclxuICB9XHJcbiAgZ2V0QXhlcygpe1xyXG4gICAgbGV0IGF4ZXMgPSBuZXcgQXJyYXkoMik7XHJcbiAgICBheGVzWzBdID0gbmV3IFZlY3RvcjJEKHRoaXMudmVydGV4c1sxXS54LCB0aGlzLnZlcnRleHNbMV0ueSwgdGhpcy52ZXJ0ZXhzWzBdLngsIHRoaXMudmVydGV4c1swXS55KTtcclxuICAgIGF4ZXNbMV0gPSBuZXcgVmVjdG9yMkQodGhpcy52ZXJ0ZXhzWzJdLngsIHRoaXMudmVydGV4c1syXS55LCB0aGlzLnZlcnRleHNbMV0ueCwgdGhpcy52ZXJ0ZXhzWzFdLnkpO1xyXG4gICAgcmV0dXJuIGF4ZXM7XHJcbiAgfVxyXG4gIG1vdmVWZXJ0ZXhzKHZlY3Rvcil7XHJcbiAgICB0aGlzLnZlcnRleHNbMF0ueCArPSB2ZWN0b3IueDtcclxuICAgIHRoaXMudmVydGV4c1swXS55ICs9IHZlY3Rvci55O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzFdLnggKz0gdmVjdG9yLng7XHJcbiAgICB0aGlzLnZlcnRleHNbMV0ueSArPSB2ZWN0b3IueTtcclxuICAgIHRoaXMudmVydGV4c1syXS54ICs9IHZlY3Rvci54O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzJdLnkgKz0gdmVjdG9yLnk7XHJcbiAgICB0aGlzLnZlcnRleHNbM10ueCArPSB2ZWN0b3IueDtcclxuICAgIHRoaXMudmVydGV4c1szXS55ICs9IHZlY3Rvci55O1xyXG4gIH1cclxuICBwcm9qZWN0aW9uKHByb3llY3Rpb25WZWN0b3Ipe1xyXG4gICAgbGV0IG1pbiA9IHRoaXMudmVydGV4c1swXS5wcm9qZWN0aW9uKHByb3llY3Rpb25WZWN0b3IpO1xyXG4gICAgbGV0IG1heCA9IG1pbjtcclxuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgdGhpcy52ZXJ0ZXhzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBwID0gdGhpcy52ZXJ0ZXhzW2ldLnByb2plY3Rpb24ocHJveWVjdGlvblZlY3Rvcik7XHJcbiAgICAgIGlmIChwIDwgbWluKSBtaW4gPSBwO1xyXG4gICAgICBlbHNlIGlmIChwID4gbWF4KSBtYXggPSBwO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBQcm9qZWN0aW9uKG1pbiwgbWF4KTtcclxuICB9XHJcbiAgb3ZlcmxhcChoaXRib3gpe1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmF4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGF4aXMgPSB0aGlzLmF4ZXNbaV07XHJcbiAgICAgIGxldCBwcm9qZWN0aW9uMSA9IHRoaXMucHJvamVjdGlvbihheGlzKTtcclxuICAgICAgbGV0IHByb2plY3Rpb24yID0gaGl0Ym94LnByb2plY3Rpb24oYXhpcyk7XHJcbiAgICAgIGlmICghcHJvamVjdGlvbjEub3ZlcmxhcChwcm9qZWN0aW9uMikpIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhpdGJveC5heGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBheGlzID0gaGl0Ym94LmF4ZXNbaV07XHJcbiAgICAgIGxldCBwcm9qZWN0aW9uMSA9IHRoaXMucHJvamVjdGlvbihheGlzKTtcclxuICAgICAgbGV0IHByb2plY3Rpb24yID0gaGl0Ym94LnByb2plY3Rpb24oYXhpcyk7XHJcbiAgICAgIGlmICghcHJvamVjdGlvbjEub3ZlcmxhcChwcm9qZWN0aW9uMikpIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcbiAgdXBkYXRlKHBvc2l0aW9uLCByb3RhdGlvbil7XHJcbiAgICBwb3NpdGlvbiA9IG5ldyBWZWN0b3IyRChwb3NpdGlvbi54LCBwb3NpdGlvbi55KTtcclxuICAgIGlmKHJvdGF0aW9uICE9IHRoaXMucm90YXRpb24pe1xyXG4gICAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgICAgdGhpcy52ZXJ0ZXhzID0gdGhpcy5nZXRWZXJ0ZXhzKCk7XHJcbiAgICAgIHRoaXMuYXhlcyA9IHRoaXMuZ2V0QXhlcygpO1xyXG4gICAgfWVsc2UgaWYoIXBvc2l0aW9uLmVxdWFscyh0aGlzLnBvc2l0aW9uKSl7XHJcbiAgICAgIHRoaXMubW92ZVZlcnRleHMobmV3IFZlY3RvcjJEKHBvc2l0aW9uLngsIHBvc2l0aW9uLnksIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KSk7XHJcbiAgICAgIHRoaXMucG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIFByb2plY3Rpb257XHJcbiAgY29uc3RydWN0b3IobWluLCBtYXgpe1xyXG4gICAgdGhpcy5taW4gPSBtaW47XHJcbiAgICB0aGlzLm1heCA9IG1heDtcclxuICB9XHJcbiAgb3ZlcmxhcChwcm9qZWN0aW9uKXtcclxuICAgIHJldHVybiB0aGlzLm1heCA+IHByb2plY3Rpb24ubWluICYmIHByb2plY3Rpb24ubWF4ID4gdGhpcy5taW47XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEhpdEJveDtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5jbGFzcyBWZWN0b3IyRHtcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB4MiA9IDAsIHkyID0gMCl7XHJcbiAgICB0aGlzLnggPSB4IC0geDI7XHJcbiAgICB0aGlzLnkgPSB5IC0geTI7XHJcbiAgfVxyXG4gIG5vcm1hbCgpe1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRCgtdGhpcy55LCB0aGlzLngpO1xyXG4gIH1cclxuICBtYWduaXR1ZGUoKXtcclxuICAgIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3codGhpcy54LCAyKSArIE1hdGgucG93KHRoaXMueSwgMikpO1xyXG4gIH1cclxuICBwcm9qZWN0aW9uKHByb3llY3Rpb25WZWN0b3Ipe1xyXG4gICAgbGV0IHByb3llY3Rpb25WZWN0b3JNYWduaXR1ZGUgPSBwcm95ZWN0aW9uVmVjdG9yLm1hZ25pdHVkZSgpO1xyXG4gICAgcmV0dXJuICh0aGlzLnggKiAocHJveWVjdGlvblZlY3Rvci54L3Byb3llY3Rpb25WZWN0b3JNYWduaXR1ZGUpKSArICh0aGlzLnkgKiAocHJveWVjdGlvblZlY3Rvci55L3Byb3llY3Rpb25WZWN0b3JNYWduaXR1ZGUpKTtcclxuICB9XHJcbiAgcm90YXRlKGFuZ2xlLCBvcmlnaW5Qb2ludCA9IG5ldyBWZWN0b3IyRCgwLDApKXtcclxuICAgIGxldCBuZXdYID0gKCh0aGlzLnggLSBvcmlnaW5Qb2ludC54KSpNYXRoLmNvcyhhbmdsZSkpIC0gKCh0aGlzLnkgLSBvcmlnaW5Qb2ludC55KSpNYXRoLnNpbihhbmdsZSkpICsgb3JpZ2luUG9pbnQueDtcclxuICAgIGxldCBuZXdZID0gKCh0aGlzLnggLSBvcmlnaW5Qb2ludC54KSpNYXRoLnNpbihhbmdsZSkpICsgKCh0aGlzLnkgLSBvcmlnaW5Qb2ludC55KSpNYXRoLmNvcyhhbmdsZSkpICsgb3JpZ2luUG9pbnQueTtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yMkQobmV3WCwgbmV3WSk7XHJcbiAgfVxyXG4gIGVxdWFscyh2ZWN0b3Ipe1xyXG4gICAgaWYodGhpcy54ID09IHZlY3Rvci54ICYmIHRoaXMueSA9PSB2ZWN0b3IueSkgcmV0dXJuIHRydWU7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFZlY3RvcjJEO1xyXG4iXX0=
