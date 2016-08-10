'use strict';

const __get__ = require("./__get__.js");

const srcs = {
    "__get__": __get__.toString(),
};

function getDefinePropertySrc() {
  return `
if (typeof(module.exports) === 'function' ||
(typeof(module.exports) === 'object' && module.exports !== null && Object.isExtensible(module.exports))) {
  ${Object.keys(srcs).reduce((preValue, value) => {
    return preValue += `Object.defineProperty(module.exports, '${value}', {enumerable: false, value: ${srcs[value]}, writable: true});`;
    }, '')
  }
}`;
}

module.exports = getDefinePropertySrc;
