'use strict';

const importRegex = /^import\s+(?:\s?(.+)\}?\s+from\s+)?[\'"]([^"\']+)["\']/m;
const namedRegex = /^{.+}$/;

let imports = {};

// detects imports
// adds imports to global scope of rewired object
function detectImports(src) {
  src.split('\n').forEach(line => {
    const match = line.match(importRegex);
    let vars = null;
    let path = null;
    let importType = 'default';

    if (match && match[1]) {
      vars = match[1];
      // named export
      if (vars.match(namedRegex)) {
        vars = vars.slice(1, -1);
        importType = 'named';
      }
      vars = vars.split(',').map(x => x.trim());
      path = match[2];
    }
    // add to array of imports
    if (vars && vars.length) {
      vars.forEach(i => imports[i] = {
        path,
        importType,
      });
    }
  });

  let output = '\n';

  for (let key in imports) { /* jshint forin: false */

      // key may be an invalid variable name (e.g. 'a-b')
      try {
        const { path, importType } = imports[key];
        // eval(`var ${key};`);
        if (importType === 'named') {
          output += `global.${key} = require('${path}').${key};` + '\n';
        } else {
          output += `global.${key} = require('${path}').default;` + '\n';
        }

      } catch(e) {}
  }

  return output;
}

module.exports = detectImports;
