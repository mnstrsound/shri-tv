'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var data = require('./data.json');

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('sass', function () {
    gulp.src('sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('moveLibs', function () {
    gulp.src('bower_components/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('build/js'));
});

gulp.task('moveJS', function () {
    gulp.src('js/**/*.js')
        .pipe(gulp.dest('build/js'));
});

gulp.task('moveImg', function () {
    gulp.src('img/**/*')
        .pipe(gulp.dest('build/img'));
});

gulp.task('concatCSS', function () {
    gulp.src('css/**/*.css')
        .pipe(concat('build.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('jade', function() {
    gulp.src('jade/**/*.jade')
        .pipe(jade({
            //pretty: true,
            data: data
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('build', ['moveLibs', 'moveJS', 'moveImg','sass', 'concatCSS', 'jade']);

gulp.task('watch', function () {
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('css/**/*.css', ['concatCSS']);
    gulp.watch('js/**/*.js', ['moveJS']);
    gulp.watch('img/**/*', ['moveImg']);
    gulp.watch('jade/**/*.jade', ['jade']);
});