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
const os = require('os');
const electronInstaller = require('electron-winstaller');

const _templateBase = 'app';
const _file = {
    app: _templateBase + '/src/app.js',
    route: _templateBase + '/src/**/*route.js',
    controller: _templateBase + '/src/**/*.controller.js',
    directive: _templateBase + '/src/**/*.directive.js',
    factory: _templateBase + '/src/**/*.factory.js',
    service: _templateBase + '/src/**/*.service.js',
    filter: _templateBase + '/src/**/*.filter.js',
    model: _templateBase + '/src/**/*.model.js',
    indexHtml: _templateBase + '/index.html',
    scripts: _templateBase + '/scripts/**/*',
    conf: _templateBase + '/env/**/*',
    i18n: _templateBase + '/i18n/**/*',
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
        .pipe(inject(gulp.src(_file.filter), {starttag: '<!-- angularFilter:{{ext}} -->', ignorePath: 'app', addRootSlash: false}))
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

gulp.task('copy-scripts', function() {
    return gulp.src(_file.scripts)
        .pipe(gulp.dest('dist/app/scripts/'));
});

gulp.task('copy-conf', function() {
    return gulp.src(_file.conf)
        .pipe(gulp.dest('dist/app/env/'));
});

gulp.task('copy-i18n', function() {
    return gulp.src(_file.i18n)
        .pipe(gulp.dest('dist/app/i18n/'));
});

gulp.task('copy-html', function() {
    return gulp.src(_file.html)
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist/app/'));
});

gulp.task('copy-css', function() {
    return gulp.src(_file.css)
    // Perform minification tasks, etc here
    .pipe(gulp.dest('dist/app/'));
});

gulp.task('copy-js', function() {
    return gulp.src(_file.js)
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('dist/app/'))
});

gulp.task('run', function() {
    gulp.watch("js/*.js", ['js-watch']);
    return runSequence('copy-assets', 'copy-conf', 'copy-i18n', 'copy-scripts', 'copy-html', 'copy-css', 'copy-js', 'copyBowerSources', 'copyCssSources', 'injectors', 'copy-package', 'launchApp');
});

gulp.task('copy-package', function() {
    return gulp.src('package.json').pipe(gulp.dest('dist/'))
    // Notify changes
    .pipe(livereload()); // Copy package.json to enable Electron app launching
});

gulp.task('launchApp', function() {
	if (os.platform() == 'win32') {
   		return run('.\\node_modules\\.bin\\electron dist/').exec();
	} else {
		return run('./node_modules/.bin/electron dist/').exec();
	}
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

gulp.task('dist', function() {
  gulp.watch("js/*.js", ['js-watch']);
  runSequence('copy-assets', 'copy-conf', 'copy-i18n', 'copy-html', 'copy-css', 'copy-js', 'copyBowerSources', 'copyCssSources', 'injectors', 'copy-package');
});

gulp.task('msi', function () {
  resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'SwissLife_Angular_Electron_Prototype-win32-x64/',
    loadingGif: 'icons/logo.gif',
    iconUrl: 'http://www.swisslife.fr/extension/mcms/design/mcms/images/icon/favicon.ico',
    setupIcon: 'icons/favicon.ico',
    setupExe: 'SwissLife_Angular_Electron_Prototype.exe',
    setupMsi: 'SwissLife_Angular_Electron_Prototype.msi',
    outputDirectory: 'installer64',
    authors: 'eBusiness Information',
    noMsi: false,
    exe: 'SwissLife_Angular_Electron_Prototype.exe'
  });

  return resultPromise.then(() => console.log("Msi generation worked!"), (e) => console.log(`Error: ${e.message}`));
});
