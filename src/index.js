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
      val += (this.noise.apply(this.thisArg, args) + this.offset) * amp
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
    this.thisArg = options.thisArg || null
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

  function Curve (noise, options) {
    setOptions.call(this, options)
    this.noise = noise
  }
  Curve.prototype.compute = function (width, height) {
    var curve = new Uint8ClampedArray(width * height * 4).fill(255)
    for (var x = 0; x < width; x++) {
      if (this.loopvalues.length !== 0) {
        this.loopvalues = this.update(this.loopvalues)
      }
      var noiseArgs = [x].concat(this.loopvalues)
      var val = Math.trunc(octavate.apply(this, noiseArgs) * 255)
      //console.log(val)
      for (var i = 0; i < 3; i++) {
        curve[val * width * 4 + x * 4 + i] = 0
      }
    }
    //console.log(curve)
    //throw 'a'
    return new ImageData(curve, width, height)
  }
  Curve.prototype.draw = function (canvas) {
    Map.prototype.draw.call(this, canvas)
  }
  Curve.prototype.create = function (target, width, height) {
    Map.prototype.create.call(this, target, width, height)
  }
  Curve.prototype.loop = function () {
    Map.prototype.loop.call(this)
  }
  Curve.prototype.stop = function () {
    Map.prototype.stop.call(this)
  }

  var module = {
    map: function (noise, options) {
      return new Map(noise, options)
    },
    curve: function (noise, options) {
      return new Curve(noise, options)
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
