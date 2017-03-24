var gitRevision = require('git-revision');
var _ = require('lodash');
var pjson;
var exclusions;

module.exports = WebpackSemverGit;

function WebpackSemverGit(projectRoot, exlusions) {
  exclusions = exclusions;
  pjson = require(projectRoot+'/package.json');
}

WebpackSemverGit.prototype.apply = function(compiler) {
  compiler.plugin('compilation', function(compilation) {
    compilation.plugin('chunk-hash', function(chunk, chunkHash) {

      console.log("chunk = " + chunk);
      if(!_.includes(exclusions, chunk)){
        var shortHash = gitRevision("short");
        chunkHash.digest = function() {
          return pjson.version + "_" + shortHash;
        };
      } else {
        return chunk;
      }
    });
  });
};


