/* eslint-disable no-var, vars-on-top, max-len */
'use strict';

require('hof/frontend/themes/gov-uk/client-js');

const accessibleAutocomplete = require('accessible-autocomplete');
const config = require('../../config.js');

document.addEventListener('DOMContentLoaded', () => {
  // Apply the "accessible-autocomplete" plugin to all (form) elements tagged with the class "typeahead"
  document.querySelectorAll('.typeahead').forEach(function applyTypeahead(element) {
    accessibleAutocomplete.enhanceSelectElement({
      defaultValue: '',
      selectElement: element
    });
  });

  const uploadStatusHandler = (status, errorType) => {
    const uploadGroup = document.getElementById('file-upload-group');
    const uploadErrorMsgs = uploadGroup.querySelectorAll('.govuk-error-message');
    switch (status) {
      case 'ready':
        if (uploadGroup) {
          uploadGroup.classList.remove('govuk-form-group--error');
        }
        if (uploadErrorMsgs) {
          uploadErrorMsgs.forEach(errorMsg => {
            errorMsg.classList.add('govuk-!-display-none');
          });
        }
        break;

      case 'error':
        if (uploadGroup) {
          uploadGroup.classList.add('govuk-form-group--error');
          document.getElementById(`file-selector-error-${errorType}`).classList.remove('govuk-!-display-none');
        }
        break;

      default:
        break;
    }
  };

  // Enable/Disable the file-selector and upload buttons
  const fileSelector = document.getElementById('file-selector');
  if (fileSelector) {
    const setDisabled = (el, disabled) => {
      el.disabled = el.ariaDisabled = disabled;
    };
    const uploadButton = document.getElementsByName('upload-file-button')[0];
    setDisabled(uploadButton, true);

    const noMoreUploads = document.getElementById('no-more-uploads');
    if (noMoreUploads) {
      setDisabled(fileSelector, true);
    } else {
      fileSelector.addEventListener('change', () => {
        uploadStatusHandler('ready');
        setDisabled(uploadButton, true);
        const isSelected = fileSelector.files.length > 0;
        if (isSelected) {
          const fileInfo = fileSelector.files[0];
          if ( !config.upload.allowedMimeTypes.includes(fileInfo.type) ) {
            uploadStatusHandler('error', 'fileType');
            return;
          }
          if (fileInfo.size > config.upload.maxFileSizeInBytes) {
            uploadStatusHandler('error', 'maxFileSize');
            return;
          }
          setDisabled(uploadButton, false);
        }
      });
    }
  }
});
