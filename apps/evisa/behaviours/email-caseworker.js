'use strict';
/* eslint-disable prefer-const */
// Send the form data in an Email to the eVisa Caseworker

const Emailer = require('./emailer.js');
const { SESSION } = require('../constants.js');

module.exports = emailConfig => superclass => class EmailCaseworker extends superclass {
  constructor(...args) {
    super(...args);
    this.emailer = new Emailer(emailConfig);
  }

  line1() {
    return 'test';
  }
  line2() {
    return 'test';
  }
  line3() {
    return 'test';
  }
  line4() {
    return 'test';
  }
  line5() {
    return 'test';
  }
  line6() {
    return 'test';
  }
  line7() {
    return 'test';
  }
  line8() {
    return 'test';
  }
  line9() {
    return 'test';
  }
  line10() {
    return 'test';
  }
  line11() {
    return 'test';
  }

  async successHandler(req, res, next) {
    if (req.body['continue-button']) {
      let personalisation = this.getCaseworkerPersonalisation(req.sessionModel);
      try {
        await this.emailer.sendCaseworkerEmail(personalisation);
      } catch (error) {
        return next(new Error(req.translate('errors.email.caseworker')));
      }
    }
    return super.successHandler(req, res, next);
  }

  getCaseworkerPersonalisation(session) {
    const notSupplied = 'not supplied';
    const noneSupplied = 'none supplied';

    let referenceNumber = session.get(SESSION.BRP_NUMBER) ||
      session.get(SESSION.URN_NUMBER) ||
      session.get(SESSION.PASSPORT_NUMBER) ||
      session.get(SESSION.OTHER_REFERENCE_NUMBER) ||
      notSupplied;

    let uploadedFileLinks = (session.get(SESSION.IMAGES_UPLOADED) || [])
      .map(file => `[${file.name}](${file.generatedLink})`)
      .join('\n')
      || noneSupplied;

    return {
      'customer-name': session.get(SESSION.FULL_NAME) || notSupplied,
      'customer-email': session.get(SESSION.EMAIL_FIELD) || notSupplied,
      'customer-phone': session.get(SESSION.CONTACT_NUMBER) || notSupplied,
      'reference-number': referenceNumber,
      'customer-question': session.get(SESSION.QUESTION_FIELD) || notSupplied,
      'uploaded-files': uploadedFileLinks
    };
  }
};
