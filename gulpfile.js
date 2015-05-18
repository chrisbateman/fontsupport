var gulp = require('gulp');
var babel = require('gulp-babel');
var preprocess = require('gulp-preprocess');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');


var babelOptions = {
    modules: 'umd'
};

var builds = [
    {
        preprocess: {
            TTF: true,
            WOFF: true,
            WOFF2: true
        },
        name: ''
    },
    {
        preprocess: {
            TTF: true,
            WOFF: false,
            WOFF2: false
        },
        name: '-ttf'
    },
    {
        preprocess: {
            TTF: false,
            WOFF: true,
            WOFF2: false
        },
        name: '-woff'
    },
    {
        preprocess: {
            TTF: false,
            WOFF: false,
            WOFF2: true
        },
        name: '-woff2'
    },
    {
        preprocess: {
            TTF: false,
            WOFF: true,
            WOFF2: true
        },
        name: '-woffs'
    },
];


gulp.task('default', ['clean'], function() {
    
    builds.forEach(function(buildInfo) {
        gulp.src('src/fontsupport.js')
        .pipe(preprocess({
            context: buildInfo.preprocess
        }))
        .pipe(babel(babelOptions))
        .pipe(rename({
            suffix: buildInfo.name
        }))
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('dist'));
    });
    
});


gulp.task('clean', function() {
    return gulp.src('dist', {read: false})
        .pipe(clean({force: true}));
});


gulp.task('watch', function() {
    gulp.watch('src/fontsupport.js', ['default']);
});
