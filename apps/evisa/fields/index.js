'use strict';

module.exports = {
    'sent-email': {
        isPageHeading: 'true',
        mixin: 'radio-group',
        validate: 'required',
        className: ['block', 'form-group'],
        options: [
            'yes',
            'no'
        ]
    },
    'tech-problem': {
        isPageHeading: 'true',
        mixin: 'radio-group',
        validate: 'required',
        className: ['block', 'form-group'],
        options: [
            'yes',
            'no'
        ]
    },
    'full-name' : {
        mixin: 'input-text',
        validate: ['required', 'notUrl'],
        labelClassName: 'govuk-label--s',
        className: ['govuk-input', 'govuk-!-width-two-thirds']
    },
    'email' : {
        mixin: 'input-text',
        validate: ['required', 'email'],
        labelClassName: 'govuk-label--s'
    },
    'contact-number' : {
        mixin: 'input-text',
        validate: ['ukPhoneNumber'],
        labelClassName: 'govuk-label--s',
        className: ['govuk-input', 'govuk-!-width-two-thirds']
    },
    'ref-number' : {
        mixin: 'input-text',
        validate: ['notUrl'],
        labelClassName: 'govuk-label--s',
        className: ['govuk-input', 'govuk-!-width-two-thirds'],
        html: undefined
    },
    'question' : {
        mixin: 'textarea',
        validate: ['required', 'notUrl', { type: 'maxlength', arguments: 2000 }],
        labelClassName: 'govuk-label--s'
    },
    'image': {
        mixin: 'input-file',
        labelClassName: 'visuallyhidden'
    },
    'contacted' : {
        isPageHeading: 'true',
        mixin: 'radio-group',
        validate: 'required',
        className: ['block', 'form-group'],
        options: [
            'yes',
            'no'
        ]
    }
};
