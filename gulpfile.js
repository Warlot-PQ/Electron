<!-- gulp.js-->
const gulp = require('gulp');
const run = require('gulp-run');
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');

const _templateBase = 'app';

gulp.task('copy-html', function() {
    gulp.src(_templateBase + '/**/*.html')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist/'))
    // Notify changes
    .pipe(livereload());
});

gulp.task('copy-css', function() {
    gulp.src(_templateBase + '/**/*.css')
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist/'))
    // Notify changes
    .pipe(livereload());
});

gulp.task('copy-js', function() {
    gulp.src(_templateBase + '/**/*.js')
    // Perform minification tasks, etc here
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('dist/'))
    // Notify changes
    .pipe(livereload());
});

gulp.task('run', function() {
    gulp.start('copy-html', 'copy-css', 'copy-js');
    return run('./node_modules/.bin/electron .').exec();
});

gulp.task('watch', function () {
	// Start a livereload server
    livereload.listen();
    // Watch files
    gulp.watch(_templateBase + '/**/*.html',['copy-html']);
    gulp.watch(_templateBase + '/**/*.css',['copy-css']);
    gulp.watch(_templateBase + '/**/*.js',['copy-js']);
});

gulp.task('default', ['watch', 'run']);