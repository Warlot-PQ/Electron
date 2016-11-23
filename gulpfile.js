<!-- gulp.js-->
const gulp = require('gulp');
const run = require('gulp-run');
const livereload = require('gulp-livereload');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const inject = require('gulp-inject')
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const runSequence = require('run-sequence');

const _templateBase = 'app';
const _file = {
    app: _templateBase + '/src/app.js',
    route: _templateBase + '/src/**/*route.js',
    controller: _templateBase + '/src/**/*.controller.js',
    directive: _templateBase + '/src/**/*.directive.js',
    factory: _templateBase + '/src/**/*.factory.js',
    service: _templateBase + '/src/**/*.service.js',
    model: _templateBase + '/src/**/*.model.js',
    indexHtml: _templateBase + '/index.html',
    html: _templateBase + '/**/*.html',
    sass: _templateBase + '/**/*.scss',
    css: _templateBase + '/**/*.css',
    js: _templateBase + '/**/*.js'
};

gulp.task('copy-assets', function () {
    return gulp.src('app/assets/*')
        .pipe(gulp.dest('dist/app/assets'));
});

gulp.task('injectors', function() {
    let target = gulp.src(_file.indexHtml);

    return target
        .pipe(inject(gulp.src('dist/app/css/all.css'), {starttag: '<!-- scss:{{ext}} -->', ignorePath: 'dist/app', addRootSlash: false}))
        .pipe(inject(gulp.src(_file.directive), {starttag: '<!-- angularDirective:{{ext}} -->', ignorePath: 'app', addRootSlash: false}))
        .pipe(inject(gulp.src(_file.controller), {starttag: '<!-- angularController:{{ext}} -->', ignorePath: 'app', addRootSlash: false}))
        .pipe(inject(gulp.src(_file.factory), {starttag: '<!-- angularFactory:{{ext}} -->', ignorePath: 'app', addRootSlash: false}))
        .pipe(inject(gulp.src(_file.service), {starttag: '<!-- angularService:{{ext}} -->', ignorePath: 'app', addRootSlash: false}))
        .pipe(inject(gulp.src(_file.model), {starttag: '<!-- angularModel:{{ext}} -->', ignorePath: 'app', addRootSlash: false}))
        .pipe(inject(gulp.src(_file.route), {starttag: '<!-- angularRoute:{{ext}} -->', ignorePath: 'app', addRootSlash: false}))
        .pipe(gulp.dest('dist/app/'));
});

gulp.task('copyBowerSources', function() {
    return gulp.src('bower_components/**')
        .pipe(gulp.dest('dist/app/lib/'));
});

gulp.task('copyCssSources', function() {
    return gulp.src(_file.sass)
        .pipe(debug({title: 'unicornJs:'}))
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/app/css/'));
});

gulp.task('copy-html', function() {
    return gulp.src(_file.html)
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist/app'));
});

gulp.task('copy-css', function() {
    return gulp.src(_file.css)
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist/app'));
});

gulp.task('copy-js', function() {
    return gulp.src(_file.js)
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('dist/app'))
});

gulp.task('run', function() {
    gulp.watch("js/*.js", ['js-watch']);
    return runSequence('copy-assets', 'copy-html', 'copy-css', 'copy-js', 'copyBowerSources', 'copyCssSources', 'injectors', 'tmp1', 'tmp2');
});

gulp.task('tmp1', function() {
    return gulp.src('package.json').pipe(gulp.dest('dist/'))
    // Notify changes
    .pipe(livereload()); // Copy package.json to enable Electron app launching
});

gulp.task('tmp2', function() {
    return run('./node_modules/.bin/electron dist/').exec();
});

gulp.task('watch', function () {
	  // Start a livereload server
    livereload.listen();
    // Watch files
    gulp.watch(_file.html, ['run']);
    gulp.watch(_file.css, ['run']);
    gulp.watch(_file.sass, ['run']);
    gulp.watch(_file.js, ['run']);
});

gulp.task('default', ['watch', 'run']);