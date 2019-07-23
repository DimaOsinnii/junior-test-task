const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const less = require('gulp-less');
const del = require('del');
const concat = require('gulp-concat');
const pipeline = require('readable-stream').pipeline;

function styles() {
    return pipeline(
        gulp.src(['./app/styles/normalize.css', './app/styles/less/main.less']),
        sourcemaps.init(),
        less(),
        concat('main.css'),
        autoprefixer('last 10 versions', 'ie 9'),
        cleanCSS(),
        sourcemaps.write('./'),
        gulp.dest('./build/css'),
        browserSync.stream()
    )
}

function scripts() {
    return pipeline(
        gulp.src(['./app/scripts/modules/**/*.js', './app/scripts/main.js']),
        uglify(),
        concat('main.js'),
        gulp.dest('./build/js'),
        browserSync.stream()
    )
}

function clean() {
    return del(['build/*'])
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch('./app/less/**/*.less', styles);
    gulp.watch('./app/**/*.js', scripts);
    gulp.watch("/*.html").on('change', browserSync.reload);
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', watch));