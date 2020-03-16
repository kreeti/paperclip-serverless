const fs = require('fs');

const sharp = require('sharp');

module.exports = class Image {
  /**
   *
   * @param {string | NodeJS.ReadStream} filepath
   */
  constructor(filepath) {
    this.filepath = filepath;
  }

  getMetaData() {
    return sharp(this.filepath).metadata();
  }

  /**
   * @returns {Promise<number>} File size in KB
   */
  getFileSize() {
    return new Promise((resolve, reject) => {
      fs.stat(this.filepath, (err, stats) => {
        if (err) return reject(err);
        return resolve(stats.size / 1000.0);
      });
    });
  }
}
