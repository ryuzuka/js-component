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
import bro from "gulp-bro"
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
  js: [`${src}/**/*.js`, `!${src}/js/libs/*.js`],
  libs: `${src}/js/libs/*.js`,
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
      maxImageSize: 1024,
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

// function plugins() {
//   return browserify(paths.plugins)
//     .transform(babelify,{
//       presets : ['@babel/preset-env']
//     })
//     .bundle()
//     .pipe(source('./js/plugins.js')) // vinyl object 로 변환
//     .pipe(buffer()) // buffered vinyl object 로 변환
//     .pipe(uglify({toplevel:true}))
//     .pipe(gulp.dest(dist))
// }

function libs() {
  return gulp.src(paths.libs, { sourcemaps: true })
    .pipe(gulp.dest(dist+'/js/libs/'))
}

function scripts() {
  // return gulp.src(paths.js, { sourcemaps: true })
  //   .pipe(babel({
  //     presets : ['@babel/env']
  //   }))
  //   .pipe(gulp.dest(dist))
  return gulp.src(paths.js, { sourcemaps: true })
    .pipe(bro({
      transform: [
        babelify.configure({ presets: ['@babel/preset-env'] }),
        //[ 'uglifyify', { global: true } ]
      ]
    }))
    .pipe(gulp.dest(dist))
}

function copyImage() {
  return gulp.src(paths.image, {since: gulp.lastRun(copyImage)})
    .pipe(gulp.dest(dist))
}

function copyFonts() {
  return gulp.src(paths.font, {since: gulp.lastRun(copyFonts)})
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
  gulp.watch(paths.libs, libs)
  gulp.watch(paths.js, scripts)
  gulp.watch(paths.image, copyImage)
  gulp.watch(paths.font, copyFonts)
}

const watch = gulp.parallel(watchFiles)
const build = gulp.series(clean, gulp.parallel(style, scripts, libs, htmlInclude, copyImage, copyFonts))

exports.watch = watch
exports.build = build
exports.default = build
