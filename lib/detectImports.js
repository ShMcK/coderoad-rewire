const importRegex = /\bimport\s+(?:\s?(.+)\}?\s+from\s+)?[\'"]([^"\']+)["\']/;
const namedRegex = /^{.+}$/;

let imports = {};

// detects imports
// adds imports to global scope of rewired object
function detectImports(src) {
  src.split('\n').forEach(line => {
    const match = line.match(importRegex);
    let vars = null;
    let path = null;
    if (match) {
      vars = match[1];
      vars = vars.match(namedRegex) ? vars.slice(1, -1) : vars;
      vars = vars.split(',').map(x => x.trim());
      path = match[2];
    }
    // add to array of imports
    if (vars && vars.length) {
      vars.forEach(i => imports[i] = path);
    }
  });

  for (key in imports) { /* jshint forin: false */
      let value = imports[key];

      // key may be an invalid variable name (e.g. 'a-b')
      try {
        // eval(`var ${key};`);
        src += `var ${key}`;
      } catch(e) {}
  }

  return src;
}

module.exports = detectImports;
