"use strict";

const RealNotifyClient = require("notifications-node-client").NotifyClient; // TODO refactor into constructor
const logger = require("hof/lib/logger")({ env: process.env });

module.exports = class NotifyClient {
  constructor(emailConfig) {
    console.log(`NotifyClient emailConfig: ${JSON.stringify(emailConfig)}`);

    let requiredProperties = ["notifyApiKey", "notifyTemplate", "caseWorkersEmail"];
    let missing = requiredProperties.filter((property) => !emailConfig[property]);
    if (missing.length > 0) {
      let errorMsg = missing.map((property) => `config.email ${property} is not defined`).join("\n");
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    this.emailConfig = emailConfig;
    this.notifyClient = new RealNotifyClient(emailConfig.notifyApiKey);
  }

  async sendEmail(subjectText, bodyText) {
    try {
      await this.notifyClient.sendEmail(this.emailConfig.notifyTemplate, this.emailConfig.caseWorkersEmail, {
        personalisation: {
          'email-subject': subjectText,
          'email-body': bodyText,
        },
      });

      logger.info(`Email sent successfully: "${subjectText}"`);
    } catch (err) {
      let errorDetails = err.response?.data ? `Cause: ${JSON.stringify(err.response.data)}` : '';
      let errorCode = err.code ? `${err.code} -` : '';
      let errorMessage = `${errorCode} ${err.message}; ${errorDetails}`;

      logger.error(`Failed to send Email: ${errorMessage}`);
      throw Error(errorMessage);
    }
  }
}
