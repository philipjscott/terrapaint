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
