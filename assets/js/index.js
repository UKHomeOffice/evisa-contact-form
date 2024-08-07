/* eslint-disable no-var, vars-on-top, max-len */
'use strict';

require('hof/frontend/themes/gov-uk/client-js');

const accessibleAutocomplete = require('accessible-autocomplete');

document.addEventListener('DOMContentLoaded', () => {
  // Apply the "accessible-autocomplete" plugin to all (form) elements tagged with the class "typeahead"
  document.querySelectorAll('.typeahead').forEach(function applyTypeahead(element) {
    accessibleAutocomplete.enhanceSelectElement({
      defaultValue: '',
      selectElement: element
    });
  });
});
