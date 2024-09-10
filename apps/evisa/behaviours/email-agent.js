"use strict";

const NotifyClient = require("./notify-client.js");

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
    return {
      'email-subject': 'some subject',
      'email-body': 'some body',
      'customer-name': session.get('full-name') || 'not supplied',
      'customer-email': session.get('email-field') || 'not supplied',
    }
  }
};
  
