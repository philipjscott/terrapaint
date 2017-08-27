/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__src_index__);


var isSupported = true
var map

try {
  var imageTest = new ImageData(20, 20)
  var numberTest = Math.trunc(20.1)
} catch (e) {
  isSupported = false

  while (document.body.firstChild) {
    document.body.removeChild(document.body.firstChild)
  }
  var title = document.createElement('h1')
  var desc = document.createElement('h2')
  var errMsg = document.createElement('p')

  title.innerHTML = 'Terrapaint'
  desc.innerHTML = 'A simple wrapper that lets you draw heightmaps easily.'
  errMsg.innerHTML = 'Sorry, your browser is not supported. Please switch '
  errMsg.innerHTML += 'to Vivaldi, Firefox, Chrome, Opera, Edge, or Safari.'

  document.body.appendChild(title)
  document.body.appendChild(desc)
  document.body.appendChild(errMsg)
}

if (isSupported) {
  $('args-submit').addEventListener('click', function () {
    var height = parseInt($('args-height').value) || 128
    var width = parseInt($('args-width').value) || 128
    var octaves = parseInt($('args-octaves').value) || 5
    var period = parseInt($('args-period').value) || 64
    var animated = $('args-animated').checked
    var type = $('args-type').options[$('args-type').selectedIndex].value
    var colormap = $('args-colormap').options[$('args-colormap').selectedIndex].value
    var fn
    var offset = true

    noise.seed(Math.random())

    switch (type) {
      case 'white':
        fn = Math.random
        offset = false
        break
      case 'perlin':
        fn = animated ? noise.perlin3 : noise.perlin2
        break
      default:
        fn = animated ? noise.simplex3 : noise.simplex2
    }

    switch (colormap) {
      case 'island':
        colormap = islandColormap
        break
      default:
        colormap = undefined
    }

    if ($('entry').firstChild) {
      $('entry').removeChild($('entry').firstChild)
    }
  
    var config = {
      octaves: octaves,
      period: period,
      colormap: colormap,
      offset: offset
    }
    if (animated) {
      config.init = [0]
      config.update = function (dim) { return [dim[0] + 0.00001] }
    }

    if (map) map.stop()

    map = __WEBPACK_IMPORTED_MODULE_0__src_index___default.a.map(fn, config)
    map.create('#entry', width, height)
    map.loop()
  })
}
function $ (id) {
  return document.getElementById(id)
}

