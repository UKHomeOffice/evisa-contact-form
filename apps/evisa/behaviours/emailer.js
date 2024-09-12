'use strict';
/* eslint-disable prefer-const */

const NotifyClient = require('notifications-node-client').NotifyClient;
const logger = require('hof/lib/logger')({ env: process.env });

module.exports = class Emailer {
  constructor(emailConfig) {
    // Configuration check
    let requiredProperties = ['notifyApiKey', 'caseworkerTemplateId', 'caseworkerEmail'];
    let missing = requiredProperties.filter(property => !emailConfig[property]);
    if (missing.length > 0) {
      let errorMsg = missing.map(property => `config.email ${property} is not defined`).join('\n');
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    this.emailConfig = emailConfig;
    this.notifyClient = new NotifyClient(emailConfig.notifyApiKey);
  }

  async sendCaseworkerEmail(personalisation) {
    await this._sendEmail(
      this.emailConfig.caseworkerTemplateId,
      this.emailConfig.caseworkerEmail,
      personalisation,
      'Agent'
    );
  }

  async sendCustomerEmail(emailAddress, personalisation) {
    await this._sendEmail(
      this.emailConfig.customerTemplateId,
      emailAddress,
      personalisation,
      'Customer'
    );
  }

  async _sendEmail(templateId, emailAddress, personalisation, type) {
    try {
      let response = await this.notifyClient.sendEmail(templateId, emailAddress, { personalisation });
      logger.info(`${type} Email sent successfully: ${response?.data?.id || 'no id'}`);
    } catch (err) {
      let errorDetails = err.response?.data ? `Cause: ${JSON.stringify(err.response.data)}` : '';
      let errorCode = err.code ? `${err.code} -` : '';
      let errorMessage = `${errorCode} ${err.message}; ${errorDetails}`;

      logger.error(`Failed to send Email: ${errorMessage}`);
      throw Error(errorMessage);
    }
  }
};
