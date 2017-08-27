# terrapaint

### Canvas heightmap generator

![Island heightmap](https://scottyfillups.github.io/terrapaint/island.png)

More demonstrations here: <https://scottyfillups.github.io/terrapaint/>

### Installation

If you plan to use Browserify or Webpack: `npm install terrapaint --save-dev`

### Usage

Either embed 
```html
<script src="https://scottyfillups.github.io/terrapaint/terrapaint.js></script>
```
in your HTML source, or, if you're using Webpack / Browserify:


```js
var terrapaint = require('terrapaint')

// Or,
// import terrapaint from 'terrapaint'

var map = terrapaint.map(noiseFn, config)
map.create('#target', 128, 128)
map.loop()
```

##### terrapaint.map(fn, config)

* fn: The noise function used to generate the heightmap. The function's output should range from [0, 1]. If it ranges from [-1, 1], set `config.offset = true`
* __config__:
  * colormap: A function that takes the perlin noise value (mapped to [0, 255]) and returns a RGBA array ([R,G,B,A]). Or, a multi-dimensional array lookup up table, storing a RGBA array for each index ranging from 0 to 255.
  * offset: Set this to true if your noise function ranges from [-1, 1]. Defaults to false.
  * period: For gradient noise, the size (side length) of a unit square, in pixels. Defaults to 32.
  * octaves: The number of octaves. Defaults to 1.
  * persistance: The persistance of the octaves (a higher value means the successive octaves will be given more weight). Defaults to 2.
  * update: A function called 60 times per second updating non-physical dimensions passed to the noise function. Takes in an array storing the present values, and should return an array with the updated values.
  * init: The initial value (array) for the update function.
* __Returns__ `Map`

##### Map.create(target, width, height)

Creates and appends a new canvas to the specified target.

* target: The selector (jQuery style) or DOM object of the element that the canvas should be appended to.
* width: The width of the canvas, in pixels.
* height: The height of the canvas, in pixels.

##### Map.draw(canvas)

Draws the heightmap onto the specified canvas.

* canvas: The selector or DOM object of the canvas

##### Map.loop()

Animate the heightmap using the `update` and `init` values specified in the `terrapaint.map( ... )` config

##### Map.stop()

Stops the heightmap animation.

### Aside

Keep in mind you need to provide your own noise function. For now, I recommend [noisejs](https://www.npmjs.com/package/noisejs), which provides simplex and perlin noise. I have a feeling some new noise library might be coming out soon though, just a hunch ;)
