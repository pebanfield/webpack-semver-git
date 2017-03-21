var gitRevision = require('git-revision');
var pjson = require('./package.json');

module.exports = WebpackSemverGit;

function WebpackSemverGit() {
}

WebpackSemverGit.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('chunk-hash', function(chunk, chunkHash) {
      var shortHash = gitRevision("short");
      chunkHash.digest = function() {
        return pjson.version + "_" + shortHash;
      };
    });
  });
};


