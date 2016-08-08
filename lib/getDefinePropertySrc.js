"use strict";

var __get__ = require("./__get__.js");

var srcs = {
    "__get__": __get__.toString(),
};

function getDefinePropertySrc() {
    var src = "if (typeof(module.exports) === 'function' || \n" +
            "(typeof(module.exports) === 'object' && module.exports !== null && Object.isExtensible(module.exports))) {\n";

    src += Object.keys(srcs).reduce(function forEachSrc(preValue, value) {
        return preValue += "Object.defineProperty(module.exports, '" +
            value +
            "', {enumerable: false, value: " +
            srcs[value] +
            ", "+
            "writable: true}); ";
    }, "");

    src += "\n}";

    return src;
}

module.exports = getDefinePropertySrc;
