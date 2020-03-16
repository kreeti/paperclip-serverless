'use strict';

const S3Service = require('./services/s3Service');
const throwError = require('./utils/throwError');
const validateImage = require('./validateImage');

const bucket = process.env.S3_RAW_BUCKET;

module.exports.details = async event => {
  const { image: imageKey } = JSON.parse(event.body || null) || {};
  if (!imageKey) throwError('Image is missing in payload');
  const s3Bucket = new S3Service(bucket);
  return validateImage(imageKey, s3Bucket);
};
