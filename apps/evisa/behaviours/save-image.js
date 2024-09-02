'use strict';
/* eslint-disable max-len */

const _ = require('lodash');
const config = require('../../../config');
const ImageUpload = require('../models/image-upload');
const { SESSION, MAX_FILE_UPLOADS } = require('../constants');

const uploadsInfo = session => {
  const sessionImages = session.get(SESSION.IMAGES_UPLOADED);
  const uploadCount = sessionImages && sessionImages.length ? sessionImages.length : 0;
  const atLimit = sessionImages && sessionImages.length >= MAX_FILE_UPLOADS;
  return { uploadCount, atLimit };
};


module.exports = fieldName => superclass => class extends superclass {
  process(req) {
    if (req.files && req.files[fieldName]) {
      const filename = req.files[fieldName].name;
      req.form.values[fieldName] = filename;
      req.log('info', `Processing image: ${filename}`);
    }
    super.process.apply(this, arguments);
  }

  /**
   * Validate the file being uploaded is the correct type and size.
   *
   * @param {string} key - The key of the field to be validated.
   * @param {object} req - The request object containing the field to be validated.
   * @return {object} A ValidationError object if the field is invalid, otherwise the result of the superclass's validateField method.
   */
  validateField(key, req) {
    if (req.body['upload-file-button']) {
      const validationErrorFn = (type, args = []) => new this.ValidationError(key, {
        type: type,
        arguments: [fieldName, ...args]
      });

      // Was a file uploaded?
      const fileToBeValidated = _.get(req.files, fieldName);
      if (!fileToBeValidated) {
        return validationErrorFn('unsaved');
      }

      // At uploads limit?
      const { atLimit } = uploadsInfo(req.sessionModel);
      if (atLimit) {
        return validationErrorFn('tooMany', [{maxUploads: 99}, 1, 2, 3, 'abc']);
      }

      // Is file type (mimetype) in whitelist?
      const mimetype = fileToBeValidated.mimetype;
      const invalidMimetype = !config.upload.allowedMimeTypes.includes(mimetype);
      if (invalidMimetype) {
        return validationErrorFn('fileType', [mimetype]);
      }

      // Is file size within server limits?
      const size = fileToBeValidated.size;
      const sizeTooBig = size > config.upload.maxFileSizeInBytes;
      const sizeBeyondServerLimits = fileToBeValidated.truncated;
      const invalidSize = sizeTooBig || sizeBeyondServerLimits;
      if (invalidSize) {
        return validationErrorFn('maxFileSize', [size]);
      }
    }

    return super.validateField(key, req);
  }

  async saveValues(req, res, next) {
    if (req.body['upload-file-button']) {
      const images = req.sessionModel.get(SESSION.IMAGES_UPLOADED) || [];

      if (_.get(req.files, fieldName)) {
        req.log('info', `Saving image: ${req.files[fieldName].name}`);
        const image = _.pick(req.files[fieldName], ['name', 'data', 'mimetype']);
        const uploader = new ImageUpload(image);

        try {
          await uploader.save();

          req.sessionModel.set(SESSION.IMAGES_UPLOADED, [...images, uploader.toJSON()]);
          return res.redirect(`${req.baseUrl}${req.path}`);
        } catch (error) {
          return next(new Error(`Failed to save image, error: ${error}`));
        }
      }
    }
    return super.saveValues.apply(this, arguments);
  }

  locals(req, res) {
    const { uploadCount, atLimit } = uploadsInfo(req.sessionModel);
    return { ...super.locals(req, res), ...{
      uploadCount,
      maxUploads: MAX_FILE_UPLOADS,
      noMoreUploads: atLimit
    }};
  }
};
