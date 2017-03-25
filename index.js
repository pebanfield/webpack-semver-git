var _ = require('lodash');
var pjson;
var _projectRoot;

module.exports = WebpackSemverGit;

function WebpackSemverGit(projectRoot) {
  _projectRoot = projectRoot;
  pjson = require(_projectRoot+'/package.json');
}

WebpackSemverGit.prototype.apply = function(compiler) {

  compiler.plugin('compilation', function(compilation) {

    compilation.plugin('chunk-hash', function(chunk, chunkHash) {

      var shortHash = getRev("short", _projectRoot);
      chunkHash.digest = function() {
        return pjson.version + "_" + shortHash;
      }
    });
  });
};

var process = require('child_process'),
  exec = process.exec,
  execSync = process.execSync;

function parseOutput(output) {
  return output.split('\n').join('')
}

/**
 * The actual exported module
 * @param  {string}     type the type of revision information wanted
 * @param  {[Function]} cb either a callback (for async return) or nothing (for sync return)
 * @return {[string]}   if sync, return a string
 */
function getRev(type, path, cb) {

  // The actual shell command that will be run
  var command

  // Switch off the type and set the shell command
  switch(type) {

    // Short git SHA1 hash
    case 'short':
      command = 'git --git-dir ' + path + '/.git rev-parse --short HEAD'
      break;

    // Full git SHA1 hash
    case 'hash':
    case 'long':
      command = 'git --git-dir ' + path + '/.git rev-parse HEAD'
      break;

    // The current tag if there is a tag,
    //  otherwise, just returns the current hash
    case 'tag':
      command = 'git --git-dir ' + path + '/.git describe --always --tag --abbrev=0'
      break;

    // Current branch
    case 'branch':
      command = 'git --git-dir ' + path + '/.git rev-parse --abbrev-ref HEAD'
      break;

    // If the type doesn't match anything,
    //  throw a ReferenceError
    default:
      throw ReferenceError('Revision type "' + type + '" is invalid')
      break;
  }

  // If the callback is a function, run asynchronously
  if(typeof cb == 'function')
    exec(command, {cwd: __dirname}, function (err, stdout, stderr) {
      if(err)
        cb(parseOutput(stderr), err)
      else
        cb(parseOutput(stdout))
    })

  // Otherwise return the synchronous results
  else
    return parseOutput(execSync(command, {cwd: __dirname}).toString())

}

