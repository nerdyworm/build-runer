# Build Runner

This tool allows you to use some watcher system to execute a build
command and a run command.

Very helpful for building web applications in go.

## Installation

  npm install build-runner --save-dev

## Ussage with Gulp
``` js
var gulp     = require('gulp'),
    BuildRunner = require('build-runner');

var server = new BuildRunner({
  build: 'make',
  run:   'bin/server'
});

gulp.task('default', function() {
  server.buildRun();

  gulp.watch(['src/**/*.go'], function() {
    server.buildRun();
  });
});
```

## Options
- _build_ - The command to run to build the application.
- _run_ - The command to run to run the application.
