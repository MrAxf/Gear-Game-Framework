var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var insert = require('gulp-insert');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');


var buildName = 'GGF', src='./src', dest = './build', tempDest = './build/temp';

gulp.task('js', function() {
	browserify({entries:'./src/index.js',debug:true})
		.transform(babelify)
		.bundle()
		.pipe(source(buildName + '.js'))
		.pipe(insert.prepend('window.requestAnimFrame = (function(){\n  return  window.requestAnimationFrame   ||\n      window.webkitRequestAnimationFrame ||\n      window.mozRequestAnimationFrame;\n})();\nwindow.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;\nvar ggf;\n'))
		.pipe(gulp.dest(dest));
});

gulp.task('minimize', function(){
	gulp.src(dest +'/' + buildName + '.js')
	.pipe(rename({suffix: '.min'}))
	.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(uglify())
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
	gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('default', ['js'], function() {

});
