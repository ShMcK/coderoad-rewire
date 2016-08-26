'use strict';

const __get__ = require('./__get__');

function getDefinePropertySrc(src) {

  const getMethods = src => ({
    '__get__': __get__.toString(),
    // '__text__': src.toString(),
  });

  const methods = getMethods(src);

  return `
if (typeof(module.exports) === 'function' ||
(typeof(module.exports) === 'object' && module.exports !== null && Object.isExtensible(module.exports))) {
  ${Object.keys(methods).reduce((preValue, value) => {
    return preValue += `Object.defineProperty(module.exports, '` + value + `', {enumerable: false, value: ` + methods[value] + `, writable: true});`;
  }, '')}}`;
}

module.exports = getDefinePropertySrc;
