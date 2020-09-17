import gulp from 'gulp'
import babel from 'gulp-babel'
import base64 from 'gulp-base64'
import sass from 'gulp-sass'
import autoprefixer from 'gulp-autoprefixer'
import fileinclude from 'gulp-file-include'
import del from 'del'
import browserSync from 'browser-sync'
import browserify from 'browserify'
import source from 'vinyl-source-stream'
import buffer from 'vinyl-buffer'
import babelify from 'babelify'
import uglify from 'gulp-uglify'

const server = browserSync.create()
const clean = () => {return del(['dist'])}

const scssOptions = { // Sass compile option
  outputStyle: 'expanded',
  indentType: 'space',
  indentWidth: 2,
  precision: 6,
  sourceComments: false
}

const src = 'src'
const dist = 'dist'
const paths = {
  js: [`${src}/**/*.js`],
  scss: `${src}/**/*.scss`,
  html: `${src}/**/*.html`,
  image : `${src}/**/*.{png,jpg,jpeg,gif,svg,ico,mp4}`,
  font : `${src}/**/*.{ttf,otf,woff,woff2,eot,svg}`
}

const htmlIncludeOptions = {
  prefix: '@@',
  basepath: '@file',
  indent: true
}

function style() {
  return gulp.src(paths.scss, {sourcemaps: true})
    .pipe(sass(scssOptions).on('error', sass.logError))
    .pipe(base64({
        extensions: ['svg', 'png', /\.jpg#datauri$/i],
        maxImageSize: 8192,
        debug: true
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(dist, {sourcemaps: '/maps'}))
    .pipe(browserSync.stream())
}

function htmlInclude() {
  return gulp.src([paths.html, '!src/html/inc/*.html'])
    .pipe(fileinclude(htmlIncludeOptions))
    .pipe(gulp.dest(dist))
    .pipe(browserSync.stream())
}

function scripts() {
  return gulp.src(paths.js, { sourcemaps: true })
    .pipe(babel({
      presets : ['@babel/preset-env']
    }))
    .pipe(gulp.dest(dist))
}

function copyImage() {
  return gulp.src(paths.image, {since: gulp.lastRun(copyImage)})
    .pipe(gulp.dest(dist))
}

function watchFiles(done) {
  server.init({
    server: './dist/',
    port: 5000,
    open: false
  })
  done()
  gulp.watch(paths.scss, style)
  gulp.watch(paths.html, htmlInclude)
  // gulp.watch(paths.plugins, plugins)
  gulp.watch(paths.js, scripts)
  gulp.watch(paths.image, copyImage)
}

const watch = gulp.parallel(watchFiles)
const build = gulp.series(clean, gulp.parallel(style, scripts, htmlInclude, copyImage))

exports.watch = watch
exports.build = build
exports.default = build
