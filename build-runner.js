var spawn = require('child_process').spawn;

function log(line) {
  process.stdout.write(line);
}

function make(cmd, success) {
  log('[build] start');

  var m = spawn(cmd);

  m.stdout.on('data', function(data) {
    log('[build] ' + data);
  });

  m.stderr.on('data', function(data) {
    log('[build] ' + data);
  });

  m.on('close', function(code) {
    log('[build] done ' + code);

    if (code === 0) {
      success();
    }
  });
}

function Server(cmd) {
  var  server = null;

  var start = function () {
    if (server !== null)
      return;

    server = spawn(cmd);

    server.stdout.on('data', function(data) {
      log(data);
    });

    server.stderr.on('data', function(data) {
      log(data);
    });

    server.on('close', function(code) {
      log('[server] exited ' + code);
    });
  };

  var stop = function() {
    if (server === null)
      return;

    server.kill('SIGINT');
    server = null;
  };

  return { start: start, stop: stop };
}

function BuilderRunner(options) {
  this.options = options;
  this.server = new Server(options.run);
}

BuilderRunner.prototype.buildRun = function() {
  var self = this;
  make(this.options.build, function() {
    self.restart();
  });
};

BuilderRunner.prototype.restart = function() {
  this.server.stop();
  this.server.start();
};

module.exports = BuilderRunner;
