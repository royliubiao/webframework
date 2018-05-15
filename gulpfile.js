const gulp = require("gulp");
const babel = require("gulp-babel");
const watch = require("gulp-watch");
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');

//开发环境
gulp.task("builddev", function() {
    return watch('src/nodebff/**/*.js', {
        ignoreInitial: false
    }, function() {
        gulp.src('src/nodebff/**/*.js')
            .pipe(babel({
                babelrc: false,
                "plugins": [
                    "transform-decorators-legacy", //使用此插件可以在node中使用依赖注入
                    "transform-es2015-modules-commonjs"
                ]
            }))
            .pipe(gulp.dest('./build/'))
    });
})


//上线环境
gulp.task("buildprod", function() {
    gulp.src(['src/nodebff/**/*.js', '!src/nodebff/app.js']) //除app.js外所以后端文件走babel-gulp
        .pipe(babel({
            babelrc: false,
            "plugins": [
                "transform-decorators-legacy", //使用此插件可以在node中使用依赖注入
                "transform-es2015-modules-commonjs"
            ]
        }))
        .pipe(gulp.dest('./build/'))
})
gulp.task("buildprodrollup", ['buildprod'], function() { //执行buildprodrollup 先走buildprod
    gulp.src(['src/nodebff/**/*.js'])
        .pipe(rollup({
            input: ['src/nodebff/app.js'],
            format: 'cjs',
            "plugins": [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production') //起到清洗的作用 让app.js中可以直接使用process.env.NODE_ENV == "production"
                })
            ]
        }))
        .pipe(gulp.dest('./build/'))
})
const _flag = (process.env.NODE_ENV == "production");
const prodBuid = ['buildprod', 'buildprodrollup'];
gulp.task("default", [_flag ? "buildprodrollup" : "builddev"]);