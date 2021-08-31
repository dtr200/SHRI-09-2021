const { src, dest, watch, parallel, series } = require('gulp');

const scss          = require('gulp-sass');
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const autoprefixer  = require('gulp-autoprefixer');
const del           = require('del');

function synchronize(){
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    })
}

function cleanDist(){
    return del('dist');
}

function convertStyles(){
    return src('app/scss/style.scss')
        .pipe(scss({ outputStyle: 'compressed' }))        
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer())
        .pipe(dest('app/css'))
        .pipe(browserSync.stream())
}

function build(){
    return src([
        'app/css/style.min.css',
        'app/fonts/**/*',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app'})
        .pipe(dest('dist'))
}

function watching(){
    watch(['app/scss/**/*.scss'], convertStyles);
    watch(['app/*.html']).on('change', browserSync.reload);
}

exports.styles = convertStyles;
exports.watching = watching;
exports.sync = synchronize;
exports.cleanDist = cleanDist;

exports.build = series(cleanDist, build);
exports.default = parallel(synchronize, watching)