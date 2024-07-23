/* eslint-disable no-var, vars-on-top */
'use strict';

require('hof/frontend/themes/gov-uk/client-js');
const $ = require('jquery');
const accessibleAutocomplete = require('accessible-autocomplete');

// Once the DOM is ready, apply the "accessible-autocomplete" plugin to all (form) elements tagged with the class "typeahead"
$('.typeahead').each(function applyTypeahead() {
  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: '',
    selectElement: this
  });
});
