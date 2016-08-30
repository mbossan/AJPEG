'use strict';

const
    es = require('event-stream'),
    path = require('path'),
    foreach = require('gulp-flatmap'),
    gutil = require('gulp-util'),
    gm = require('gulp-gm'),
    PNG = require('pngjs').PNG;
;

var plugin = function (opts) {
    var quality = (opts && opts.quality) ? opts.quality : 60;
    quality = !isNaN(opts) ? opts : quality;

    var filescount;
    var time;

    var task = foreach(function (stream, file) {
        filescount++;

        var export_jpg_stream = stream.pipe(es.map(function (file, cb) {
            var png = PNG.sync.read(file.contents);
            for (var y = 0; y < png.height; y++) {
                for (var x = 0; x < png.width; x++) {
                    var idx = (png.width * y + x) << 2;
                    if (png.data[idx + 3] == 0) {
                        for (var i = 0; i < 3; i++) {
                            png.data[idx + i] = 0x00;
                        }
                    }
                }
            }
            file.contents = PNG.sync.write(png);
            cb(null, file);
        })).pipe(gm(function (gmfile, done) {
            gmfile
                .setFormat('jpg')
                .quality(quality);
            done(null, gmfile);
        }));

        var export_mask_stream = stream.pipe(es.map(function (file, cb) {
            var bn = path.basename(file.path, path.extname(file.path));
            file.path = file.path.replace(bn, bn + '@mask');
            var png = PNG.sync.read(file.contents);
            for (var y = 0; y < png.height; y++) {
                for (var x = 0; x < png.width; x++) {
                    var idx = (png.width * y + x) << 2;
                    for (var i = 0; i < 3; i++) {
                        png.data[idx + i] = 0x00;
                    }
                }
            }
            file.contents = PNG.sync.write(png);
            cb(null, file);
        }));

        return es.merge(export_jpg_stream, export_mask_stream);
    });

    task.on('pipe', function () {
        time = new Date();
        filescount = 0;
    });

    task.on('end', function () {
        var duration = new Date() - time;
        gutil.log(gutil.colors.green('AJPEG : processed ' + filescount + ' files in ' + duration + ' ms'));
    });

    return task;
};

module.exports = plugin;