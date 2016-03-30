var gulp = require('gulp')
var browserify = require('browserify')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var uglify = require('gulp-uglify')
var sourcemaps = require('gulp-sourcemaps')
var gutil = require('gulp-util')
var dependify = require('dependify')
var standard = require('gulp-standard')
var Server = require('karma').Server

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/jquery-clickout.js',
    debug: true
  })
    .plugin(dependify, {
      name: 'jQueryClickout',
      deps: {
        jquery: 'jQuery'
      }
    })

  return b.bundle()
    .pipe(source('jquery-clickout.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/'))
})

gulp.task('standard', function () {
  return gulp.src(['./src/**/*.js'])
    .pipe(standard())
    .pipe(standard.reporter('default', {
      breakOnError: true
    }))
})

gulp.task('karma', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start()
})

gulp.task('test', ['standard', 'karma'])
