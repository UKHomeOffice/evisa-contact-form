'use strict';
/* eslint-disable no-unused-vars, no-console */

const hof = require('hof');
const notify = hof.components.notify;
// const { notify } = require('hof');   // hof.components.notify // TODO refactor to use this
const path = require('path');

const parse = (model, translate) => {
  console.log(model?.images?.[0]?.url ?? 'No URL available');

  return {
    contactDetails: [
      {
        label: 'name',
        value: model?.['full-name'] ?? 'N/A'
      },
      {
        label: 'Email',
        value: model?.email ?? 'N/A'
      },
      {
        label: 'Phone',
        value: model?.['contact-number'] ?? 'N/A'
      },
      {
        label: 'imageLink',
        value: model?.images?.[0]?.url ?? 'N/A'
      }
    ]
  };
};

module.exports = config => {
  return notify(Object.assign({}, config, {
    
    recipient: config.caseWorkersEmail,
    subject: (model, translate) => 'Getting access to your eVisa',
    template: path.resolve(__dirname, '../views/emails/agent.html'),
    parse
  }));
};
