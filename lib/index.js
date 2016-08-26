'use strict';
var rewireModule = require('./rewire.js');
var fileExists = require('./fileExists');

/**
 * Adds a special setter and getter to the module located at filename. After the module has been rewired, you can
 * call myModule.__set__(name, value) and myModule.__get__(name) to manipulate private variables.
 *
 * @param {!String} filename Path to the module that shall be rewired. Use it exactly like require().
 * @return {*} the rewired module
 */
function rewire(filename) {
  // is not a node_module path
  if (!filename.match(/^[a-zA-Z\_]/)) {
    if (!fileExists(filename)) {
      // create a __get__ mock to prevent tests breaking
      // when file does not exist
      return {
        __get__: () => {},
        __text__: undefined,
      };
    }
    // proceed with rewiring
    return rewireModule(module.parent, filename);
  }
  // is a node_module path, use normal require
  return require(filename);
}

module.exports = rewire;

delete require.cache[__filename];
// deleting self from module cache so the parent module is always up to date
