// Notes :
// https://github.com/pwnjack/GulpJS-Bootstrap-LESS/blob/master/gulpfile.js
// A list of gulp plugins : https://www.npmjs.org/search?q=gulpplugin


var gulp = require('gulp'),

    // Global tools
    browserSync   = require('browser-sync'),
    gutil         = require('gulp-util'),
    plumber       = require('gulp-plumber'),
    rename        = require('gulp-rename'),
    clean         = require('gulp-clean'),
    concat        = require('gulp-concat'),
    filesize      = require('gulp-filesize'),
    uglify        = require('gulp-uglify'),
    browserify    = require('gulp-browserify'),

    // For less-css files
    less          = require('gulp-less'),
    prefixer      = require('gulp-autoprefixer'),
    uncss         = require('gulp-uncss'),

    // For jade
    jade          = require('gulp-jade'),

    // HTML validation
    htmlvalidator = require('gulp-w3cjs'),

    // For image files
    changed       = require('gulp-changed'),
    imagemin      = require('gulp-imagemin'),

    // For browserify
    source = require('vinyl-source-stream'),

    // For Jade module
    path          = require('path'),
    fs            = require('fs'),
    es            = require('event-stream');

// Paths
var paths = {
    base               : './',
    build               : './build',
    src                 : './src',
    js                  : {
        files               : ['./src/vendor/*.js','./src/**/*.js'],
        output_min          : 'main.min.js',
        dest                : './build/js',
        main                : './src/main.js'
    },
    style               : {
        files               : ['./src/style.less'],
        watch               : ['./src/**/*.less', '!./src/vendor'],
        output              : 'style.css',
        output_min          : 'style.min.css',
        dest                : './build/css'
    },
    layout                : {
        folders             : './src/layouts/',
        files               : ['./src/layouts/**/*.jade', '!./src/layouts/*.jade', '!./src/layouts/default-partials/*.jade'],
        watch               : './src/**/*.jade',
        dest                : './build'
    },
    validator           : {
        watchables:         './*.html',
    },
    images              : {
        files               : './src/images/**/*',
        icons               : './src/favicons',
        dest                : './build/images'
    },
};

// The tasks
// ------------------------------


// Static server
gulp.task('server', function() {
    browserSync.init(null, {
        server: {
            baseDir: paths.build
        }
    });
});



// Tasks specs
// 0. Cleaning before building
// 1. Less processed
// 2. Prefixed
// 3. Copied as style.css in ./assets/css
// 4. Minified
// 5. Copied as style.min.css in ./assets/css
// 6. Reload Browser sync

gulp.task('clean', function () {
    return gulp.src(paths.js.build + '/*', {read: false})
    .pipe(clean());
});

gulp.task('style', function () {
    return gulp.src(paths.style.files)
    .pipe(plumber())
    .pipe(less())
    .pipe(prefixer('last 5 versions', 'ie 8'))
    .pipe(gulp.dest(paths.style.dest))
    .pipe(rename(paths.style.output))
    .pipe(uncss({
        html: [paths.build + '/index.html']
    }))
    .pipe(less({ compress: true }))
    .pipe(rename(paths.style.output_min))
    .pipe(gulp.dest(paths.style.dest))
    .pipe(browserSync.reload({stream:true}));
    }
);

gulp.task('js', function() {
    return gulp.src(paths.js.main)
    .pipe(plumber())
    .pipe(browserify())
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('jsmin', function() {
    return gulp.src(paths.js.main)
    .pipe(plumber())
    .pipe(browserify())
    .pipe(uglify())
    .pipe(rename('main.min.js'))
    .pipe(gulp.dest(paths.js.dest))
    .pipe(browserSync.reload({stream:true}));
});

// Jade templates
// 1. Jade processed with pretty output
// 2. Copy generated file to html destination
// 3. Reload BS

function getFolders(dir){
    return fs.readdirSync(dir)
        .filter(function(file){
            if(file.indexOf('default-partials') > -1) return;
            return fs.statSync(path.join(dir, file)).isDirectory();
        });
}

gulp.task('templates', function() {
    var folders = getFolders(paths.layout.folders);

    var tasks = folders.map(function(folder) {
        return gulp.src(path.join(paths.layout.folders, folder, '/*.jade'))
            .pipe(plumber())
            .pipe(jade({pretty : true}))
            .pipe(rename(folder + '.html'))
            .pipe(gulp.dest(paths.build))
            .pipe(browserSync.reload({stream:true}));
    });

    return es.concat.apply(null, tasks);
});



// HTML validation
gulp.task('htmlvalidator', function () {
    return gulp.src(paths.validator.watchables)
    .pipe(htmlvalidator());
});



// Image files compression
// 1. Compressing only modified pictures
// 2. Compressed images to destination

gulp.task('images', function () {
    return gulp.src(paths.images.files)
    .pipe(changed(paths.images.dest))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.images.dest));
});



// Favicons and touch icons
gulp.task('icons', function () {
    return gulp.src(paths.images.icons + 'favicon.png')
    .pipe(rename('favicon.ico'))
    .pipe(gulp.dest(paths.build));
});
gulp.task('touchicons', function() {
    return gulp.src(paths.images.icons + '/apple-touch*.png')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest(paths.build));
});



// Watch modifications
gulp.task( 'watch', function () {
    gulp.watch( paths.style.watch,      ['style'] );
    gulp.watch( paths.images.files,     ['images'] );
    gulp.watch( paths.layout.watch,     ['templates'] );
    gulp.watch( paths.layout.output,    ['htmlvalidator'] );
    gulp.watch( paths.js.files,         ['js', 'jsmin'] );
});

gulp.task('default', ['clean', 'images', 'templates', 'style', 'js', 'jsmin', 'icons', 'touchicons', 'htmlvalidator', 'server', 'watch']);
gulp.task('build', ['clean', 'images', 'templates', 'style', 'js', 'jsmin', 'icons', 'touchicons', 'htmlvalidator']);
