// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var autoprefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var changed = require('gulp-changed');
var browserSync = require('browser-sync').create();
var del = require('del');

// Link Task
gulp.task('lint', function(){
    return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);

gulp.task('task-name', function() {
    // do stuff here
});

gulp.task('imagemin', function() {
    var img_src = 'src/images/**/*', img_dest = 'build/images';
    
    gulp.src(img_src)
    .pipe(changed(img_dest))
    .pipe(imagemin())
    .pipe(gulp.dest(img_dest));
 });

gulp.task('task-name', function(){
    // do stuff here
});

gulp.task('styles', function() {
    gulp.src(['src/styles/*.css'])
    .pipe(concat('styles.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/styles/'));
});

gulp.task('default', ['imagemin', 'styles'], function() {

});

gulp.task('default',['styles'], function() {
    // watch for CSS changes
    gulp.watch('src/styles/*.css', function() {
        // run styles upon changes
        gulp.run('styles');
    });
});

gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: 'build'
        },
    })
})

gulp.task('styles', function() {

    gulp.src(['src/styles/*.css'])
    .pipe(concat('style.css'))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/styles/'))
    .pipe(browserSync.reload({
        stream: true
    }))
});

gulp.task('default', ['browserSync', 'styles'], function(){
    gulp.watch('src/styles/*.css', ['styles']);
});

gulp.task('js', function(){
    gulp.src('src/scripts/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts/'));
});

gulp.task('css', function() {
    gulp.src('src/styles/*.css')
    .pipe(concat('styles.css'))
    .pipe(minify())
    .pipe(gulp.dest('build/styles/'));
});

gulp.task('default',['js', 'css'], function() {
});

gulp.task('imagemin',function() {
    var imgSrc = 'src/images/*.+(png|png|gif)',
    imgDst = 'build/images';

    gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

gulp.task('default',['imagemin'], function(){
});

gulp.task('clean:build', function() {
    return del.sync('build');
});

gulp.task('clean:build', function() {
    // return del.sync('build');
    return del([
        'build/temp/',
        // instructs to clean temp folder
        '!build/package.json'
        // negate to instruct not to clean package.json file ]);
    });