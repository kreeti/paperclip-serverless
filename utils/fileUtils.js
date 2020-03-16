const path = require('path');

/**
 * @param {string} filename
 */
module.exports = function getFileName(filename) {
  if (!filename) return null;
  return path.parse(getFileFullName(filename)).name;
}

module.exports = function getFileFullName(filename) {
  if (!filename) return null;
  return path.basename(filename);
}
