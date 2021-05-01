//----------------------------------------------------------------------------------------------------
// Gulp Sass & JavaScript Compiler
// https://github.com/jamiewade/gulp-sass-js
//----------------------------------------------------------------------------------------------------

//--------------------------------------------------
// Environment variables
//--------------------------------------------------

var env = require('./env.json');
    destination = env.destination,
    cssFileName = env.generatedCssFileName,
    jsIncludeFile = env.jsIncludeFile,
    jsFileName = env.generatedJsFileName,
    jsFolder = env.jsFolder,
    productionMode = env.productionMode,
    sassIncludeFile = env.sassIncludeFile,
    sassFolder = env.sassFolder;


//--------------------------------------------------
// Dependencies
//--------------------------------------------------

var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    color = require('gulp-color'),
    concat = require('gulp-concat'),
    gulpif = require('gulp-if'),
    include = require('gulp-include'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify'),
    // uglify = require('gulp-uglify');
    stripDebug = require('gulp-strip-debug');

var argv = require('yargs').argv;
var isProduction = (argv.production === undefined) ? false : true;

// Only run the tasks if a destination folder has been defined
if (destination) {

    //--------------------------------------------------
    // Sass
    //--------------------------------------------------

    gulp.task('styles', function() {
        if (sassIncludeFile) {
            gulp.src(sassIncludeFile)
                .pipe(sass().on('error', sass.logError))
                .pipe(gulpif(productionMode == true, cleanCSS({compatibility: 'ie8'})))
                .pipe(autoprefixer())
                .pipe(concat(cssFileName + '.css'))
                .pipe(gulp.dest(destination));
        } else {
            console.log(color('You need to specify which folder contains your Sass files. Check env.example.json for an example.', 'RED'));
            process.exit();
        }
    });


    //--------------------------------------------------
    // JavaScript
    //--------------------------------------------------

    gulp.task('scripts', function() {
        if (jsFolder) {
            gulp.src([
                '../js/Notification.js',
                '../js/bouncer.js',
                '../js/dirAnimate.js',
                '../js/HeaderAnimator.js',
                '../js/modeSwitcher.js',
                '../js/ripple.js',
                '../js/secretCode.js',
                '../js/textTyper.js',
                '../js/toolTips.js',
                '../js/Achievements.js',
                '../js/AchievementSetup.js',
                '../js/main.js'
                ])
                .pipe(include())
                .pipe(gulpif(isProduction, stripDebug()))
                .pipe(minify({noSource: true}))
                .pipe(concat(jsFileName + '.js'))
                // .pipe(gulpif(productionMode == true, uglify({ mangle: false })))
                // .on("error", function (err) { console.log(err) })
                .pipe(gulp.dest(destination))
        } else {
            console.log(color('You need to specify which folder contains your JavaScript files. Check env.example.json for an example.', 'RED'));
            process.exit();
        }
    });

} else {
    console.log(color('You need to specify the destination folder for your generated files. Check env.example.json for an example.', 'RED'));
    process.exit();
}


//--------------------------------------------------
// Watch
//--------------------------------------------------

gulp.task('watch', function () {
    gulp.watch(sassFolder + '/**/*.scss', ['styles']);
    gulp.watch(jsFolder + '/**/*.js', ['scripts']);
});


//------------------------------------------------------------------------------------------------------
// gulp
//------------------------------------------------------------------------------------------------------

gulp.task('default',['styles', 'scripts', 'watch']);


//------------------------------------------------------------------------------------------------------
// gulp refresh
//------------------------------------------------------------------------------------------------------

gulp.task('refresh',['styles', 'scripts']);