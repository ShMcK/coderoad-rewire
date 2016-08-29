'use strict';

const { accessSync, F_OK } = require('fs');

function fileExists(path) {
  try {
    accessSync(path, F_OK);
  } catch (e) {
    if (e) {
      console.log(e);
    }
    return false;
  }
  return true;
}

module.exports = fileExists;
