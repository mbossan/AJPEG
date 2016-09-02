(function () {
    var AJPEG = window.AJPEG = function (config) {
        var self = this;
        self.img = null;
        self.mask = null;

        self.load = function (src, cb) {
            function onAllLoaded() {
                cb.call(self);
            }

            self.img = loadImage(src, onAllLoaded.bind(self));
        };

        self.toDataURL = function () {
            return self.toCanvas().toDataURL();
        };

        self.toCanvas = function () {
            var imagecanvas = document.createElement('canvas');
            var imagecontext = imagecanvas.getContext('2d');

            imagecanvas.width = self.img.width;
            imagecanvas.height = self.img.height/2;

            imagecontext.drawImage(self.img, 0, self.img.height / 2, self.img.width, self.img.height/2,0,0,self.img.width, self.img.height/2);
            imagecontext.globalCompositeOperation = "lighter";
            imagecontext.drawImage(self.img, 0, 0, self.img.width, self.img.height/2,0,0,self.img.width, self.img.height/2);
            return imagecanvas;
        };
    };

    //STATIC
    AJPEG.parse = function (attr) {
        if (typeof attr == "undefined" || !attr)
            attr = 'alpha-src';
        setTimeout(function () {
            var ims = document.querySelectorAll('img[' + attr + ']'), img;
            for (var i = 0; i < ims.length; i++) {
                img = ims[i];
                new AJPEG().load(ims[i].attributes[attr].value, function () {
                    img.src = this.toDataURL();
                })
            }

        });
    };

    function loadImage(src, cb) {
        var img = new Image();
        img.loaded = false;
        img.onload = function () {
            img.loaded = true;
            cb();
        }
        img.src = src;
        return img;
    }


    if (typeof module != "undefined")
        module.exports = AJPEG;

}());