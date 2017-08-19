(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var terrapaint = require('../src/index.js')
noise.seed(Math.random())

$('args-submit').addEventListener('click', function () {
  var height = parseInt($('args-height').value) || 128
  var width = parseInt($('args-width').value) || 128
  var octaves = parseInt($('args-octaves').value) || 5
  var period = parseInt($('args-period').value) || 64
  var type = $('args-type').options[$('args-type').selectedIndex].value || 'perlin'
  var fn

  switch (type) {
    case 'white':
      fn = Math.random
      break
    case 'perlin':
      fn = noise.perlin2
      break
    default:
      fn = noise.simplex2
  }

  terrapaint(fn, width, height, {
    octaves: octaves,
    period: period
  })
})

function $ (id) {
  return document.getElementById(id)
}


/*
terrapaint(noise.simplex2, 1024, 1024, {octaves: 5, offset: true, period: 128})
terrapaint(noise.simplex2, 256, 256, {octaves: 2, offset: true})
terrapaint(noise.simplex2, 256, 256, {offset: true})
terrapaint(noise.perlin2, 256, 256, {octaves: 4, offset: true})
terrapaint(noise.perlin2, 256, 256, {octaves: 2, offset: true})
terrapaint(noise.perlin2, 256, 256, {offset: true})
terrapaint(Math.random, 256, 256)
*/

},{"../src/index.js":2}],2:[function(require,module,exports){
function terrapaint (noise, w, h, options) {
  options = options || {}
  var octaves = options.octaves || 1
  var period = options.period || 32
  var offset = options.offset ? 1 : 0
  var persistance = options.persistance || 2
  var colormap = options.colormap || function (v) { return [v, v, v] }
  var target = options.target || document.body
  target = typeof target === 'string' 
    ? document.querySelector(target)
    : target

  var octavate = function(x, y) {
    var val = 0
    var max = 0
    var p = period
    var amp = Math.pow(persistance, octaves)
    for (var i = 0; i < octaves; i++) {
      val += (noise(x / p, y / p) + offset) * amp
      max += amp * (offset + 1)
      amp /= persistance
      p /= 2
    }
    return val / max
  }
 
  var map = new Uint8ClampedArray(w * h * 4)
  for (var y = 0; y < h; y++) {
    for (var x = 0; x < w; x++) {
      var val = Math.trunc(octavate(x, y) * 255)
      var color = colormap(val)
      var pixelData = [color[0], color[1], color[2], 255]
      map.set(pixelData, x * 4 + y * 4 * w)
    }
  }

  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d')
  var imageData = new ImageData(map, w, h)
  canvas.width = w
  canvas.height = h
  ctx.putImageData(imageData, 0, 0)
  target.appendChild(canvas)
}

module.exports = terrapaint

},{}]},{},[1]);
