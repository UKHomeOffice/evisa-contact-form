'use strict';
/* eslint-disable comma-dangle */

// Biometric Residence Permit validator
// BRP number format: RAXnnnnnn      (9 characters)
// R = the letter 'r' (allow lower and uppercase)
// A = any alphabetical character [a-z] (upper or lowercase)
// X = the letter 'X' or any number [0-9]
// n = any number [0-9]
const BRPValidator = { type: 'regex', arguments: /^r[a-z](\d|X)\d{6}$/i };

// Unique Reference Number validator
// URN number format: 1111-2222-3333-4444 with optional dash - or slash / group separators
const URNValidator = { type: 'regex', arguments: /^\d{4}(?:[-\/]?)\d{4}(?:[-\/]?)\d{4}(?:[-\/]?)\d{4}$/ };

// Passport number validator
const PassportValidator = { type: 'regex', arguments: /^[a-z0-9]{9,10}$/i };

// Invalid Characters validator [ ] < > / |
function invalidCharactersValidator(value) {
  return value.match( /^[^\[\]\|\/<>]+$/ );
}

module.exports = {
  // /biometric-residence-permit-number
  'brp-options': {
    mixin: 'radio-group',
    options: [
      {
        value: 'yes',
        toggle: 'brp-number',
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
  'brp-number': {
    dependent: {
      field: 'brp-options',
      value: 'yes'
    },
    validate: [
      'required',
      { type: 'minlength', arguments: [9] },
      { type: 'maxlength', arguments: [9] },
      BRPValidator
    ]
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
    validate: [
      'required',
      { type: 'minlength', arguments: [16] },
      { type: 'maxlength', arguments: [22] },
      URNValidator
    ],
  },
  'passport-number': {
    dependent: {
      field: 'reference-numbers-options',
      value: 'opt-passport-number',
    },
    labelClassName: 'visuallyhidden',
    validate: [
      'required',
      { type: 'minlength', arguments: [9] },
      { type: 'maxlength', arguments: [10] },
      PassportValidator
    ],
  },
  'other-reference-number': {
    dependent: {
      field: 'reference-numbers-options',
      value: 'opt-other-ref',
    },
    labelClassName: 'visuallyhidden',
    validate: [
      'required',
      'notUrl',
      { type: 'maxlength', arguments: 16 }
    ],
  },

  'full-name': {
    mixin: 'input-text',
    validate: [
      'required',
      'notUrl',
      { type: 'maxlength', arguments: 250 },
      invalidCharactersValidator,
    ],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'email-field': {
    mixin: 'input-text',
    validate: [
      'required',
      { type: 'minlength', arguments: [6] },
      'email'
    ],
    labelClassName: 'govuk-label--s'
  },
  'contact-number': {
    mixin: 'input-text',
    validate: ['notUrl', 'ukPhoneNumber'],
    labelClassName: 'govuk-label--s',
    className: ['govuk-input', 'govuk-!-width-two-thirds']
  },
  'question-field': {
    mixin: 'textarea',
    validate: [
      'required',
      'notUrl',
      { type: 'minlength', arguments: 6 },
      { type: 'maxlength', arguments: 2000 },
      invalidCharactersValidator
    ],
    labelClassName: 'govuk-label--s'
  },
  'image-upload': { // TODO rename image-upload to file-selector
    mixin: 'input-file',
    labelClassName: 'visuallyhidden',
  },

  URNValidator: match => URNValidator.arguments.test(match),   // Exported for test access
};
