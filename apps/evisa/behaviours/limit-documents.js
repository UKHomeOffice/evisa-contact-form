const { SESSION } = require('../constants');

module.exports = superclass => class LimitDocs extends superclass {
  validate(req, res, next) {
    const images = req.sessionModel.get(SESSION.IMAGES_UPLOADED);
    if (images && images.length >= 2) { // TODO replace magic number with config
      return next({
        image: new this.ValidationError(
          'image',
          {
            type: 'tooMany'
          }
        )
      });
    } super.validate(req, res, next);
    return next;
  }
};
