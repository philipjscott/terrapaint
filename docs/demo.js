var terrapaint = require('../src/index.js')
noise.seed(Math.random())

terrapaint(noise.simplex2, 1024, 1024, {octaves: 5, offset: true, period: 128})


terrapaint(noise.simplex2, 256, 256, {octaves: 2, offset: true})
terrapaint(noise.simplex2, 256, 256, {offset: true})
terrapaint(noise.perlin2, 256, 256, {octaves: 4, offset: true})
terrapaint(noise.perlin2, 256, 256, {octaves: 2, offset: true})
terrapaint(noise.perlin2, 256, 256, {offset: true})
terrapaint(Math.random, 256, 256)
