//@ts-check
const S3Service = require('./services/s3Service');
const Image = require('./utils/Image');
/**
 *
 * @param {string} imagekey
 * @param {S3Service} s3service
 */
module.exports = async function validateImage(imagekey, s3service) {
  const { cleanup, filePath, fileName } = await s3service.download(imagekey);

  const image = new Image(filePath);
  const metadata = await image.getMetaData();
  console.log(metadata);
  const imageFormat = metadata.format;
  const size = await image.getFileSize();
  cleanup();
  return {
    fileName,
    imageFormat,
    size,
    height: metadata.height,
    width: metadata.width,
  };
}
