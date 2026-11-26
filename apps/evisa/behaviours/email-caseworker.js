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

  aLine1() {
    return 'test';
  }
  aLine2() {
    return 'test';
  }
  aLine3() {
    return 'test';
  }
  aLine4() {
    return 'test';
  }
  aLine5() {
    return 'test';
  }
  aLine6() {
    return 'test';
  }
  aLine7() {
    return 'test';
  }
  aLine8() {
    return 'test';
  }
  aLine9() {
    return 'test';
  }
  aLine10() {
    return 'test';
  }
  aLine11() {
    return 'test';
  }
  aLine12() {
    return 'test';
  }
  aLine13() {
    return 'test';
  }
  aLine14() {
    return 'test';
  }
  aLine15() {
    return 'test';
  }
  aLine16() {
    return 'test';
  }
  aLine17() {
    return 'test';
  }
  aLine18() {
    return 'test';
  }
  aLine19() {
    return 'test';
  }
  aLine20() {
    return 'test';
  }
  aLine21() {
    return 'test';
  }
  aLine22() {
    return 'test';
  }
  aLine23() {
    return 'test';
  }
  aLine24() {
    return 'test';
  }
  aLine25() {
    return 'test';
  }
  aLine26() {
    return 'test';
  }
  aLine27() {
    return 'test';
  }
  aLine28() {
    return 'test';
  }
  aLine29() {
    return 'test';
  }
  aLine30() {
    return 'test';
  }
};
