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
