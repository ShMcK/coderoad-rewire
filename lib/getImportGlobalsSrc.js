'use strict';
/**
 * Declares all globals with a var and assigns the global object. Thus you're able to
 * override globals without changing the global object itself.
 *
 * Returns something like
 * "var console = global.console; var process = global.process; ..."
 *
 * @return {String}
 */
const ignore = ['global', 'root', 'process', 'Buffer', 'clearImmediate', 'clearInterval', 'setTimeout', 'module', 'exports', 'require'];

function getImportGlobalsSrc() {
  var key,
    value,
    src = '\n',
    globalObj = typeof global === 'undefined' ? window : global;

  for (key in globalObj) { /* jshint forin: false */
    if (ignore.indexOf(key) !== -1 || key.match(/^__/)) {
      continue;
    }
    // value = globalObj[key];

    // key may be an invalid variable name (e.g. 'a-b')
    try {
      // eval('var ' + key);
      src += `var ${key} = global.${key};`;
    } catch(e) {}
  }

  return src;
}

module.exports = getImportGlobalsSrc;
