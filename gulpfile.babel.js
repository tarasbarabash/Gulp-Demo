import { src, dest, series, task, watch, parallel } from "gulp";
import sass from "gulp-sass";
import clean from "gulp-clean";
import inject from "gulp-inject";
import cleanCSS from "gulp-clean-css";
import babel from "gulp-babel";

task("clean", () => src("./build/**/*", { read: false }).pipe(clean()));

task("assets", () =>
  src("./src/assets/**/*", { read: false }).pipe(dest("./build/assets"))
);

task("babel", () =>
  src("./src/js/**/*.js")
    .pipe(babel())
    .pipe(dest("./build/js"))
);

task("sass", () =>
  src("./src/styles/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(dest("./build/css"))
);

task("watch", () => {
  watch("./src/styles/**/*.scss", series("sass", "inject"));
  watch("./src/js/**/*.js", series("babel", "inject"));
});

task("inject", () => {
  const target = src("./src/index.html");
  const res = src(["./build/css/**/*.css", "./build/js/**/*.js"], {
    read: false
  });
  return target.pipe(inject(res, { relative: true })).pipe(dest("./build"));
});

task("default", series("clean", "assets", "babel", "sass", "inject", "watch"));
