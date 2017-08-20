# terrapaint

### Canvas heightmap generator

![Island heightmap](https://scottyfillups.github.io/terrapaint/island.png)

More demonstrations here: <https://scottyfillups.github.io/terrapaint/>

### Installation

If you plan to use Browserify or Webpack: `npm install terrapaint --save-dev`

### Usage

Either embed `<script src="https://scottyfillups.github.io/terrapaint/terrapaint.js></script>` in your HTML source, or, if you're using Webpack / Browserify:

```js
var terrapaint = require('terrapaint')

// Or,
// import terrapaint from 'terrapaint'

terrapaint(noiseFunct, width, height, options)
```

#### Parameters
* noiseFunct: The noise function used to generate the heightmap. The function's output should range from [0, 1]. If it ranges from [-1, 1], set `options.offset = true`
* width: The width of the generated heightmap, in pixels
* height: The height of the generated heightmap, in pixels
* __options__:
  * target - The element which the canvas will be appended to.
  * offset - Set this to true if your noise function ranges from [-1, 1]. Defaults to false.
  * period - For gradient noise, the size (side length) of a unit square, in pixels. Defaults to 32.
  * octaves - The number of octaves. Defaults to 1.
  * persistance - The persistance of the octaves (a higher value means the successive octaves will be given more weight). Defaults to 2.
  * colormap - A mapping function or two dimensional array that will take a value between 0 and 255 as its argument or index, respectively. The function should return an array containing the RGBA values to be painted on the canvas, eg `[255, 0, 0, 255]` (red). Likewise, the array must contain an array of RGBA values for each index ranging from 0 to 255. While I haven't noticed any big difference in performance, hypothetically, the multi-dimensional array approach should be faster.

### Aside

Keep in mind you need to provide your own noise function. For now, I recommend [noisejs](https://www.npmjs.com/package/noisejs), which provides simplex and perlin noise. I have a feeling some new noise library might be coming out soon though, just a hunch ;)
