var gulp = require("gulp");
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var browserSync = require("browser-sync").create();

// Compile sass into CSS & auto-inject into browsers
gulp.task("style", function(err) {
  var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);
    this.emit("end");
};
    return gulp.src("src/sass/style.scss")
      .pipe(plumber({errorHandler: onError}))
      .pipe(sourcemaps.init())
      .pipe(sass())
      .pipe(postcss([
        autoprefixer({
          browsers: ["last 2 versions", "> 2%"],
          cascade: false
        })
      ]))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest("src/css"))
      .pipe(browserSync.stream());
});

// Static Server + watching sass/html/img/js files
gulp.task("serve", ["style"], function() {

    browserSync.init(null, {
      proxy: "2-unicorn"
    });

    gulp.watch("src/**/*.scss", ["style"]);
    gulp.watch("src/*.html").on("change", browserSync.reload);
    gulp.watch("src/img/**/*.{png,jpg,gif,svg}").on("change", browserSync.reload);
    gulp.watch("src/js/**/*.js").on("change", browserSync.reload);
});

// Default: turn the server on and refresh/inject on change!
gulp.task("default", ["serve"]);
