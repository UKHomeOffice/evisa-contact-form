const config = require('../../config');
const agentEmail = require('./behaviours/agent-email')(config.email);
const clearSession = require('./behaviours/clear-session'); // TODO check is used and remove
const limitDocument = require('./behaviours/limit-documents');
const removeImage = require('./behaviours/remove-image');
const saveImage = require('./behaviours/save-image');

module.exports = {
  name: 'evisa',
  baseUrl: '/',
  steps: {
    '/start1': {
      next: '/start2',
    },
    '/start2': {
      next: '/invite',
    },
    '/invite': {
      fields: ['sent-email'],
      next: '/start',
      forks: [
          {
            target: '/no-invite',
            condition: {
              field: 'sent-email',
              value: 'no',
            }
          }
      ]
    },
    '/start': {
      next: '/technical'

    },
    '/no-invite': {
      backLink: false
    },
    '/technical': {
      fields: ['tech-problem'],
      next: '/contact-details',
    },
    '/contact-details': {
      behaviours: [agentEmail, 'complete', saveImage('image'), removeImage, limitDocument],
      fields: ['full-name', 'email', 'contact-number', 'ref-number', 'question', 'image', 'contacted'],
      next: '/confirmation',
    },
    '/confirmation': {
      behaviours: [],
      backLink: false
    },
  }
};
