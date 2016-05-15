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
      console.log(entity.x);
      console.log(entity.y);
      console.log(entity.rotation);
      console.log(entity.v);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXEFuaW1hdGlvbi5qcyIsInNyY1xcY29yZVxcRW50aXR5LmpzIiwic3JjXFxjb3JlXFxFbnRpdHlHcm91cC5qcyIsInNyY1xcY29yZVxcR2FtZS5qcyIsInNyY1xcY29yZVxcU3ByaXRlc2hlZXQuanMiLCJzcmNcXGNvcmVcXFN0YWdlLmpzIiwic3JjXFxpbmRleC5qcyIsInNyY1xcdXRpbHNcXEhpdEJveC5qcyIsInNyY1xcdXRpbHNcXFZlY3RvcjJELmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7SUNFTSxTQUFTO1lBQVQsU0FBUzs7QUFDYixXQURJLFNBQVMsQ0FDRCxNQUFNLEVBQUUsS0FBSyxFQUFDOzBCQUR0QixTQUFTOzt1RUFBVCxTQUFTLGFBRUwsTUFBTSxDQUFDLENBQUMsQ0FBQzs7QUFDZixVQUFLLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsVUFBSyxLQUFLLEdBQUcsS0FBSyxDQUFDOztHQUNwQjs7ZUFMRyxTQUFTOzsyQkFPUDtBQUNKLFVBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLFVBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxnQkFBZ0IsRUFBRTtBQUNsRSxZQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztBQUNyQixZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDM0IsWUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO09BQ2xDLE1BQUk7QUFDSCxZQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDNUIsWUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO09BQy9CO0tBQ0Y7Ozs2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QU0sQ0FBQyxDQUFDLEVBQUUsT0FBTyxJQUFJLENBQUM7QUFDekQsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1NBdkJHLFFBQVE7OztBQTBCZCxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIEFuaW1hdGlvbiBleHRlbmRzIFBJWEkuU3ByaXRle1xyXG4gIGNvbnN0cnVjdG9yKGZyYW1lcywgdGlja3Mpe1xyXG4gICAgc3VwZXIoZnJhbWVzWzBdKTtcclxuICAgIHRoaXMuZnJhbWVzID0gZnJhbWVzO1xyXG4gICAgdGhpcy50aWNrcyA9IHRpY2tzO1xyXG4gIH1cclxuXHJcbiAgaW5pdCgpe1xyXG4gICAgdGhpcy5jdXJyZW50RnJhbWUgPSAwO1xyXG4gICAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHRoaXMudGlja3MpID09PSAnW29iamVjdCBBcnJheV0nICl7XHJcbiAgICAgIHRoaXMuY3VycmVudFRpY2sgPSAwO1xyXG4gICAgICB0aGlzLm5leHQgPSB0aGlzLmFycmF5TmV4dDtcclxuICAgICAgdGhpcy50aWNrQ291bnRlciA9IHRoaXMudGlja3NbMF07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgdGhpcy5uZXh0ID0gdGhpcy5udW1iZXJOZXh0O1xyXG4gICAgICB0aGlzLnRpY2tDb3VudGVyID0gdGhpcy50aWNrcztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHVwZGF0ZSgpe1xyXG4gICAgdGhpcy50aWNrQ291bnRlci0tO1xyXG4gICAgaWYodGhpcy50aWNrQ291bnRlciA9PT0gMCkgdGhpcy5uZXh0KCk7XHJcbiAgfVxyXG5cclxuICBhcnJheU5leHQoKXtcclxuICAgIHRoaXMuY3VycmVudEZyYW1lKys7XHJcbiAgICB0aGlzLmN1cnJlbnRUaWNrKys7XHJcbiAgICBpZih0aGlzLmN1cnJlbnRGcmFtZSA+PSB0aGlzLmZyYW1lcy5sZW5ndGgpe1xyXG4gICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XHJcbiAgICB9XHJcbiAgICBpZih0aGlzLmN1cnJlbnRUaWNrID49IHRoaXMudGlja3MubGVuZ3RoKSB0aGlzLmN1cnJlbnRUaWNrID0gMDtcclxuICAgIHN1cGVyLnRleHR1cmUgPSB0aGlzLmZyYW1lc1t0aGlzLmN1cnJlbnRGcmFtZV07XHJcbiAgICB0aGlzLnRpY2tDb3VudGVyID0gdGhpcy50aWNrc1t0aGlzLmN1cnJlbnRUaWNrXTtcclxuICB9XHJcblxyXG4gIG51bWJlck5leHQoKXtcclxuICAgIHRoaXMuY3VycmVudEZyYW1lKys7XHJcbiAgICBpZih0aGlzLmN1cnJlbnRGcmFtZSA+PSB0aGlzLmZyYW1lcy5sZW5ndGgpe1xyXG4gICAgICB0aGlzLmN1cnJlbnRGcmFtZSA9IDA7XHJcbiAgICB9XHJcbiAgICBzdXBlci50ZXh0dXJlID0gdGhpcy5mcmFtZXNbdGhpcy5jdXJyZW50RnJhbWVdO1xyXG4gICAgdGhpcy50aWNrQ291bnRlciA9IHRoaXMudGlja3M7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFuaW1hdGlvbjtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5jbGFzcyBFbnRpdHkgZXh0ZW5kcyBQSVhJLlNwcml0ZXtcclxuICBjb25zdHJ1Y3RvcihnYW1lLCBzdGFnZSwgLi4uYXJncyl7XHJcbiAgICBzdXBlciguLi5hcmdzKTtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLnN0YWdlID0gc3RhZ2U7XHJcbiAgfVxyXG4gIHNwYXduKHgsIHkpe1xyXG4gICAgdGhpcy54PXg7XHJcbiAgICB0aGlzLnk9eTtcclxuICAgIHRoaXMuc3RhZ2UuZ3JhcGhpY3MuYWRkQ2hpbGQodGhpcyk7XHJcbiAgfVxyXG4gIHNldFBvc2l0aW9uKHgseSl7XHJcbiAgICB0aGlzLng9eDtcclxuICAgIHRoaXMueT15O1xyXG4gIH1cclxuICBzZXRBbmNob3IoeCx5KXtcclxuICAgIHRoaXMuYW5jaG9yLng9eDtcclxuICAgIHRoaXMuYW5jaG9yLnk9eTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW50aXR5O1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIEVudGl0eUdyb3VwIGV4dGVuZHMgUElYSS5TcHJpdGV7XHJcbiAgY29uc3RydWN0b3IoZ2FtZSwgc3RhZ2UsIC4uLmFyZ3Mpe1xyXG4gICAgc3VwZXIoLi4uYXJncyk7XHJcbiAgICB0aGlzLmdhbWUgPSBnYW1lO1xyXG4gICAgdGhpcy5zdGFnZSA9IHN0YWdlO1xyXG4gICAgdGhpcy54ID0gMDtcclxuICAgIHRoaXMueSA9IDA7XHJcbiAgICB0aGlzLmVudGl0eVNldCA9IG5ldyBTZXQoKTtcclxuICB9XHJcbiAgdXBkYXRlKCl7XHJcbiAgICBmb3IobGV0IGVudGl0eSBvZiB0aGlzLmVudGl0eVNldCkgZW50aXR5LnVwZGF0ZSgpO1xyXG4gIH1cclxuICBzcGF3bigpe1xyXG4gICAgdGhpcy5zdGFnZS5ncmFwaGljcy5hZGRDaGlsZCh0aGlzKTtcclxuICB9XHJcbiAgYWRkRnJvbVJlc291cmNlKHJlc291cmNlLCB4LCB5LCByb3RhdGlvbiwgLi4uYXJncyl7XHJcbiAgICBsZXQgZW50aXR5ID0gdGhpcy5nYW1lLmdldFJlc291cmNlKCdFbnRpdHknLCByZXNvdXJjZSwgLi4uYXJncyk7XHJcbiAgICBlbnRpdHkuY29udGFpbmVyR3JvdXAgPSB0aGlzO1xyXG4gICAgZW50aXR5LmRlc3Ryb3kgPSBmdW5jdGlvbigpe1xyXG4gICAgICB0aGlzLmNvbnRhaW5lckdyb3VwLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG4gICAgICB0aGlzLmNvbnRhaW5lckdyb3VwLmRlbGV0ZSh0aGlzKTtcclxuICAgIH07XHJcbiAgICBlbnRpdHkuc3Bhd24gPSBmdW5jdGlvbih4LCB5LCByb3RhdGlvbil7XHJcbiAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgIHRoaXMueSA9IHk7XHJcbiAgICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgICAgdGhpcy5jb250YWluZXJHcm91cC5hZGRDaGlsZCh0aGlzKTtcclxuICAgIH07XHJcbiAgICBlbnRpdHkuaW5pdCgpO1xyXG4gICAgZW50aXR5LnNwYXduKHgsIHksIHJvdGF0aW9uKTtcclxuICAgIGNvbnNvbGUubG9nKGVudGl0eS54KTtcclxuICAgIGNvbnNvbGUubG9nKGVudGl0eS55KTtcclxuICAgIGNvbnNvbGUubG9nKGVudGl0eS5yb3RhdGlvbik7XHJcbiAgICBjb25zb2xlLmxvZyhlbnRpdHkudik7XHJcbiAgICByZXR1cm4gdGhpcy5lbnRpdHlTZXQuYWRkKGVudGl0eSk7XHJcbiAgfVxyXG4gIGRlbGV0ZShlbnRpdHkpe1xyXG4gICAgcmV0dXJuIHRoaXMuZW50aXR5U2V0LmRlbGV0ZShlbnRpdHkpO1xyXG4gIH1cclxuICBoYXMoZW50aXR5KXtcclxuICAgIHJldHVybiB0aGlzLmVudGl0eVNldC5oYXMoZW50aXR5KTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW50aXR5R3JvdXA7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9TdGFnZSc7XHJcbmltcG9ydCBFbnRpdHkgZnJvbSAnLi9FbnRpdHknO1xyXG5cclxuY2xhc3MgR2FtZXtcclxuICBjb25zdHJ1Y3RvcihpZENvbnRhaW5lciwgd2lkdGgsIGhlaWdodCwgb3B0aW9ucyA9IHt9KXtcclxuXHJcbiAgICB0aGlzLmlkQ29udGFpbmVyID0gaWRDb250YWluZXI7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHJcbiAgICB0aGlzLnJlc291cmNlcyA9IG5ldyBNYXAoKTtcclxuICAgIHRoaXMucmVzb3VyY2VzLnNldCgnU3RhZ2UnLCBuZXcgTWFwKCkpO1xyXG4gICAgdGhpcy5yZXNvdXJjZXMuc2V0KCdFbnRpdHknLCBuZXcgTWFwKCkpO1xyXG5cclxuICAgIGlmKG9wdGlvbnMuZnBzKSB0aGlzLmZwcyA9IG9wdGlvbnMuZnBzO1xyXG4gICAgZWxzZSB0aGlzLmZwcyA9IC0xO1xyXG5cclxuICAgIGlmKG9wdGlvbnMudHBzKSB0aGlzLnRwcyA9IG9wdGlvbnMudHBzO1xyXG4gICAgZWxzZSB0aGlzLnRwcyA9IDYwO1xyXG5cclxuICAgIGlmKG9wdGlvbnMuaW5pdFN0YWdlKSAgdGhpcy5sb2FkU3RhZ2Uob3B0aW9ucy5pbml0U3RhZ2UpO1xyXG4gICAgZWxzZSB0aGlzLmN1cnJTdGFnZSA9IG5ldyBTdGFnZSgpO1xyXG5cclxuICAgIHRoaXMucmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlcih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwge2JhY2tncm91bmRDb2xvciA6IDB4NmU2ZTZlfSk7XHJcblxyXG4gICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKTtcclxuXHJcbiAgICBzd2l0Y2ggKHRoaXMuZnBzKSB7XHJcblxyXG4gICAgICBjYXNlIHRoaXMudHBzOlxyXG4gICAgICAgIHRoaXMuZnJhbWVJbnRlcnZhbCA9IDEwMDAvdGhpcy5mcHM7XHJcbiAgXHRcdFx0dGhpcy5sb29wID0gdGhpcy5zaW1wbGVMb29wO1xyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAwO1xyXG4gIFx0XHRcdGJyZWFrO1xyXG5cclxuICAgICAgY2FzZSAtMTpcclxuICAgICAgICB0aGlzLnRpY2tzSW50ZXJ2YWwgPSAxMDAwL3RoaXMudHBzO1xyXG4gICAgICAgIHRoaXMubGFnID0gMDtcclxuICBcdFx0XHR0aGlzLmxvb3AgPSB0aGlzLmZwc1VubGltaXRlZExvb3A7XHJcbiAgXHRcdCAgYnJlYWs7XHJcblxyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICAgIHRoaXMuZnJhbWVJbnRlcnZhbCA9IDEwMDAvdGhpcy5mcHM7XHJcbiAgICAgICAgdGhpcy50aWNrc0ludGVydmFsID0gMTAwMC90aGlzLnRwcztcclxuICAgICAgICB0aGlzLnRoZW5BdXggPSBEYXRlLm5vdygpO1xyXG4gICAgICAgIHRoaXMuZGVsdGEgPSAwO1xyXG4gICAgICAgIHRoaXMubGFnID0gMDtcclxuICBcdFx0XHR0aGlzLmxvb3AgPSB0aGlzLmZwc0xvY2tlZExvb3A7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgXHR9XHJcblxyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGhpcy5pZENvbnRhaW5lcikuYXBwZW5kQ2hpbGQodGhpcy5yZW5kZXJlci52aWV3KTtcclxuICB9XHJcblxyXG4gIHNpbXBsZUxvb3AoKXtcclxuICBcdHRoaXMuZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuICBcdGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gIFx0dGhpcy5kZWx0YSA9IG5vdyAtIHRoaXMudGhlbjtcclxuICBcdGlmICh0aGlzLmRlbHRhID4gdGhpcy5mcmFtZUludGVydmFsKSB7XHJcbiAgXHRcdHRoaXMudXBkYXRlKCk7XHJcbiAgXHRcdC8vdXBkYXRlSW5wdXRzKCk7XHJcbiAgXHRcdHRoaXMucmVuZGVyKCk7XHJcbiAgXHRcdHRoaXMudGhlbiA9IG5vdyAtICh0aGlzLmRlbHRhICUgdGhpcy5mcmFtZUludGVydmFsKTtcclxuICBcdH1cclxuICB9XHJcblxyXG4gIGZwc1VubGltaXRlZExvb3AoKXtcclxuICBcdHRoaXMuZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuICBcdGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gIFx0dGhpcy5sYWcgKz0gbm93IC0gdGhpcy50aGVuO1xyXG4gIFx0dGhpcy50aGVuID0gbm93O1xyXG4gIFx0d2hpbGUodGhpcy50aWNrc0ludGVydmFsIDwgdGhpcy5sYWcpe1xyXG4gIFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG4gIFx0XHQvL3VwZGF0ZUlucHV0cygpO1xyXG4gIFx0XHR0aGlzLmxhZyAtPSB0aGlzLnRpY2tzSW50ZXJ2YWw7XHJcbiAgXHR9XHJcbiAgXHR0aGlzLnJlbmRlcigpO1xyXG4gIH1cclxuXHJcbiAgZnBzTG9ja2VkTG9vcCgpe1xyXG4gIFx0dGhpcy5mcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGhpcy5sb29wLmJpbmQodGhpcykpO1xyXG4gIFx0bGV0IG5vdyA9IERhdGUubm93KCk7XHJcbiAgXHR0aGlzLmxhZyArPSBub3cgLSB0aGlzLnRoZW47XHJcbiAgXHR0aGlzLmRlbHRhID0gbm93IC0gdGhpcy50aGVuQXV4O1xyXG4gIFx0dGhpcy50aGVuID0gbm93O1xyXG4gIFx0d2hpbGUodGhpcy50aWNrc0ludGVydmFsIDwgdGhpcy5sYWcpe1xyXG4gIFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG4gIFx0XHQvL3VwZGF0ZUlucHV0cygpO1xyXG4gIFx0XHR0aGlzLmxhZyAtPSB0aGlzLnRpY2tzSW50ZXJ2YWw7XHJcbiAgXHR9XHJcbiAgXHRpZiAodGhpcy5kZWx0YSA+IHRoaXMuZnJhbWVJbnRlcnZhbCkge1xyXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xyXG4gIFx0XHR0aGlzLnRoZW5BdXggPSBub3cgLSAodGhpcy5kZWx0YSAlIHRoaXMuZnJhbWVJbnRlcnZhbCk7XHJcbiAgXHR9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoKXtcclxuICAgIHRoaXMuY3VyclN0YWdlLnVwZGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgcmVuZGVyKCl7XHJcbiAgICB0aGlzLnJlbmRlcmVyLnJlbmRlcih0aGlzLmN1cnJTdGFnZS5ncmFwaGljcyk7XHJcbiAgfVxyXG5cclxuICBsb2FkU3RhZ2Uoc3RhZ2Upe1xyXG4gICAgdGhpcy5jdXJyU3RhZ2UgPSBzdGFnZTtcclxuICAgIHRoaXMuY3VyclN0YWdlLmluaXQoKTtcclxuICB9XHJcblxyXG4gIHN0YXJ0KCl7XHJcbiAgICB0aGlzLmxvb3AoKTtcclxuICB9XHJcblxyXG4gIHN0b3AoKXtcclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSh0aGlzLmZyYW1lKTtcclxuICB9XHJcblxyXG4gIGNyZWF0ZVJlc291cmNlKHR5cGUsIHJlc291cmNlTmFtZSwgcmVzb3VyY2Upe1xyXG4gICAgdGhpcy5yZXNvdXJjZXMuZ2V0KHR5cGUpLnNldChyZXNvdXJjZU5hbWUsIHJlc291cmNlKTtcclxuICB9XHJcblxyXG4gIGdldFJlc291cmNlKHR5cGUsIG5hbWUsIC4uLmFyZ3Mpe1xyXG4gICAgbGV0IHJlc291cmNlO1xyXG4gICAgbGV0IHByb3AgPSB0aGlzLnJlc291cmNlcy5nZXQodHlwZSkuZ2V0KG5hbWUpO1xyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ1N0YWdlJzpcclxuICAgICAgICByZXNvdXJjZSA9IG5ldyBTdGFnZSh0aGlzKTtcclxuICAgICAgICBicmVhaztcclxuXHJcbiAgICAgIGNhc2UgJ0VudGl0eSc6XHJcbiAgICAgICAgaWYocHJvcC5pbml0aWFsVGV4dHVyZSkgcmVzb3VyY2UgPSBuZXcgRW50aXR5KHRoaXMsIC4uLmFyZ3MsIHByb3AuaW5pdGlhbFRleHR1cmUpO1xyXG4gICAgICAgIGVsc2UgcmVzb3VyY2UgPSBuZXcgRW50aXR5KHRoaXMsIC4uLmFyZ3MpO1xyXG4gICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgfVxyXG4gICAgZm9yKGxldCBrZXkgaW4gcHJvcCl7XHJcbiAgICAgIHJlc291cmNlW2tleV0gPSBwcm9wW2tleV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmVzb3VyY2U7XHJcbiAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIFNwcml0ZXNoZWV0e1xyXG4gIGNvbnN0cnVjdG9yKGltYWdlLCB3aWR0aCwgaGVpZ2h0LCByb3dzLCBjb2xzKXtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLnRleHR1cmUgPSBuZXcgUElYSS5UZXh0dXJlLmZyb21JbWFnZShpbWFnZSk7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMucm93cyA9IHJvd3M7XHJcbiAgICB0aGlzLmNvbHMgPSBjb2xzO1xyXG4gICAgdGhpcy5zcHJpdGVXaWR0aCA9IHRoaXMud2lkdGgvY29scztcclxuICAgIHRoaXMuc3ByaXRlSGVpZ2h0ID0gdGhpcy5oZWlnaHQvcm93cztcclxuICAgIHRoaXMuc3ByaXRlcyA9IG5ldyBBcnJheSh0aGlzLnJvd3MpO1xyXG4gICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMucm93czsgaSsrKXtcclxuICAgICAgdGhpcy5zcHJpdGVzW2ldID0gbmV3IEFycmF5KHRoaXMuY29scyk7XHJcbiAgICAgIGZvcihsZXQgaiA9IDA7IGogPCB0aGlzLmNvbHM7IGorKyl7XHJcbiAgICAgICAgdGhpcy5zcHJpdGVzW2ldW2pdID0gbmV3IFBJWEkuVGV4dHVyZSh0aGlzLnRleHR1cmUsIG5ldyBQSVhJLlJlY3RhbmdsZShqKnRoaXMuc3ByaXRlV2lkdGgsIGkqdGhpcy5zcHJpdGVIZWlnaHQsIHRoaXMuc3ByaXRlV2lkdGgsIHRoaXMuc3ByaXRlSGVpZ2h0KSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgZ2V0U3ByaXRlKHJvdywgY29sKXtcclxuICAgIGlmKHJvdyA8IDAgfHwgY29sIDwgMCB8fCByb3cgPj0gdGhpcy5yb3dzIHx8IGNvbCA+PSB0aGlzLmNvbHMpIHJldHVybiBmYWxzZTtcclxuICAgIHJldHVybiB0aGlzLnNwcml0ZXNbcm93XVtjb2xdO1xyXG4gIH1cclxuICBnZXRSb3cocm93KXtcclxuICAgIGlmKHJvdyA8IDAgfHwgcm93ID49IHRoaXMucm93cykgcmV0dXJuIGZhbHNlO1xyXG4gICAgcmV0dXJuIHRoaXMuc3ByaXRlc1tyb3ddO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTcHJpdGVzaGVldDtcclxuIiwiLypqc2hpbnQgZXNuZXh0OiB0cnVlICovXHJcblxyXG5jbGFzcyBTdGFnZXtcclxuICBjb25zdHJ1Y3RvcihnYW1lKXtcclxuICAgIHRoaXMuZ2FtZSA9IGdhbWU7XHJcbiAgICB0aGlzLmdyYXBoaWNzID0gbmV3IFBJWEkuQ29udGFpbmVyKCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFN0YWdlO1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmltcG9ydCBHYW1lIGZyb20gJy4vY29yZS9HYW1lJztcclxuaW1wb3J0IFN0YWdlIGZyb20gJy4vY29yZS9TdGFnZSc7XHJcbmltcG9ydCBFbnRpdHkgZnJvbSAnLi9jb3JlL0VudGl0eSc7XHJcbmltcG9ydCBBbmltYXRpb24gZnJvbSAnLi9jb3JlL0FuaW1hdGlvbic7XHJcbmltcG9ydCBTcHJpdGVzaGVldCBmcm9tICcuL2NvcmUvU3ByaXRlc2hlZXQnO1xyXG5pbXBvcnQgRW50aXR5R3JvdXAgZnJvbSAnLi9jb3JlL0VudGl0eUdyb3VwJztcclxuaW1wb3J0IEhpdEJveCBmcm9tICcuL3V0aWxzL0hpdEJveCc7XHJcbmltcG9ydCBWZWN0b3IyRCBmcm9tICcuL3V0aWxzL1ZlY3RvcjJEJztcclxuXHJcbmdnZiA9IHt9O1xyXG5nZ2YuR2FtZSA9IEdhbWU7XHJcbmdnZi5TdGFnZSA9IFN0YWdlO1xyXG5nZ2YuRW50aXR5ID0gRW50aXR5O1xyXG5nZ2YuQW5pbWF0aW9uID0gQW5pbWF0aW9uO1xyXG5nZ2YuU3ByaXRlc2hlZXQgPSBTcHJpdGVzaGVldDtcclxuZ2dmLkVudGl0eUdyb3VwID0gRW50aXR5R3JvdXA7XHJcbmdnZi5IaXRCb3ggPSBIaXRCb3g7XHJcbmdnZi5WZWN0b3IyRCA9IFZlY3RvcjJEO1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuaW1wb3J0IFZlY3RvcjJEIGZyb20gJy4vVmVjdG9yMkQnO1xyXG5cclxuY2xhc3MgSGl0Qm94e1xyXG4gIGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHBvc2l0aW9uLCByb3RhdGlvbil7XHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMucG9zaXRpb24gPSBuZXcgVmVjdG9yMkQocG9zaXRpb24ueCwgcG9zaXRpb24ueSk7XHJcbiAgICB0aGlzLnJvdGF0aW9uID0gcm90YXRpb247XHJcbiAgICB0aGlzLnZlcnRleHMgPSB0aGlzLmdldFZlcnRleHMoKTtcclxuICAgIHRoaXMuYXhlcyA9IHRoaXMuZ2V0QXhlcygpO1xyXG4gIH1cclxuICBnZXRWZXJ0ZXhzKCl7XHJcbiAgICBsZXQgdmVydGV4SW5pdGlhbDAgPSBuZXcgVmVjdG9yMkQodGhpcy5wb3NpdGlvbi54IC0gdGhpcy53aWR0aC8yLCB0aGlzLnBvc2l0aW9uLnkgLSB0aGlzLmhlaWdodC8yKTtcclxuICAgIGxldCB2ZXJ0ZXhJbml0aWFsMSA9IG5ldyBWZWN0b3IyRCh2ZXJ0ZXhJbml0aWFsMC54ICsgdGhpcy53aWR0aCwgdmVydGV4SW5pdGlhbDAueSk7XHJcbiAgICBsZXQgdmVydGV4SW5pdGlhbDIgPSBuZXcgVmVjdG9yMkQodmVydGV4SW5pdGlhbDAueCArIHRoaXMud2lkdGgsIHZlcnRleEluaXRpYWwwLnkgKyB0aGlzLmhlaWdodCk7XHJcbiAgICBsZXQgdmVydGV4SW5pdGlhbDMgPSBuZXcgVmVjdG9yMkQodmVydGV4SW5pdGlhbDAueCwgdmVydGV4SW5pdGlhbDAueSArIHRoaXMuaGVpZ2h0KTtcclxuICAgIGxldCB2ZXJ0ZXhzID0gbmV3IEFycmF5KDQpO1xyXG4gICAgdmVydGV4c1swXSA9IHZlcnRleEluaXRpYWwwLnJvdGF0ZSh0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIHZlcnRleHNbMV0gPSB2ZXJ0ZXhJbml0aWFsMS5yb3RhdGUodGhpcy5yb3RhdGlvbiwgdGhpcy5wb3NpdGlvbik7XHJcbiAgICB2ZXJ0ZXhzWzJdID0gdmVydGV4SW5pdGlhbDIucm90YXRlKHRoaXMucm90YXRpb24sIHRoaXMucG9zaXRpb24pO1xyXG4gICAgdmVydGV4c1szXSA9IHZlcnRleEluaXRpYWwzLnJvdGF0ZSh0aGlzLnJvdGF0aW9uLCB0aGlzLnBvc2l0aW9uKTtcclxuICAgIHJldHVybiB2ZXJ0ZXhzO1xyXG4gIH1cclxuICBnZXRBeGVzKCl7XHJcbiAgICBsZXQgYXhlcyA9IG5ldyBBcnJheSgyKTtcclxuICAgIGF4ZXNbMF0gPSBuZXcgVmVjdG9yMkQodGhpcy52ZXJ0ZXhzWzFdLngsIHRoaXMudmVydGV4c1sxXS55LCB0aGlzLnZlcnRleHNbMF0ueCwgdGhpcy52ZXJ0ZXhzWzBdLnkpO1xyXG4gICAgYXhlc1sxXSA9IG5ldyBWZWN0b3IyRCh0aGlzLnZlcnRleHNbMl0ueCwgdGhpcy52ZXJ0ZXhzWzJdLnksIHRoaXMudmVydGV4c1sxXS54LCB0aGlzLnZlcnRleHNbMV0ueSk7XHJcbiAgICByZXR1cm4gYXhlcztcclxuICB9XHJcbiAgbW92ZVZlcnRleHModmVjdG9yKXtcclxuICAgIHRoaXMudmVydGV4c1swXS54ICs9IHZlY3Rvci54O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzBdLnkgKz0gdmVjdG9yLnk7XHJcbiAgICB0aGlzLnZlcnRleHNbMV0ueCArPSB2ZWN0b3IueDtcclxuICAgIHRoaXMudmVydGV4c1sxXS55ICs9IHZlY3Rvci55O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzJdLnggKz0gdmVjdG9yLng7XHJcbiAgICB0aGlzLnZlcnRleHNbMl0ueSArPSB2ZWN0b3IueTtcclxuICAgIHRoaXMudmVydGV4c1szXS54ICs9IHZlY3Rvci54O1xyXG4gICAgdGhpcy52ZXJ0ZXhzWzNdLnkgKz0gdmVjdG9yLnk7XHJcbiAgfVxyXG4gIHByb2plY3Rpb24ocHJveWVjdGlvblZlY3Rvcil7XHJcbiAgICBsZXQgbWluID0gdGhpcy52ZXJ0ZXhzWzBdLnByb2plY3Rpb24ocHJveWVjdGlvblZlY3Rvcik7XHJcbiAgICBsZXQgbWF4ID0gbWluO1xyXG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLnZlcnRleHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IHAgPSB0aGlzLnZlcnRleHNbaV0ucHJvamVjdGlvbihwcm95ZWN0aW9uVmVjdG9yKTtcclxuICAgICAgaWYgKHAgPCBtaW4pIG1pbiA9IHA7XHJcbiAgICAgIGVsc2UgaWYgKHAgPiBtYXgpIG1heCA9IHA7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFByb2plY3Rpb24obWluLCBtYXgpO1xyXG4gIH1cclxuICBvdmVybGFwKGhpdGJveCl7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYXhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgYXhpcyA9IHRoaXMuYXhlc1tpXTtcclxuICAgICAgbGV0IHByb2plY3Rpb24xID0gdGhpcy5wcm9qZWN0aW9uKGF4aXMpO1xyXG4gICAgICBsZXQgcHJvamVjdGlvbjIgPSBoaXRib3gucHJvamVjdGlvbihheGlzKTtcclxuICAgICAgaWYgKCFwcm9qZWN0aW9uMS5vdmVybGFwKHByb2plY3Rpb24yKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGl0Ym94LmF4ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGF4aXMgPSBoaXRib3guYXhlc1tpXTtcclxuICAgICAgbGV0IHByb2plY3Rpb24xID0gdGhpcy5wcm9qZWN0aW9uKGF4aXMpO1xyXG4gICAgICBsZXQgcHJvamVjdGlvbjIgPSBoaXRib3gucHJvamVjdGlvbihheGlzKTtcclxuICAgICAgaWYgKCFwcm9qZWN0aW9uMS5vdmVybGFwKHByb2plY3Rpb24yKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuICB1cGRhdGUocG9zaXRpb24sIHJvdGF0aW9uKXtcclxuICAgIHBvc2l0aW9uID0gbmV3IFZlY3RvcjJEKHBvc2l0aW9uLngsIHBvc2l0aW9uLnkpO1xyXG4gICAgaWYocm90YXRpb24gIT0gdGhpcy5yb3RhdGlvbil7XHJcbiAgICAgIHRoaXMucm90YXRpb24gPSByb3RhdGlvbjtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgICB0aGlzLnZlcnRleHMgPSB0aGlzLmdldFZlcnRleHMoKTtcclxuICAgICAgdGhpcy5heGVzID0gdGhpcy5nZXRBeGVzKCk7XHJcbiAgICB9ZWxzZSBpZighcG9zaXRpb24uZXF1YWxzKHRoaXMucG9zaXRpb24pKXtcclxuICAgICAgdGhpcy5tb3ZlVmVydGV4cyhuZXcgVmVjdG9yMkQocG9zaXRpb24ueCwgcG9zaXRpb24ueSwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpKTtcclxuICAgICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgUHJvamVjdGlvbntcclxuICBjb25zdHJ1Y3RvcihtaW4sIG1heCl7XHJcbiAgICB0aGlzLm1pbiA9IG1pbjtcclxuICAgIHRoaXMubWF4ID0gbWF4O1xyXG4gIH1cclxuICBvdmVybGFwKHByb2plY3Rpb24pe1xyXG4gICAgcmV0dXJuIHRoaXMubWF4ID4gcHJvamVjdGlvbi5taW4gJiYgcHJvamVjdGlvbi5tYXggPiB0aGlzLm1pbjtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gSGl0Qm94O1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIFZlY3RvcjJEe1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHgyID0gMCwgeTIgPSAwKXtcclxuICAgIHRoaXMueCA9IHggLSB4MjtcclxuICAgIHRoaXMueSA9IHkgLSB5MjtcclxuICB9XHJcbiAgbm9ybWFsKCl7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKC10aGlzLnksIHRoaXMueCk7XHJcbiAgfVxyXG4gIG1hZ25pdHVkZSgpe1xyXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLngsIDIpICsgTWF0aC5wb3codGhpcy55LCAyKSk7XHJcbiAgfVxyXG4gIHByb2plY3Rpb24ocHJveWVjdGlvblZlY3Rvcil7XHJcbiAgICBsZXQgcHJveWVjdGlvblZlY3Rvck1hZ25pdHVkZSA9IHByb3llY3Rpb25WZWN0b3IubWFnbml0dWRlKCk7XHJcbiAgICByZXR1cm4gKHRoaXMueCAqIChwcm95ZWN0aW9uVmVjdG9yLngvcHJveWVjdGlvblZlY3Rvck1hZ25pdHVkZSkpICsgKHRoaXMueSAqIChwcm95ZWN0aW9uVmVjdG9yLnkvcHJveWVjdGlvblZlY3Rvck1hZ25pdHVkZSkpO1xyXG4gIH1cclxuICByb3RhdGUoYW5nbGUsIG9yaWdpblBvaW50ID0gbmV3IFZlY3RvcjJEKDAsMCkpe1xyXG4gICAgbGV0IG5ld1ggPSAoKHRoaXMueCAtIG9yaWdpblBvaW50LngpKk1hdGguY29zKGFuZ2xlKSkgLSAoKHRoaXMueSAtIG9yaWdpblBvaW50LnkpKk1hdGguc2luKGFuZ2xlKSkgKyBvcmlnaW5Qb2ludC54O1xyXG4gICAgbGV0IG5ld1kgPSAoKHRoaXMueCAtIG9yaWdpblBvaW50LngpKk1hdGguc2luKGFuZ2xlKSkgKyAoKHRoaXMueSAtIG9yaWdpblBvaW50LnkpKk1hdGguY29zKGFuZ2xlKSkgKyBvcmlnaW5Qb2ludC55O1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IyRChuZXdYLCBuZXdZKTtcclxuICB9XHJcbiAgZXF1YWxzKHZlY3Rvcil7XHJcbiAgICBpZih0aGlzLnggPT0gdmVjdG9yLnggJiYgdGhpcy55ID09IHZlY3Rvci55KSByZXR1cm4gdHJ1ZTtcclxuICAgIHJldHVybiBmYWxzZTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gVmVjdG9yMkQ7XHJcbiJdfQ==
