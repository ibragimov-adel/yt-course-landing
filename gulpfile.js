const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const postCSS = require('gulp-postcss');
const rename = require('gulp-rename');
const del = require('del');
const ghPages = require('gulp-gh-pages');

const paths = {
	dist: './dist',
	src: './src'
};

const src = {
	html: paths.src + '/*.html',
	img: paths.src + '/img/**/*.*',
	scss: paths.src + '/scss/**/*.scss',
	js: paths.src + '/js/**/*.js',
	json: paths.src + '/**/*.json'
};

const dist = {
	html: paths.dist,
	img: paths.dist + '/img/',
	css: paths.dist + '/css/',
	js: paths.dist + '/js/',
	json: paths.dist
};

function html() {
	return gulp.src(src.html)
		.pipe(gulp.dest(dist.html))
		.pipe(browserSync.stream());
}

function scss() {
	return gulp.src(src.scss)
		.pipe(sass())
		.pipe(postCSS([
				autoprefixer({
					cascade: false
				})
			])
		)
		.pipe(cleanCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(dist.css))
		.pipe(browserSync.stream());
}

function js() {
	return gulp.src(src.js)
		.pipe(gulp.dest(dist.js))
		.pipe(browserSync.stream());
}

function images() {
	return gulp.src(src.img)
		.pipe(gulp.dest(dist.img))
		.pipe(browserSync.stream());
}

function json() {
	return gulp.src(src.json)
		.pipe(gulp.dest(dist.json))
		.pipe(browserSync.stream())
}

function clean(cb) {
	return del(paths.dist).then(() => cb());
}

function serve() {
	browserSync.init({
		server: {
			baseDir: paths.dist
		},
		open: true,
		cors: true
	});

	gulp.watch(src.html, gulp.series(html));
	gulp.watch(src.scss, gulp.series(scss));
	gulp.watch(src.js, gulp.series(js));
	gulp.watch(src.img, gulp.series(images));
	gulp.watch(src.json, gulp.series(json));
}

const dev = gulp.parallel(html, scss, js, images, json);
const build = gulp.series(clean, dev);

module.exports.default = gulp.series(build, serve);
module.exports.build = gulp.series(build);
