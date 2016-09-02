# AJPEG  (Alpha-JPEG) v2
PNG File size can be a hassle. This library provides transparency support to JPEG images allowing you to get lightweight images and speed up your page load.

AJPEG `GULP` encoder create an image twice the height of the original containing : 
- the image without transparency
- the mask (alpha channel converted to a black to white interpolation)

The decoder loads the file and fast restore the alpha channel using native html `canvas` composite operation.

<table>
<tr>
<td>
<img src="assets/original.png" width="200" style="background:transparent"/>
</td>
<td>
<img src="assets/compressed.jpg" width="200" style="background:transparent"/>
</td>
</tr>
<tr>
<td>
Original 88ko
</td>
<td>
Compressed 23ko
</td>
</tr>
</table>
<sub>(Ford Mustang illustration by Pramod Kabadi https://dribbble.com/shots/2755797-Ford-Mustang-vector-illustration)</sub>

## Demo
https://mbossan.github.io/AJPEG/

## Install
```
$ npm install --save-dev ajpeg
```

##### Graphics Magick
Make sure GraphicsMagick is installed on your system and properly set up in your `PATH`.

- Mac OS X (using [Homebrew](http://brew.sh/)):

```shell
brew install graphicsmagick
```
- Ubuntu:

```shell
apt-get install graphicsmagick
```


## Encoding

```js
const gulp = require('gulp'),
    ajpeg = require('ajpeg');

gulp.task('default', function () {
    return gulp.src("src/*.png")
        .pipe(ajpeg(60))
        .pipe(gulp.dest('dist/'));
});
```


### API

#### ajpeg([quality])
Type: `number`
Default: `60`

JPEG compression from 1 to 100

## Decoding

### Setup
Include the library
```html
<script src="decoder/dist/ajpeg.min.js" type="application/javascript"></script>
```
OR
```js
const AJPEG = require('decoder/dist/ajpeg.min');
```

### Usage
Load into a Canvas
```js
new AJPEG().load("assets/mustang.jpg", function () {
    document.body.appendChild(this.toCanvas());
});
```
Load into an Image
```js
new AJPEG().load("assets/mustang.jpg", function () {
    var newImg = document.createElement('img');
    newImg.src = this.toDataURL();
    document.body.appendChild(newImg);
});
```
Autoload via html attribute parsing
```html
<img alpha-src="assets/mustang.jpg"/>
<script>
AJPEG.parse();
</script>
```

## License

MIT ©
