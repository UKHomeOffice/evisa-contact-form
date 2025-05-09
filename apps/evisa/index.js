'use strict';
/* eslint-disable comma-dangle, spaced-comment */

const SaveImage = require('./behaviours/save-image');
const RemoveImage = require('./behaviours/remove-image');
const config = require('../../config.js');
const EmailCaseworker = require('./behaviours/email-caseworker')(config.email);
const EmailCustomer = require('./behaviours/email-customer')(config.email);

module.exports = {
  name: 'evisa',
  pages: {
    '/accessibility': 'accessibility'
  },
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
      next: '/upload',
    },
    '/upload': {
      behaviours: [EmailCustomer, EmailCaseworker, SaveImage('file-selector'), RemoveImage],
      fields: ['file-selector'],
      next: '/confirmation',
    },
    '/confirmation': {
      behaviours: [],
      clearSession: true, // triggers hof/components/clear-session to clear the session
      backLink: false
    },
    '/session-timeout': {},
    '/exit': {}
  }
};
