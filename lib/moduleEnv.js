'use strict';

var Module = require('module'),
    fs = require('fs');

    // caching original wrapper
var moduleWrapper0 = Module.wrapper[0],
    moduleWrapper1 = Module.wrapper[1],
    originalExtensions = {},
    nodeRequire,
    currentModule;

function load(targetModule) {
    nodeRequire = targetModule.require;
    targetModule.require = requireProxy;
    currentModule = targetModule;

    targetModule.load(targetModule.id);

    // This is only necessary if nothing has been required within the module
    reset();
}

function reset() {
    Module.wrapper[0] = moduleWrapper0;
    Module.wrapper[1] = moduleWrapper1;
}

function inject(prelude, appendix) {
    Module.wrapper[0] = moduleWrapper0 + prelude;
    Module.wrapper[1] = appendix + moduleWrapper1;
}

/**
 * Proxies the first require call in order to draw back all changes to the Module.wrapper.
 * Thus our changes don't influence other modules
 *
 * @param {!String} path
 */
function requireProxy(path) {
    reset();
    currentModule.require = nodeRequire;
    return nodeRequire.call(currentModule, path);  // node's require only works when "this" points to the module
}

exports.load = load;
exports.inject = inject;
