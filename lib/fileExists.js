var fs = require('fs');

function fileExists(path) {
  try {
      fs.accessSync(path, fs.F_OK);
  }
  catch (e) {
    if (e) {
      console.log(e);
    }
    return false;
  }
  return true;
}

module.exports = fileExists;
