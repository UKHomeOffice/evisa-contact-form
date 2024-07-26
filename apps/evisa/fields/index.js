'use strict';
/* eslint-disable comma-dangle */

// Biometric Residence Permit validator
const BRPValidator = { type: 'regex', arguments: /^r[a-z](\d|X)\d{6}$/gi };
const URNValidator = { type: 'regex', arguments: /^[a-z0-9]{1,10}$/gi }; // TODO correct URN regex
const PassportValidator = { type: 'regex', arguments: /^[a-z0-9]{1,10}$/gi }; // TODO correct Passport regex

module.exports = {
  // /biometric-residence-permit-number
  'biometric-residence-permit-number-options': {
    mixin: 'radio-group',
    options: [
      {
        value: 'yes',
        toggle: 'biometric-residence-permit-number-number',
        child: 'input-text'
      },
      {
        value: 'no'
      }
    ],
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'biometric-residence-permit-number-number': {
    dependent: {
      field: 'biometric-residence-permit-number-options',
      value: 'yes'
    },
    validate: ['required', BRPValidator]
  },

  // /reference-numbers
  'reference-numbers-options': {
    mixin: 'radio-group',
    options: [
      {
        value: 'opt-unique-ref',
        toggle: 'urn-number',
        child: 'input-text',
      },
      {
        value: 'opt-passport-number',
        toggle: 'passport-number',
        child: 'input-text',
      },
      {
        value: 'opt-other-ref',
        toggle: 'other-reference-number',
        child: 'input-text',
      },
      {
        value: 'opt-none',
      },
    ],
    validate: 'required',
    legend: {
      className: 'visuallyhidden',
    },
  },
  'urn-number': {
    dependent: {
      field: 'reference-numbers-options',
      value: 'opt-unique-ref',
    },
    labelClassName: 'visuallyhidden',
    validate: ['required', URNValidator],
  },
  'passport-number': {
    dependent: {
      field: 'reference-numbers-options',
      value: 'opt-passport-number',
    },
    labelClassName: 'visuallyhidden',
    validate: ['required', PassportValidator],
  },
  'other-reference-number': {
    dependent: {
      field: 'reference-numbers-options',
      value: 'opt-other-ref',
    },
    labelClassName: 'visuallyhidden',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 16 }],
  },

  // ---------------------------------------
  'sent-email': {
    isPageHeading: 'true',
    mixin: 'radio-group',
    validate: 'required',
    className: ['block', 'form-group'],
    options: ['yes', 'no']
  },
  'tech-problem': {
    isPageHeading: 'true',
    mixin: 'radio-group',
    validate: 'required',
    className: ['block', 'form-group'],
    options: ['yes', 'no']
  },
  'full-name': {
    mixin: 'input-text',
    validate: ['required', 'notUrl'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  email: {
    mixin: 'input-text',
    validate: ['required', 'email'],
    labelClassName: 'govuk-label--s'
  },
  'contact-number': {
    mixin: 'input-text',
    validate: ['ukPhoneNumber'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'ref-number': {
    mixin: 'input-text',
    validate: ['notUrl'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds'],
    html: undefined
  },
  question: {
    mixin: 'textarea',
    validate: ['required', 'notUrl', { type: 'maxlength', arguments: 2000 }],
    labelClassName: 'govuk-label--s'
  },
  image: {
    mixin: 'input-file',
    labelClassName: 'visuallyhidden'
  },
  contacted: {
    isPageHeading: 'true',
    mixin: 'radio-group',
    validate: 'required',
    className: ['block', 'form-group'],
    options: ['yes', 'no']
  }
};
