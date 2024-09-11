'use strict';
/* eslint-disable prefer-const */
// Send a receipt email to the customer

const NotifyClient = require('./notify-client.js');
const { SESSION } = require('../constants.js');
const logger = require('hof/lib/logger')({ env: process.env });

module.exports = emailConfig => superclass => class EmailCustomer extends superclass {
  constructor(...args) {
    super(...args);
    this.notifyClient = new NotifyClient(emailConfig);
  }

  async successHandler(req, res, next) {
    if (req.body['continue-button']) {
      let emailAddress = req.sessionModel.get(SESSION.EMAIL_FIELD);
      if (emailAddress) {
        let personalisation = this.getCustomerPersonalisation(req.sessionModel);
        this.notifyClient.sendCustomerEmail(emailAddress, personalisation);
        logger.info('Customer receipt email sent');
      } else {
        logger.error('Customer email address missing, unable to send receipt email');
      }
    }
    return super.successHandler(req, res, next);
  }

  getCustomerPersonalisation(session) {
    const notSupplied = 'not supplied';
    return {
      'customer-name': session.get(SESSION.FULL_NAME) || notSupplied,
      'customer-question': session.get(SESSION.QUESTION_FIELD) || notSupplied,
    };
  }
};
