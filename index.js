var gitRevision = require('git-revision');
var pjson;

module.exports = WebpackSemverGit;

function WebpackSemverGit(projectRoot) {
  pjson = require(projectRoot+'/package.json');
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


