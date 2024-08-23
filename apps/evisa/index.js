'use strict';
/* eslint-disable comma-dangle, spaced-comment*/

// const config = require('../../config');
const SaveImage = require('./behaviours/save-image');
const RemoveImage = require('./behaviours/remove-image');
const LimitDocument = require('./behaviours/limit-documents');
//const agentEmail = require('./behaviours/agent-email')(config.email);

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
      next: '/upload',
    },
    '/upload': {
      behaviours: [SaveImage('image-upload'), RemoveImage, LimitDocument],
      fields: ['image-upload'],
      next: '/confirmation',
    },

    '/confirmation': {
      behaviours: [],
      clearSession: true, // triggers hof/components/clear-session to clear the session
      backLink: false
    },
  }
};
