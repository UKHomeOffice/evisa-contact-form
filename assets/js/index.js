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

  // Enable/Disable the file-selector and upload buttons
  const fileSelector = document.getElementById('image-upload');
  if (fileSelector) {
    const setDisabled = (el, disabled) => el.disabled = el.ariaDisabled = disabled;
    const uploadButton = document.getElementsByName('upload-file-button')[0];
    setDisabled(uploadButton, true);

    const noMoreUploads = document.getElementById('no-more-uploads');
    if (noMoreUploads) {
      setDisabled(fileSelector, true);
    } else {
      fileSelector.addEventListener('change', () => {
        const fileSelected = fileSelector.files.length > 0;
        setDisabled(uploadButton, !fileSelected);
      });
    }
  }
});
