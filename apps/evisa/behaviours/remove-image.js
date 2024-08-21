'use strict';

const { SESSION } = require('../constants');

// Remove the image from the session that is identified by the id in `req.query.delete`
module.exports = superclass => class extends superclass {
  configure(req, res, next) {
    if (req.query.delete) {
      const images = req.sessionModel.get(SESSION.IMAGES_UPLOADED) || [];
      const { name } = images.find(image => image.id === req.query.delete) || { name: '' };
      req.log('info', `Removing image: ${name} ${req.query.delete}`);
      
      const remaining = images.filter(i => i.id !== req.query.delete);
      req.sessionModel.set(SESSION.IMAGES_UPLOADED, remaining);
      return res.redirect(`${req.baseUrl}${req.path}`);
    }
    return super.configure(req, res, next);
  }
};
