const gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    inlinesource = require('gulp-inline-source');

gulp.task('inline', function() {
    return gulp.src('./dist/index.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./dist'));
});

// Error message
var onError = function (err) {
    notify.onError({
        title: 'Gulp',
        subtitle: 'Failure!',
        message: 'Error: <%= error.message %>',
        sound: 'Beep'
    })(err);

    this.emit('end');
};
//compile
gulp.task('sass', function () {
    gulp.src('src/styles/*.scss')
    var stream = gulp
        .src('src/styles/*.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cleanCSS());

    return stream
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('images', () =>
    gulp.src('src/images/*/*/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
);