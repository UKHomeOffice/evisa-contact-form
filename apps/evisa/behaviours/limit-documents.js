const { SESSION, MAX_FILE_UPLOADS } = require('../constants');

const uploadsInfo = session => {
  const images = session.get(SESSION.IMAGES_UPLOADED);
  const uploadCount = images && images.length ? images.length : 0;
  const atLimit = images && images.length >= MAX_FILE_UPLOADS;
  return { uploadCount, atLimit };
};

module.exports = superclass => class LimitDocs extends superclass {
  validate(req, res, next) {
    if (Object.keys(req.files).length) {
      const { atLimit } = uploadsInfo(req.sessionModel);
      if (atLimit) {
        return next({
          image: new this.ValidationError(
            'image',
            {
              type: 'tooMany'
            }
          )
        });
      } 
    }
    return super.validate(req, res, next);
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
