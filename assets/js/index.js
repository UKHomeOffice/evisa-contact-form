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

  const fileSelector = document.getElementById('image-upload');
  const uploadButton = document.getElementsByName('upload-file-button')[0];

  if (fileSelector && uploadButton) {
    const noMoreUploads = document.getElementById('no-more-uploads');
    const maxUploads = parseInt(noMoreUploads.getAttribute('data-max-uploads'), 10);
    if (noMoreUploads) {
      fileSelector.disabled = fileSelector.ariaDisabled = true;
      uploadButton.disabled = uploadButton.ariaDisabled = true;
    }
  }
});
