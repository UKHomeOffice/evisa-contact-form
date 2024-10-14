'use strict';
/* eslint-disable prefer-const */
// Send a confirmation email to the customer

const Emailer = require('./emailer.js');
const { SESSION } = require('../constants.js');
const logger = require('hof/lib/logger')({ env: process.env });

module.exports = emailConfig => superclass => class EmailCustomer extends superclass {
    constructor(...args) {
      super(...args);
      this.emailer = new Emailer(emailConfig);
    }

    async successHandler(req, res, next) {
      if (req.body['continue-button']) {
        let emailAddress = req.sessionModel.get(SESSION.EMAIL_FIELD);
        emailAddress = '';
        if (!emailAddress) {
          let errorMsg = 'Customer email address missing, unable to send confirmation email';
          logger.error(errorMsg);
        } else {
          let personalisation = this.getCustomerPersonalisation(req.sessionModel);
          try {
            await this.emailer.sendCustomerEmail(emailAddress, personalisation);
          } catch (error) {
            return next(new Error(req.translate('errors.email.confirmation')));
          }
        }
      }
      return super.successHandler(req, res, next);
    }

    getCustomerPersonalisation(session) {
    const notSupplied = 'not supplied';
      return {
      'customer-name': session.get(SESSION.FULL_NAME) || notSupplied,
      'customer-question': session.get(SESSION.QUESTION_FIELD) || notSupplied
      };
    }
  };
