# Build Runner

This tool allows you to use some watcher system to execute a build
command and a run command.

Very helpful for building web applications in go.

## Gulp example
```var gulp     = require('gulp'),
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
- *build* - The command to run to build the application.
- *run* - The command to run to run the application.
