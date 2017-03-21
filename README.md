# webpack-semver-git
A utility that creates a file name hash based on package.json version and git version.

_Note: It's a based on [webpack-chunk-hash](https://github.com/alexindigo/webpack-chunk-hash) which is a clone 
of [webpack-md5-hash](https://www.npmjs.com/package/webpack-md5-hash). This version simply swaps out 
the hash with the combination of git short version and package.json so that build stamps can be meaningful.

## Install

```
npm install --save-dev webpack-chunk-hash
```

## Example

Just add this plugin as usual.

```javascript

// webpack.config.js

var WebpackChunkHash = require('webpack-chunk-hash');

module.exports = {
  // ...
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
  },
  plugins: [
    new WebpackChunkHash({algorithm: 'md5'}) // 'md5' is default value
  ]
};

## License

WebpackChunkHash plugin is released under the [MIT](License) license.