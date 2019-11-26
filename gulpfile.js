const gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    browsersync = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    mini = require('gulp-minify'),
    imageMin = require('gulp-imagemin'),
    uglify = require('gulp-uglify');
const scssBuild = () => {
    return gulp.src('src/sass/*.sass')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(concat('main.css'))
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'))
        .pipe(browsersync.stream())
}
const jsBuild = () => {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(mini())
        .pipe(gulp.dest('dist/js'))
        .pipe(browsersync.stream())
}
const imgBuild = () => {
    return gulp.src('src/img/*')
        .pipe(imageMin())
        .pipe(gulp.dest('dist/img'))
        .pipe(browsersync.stream())
}

function watchFiles() {
    gulp.watch("src/sass/**/*", scssBuild).on('change', browsersync.reload);
    gulp.watch("src/js/**/*", jsBuild).on('change', browsersync.reload);
    gulp.watch("src/img/**/*", imgBuild).on('change', browsersync.reload);
    gulp.watch("src/*.html").on('change', browsersync.reload);
}
const refreshPage = (done) => {
    browsersync.init({
        server: "./"
    });
    return gulp.watch('index.html').on('change', browsersync.reload)
}
gulp.task('build', gulp.series(scssBuild, jsBuild, imgBuild));
gulp.task('dev', gulp.parallel(watchFiles, refreshPage));