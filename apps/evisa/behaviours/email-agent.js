"use strict";

const NotifyClient = require("./notify-client.js");

module.exports = (emailConfig) => (superclass) => class EmailAgent extends superclass {
    constructor(...args) {
      super(...args);
      this.notifyClient = new NotifyClient(emailConfig);
    }

    async successHandler(req, res, next) {
      if (req.body["continue-button"]) {
        console.log("EmailAgent successHandler continue-button");
        this.notifyClient.sendEmail('some subject', 'some body');
      }
      return super.successHandler(req, res, next);
    }
  };
