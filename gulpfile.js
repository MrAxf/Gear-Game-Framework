var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var concat = require('gulp-concat');
var del = require('del');
var runSequence = require('gulp-run-sequence');
wait = require('gulp-wait');

function compileFiles() {
  var bundler = browserify('./src/index.js', { debug: true }).transform(babel);
  bundler.bundle()
    .on('error', function(err) { console.error(err); this.emit('end'); })
    .pipe(source('build.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./build/temp'));
  return bundler;

}

function beforeCompile() {
  gulp.src(['./src/header.js', './build/temp/build.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('./build'));
  gulp.src('./build/temp/build.js.map')
    .pipe(gulp.dest('./build'));
}

function clean(){
  del('./build/temp');
}

function build(){
  runSequence('compile', 'beforeCompile', 'clean');
}

gulp.task('compile', function() { return compileFiles(); });
gulp.task('beforeCompile', function() { return beforeCompile(); });
gulp.task('clean', function() { return clean(); });

//gulp.task('default', ['build']);
