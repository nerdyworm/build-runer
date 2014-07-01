var spawn = require('child_process').spawn;

function log(line) {
  process.stdout.write(line);
}

function Builder(command) {
  this.command = command;
}

Builder.prototype.build = function(callback) {
  log('[build] start');

  var build = spawn(this.command);

  build.stdout.on('data', function(data) {
    log('[build] ' + data);
  });

  build.stderr.on('data', function(data) {
    log('[build] ' + data);
  });

  build.on('close', function(code) {
    log('[build] done ' + code);

    if (code === 0) {
      callback();
    }
  });
};

function Runner(command) {
  this.command = command;
  this.running = null;
}

Runner.prototype.start = function() {
  if (this.running !== null)
    return;

  this.running = spawn(this.command);
  this.running.stdout.on('data', log);
  this.running.stderr.on('data', log);
  this.running.on('close', function(code) {
    log('[running] exited ' + code);
  });
};

Runner.prototype.stop = function() {
  if (this.running === null)
    return;

  this.running.kill('SIGINT');
  this.running = null;
};

function BuildRunner(options) {
  this.builder = new Builder(options.build);
  this.runner = new Runner(options.run);
}

BuildRunner.prototype.buildRun = function() {
  var self = this;
  this.builder.build(function() {
    self.restart();
  });
};

BuildRunner.prototype.restart = function() {
  this.runner.stop();
  this.runner.start();
};

module.exports = BuildRunner;
