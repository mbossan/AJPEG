# AJPEG  (Alpha-JPEG)
PNG File size can be a hassle. This library provides transparency support to JPEG images allowing you to get lightweight images and speed up your page load.

AJPEG `GULP` encoder allows you to split PNG file into 2 separate files : 
- a JPEG file without transparency that you can compress
- a PNG file containing the alpha channel only

The decoder loads the 2 files and fast restore the alpha channel using native html `canvas` composite operation.

<table>
<tr>
<td>
<img src="assets/original.png" width="200" style="background:transparent"/>
</td>
<td>
<img src="assets/compressed.jpg" width="200" style="background:transparent"/>
</td>
<td>
<img src="assets/alpha.png" width="200" style="background:red"/>
</td>
</tr>
<tr>
<td>
Original 88ko
</td>
<td>
Compressed 19ko
</td>
<td>
Alpha 9ko
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
new AJPEG().load("assets/rp1_00000.jpg", function () {
    document.body.appendChild(this.toCanvas());
});
```
Load into an Image
```js
new AJPEG().load("assets/rp1_00000.jpg", function () {
    var newImg = document.createElement('img');
    newImg.src = this.toDataURL();
    document.body.appendChild(newImg);
});
```
Autoload via html attribute parsing
```html
<img alpha-src="assets/rp1_00000.jpg"/>
<script>
AJPEG.parse();
</script>
```

## License

MIT ©
