const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

const browserSync = require('browser-sync');
const webpack = require("webpack");
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const webpackConfig = require('./webpack.config.js');
const bundler = webpack(webpackConfig);

const stylePath = 'themes/**/*.{css,sass}';
gulp.task('css', () => {
    gulp.src(stylePath)
        .pipe(sass())
        .pipe(gulp.dest("dist/"));
});

gulp.task('browser-sync-server', () => {
    browserSync({
        https: false,
        ws: true,
        server: {
            baseDir: './',
            middleware: [
                webpackDevMiddleware(bundler, {
                    publicPath: webpackConfig.output.publicPath,
                    stats: {colors: true}
                }),
                webpackHotMiddleware(bundler)
            ]
        },
        open: "external"
    });
});

gulp.task('watch', ['css', 'browser-sync-server'], function () {
    gulp.watch([stylePath], ['css']);
});
