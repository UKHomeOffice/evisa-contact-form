/* eslint-disable node/no-deprecated-api */
'use strict';

const url = require('url');
const Model = require('hof').model;
const uuid = require('uuid').v4;

const config = require('../../../config');
const logger = require('hof/lib/logger')({ env: config.env });

module.exports = class ImageUpload extends Model {
  constructor(...args) {
    super(...args);
    this.set('id', uuid());
  }

  save() {
    if (!config.upload.hostname) {
      const errorMsg = 'File-vault hostname is not defined';
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }

    return new Promise((resolve, reject) => {
      const attributes = {
        url: config.upload.hostname
      };
      const reqConf = url.parse(this.url(attributes));  // TODO refactor away from .parse
      reqConf.formData = {
        document: {
          value: this.get('data'),
          options: {
            filename: this.get('name'),
            contentType: this.get('mimetype')
          }
        }
      };
      reqConf.method = 'POST';

      return this.request(reqConf, (err, response) => {
        if (err) {
          reqConf.formData.document.value = '**REMOVED**';
          logger.error(`Image upload failed: ${err.message},
            error: ${JSON.stringify(err)},
            reqConf: ${JSON.stringify(reqConf)}`);
          return reject(new Error(`File upload failed: ${err.message}`));
        }

        if (Object.keys(response).length === 0) {
          return reject(new Error('Received empty response from file-vault'));
        }

        logger.info(`Received response from file-vault with keys: ${Object.keys(response)}`);
        return resolve(response);
      });
    })
      .then(result => {
        return this.set({
          url: result.url.replace('/file/', '/file/generate-link/').split('?')[0]
        });
      })
      .then(() => {
        return this.unset('data');
      });
  }

  async auth() {
    const requiredProperties = ['tokenUrl', 'username', 'password', 'clientId', 'secret'];

    for (const property of requiredProperties) {
      if (!config.keycloak[property]) {
        const errorMsg = `Keycloak ${property} is not defined`;
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }
    }

    const tokenReq = {
      url: config.keycloak.tokenUrl,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: {
        username: config.keycloak.username,
        password: config.keycloak.password,
        grant_type: 'password',
        client_id: config.keycloak.clientId,
        client_secret: config.keycloak.secret
      },
      method: 'POST'
    };

    try {
      const response = await this._request(tokenReq);

      if (!response.data || !response.data.access_token) {
        const errorMsg = 'No access token in response';
        logger.error(errorMsg);
        throw new Error(errorMsg);
      }

      logger.info('Successfully retrieved access token');
      return {
        bearer: response.data.access_token
      };
    } catch(err) {
      const errorMsg = `Error occurred: ${err.message},
        Cause: ${err.response.status} ${err.response.statusText}, Data: ${JSON.stringify(err.response.data)}`;
      logger.error(errorMsg);
      throw new Error(errorMsg);
    }
  }
};
