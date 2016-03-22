window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame;
})();
window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
var ggf;
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
  }]);

  return Entity;
})(PIXI.Sprite);

module.exports = Entity;

},{}],2:[function(require,module,exports){
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

    this.renderer = PIXI.autoDetectRenderer(this.width, this.height, { backgroundColor: 0x000000 });

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

},{"./Entity":1,"./Stage":3}],3:[function(require,module,exports){
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*jshint esnext: true */

var Stage = function Stage(game) {
  _classCallCheck(this, Stage);

  this.game = game;
  this.graphics = new PIXI.Container();
};

module.exports = Stage;

},{}],4:[function(require,module,exports){
'use strict';

var _Game = require('./core/Game');

var _Game2 = _interopRequireDefault(_Game);

var _Stage = require('./core/Stage');

var _Stage2 = _interopRequireDefault(_Stage);

var _Entity = require('./core/Entity');

var _Entity2 = _interopRequireDefault(_Entity);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ggf = {}; /*jshint esnext: true */

ggf.Game = _Game2.default;
ggf.Stage = _Stage2.default;

},{"./core/Entity":1,"./core/Game":2,"./core/Stage":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGNvcmVcXEVudGl0eS5qcyIsInNyY1xcY29yZVxcR2FtZS5qcyIsInNyY1xcY29yZVxcU3RhZ2UuanMiLCJzcmNcXGluZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7O0lDRU0sTUFBTTtZQUFOLE1BQU07O0FBQ1YsV0FESSxNQUFNLENBQ0UsSUFBSSxFQUFFLEtBQUssRUFBVTs7OzBCQUQ3QixNQUFNOztzQ0FDa0IsSUFBSTtBQUFKLFVBQUk7OztnR0FENUIsTUFBTSxtREFFQyxJQUFJOztBQUNiLFVBQUssSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixVQUFLLEtBQUssR0FBRyxLQUFLLENBQUM7O0dBQ3BCOztlQUxHLE1BQU07OzBCQU1KLENBQUMsRUFBRSxDQUFDLEVBQUM7QUFDVCxVQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQztBQUNULFVBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDO0FBQ1QsVUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3BDOzs7U0FWRyxNQUFNO0dBQVMsSUFBSSxDQUFDLE1BQU07O0FBYWhDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDWGxCLElBQUk7QUFDUixXQURJLElBQUksQ0FDSSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBZTtRQUFiLE9BQU8seURBQUcsRUFBRTs7MEJBRGhELElBQUk7O0FBR04sUUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDL0IsUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRXJCLFFBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxRQUFR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VUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixXQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBQztBQUNsQixjQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BQ3pCO0FBQ0QsYUFBTyxNQUFNLENBQUM7S0FDZjs7O1NBeklHLElBQUk7OztBQTZJVixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzs7Ozs7Ozs7O0lDL0loQixLQUFLLEdBQ1QsU0FESSxLQUFLLENBQ0csSUFBSSxFQUFDO3dCQURiLEtBQUs7O0FBRVAsTUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsTUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUN0Qzs7QUFHSCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0h2QixHQUFHLEdBQUcsRUFBRTs7QUFBQyxBQUNULEdBQUcsQ0FBQyxJQUFJLGlCQUFPLENBQUM7QUFDaEIsR0FBRyxDQUFDLEtBQUssa0JBQVEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIEVudGl0eSBleHRlbmRzIFBJWEkuU3ByaXRle1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUsIHN0YWdlLCAuLi5hcmdzKXtcclxuICAgIHN1cGVyKC4uLmFyZ3MpO1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuc3RhZ2UgPSBzdGFnZTtcclxuICB9XHJcbiAgc3Bhd24oeCwgeSl7XHJcbiAgICB0aGlzLng9eDtcclxuICAgIHRoaXMueT15O1xyXG4gICAgdGhpcy5zdGFnZS5ncmFwaGljcy5hZGRDaGlsZCh0aGlzKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRW50aXR5O1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuaW1wb3J0IFN0YWdlIGZyb20gJy4vU3RhZ2UnO1xyXG5pbXBvcnQgRW50aXR5IGZyb20gJy4vRW50aXR5JztcclxuXHJcbmNsYXNzIEdhbWV7XHJcbiAgY29uc3RydWN0b3IoaWRDb250YWluZXIsIHdpZHRoLCBoZWlnaHQsIG9wdGlvbnMgPSB7fSl7XHJcblxyXG4gICAgdGhpcy5pZENvbnRhaW5lciA9IGlkQ29udGFpbmVyO1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblxyXG4gICAgdGhpcy5zdGFnZXMgPSB7fTtcclxuICAgIHRoaXMuZW50aXRpZXMgPSB7fTtcclxuXHJcbiAgICBpZihvcHRpb25zLmZwcykgdGhpcy5mcHMgPSBvcHRpb25zLmZwcztcclxuICAgIGVsc2UgdGhpcy5mcHMgPSAtMTtcclxuXHJcbiAgICBpZihvcHRpb25zLnRwcykgdGhpcy50cHMgPSBvcHRpb25zLnRwcztcclxuICAgIGVsc2UgdGhpcy50cHMgPSA2MDtcclxuXHJcbiAgICBpZihvcHRpb25zLmluaXRTdGFnZSkgIHRoaXMubG9hZFN0YWdlKG9wdGlvbnMuaW5pdFN0YWdlKTtcclxuICAgIGVsc2UgdGhpcy5jdXJyU3RhZ2UgPSBuZXcgU3RhZ2UoKTtcclxuXHJcbiAgICB0aGlzLnJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHtiYWNrZ3JvdW5kQ29sb3IgOiAweDAwMDAwMH0pO1xyXG5cclxuICAgIHRoaXMudGhlbiA9IERhdGUubm93KCk7XHJcblxyXG4gICAgc3dpdGNoICh0aGlzLmZwcykge1xyXG5cclxuICAgICAgY2FzZSB0aGlzLnRwczpcclxuICAgICAgICB0aGlzLmZyYW1lSW50ZXJ2YWwgPSAxMDAwL3RoaXMuZnBzO1xyXG4gIFx0XHRcdHRoaXMubG9vcCA9IHRoaXMuc2ltcGxlTG9vcDtcclxuICAgICAgICB0aGlzLmRlbHRhID0gMDtcclxuICBcdFx0XHRicmVhaztcclxuXHJcbiAgICAgIGNhc2UgLTE6XHJcbiAgICAgICAgdGhpcy50aWNrc0ludGVydmFsID0gMTAwMC90aGlzLnRwcztcclxuICAgICAgICB0aGlzLmxhZyA9IDA7XHJcbiAgXHRcdFx0dGhpcy5sb29wID0gdGhpcy5mcHNVbmxpbWl0ZWRMb29wO1xyXG4gIFx0XHQgIGJyZWFrO1xyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICB0aGlzLmZyYW1lSW50ZXJ2YWwgPSAxMDAwL3RoaXMuZnBzO1xyXG4gICAgICAgIHRoaXMudGlja3NJbnRlcnZhbCA9IDEwMDAvdGhpcy50cHM7XHJcbiAgICAgICAgdGhpcy50aGVuQXV4ID0gRGF0ZS5ub3coKTtcclxuICAgICAgICB0aGlzLmRlbHRhID0gMDtcclxuICAgICAgICB0aGlzLmxhZyA9IDA7XHJcbiAgXHRcdFx0dGhpcy5sb29wID0gdGhpcy5mcHNMb2NrZWRMb29wO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gIFx0fVxyXG5cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWRDb250YWluZXIpLmFwcGVuZENoaWxkKHRoaXMucmVuZGVyZXIudmlldyk7XHJcbiAgfVxyXG5cclxuICBzaW1wbGVMb29wKCl7XHJcbiAgXHR0aGlzLmZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgXHRsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICBcdHRoaXMuZGVsdGEgPSBub3cgLSB0aGlzLnRoZW47XHJcbiAgXHRpZiAodGhpcy5kZWx0YSA+IHRoaXMuZnJhbWVJbnRlcnZhbCkge1xyXG4gIFx0XHR0aGlzLnVwZGF0ZSgpO1xyXG4gIFx0XHQvL3VwZGF0ZUlucHV0cygpO1xyXG4gIFx0XHR0aGlzLnJlbmRlcigpO1xyXG4gIFx0XHR0aGlzLnRoZW4gPSBub3cgLSAodGhpcy5kZWx0YSAlIHRoaXMuZnJhbWVJbnRlcnZhbCk7XHJcbiAgXHR9XHJcbiAgfVxyXG5cclxuICBmcHNVbmxpbWl0ZWRMb29wKCl7XHJcbiAgXHR0aGlzLmZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgXHRsZXQgbm93ID0gRGF0ZS5ub3coKTtcclxuICBcdHRoaXMubGFnICs9IG5vdyAtIHRoaXMudGhlbjtcclxuICBcdHRoaXMudGhlbiA9IG5vdztcclxuICBcdHdoaWxlKHRoaXMudGlja3NJbnRlcnZhbCA8IHRoaXMubGFnKXtcclxuICBcdFx0dGhpcy51cGRhdGUoKTtcclxuICBcdFx0Ly91cGRhdGVJbnB1dHMoKTtcclxuICBcdFx0dGhpcy5sYWcgLT0gdGhpcy50aWNrc0ludGVydmFsO1xyXG4gIFx0fVxyXG4gIFx0dGhpcy5yZW5kZXIoKTtcclxuICB9XHJcblxyXG4gIGZwc0xvY2tlZExvb3AoKXtcclxuICBcdHRoaXMuZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuICBcdGxldCBub3cgPSBEYXRlLm5vdygpO1xyXG4gIFx0dGhpcy5sYWcgKz0gbm93IC0gdGhpcy50aGVuO1xyXG4gIFx0dGhpcy5kZWx0YSA9IG5vdyAtIHRoaXMudGhlbkF1eDtcclxuICBcdHRoaXMudGhlbiA9IG5vdztcclxuICBcdHdoaWxlKHRoaXMudGlja3NJbnRlcnZhbCA8IHRoaXMubGFnKXtcclxuICBcdFx0dGhpcy51cGRhdGUoKTtcclxuICBcdFx0Ly91cGRhdGVJbnB1dHMoKTtcclxuICBcdFx0dGhpcy5sYWcgLT0gdGhpcy50aWNrc0ludGVydmFsO1xyXG4gIFx0fVxyXG4gIFx0aWYgKHRoaXMuZGVsdGEgPiB0aGlzLmZyYW1lSW50ZXJ2YWwpIHtcclxuICBcdFx0dGhpcy5yZW5kZXIoKTtcclxuICBcdFx0dGhpcy50aGVuQXV4ID0gbm93IC0gKHRoaXMuZGVsdGEgJSB0aGlzLmZyYW1lSW50ZXJ2YWwpO1xyXG4gIFx0fVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCl7XHJcbiAgICB0aGlzLmN1cnJTdGFnZS51cGRhdGUoKTtcclxuICB9XHJcblxyXG4gIHJlbmRlcigpe1xyXG4gICAgdGhpcy5yZW5kZXJlci5yZW5kZXIodGhpcy5jdXJyU3RhZ2UuZ3JhcGhpY3MpO1xyXG4gIH1cclxuXHJcbiAgbG9hZFN0YWdlKHN0YWdlKXtcclxuICAgIHRoaXMuY3VyclN0YWdlID0gc3RhZ2U7XHJcbiAgICB0aGlzLmN1cnJTdGFnZS5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5sb29wKCk7XHJcbiAgfVxyXG5cclxuICBzdG9wKCl7XHJcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5mcmFtZSk7XHJcbiAgfVxyXG5cclxuICBjcmVhdGVTdGFnZShuYW1lLCBwcm9wKXtcclxuICAgIHRoaXMuc3RhZ2VzW25hbWVdID0gcHJvcDtcclxuICB9XHJcblxyXG4gIGNyZWF0ZUVudGl0eShuYW1lLCBwcm9wKXtcclxuICAgIHRoaXMuZW50aXRpZXNbbmFtZV0gPSBwcm9wO1xyXG4gIH1cclxuXHJcbiAgZ2V0U3RhZ2UobmFtZSl7XHJcbiAgICBsZXQgc3RhZ2UgPSBuZXcgU3RhZ2UodGhpcyk7XHJcbiAgICBsZXQgcHJvcCA9IHRoaXMuc3RhZ2VzW25hbWVdO1xyXG4gICAgZm9yKGxldCBrZXkgaW4gcHJvcCl7XHJcbiAgICAgIHN0YWdlW2tleV0gPSBwcm9wW2tleV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc3RhZ2U7XHJcbiAgfVxyXG5cclxuICBsb2FkRW50aXR5KG5hbWUsIHN0YWdlKXtcclxuICAgIGxldCBlbnRpdHkgPSBuZXcgRW50aXR5KHRoaXMsIHN0YWdlKTtcclxuICAgIGxldCBwcm9wID0gdGhpcy5lbnRpdGllc1tuYW1lXTtcclxuICAgIGZvcihsZXQga2V5IGluIHByb3Ape1xyXG4gICAgICBlbnRpdHlba2V5XSA9IHByb3Bba2V5XTtcclxuICAgIH1cclxuICAgIHJldHVybiBlbnRpdHk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xyXG4iLCIvKmpzaGludCBlc25leHQ6IHRydWUgKi9cclxuXHJcbmNsYXNzIFN0YWdle1xyXG4gIGNvbnN0cnVjdG9yKGdhbWUpe1xyXG4gICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgIHRoaXMuZ3JhcGhpY3MgPSBuZXcgUElYSS5Db250YWluZXIoKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3RhZ2U7XHJcbiIsIi8qanNoaW50IGVzbmV4dDogdHJ1ZSAqL1xyXG5cclxuaW1wb3J0IEdhbWUgZnJvbSAnLi9jb3JlL0dhbWUnO1xyXG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9jb3JlL1N0YWdlJztcclxuaW1wb3J0IEVudGl0eSBmcm9tICcuL2NvcmUvRW50aXR5JztcclxuXHJcbmdnZiA9IHt9O1xyXG5nZ2YuR2FtZSA9IEdhbWU7XHJcbmdnZi5TdGFnZSA9IFN0YWdlO1xyXG4iXX0=
