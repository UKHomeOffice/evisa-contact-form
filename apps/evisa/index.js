'use strict';
/* eslint-disable comma-dangle */

/* // TODO
const config = require('../../config');
const agentEmail = require('./behaviours/agent-email')(config.email);
const limitDocument = require('./behaviours/limit-documents');
const removeImage = require('./behaviours/remove-image');
const saveImage = require('./behaviours/save-image');
*/

module.exports = {
  name: 'evisa',
  baseUrl: '/',
  steps: {
    '/start': {
      next: '/biometric-residence-permit-number'
    },
    '/biometric-residence-permit-number': {
      fields: [
        'brp-options',
        'brp-number'
      ],
      forks: [
        {
          target: '/your-details',
          condition: {
            field: 'brp-options',
            value: 'yes'
          }
        },
        {
          target: '/reference-numbers',
          condition: {
            field: 'brp-options',
            value: 'no'
          }
        }
      ],
    },
    '/reference-numbers': {
      fields: [
        'reference-numbers-options',
        'urn-number',
        'passport-number',
        'other-reference-number',
      ],
      next: '/your-details'
    },
    '/your-details': {
      behaviours: [],
      fields: ['full-name', 'email-field', 'contact-number', 'question-field'],
      next: '/confirmation',
    },

    '/technical': {
      fields: ['tech-problem'],
      next: '/your-details',
    },
    '/confirmation': {
      behaviours: [],
      clearSession: true, // triggers hof/components/clear-session to clear the session
      backLink: false
    },
  }
};
