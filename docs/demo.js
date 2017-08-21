var isSupported = true

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
    var height = parseInt($('args-height').value) || 512
    var width = parseInt($('args-width').value) || 1024
    var octaves = parseInt($('args-octaves').value) || 7
    var period = parseInt($('args-period').value) || 512
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
        fn = noise.perlin2
        break
      default:
        fn = noise.simplex2
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

    terrapaint(fn, width, height, {
      target: '#entry',
      octaves: octaves,
      period: period,
      colormap: colormap,
      offset: offset
    })
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
