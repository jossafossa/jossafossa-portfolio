const gulp = require("gulp");
const env = require('./env.json');
    destination = env.destination,
    cssFileName = env.generatedCssFileName,
    jsIncludeFile = env.jsIncludeFile,
    jsBaseFile = env.jsBaseFile,
    jsFileName = env.generatedJsFileName,
    jsFolder = env.jsFolder,
    productionMode = env.productionMode,
    sassIncludeFile = env.sassIncludeFile,
    sassBaseFile = env.sassBaseFile,
    sassFolder = env.sassFolder;
    base = env.base;
const { parallel, series } = require("gulp");

const imagemin = require("gulp-imagemin");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create(); //https://browsersync.io/docs/gulp#page-top
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');

// /*
// TOP LEVEL FUNCTIONS
//     gulp.task = Define tasks
//     gulp.src = Point to files to use
//     gulp.dest = Points to the folder to output
//     gulp.watch = Watch files and folders for changes
// */



// Scripts
function js(cb) {
    gulp.src(jsBaseFile)
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat("main.js"))
        .pipe(uglify())
        .pipe(gulp.dest(destination));
    cb();
}

// Compile Sass
function css(cb) {
    gulp.src(sassBaseFile)
        .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
        .pipe(autoprefixer({
            browserlist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(destination))
        // Stream changes to all browsers
        .pipe(browserSync.stream());
    cb();
}


// Watch Files
function watch_files() {
    browserSync.init({
      proxy: "www.jossafossa.test"
    });
    gulp.watch(sassIncludeFile, css);
    gulp.watch(jsIncludeFile, js).on("change", browserSync.reload);
}

// Default 'gulp' command with start local server and watch files for changes.
exports.default = series(css, js, watch_files);

// 'gulp build' will build all assets but not run on a local server.
exports.build = parallel(css, js);