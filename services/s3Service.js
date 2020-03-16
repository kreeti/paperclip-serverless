//@ts-check
const AWS = require('aws-sdk');
const fs = require('fs');
const getFileFullName = require('../utils/fileUtils');

module.exports = class S3Service {
  constructor(bucketName) {
    this.bucketName = bucketName;
    this.s3 = new AWS.S3();
  }

  getObject(key) {
    return this.s3.getObject({ Bucket: this.bucketName, Key: key }).promise();
  }

  getObjectAsStream(key) {
    return this.s3
      .getObject({ Bucket: this.bucketName, Key: key })
      .createReadStream();
  }

  /**
   * @param {string} key
   * @returns {Promise<{filePath:string, cleanup: (cb?: any) => any}>}
   */
  download(key) {
    return new Promise((resolve, reject) => {
      const fileName = getFileFullName(key);
      const filePath = `/tmp/${fileName}`;
      const writeStream = fs.createWriteStream(`/tmp/${fileName}`, {
        flags: 'a',
      });
      const resolvedResult = {
        fileName,
        filePath,
        cleanup: (cb = () => {}) => fs.unlink(filePath, cb),
      };
      this.getObjectAsStream(key)
        .pipe(writeStream)
        .on('finish', () => resolve(resolvedResult))
        .on('error', error => reject({ error }));
    });
  }
}
