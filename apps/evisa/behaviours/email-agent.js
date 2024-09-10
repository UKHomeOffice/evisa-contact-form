"use strict";

const NotifyClient = require('./notify-client.js');
const { SESSION } = require('../constants.js');

module.exports = (emailConfig) => (superclass) => class EmailAgent extends superclass {
  constructor(...args) {
    super(...args);
    this.notifyClient = new NotifyClient(emailConfig);
  }

  async successHandler(req, res, next) {
    if (req.body["continue-button"]) {
      let personalisation = this.getAgentPersonalisation(req.sessionModel)
      this.notifyClient.sendAgentEmail(personalisation);
    }
    return super.successHandler(req, res, next);
  }

  getAgentPersonalisation(session) {
    let referenceNumber = session.get(SESSION.BRP_NUMBER) ||
      session.get(SESSION.URN_NUMBER) ||
      session.get(SESSION.PASSPORT_NUMBER) ||
      session.get(SESSION.OTHER_REFERENCE_NUMBER) ||
      'not supplied';

    let uploadedFiles = session.get(SESSION.IMAGES_UPLOADED) || 'none supplied';
    return {
      'customer-name': session.get(SESSION.FULL_NAME) || 'not supplied',
      'customer-email': session.get(SESSION.EMAIL_FIELD) || 'not supplied',
      'customer-phone': session.get(SESSION.CONTACT_NUMBER) || 'not supplied',
      'reference-number': referenceNumber,
      'customer-question': session.get(SESSION.QUESTION_FIELD) || 'not supplied',
      'uploaded-files': uploadedFiles
    }
  }
};
