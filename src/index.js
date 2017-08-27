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
    canvas.getContext('2d').putImageData(this.compute(
      canvas.width,
      canvas.height
    ), 0, 0)
    this.canvas = canvas
  }
  Map.prototype.create = function (target, width, height) {
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    canvas.width = width
    canvas.height = height
    ctx.putImageData(this.compute(width, height), 0, 0)
    document.querySelector(target).appendChild(canvas)
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
