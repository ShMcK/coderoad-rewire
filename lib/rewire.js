'use strict';
const Module = require('module');
const { readFileSync, join } = require('fs');
const getImportGlobalsSrc = require('./getImportGlobalsSrc');
const getDefinePropertySrc = require('./getDefinePropertySrc');
const moduleEnv = require('./moduleEnv');
const addImportsAsVars = require('./addImportsAsVars');

/**
 * Does actual rewiring the module. For further documentation @see index.js
 */
function internalRewire(parentModulePath, targetPath) {
    var targetModule,
        prelude,
        appendix,
        src;

    // Checking params
    if (typeof targetPath !== 'string') {
        throw new TypeError('Filename must be a string');
    }

    // Resolve full filename relative to the parent module
    targetPath = join(targetPath, parentModulePath);

    src = readFileSync(targetPath, 'utf8');

    // create testModule as it would be created by require()
    targetModule = new Module(targetPath, parentModulePath);

    // prepend a list of all globals declared with var so they can be overridden (without changing original globals)
    prelude = getImportGlobalsSrc();
    prelude += '(function () { ';
    appendix = '\n' + getDefinePropertySrc(src);
    appendix += '\n' + addImportsAsVars(src);
    appendix += '})();';

    moduleEnv.inject(prelude, appendix);
    moduleEnv.load(targetModule);

    return targetModule.exports;
}

module.exports = internalRewire;