function islandColormap (val) {
  if (val < 120) {
    return [0, 162, 232, 255]
  }
  else if (val < 130) {
    return [153, 217, 234, 255]
  }
  else if (val < 140) {
    return [239, 228, 176, 255]
  }
  else if (val < 160) {
    return [181, 230, 29, 255]
  }
  else if (val < 185) {
    return [34, 177, 76, 255]
  }
  else if (val < 190) {
    return [185, 122, 87, 255]
  } 
  else if (val < 200) {
    return [195, 195, 195, 255]
  }
  else if (val < 210) {
    return [127, 127, 127, 255]
  }
  else {
    return [255, 255, 255, 255]
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

try {
  var imageTest = new ImageData(20, 20)
  var numberTest = Math.trunc(20.1)
} catch (e) {
  var err = 'Error, browser not supported by Terrapaint. '
  err += 'Please switch to Vivaldi, Firefox, Chrome, Opera, or Safari.'
  console.log(err)
}

function terrapaintFactory () {
  function octavate () {
    var val = 0
    var max = 0
    var p = this.period
    var amp = Math.pow(this.persistance, this.octaves)
    var args = []
    for (var i = 0; i < this.octaves; i++) {
      for (var j = 0; j < arguments.length; j++) {
        args[j] = arguments[j] / p
      }
      val += (this.noise.apply(null, args) + this.offset) * amp
      max += amp * (this.offset + 1)
      amp /= this.persistance
      p /= 2
    }
    return val / max
  }
  function setOptions (options) {
    options = options || {}
    this.octaves = options.octaves || 1
    this.period = options.period || 32
    this.offset = options.offset ? 1 : 0
    this.persistance = options.persistance || 2
    this.update = options.update || function () { throw 'No update fn' }
    this.loopvalues = options.init || []
    this.colormap = options.colormap || function (v) { return [v, v, v, 255] }
  }
  
  function Map (noise, options) {
    setOptions.call(this, options)
    this.noise = noise
  }
  Map.prototype.compute = function (width, height) {
    var map = new Uint8ClampedArray(width * height * 4)
    for (var y = 0; y < height; y++) {
      for (var x = 0; x < width; x++) {
        if (this.loopvalues.length !== 0) {
          this.loopvalues = this.update(this.loopvalues)
        }
        var noiseArgs = [x, y].concat(this.loopvalues)
        var val = Math.trunc(octavate.apply(this, noiseArgs) * 255)
        var pixelData
        if (typeof this.colormap === 'function') {
          pixelData = this.colormap(val)
        } else {
          pixelData = this.colormap[val]
        }
        map.set(pixelData, x * 4 + y * 4 * width)
      }
    }
    return new ImageData(map, width, height)
  }
  Map.prototype.draw = function (canvas) {
    canvas = typeof canvas === 'string'
      ? document.querySelector(canvas)
      : canvas
    canvas.getContext('2d').putImageData(this.compute(
      canvas.width,
      canvas.height
    ), 0, 0)
    this.canvas = canvas
  }
  Map.prototype.create = function (target, width, height) {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    target = typeof target === 'string'
      ? document.querySelector(target)
      : target
    canvas.width = width
    canvas.height = height
    ctx.putImageData(this.compute(width, height), 0, 0)
    target.appendChild(canvas)
    this.canvas = canvas
  }
  Map.prototype.loop = function () {
    var that = this
    var fn = function () {
      that.draw(that.canvas)
      this.animReq = requestAnimationFrame(fn)
    }
    this.animReq = requestAnimationFrame(fn)
  }
  Map.prototype.stop = function () {
    cancelAnimationFrame(this.animReq)
  }

  var module = {
    map: function (noise, options) {
      return new Map(noise, options)
    },
    curve: function () {
      return new Curve()
    },
    THREE2: function () {
      return new THREE2()
    },
    THREE3: function () {
      return new THREE3()
    }
  }

  return module
}

module.exports = terrapaintFactory()


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYmMxMDIzMTM2ZmM3NDIzYmNjZGIiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9kZW1vLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0FDN0RBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0M7QUFDdEM7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BIQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsa0JBQWtCO0FBQ3JDLHFCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0Esc0RBQXNEO0FBQ3REOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CLHFCQUFxQixXQUFXO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGJjMTAyMzEzNmZjNzQyM2JjY2RiIiwiaW1wb3J0IHRlcnJhcGFpbnQgZnJvbSAnLi4vc3JjL2luZGV4J1xyXG5cclxudmFyIGlzU3VwcG9ydGVkID0gdHJ1ZVxyXG52YXIgbWFwXHJcblxyXG50cnkge1xyXG4gIHZhciBpbWFnZVRlc3QgPSBuZXcgSW1hZ2VEYXRhKDIwLCAyMClcclxuICB2YXIgbnVtYmVyVGVzdCA9IE1hdGgudHJ1bmMoMjAuMSlcclxufSBjYXRjaCAoZSkge1xyXG4gIGlzU3VwcG9ydGVkID0gZmFsc2VcclxuXHJcbiAgd2hpbGUgKGRvY3VtZW50LmJvZHkuZmlyc3RDaGlsZCkge1xyXG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChkb2N1bWVudC5ib2R5LmZpcnN0Q2hpbGQpXHJcbiAgfVxyXG4gIHZhciB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJylcclxuICB2YXIgZGVzYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJylcclxuICB2YXIgZXJyTXNnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXHJcblxyXG4gIHRpdGxlLmlubmVySFRNTCA9ICdUZXJyYXBhaW50J1xyXG4gIGRlc2MuaW5uZXJIVE1MID0gJ0Egc2ltcGxlIHdyYXBwZXIgdGhhdCBsZXRzIHlvdSBkcmF3IGhlaWdodG1hcHMgZWFzaWx5LidcclxuICBlcnJNc2cuaW5uZXJIVE1MID0gJ1NvcnJ5LCB5b3VyIGJyb3dzZXIgaXMgbm90IHN1cHBvcnRlZC4gUGxlYXNlIHN3aXRjaCAnXHJcbiAgZXJyTXNnLmlubmVySFRNTCArPSAndG8gVml2YWxkaSwgRmlyZWZveCwgQ2hyb21lLCBPcGVyYSwgRWRnZSwgb3IgU2FmYXJpLidcclxuXHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aXRsZSlcclxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRlc2MpXHJcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlcnJNc2cpXHJcbn1cclxuXHJcbmlmIChpc1N1cHBvcnRlZCkge1xyXG4gICQoJ2FyZ3Mtc3VibWl0JykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgaGVpZ2h0ID0gcGFyc2VJbnQoJCgnYXJncy1oZWlnaHQnKS52YWx1ZSkgfHwgMTI4XHJcbiAgICB2YXIgd2lkdGggPSBwYXJzZUludCgkKCdhcmdzLXdpZHRoJykudmFsdWUpIHx8IDEyOFxyXG4gICAgdmFyIG9jdGF2ZXMgPSBwYXJzZUludCgkKCdhcmdzLW9jdGF2ZXMnKS52YWx1ZSkgfHwgNVxyXG4gICAgdmFyIHBlcmlvZCA9IHBhcnNlSW50KCQoJ2FyZ3MtcGVyaW9kJykudmFsdWUpIHx8IDY0XHJcbiAgICB2YXIgYW5pbWF0ZWQgPSAkKCdhcmdzLWFuaW1hdGVkJykuY2hlY2tlZFxyXG4gICAgdmFyIHR5cGUgPSAkKCdhcmdzLXR5cGUnKS5vcHRpb25zWyQoJ2FyZ3MtdHlwZScpLnNlbGVjdGVkSW5kZXhdLnZhbHVlXHJcbiAgICB2YXIgY29sb3JtYXAgPSAkKCdhcmdzLWNvbG9ybWFwJykub3B0aW9uc1skKCdhcmdzLWNvbG9ybWFwJykuc2VsZWN0ZWRJbmRleF0udmFsdWVcclxuICAgIHZhciBmblxyXG4gICAgdmFyIG9mZnNldCA9IHRydWVcclxuXHJcbiAgICBub2lzZS5zZWVkKE1hdGgucmFuZG9tKCkpXHJcblxyXG4gICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgIGNhc2UgJ3doaXRlJzpcclxuICAgICAgICBmbiA9IE1hdGgucmFuZG9tXHJcbiAgICAgICAgb2Zmc2V0ID0gZmFsc2VcclxuICAgICAgICBicmVha1xyXG4gICAgICBjYXNlICdwZXJsaW4nOlxyXG4gICAgICAgIGZuID0gYW5pbWF0ZWQgPyBub2lzZS5wZXJsaW4zIDogbm9pc2UucGVybGluMlxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgZm4gPSBhbmltYXRlZCA/IG5vaXNlLnNpbXBsZXgzIDogbm9pc2Uuc2ltcGxleDJcclxuICAgIH1cclxuXHJcbiAgICBzd2l0Y2ggKGNvbG9ybWFwKSB7XHJcbiAgICAgIGNhc2UgJ2lzbGFuZCc6XHJcbiAgICAgICAgY29sb3JtYXAgPSBpc2xhbmRDb2xvcm1hcFxyXG4gICAgICAgIGJyZWFrXHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgY29sb3JtYXAgPSB1bmRlZmluZWRcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJCgnZW50cnknKS5maXJzdENoaWxkKSB7XHJcbiAgICAgICQoJ2VudHJ5JykucmVtb3ZlQ2hpbGQoJCgnZW50cnknKS5maXJzdENoaWxkKVxyXG4gICAgfVxyXG4gIFxyXG4gICAgdmFyIGNvbmZpZyA9IHtcclxuICAgICAgb2N0YXZlczogb2N0YXZlcyxcclxuICAgICAgcGVyaW9kOiBwZXJpb2QsXHJcbiAgICAgIGNvbG9ybWFwOiBjb2xvcm1hcCxcclxuICAgICAgb2Zmc2V0OiBvZmZzZXRcclxuICAgIH1cclxuICAgIGlmIChhbmltYXRlZCkge1xyXG4gICAgICBjb25maWcuaW5pdCA9IFswXVxyXG4gICAgICBjb25maWcudXBkYXRlID0gZnVuY3Rpb24gKGRpbSkgeyByZXR1cm4gW2RpbVswXSArIDAuMDAwMDFdIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAobWFwKSBtYXAuc3RvcCgpXHJcblxyXG4gICAgbWFwID0gdGVycmFwYWludC5tYXAoZm4sIGNvbmZpZylcclxuICAgIG1hcC5jcmVhdGUoJyNlbnRyeScsIHdpZHRoLCBoZWlnaHQpXHJcbiAgICBtYXAubG9vcCgpXHJcbiAgfSlcclxufVxyXG5mdW5jdGlvbiAkIChpZCkge1xyXG4gIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcclxufVxyXG5cclxuZnVuY3Rpb24gaXNsYW5kQ29sb3JtYXAgKHZhbCkge1xyXG4gIGlmICh2YWwgPCAxMjApIHtcclxuICAgIHJldHVybiBbMCwgMTYyLCAyMzIsIDI1NV1cclxuICB9XHJcbiAgZWxzZSBpZiAodmFsIDwgMTMwKSB7XHJcbiAgICByZXR1cm4gWzE1MywgMjE3LCAyMzQsIDI1NV1cclxuICB9XHJcbiAgZWxzZSBpZiAodmFsIDwgMTQwKSB7XHJcbiAgICByZXR1cm4gWzIzOSwgMjI4LCAxNzYsIDI1NV1cclxuICB9XHJcbiAgZWxzZSBpZiAodmFsIDwgMTYwKSB7XHJcbiAgICByZXR1cm4gWzE4MSwgMjMwLCAyOSwgMjU1XVxyXG4gIH1cclxuICBlbHNlIGlmICh2YWwgPCAxODUpIHtcclxuICAgIHJldHVybiBbMzQsIDE3NywgNzYsIDI1NV1cclxuICB9XHJcbiAgZWxzZSBpZiAodmFsIDwgMTkwKSB7XHJcbiAgICByZXR1cm4gWzE4NSwgMTIyLCA4NywgMjU1XVxyXG4gIH0gXHJcbiAgZWxzZSBpZiAodmFsIDwgMjAwKSB7XHJcbiAgICByZXR1cm4gWzE5NSwgMTk1LCAxOTUsIDI1NV1cclxuICB9XHJcbiAgZWxzZSBpZiAodmFsIDwgMjEwKSB7XHJcbiAgICByZXR1cm4gWzEyNywgMTI3LCAxMjcsIDI1NV1cclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICByZXR1cm4gWzI1NSwgMjU1LCAyNTUsIDI1NV1cclxuICB9XHJcbn1cclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9kb2NzL2RlbW8uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidHJ5IHtcclxuICB2YXIgaW1hZ2VUZXN0ID0gbmV3IEltYWdlRGF0YSgyMCwgMjApXHJcbiAgdmFyIG51bWJlclRlc3QgPSBNYXRoLnRydW5jKDIwLjEpXHJcbn0gY2F0Y2ggKGUpIHtcclxuICB2YXIgZXJyID0gJ0Vycm9yLCBicm93c2VyIG5vdCBzdXBwb3J0ZWQgYnkgVGVycmFwYWludC4gJ1xyXG4gIGVyciArPSAnUGxlYXNlIHN3aXRjaCB0byBWaXZhbGRpLCBGaXJlZm94LCBDaHJvbWUsIE9wZXJhLCBvciBTYWZhcmkuJ1xyXG4gIGNvbnNvbGUubG9nKGVycilcclxufVxyXG5cclxuZnVuY3Rpb24gdGVycmFwYWludEZhY3RvcnkgKCkge1xyXG4gIGZ1bmN0aW9uIG9jdGF2YXRlICgpIHtcclxuICAgIHZhciB2YWwgPSAwXHJcbiAgICB2YXIgbWF4ID0gMFxyXG4gICAgdmFyIHAgPSB0aGlzLnBlcmlvZFxyXG4gICAgdmFyIGFtcCA9IE1hdGgucG93KHRoaXMucGVyc2lzdGFuY2UsIHRoaXMub2N0YXZlcylcclxuICAgIHZhciBhcmdzID0gW11cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vY3RhdmVzOyBpKyspIHtcclxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBhcmd1bWVudHMubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICBhcmdzW2pdID0gYXJndW1lbnRzW2pdIC8gcFxyXG4gICAgICB9XHJcbiAgICAgIHZhbCArPSAodGhpcy5ub2lzZS5hcHBseShudWxsLCBhcmdzKSArIHRoaXMub2Zmc2V0KSAqIGFtcFxyXG4gICAgICBtYXggKz0gYW1wICogKHRoaXMub2Zmc2V0ICsgMSlcclxuICAgICAgYW1wIC89IHRoaXMucGVyc2lzdGFuY2VcclxuICAgICAgcCAvPSAyXHJcbiAgICB9XHJcbiAgICByZXR1cm4gdmFsIC8gbWF4XHJcbiAgfVxyXG4gIGZ1bmN0aW9uIHNldE9wdGlvbnMgKG9wdGlvbnMpIHtcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XHJcbiAgICB0aGlzLm9jdGF2ZXMgPSBvcHRpb25zLm9jdGF2ZXMgfHwgMVxyXG4gICAgdGhpcy5wZXJpb2QgPSBvcHRpb25zLnBlcmlvZCB8fCAzMlxyXG4gICAgdGhpcy5vZmZzZXQgPSBvcHRpb25zLm9mZnNldCA/IDEgOiAwXHJcbiAgICB0aGlzLnBlcnNpc3RhbmNlID0gb3B0aW9ucy5wZXJzaXN0YW5jZSB8fCAyXHJcbiAgICB0aGlzLnVwZGF0ZSA9IG9wdGlvbnMudXBkYXRlIHx8IGZ1bmN0aW9uICgpIHsgdGhyb3cgJ05vIHVwZGF0ZSBmbicgfVxyXG4gICAgdGhpcy5sb29wdmFsdWVzID0gb3B0aW9ucy5pbml0IHx8IFtdXHJcbiAgICB0aGlzLmNvbG9ybWFwID0gb3B0aW9ucy5jb2xvcm1hcCB8fCBmdW5jdGlvbiAodikgeyByZXR1cm4gW3YsIHYsIHYsIDI1NV0gfVxyXG4gIH1cclxuICBcclxuICBmdW5jdGlvbiBNYXAgKG5vaXNlLCBvcHRpb25zKSB7XHJcbiAgICBzZXRPcHRpb25zLmNhbGwodGhpcywgb3B0aW9ucylcclxuICAgIHRoaXMubm9pc2UgPSBub2lzZVxyXG4gIH1cclxuICBNYXAucHJvdG90eXBlLmNvbXB1dGUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xyXG4gICAgdmFyIG1hcCA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh3aWR0aCAqIGhlaWdodCAqIDQpXHJcbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XHJcbiAgICAgIGZvciAodmFyIHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xyXG4gICAgICAgIGlmICh0aGlzLmxvb3B2YWx1ZXMubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICB0aGlzLmxvb3B2YWx1ZXMgPSB0aGlzLnVwZGF0ZSh0aGlzLmxvb3B2YWx1ZXMpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBub2lzZUFyZ3MgPSBbeCwgeV0uY29uY2F0KHRoaXMubG9vcHZhbHVlcylcclxuICAgICAgICB2YXIgdmFsID0gTWF0aC50cnVuYyhvY3RhdmF0ZS5hcHBseSh0aGlzLCBub2lzZUFyZ3MpICogMjU1KVxyXG4gICAgICAgIHZhciBwaXhlbERhdGFcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuY29sb3JtYXAgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIHBpeGVsRGF0YSA9IHRoaXMuY29sb3JtYXAodmFsKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBwaXhlbERhdGEgPSB0aGlzLmNvbG9ybWFwW3ZhbF1cclxuICAgICAgICB9XHJcbiAgICAgICAgbWFwLnNldChwaXhlbERhdGEsIHggKiA0ICsgeSAqIDQgKiB3aWR0aClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ldyBJbWFnZURhdGEobWFwLCB3aWR0aCwgaGVpZ2h0KVxyXG4gIH1cclxuICBNYXAucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoY2FudmFzKSB7XHJcbiAgICBjYW52YXMgPSB0eXBlb2YgY2FudmFzID09PSAnc3RyaW5nJ1xyXG4gICAgICA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY2FudmFzKVxyXG4gICAgICA6IGNhbnZhc1xyXG4gICAgY2FudmFzLmdldENvbnRleHQoJzJkJykucHV0SW1hZ2VEYXRhKHRoaXMuY29tcHV0ZShcclxuICAgICAgY2FudmFzLndpZHRoLFxyXG4gICAgICBjYW52YXMuaGVpZ2h0XHJcbiAgICApLCAwLCAwKVxyXG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXNcclxuICB9XHJcbiAgTWFwLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbiAodGFyZ2V0LCB3aWR0aCwgaGVpZ2h0KSB7XHJcbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcclxuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKVxyXG4gICAgdGFyZ2V0ID0gdHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZydcclxuICAgICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcclxuICAgICAgOiB0YXJnZXRcclxuICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoXHJcbiAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XHJcbiAgICBjdHgucHV0SW1hZ2VEYXRhKHRoaXMuY29tcHV0ZSh3aWR0aCwgaGVpZ2h0KSwgMCwgMClcclxuICAgIHRhcmdldC5hcHBlbmRDaGlsZChjYW52YXMpXHJcbiAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc1xyXG4gIH1cclxuICBNYXAucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgdGhhdCA9IHRoaXNcclxuICAgIHZhciBmbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhhdC5kcmF3KHRoYXQuY2FudmFzKVxyXG4gICAgICB0aGlzLmFuaW1SZXEgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZm4pXHJcbiAgICB9XHJcbiAgICB0aGlzLmFuaW1SZXEgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZm4pXHJcbiAgfVxyXG4gIE1hcC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbVJlcSlcclxuICB9XHJcblxyXG4gIHZhciBtb2R1bGUgPSB7XHJcbiAgICBtYXA6IGZ1bmN0aW9uIChub2lzZSwgb3B0aW9ucykge1xyXG4gICAgICByZXR1cm4gbmV3IE1hcChub2lzZSwgb3B0aW9ucylcclxuICAgIH0sXHJcbiAgICBjdXJ2ZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gbmV3IEN1cnZlKClcclxuICAgIH0sXHJcbiAgICBUSFJFRTI6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgcmV0dXJuIG5ldyBUSFJFRTIoKVxyXG4gICAgfSxcclxuICAgIFRIUkVFMzogZnVuY3Rpb24gKCkge1xyXG4gICAgICByZXR1cm4gbmV3IFRIUkVFMygpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbW9kdWxlXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gdGVycmFwYWludEZhY3RvcnkoKVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9