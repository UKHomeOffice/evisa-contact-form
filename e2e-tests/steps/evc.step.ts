import { expect, Locator } from '@playwright/test';
import { DataTable } from '@cucumber/cucumber';
import { createBdd } from 'playwright-bdd';
import { ApplicantState, Pages, test } from '../fixture/fixture';
import { ConstantsLib as c, EVCApplicant, EvcContents as content, EvcErrorMessages as errors } from '../utility-helper/constants-lib';

export const { Given, When, Then } = createBdd(test);

// ********************************************************* Step Definitions ****************************************************************************

Given('I visit evc application Start now page', async ({ pages }) => {
  await pages.evcStartPage.openEvcStartNowPage();
  await pages.evcStartPage.acceptCookies();
});

Given('I use the {string} EVC journey', async ({ applicantState }, journey: string) => {
  if (!c.JOURNEYS.includes(journey)) throw new Error(`Unknown EVC journey: ${journey}`);
  applicantState.journey = journey;
});

When('I select the EVC scenario {string}', async ({ applicantState }, description: string) => {
  if (!c.DESCRIPTION.includes(description)) throw new Error(`Unknown EVC description: ${description}`);
  let data: Omit<EVCApplicant, 'description'>;
  switch (description) {
    case 'VALID BRP number validation':
      switch (applicantState.journey) {
        case 'BRP number': data = { ...c.DEFAULT_APPLICANT, doYouKnowYourBiometricResidencePermitNumber: c.YES, brpNumber: c.BRP_NUMBER }; break;
        case 'Upload': data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.NONE_OPTION, uploadFiles: c.THREE_FILES }; break;
        default: throw new Error(`Select an explicit EVC journey for description: ${description}`);
      }
      break;
    case 'No BRP number validation':
      switch (applicantState.journey) {
        case 'Reference number': data = { ...c.DEFAULT_APPLICANT }; break;
        case 'Your details': data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouKnowYourBiometricResidencePermitNumber: c.YES, brpNumber: c.ALTERNATIVE_BRP_NUMBER }; break;
        default: throw new Error(`Select an explicit EVC journey for description: ${description}`);
      }
      break;
    case 'Back navigation to BRP number page':
      switch (applicantState.journey) {
        case 'BRP number': data = { ...c.DEFAULT_APPLICANT, doYouKnowYourBiometricResidencePermitNumber: c.YES, brpNumber: c.ALTERNATIVE_BRP_NUMBER }; break;
        case 'Reference number': data = { ...c.DEFAULT_APPLICANT, doYouHaveAnyOfTheFollowingReferenceNumbers: c.PASSPORT_OPTION, otherEvc: c.PASSPORT_NUMBER }; break;
        default: throw new Error(`Select an explicit EVC journey for description: ${description}`);
      }
      break;
    case 'Back navigation to BRP number page from Reference page':
      data = { ...c.DEFAULT_APPLICANT, doYouHaveAnyOfTheFollowingReferenceNumbers: c.PASSPORT_OPTION, otherEvc: c.PASSPORT_NUMBER };
      break;
    case 'Unique reference number navigation from Reference page validation':
      switch (applicantState.journey) {
        case 'Reference number': data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.UNIQUE_REFERENCE_OPTION, uniqueReferenceNumberEvc: c.UNIQUE_REFERENCE_NUMBER }; break;
        case 'Your details': data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.NONE_OPTION, otherEvc: c.PASSPORT_NUMBER }; break;
        default: throw new Error(`Select an explicit EVC journey for description: ${description}`);
      }
      break;
    case 'Passport number navigation from Reference page validation':
      data = { ...c.DEFAULT_APPLICANT, doYouHaveAnyOfTheFollowingReferenceNumbers: c.PASSPORT_OPTION, otherEvc: c.PASSPORT_NUMBER };
      break;
    case 'Other navigation from Reference page validation':
      data = { ...c.DEFAULT_APPLICANT, doYouHaveAnyOfTheFollowingReferenceNumbers: c.OTHER_OPTION, otherEvc: c.OTHER_REFERENCE };
      break;
    case 'None of the above navigation from Reference page validation':
      data = { ...c.DEFAULT_APPLICANT, doYouHaveAnyOfTheFollowingReferenceNumbers: c.NONE_OPTION, otherEvc: c.PASSPORT_NUMBER };
      break;
    case 'Upload valid file types':
      data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.PASSPORT_OPTION, otherEvc: c.PASSPORT_NUMBER };
      break;
    case 'Complete E-Visa without uploading any files':
      data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.NONE_OPTION, otherEvc: c.LEGACY_OTHER_REFERENCE };
      break;
    case 'Upload a maximum of 5 files':
      data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.NONE_OPTION, uploadFiles: c.FIVE_FILES };
      break;
    case 'Remove an file from uploaded files':
      data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.NONE_OPTION, uploadFiles: c.THREE_FILES };
      break;
    case 'Service link check from Confirmation page':
      data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.NONE_OPTION, uploadFiles: c.TWO_FILES };
      break;
    case 'E-Visa form content validations':
      data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.NONE_OPTION, uploadFiles: c.THREE_FILES };
      break;
    case 'E-Visa form error validations':
      data = { ...c.DEFAULT_APPLICANT, ...c.DETAILS, doYouHaveAnyOfTheFollowingReferenceNumbers: c.NONE_OPTION, uploadFiles: c.INVALID_FILES };
      break;
    default: throw new Error(`Unknown EVC description: ${description}`);
  }
  applicantState.applicant = { description, ...data };
});


When('I click the EVC guidance link', async ({ pages }) => {
  await pages.evcStartPage.clickLinkEvcGuidanceOnGovUK();
});

When('I continue from Start Now page', async ({ pages }) => {
  await pages.evcStartPage.clickStartNowBtn();
});

When('I click on Start now button from Ask a Question page', async ({ pages }) => {
  await pages.evcStartPage.clickStartNowBtn();
});

When('User click on the back button from BRP page', async ({ pages }) => {
  await pages.evcBRPNumberPage.clickBackLink();
});

Then('the user should be on the {string} page', async ({ page, pages }, title: string) => {
  await pages.basePage.assertPageTitle(page, title);
});

When('I select BRP number option and continue', async ({ pages, applicantState }) => {
  await completeBRP(pages, applicant(applicantState));
});

When('I enter valid user details and continue', async ({ pages, applicantState }) => {
  await completeDetails(pages, applicant(applicantState));
});

When('User click on the back button from Your details page', async ({ pages }) => {
  await pages.evcYourDetailsPage.clickYourDetailsBackLink();
});

When('User click on the back button from Reference number page', async ({ pages }) => {
  await pages.evcReferenceNumbersPage.clickReferenceBackLink();
});

When('the user choose his reference option and continue', async ({ pages, applicantState }) => {
  await completeReference(pages, applicant(applicantState));
});

When('User click on the back button from Upload page', async ({ pages }) => {
  await pages.evcUploadPage.clickUploadBackLink();
});

Then('I can validate the maximum files uploaded', async ({ pages }) => {
  await new EvcAssertions(pages).validateMaxFilesUploaded();
});

When('I continue from Upload page', async ({ pages }) => {
  await pages.evcUploadPage.uploadContinueBtn.click();
});

Then('I should be on {string} page and he can validate it', async ({ pages }, title: string) => {
  await new EvcAssertions(pages).eVisaFormTitleAndContentValidations(title);
});

Then('I validate the feedback link', async ({ pages }) => {
  await pages.evcConfirmationPage.assertServiceLink();
});

Then('I can upload files from Upload page', async ({ pages, applicantState }) => {
  const files = applicant(applicantState).uploadFiles;
  await pages.evcUploadPage.setUploadYourEvidence(files === c.NOT_APPLICABLE ? [] : files.split('-').map(filename => filename.trim()).filter(Boolean));
});

When('I can remove {int} file from the table', async ({ pages }, row: number) => {
  await pages.evcUploadPage.deleteAFile(row);
});

When('I complete E-Visa form up your details page', async ({ pages, applicantState }) => {
  const data = applicant(applicantState);
  await pages.evcStartPage.clickStartNowBtn();
  await completeBRP(pages, data);
  await completeReference(pages, data);
  await completeDetails(pages, data);
});

When('I validate for {string} selection with {string} BRP number', async ({ pages }, option: string, value: string) => {
  await pages.evcBRPNumberPage.enterBRPNumber(option, value);
});

Then('I validate BRP number selection page error messages', async ({ pages }, dataTable: DataTable) => {
  const checks = new EvcAssertions(pages);
  for (const [option, value, errorFor] of dataTable.raw()) {
    await pages.evcBRPNumberPage.enterBRPNumber(option, c.BLANK_BRP_ERRORS.includes(errorFor) ? c.BLANK : value);
    await checks.brpNumberErrorMessages(errorFor);
  }
});

Then('I validate Reference details page error messages', async ({ pages }, dataTable: DataTable) => {
  const checks = new EvcAssertions(pages);
  for (const [option, value, errorFor] of dataTable.raw()) {
    await pages.evcReferenceNumbersPage.enterReferenceDetails(option.trim(), c.BLANK_REFERENCE_ERRORS.includes(errorFor) ? c.BLANK : value.trim());
    await checks.refDetailsErrorMessages(option.trim(), errorFor.trim());
  }
});

Then('I validate Your details page error messages', async ({ pages }, dataTable: DataTable) => {
  const checks = new EvcAssertions(pages);
  for (const [option, fullName, emailAddress, contactNumber, question] of dataTable.raw()) {
    if (option === c.BLANK_DETAILS_CASE) {
      await pages.evcYourDetailsPage.enterYourDetails(c.EMPTY, c.EMPTY, c.EMPTY, c.EMPTY);
    } else if (question.trim() === c.LONG_QUESTION_CASE) {
      const data = c.longDetails(contactNumber.trim());
      await pages.evcYourDetailsPage.enterYourDetails(data.fullName, data.emailAddress, data.contactNumber, data.question);
    } else {
      await pages.evcYourDetailsPage.enterYourDetails(fullName.trim(), emailAddress.trim(), contactNumber.trim(), question.trim());
    }
    await pages.basePage.clickContinueButton();
    await checks.assertYourDetailsErrors(option.trim());
  }
});

Then('I validate Upload page error messages', async ({ pages }, dataTable: DataTable) => {
  const checks = new EvcAssertions(pages);
  for (const [fileName, errorType] of dataTable.raw()) {
    await pages.evcUploadPage.uploadEvidenceFile(fileName.trim());
    await checks.assertUploadErrorMessages(errorType.trim());
  }
});

function applicant(state: ApplicantState): EVCApplicant {
  if (!state.applicant) throw new Error('Select EVC scenario data before completing the form');
  return state.applicant;
}

function referenceValue(data: EVCApplicant): string | null {
  if (data.uniqueReferenceNumberEvc !== c.NOT_APPLICABLE) return data.uniqueReferenceNumberEvc;
  if (data.passportNumberEvc !== c.NOT_APPLICABLE) return data.passportNumberEvc;
  if (data.otherEvc !== c.NOT_APPLICABLE) return data.otherEvc;
  return null;
}

async function completeBRP(pages: Pages, data: EVCApplicant): Promise<void> {
  const option = data.doYouKnowYourBiometricResidencePermitNumber;
  if (option === c.YES) {
    await pages.evcBRPNumberPage.selectAnOption(option);
    await pages.basePage.clearAndEnterTextInElement(pages.evcBRPNumberPage.brpNumberInput, data.brpNumber);
  } else if (option === c.NO) {
    await pages.evcBRPNumberPage.selectAnOption(option);
  }
  await pages.basePage.clickContinueButton();
}

async function completeReference(pages: Pages, data: EVCApplicant): Promise<void> {
  await pages.evcReferenceNumbersPage.enterReferenceDetails(data.doYouHaveAnyOfTheFollowingReferenceNumbers, referenceValue(data));
}

async function completeDetails(pages: Pages, data: EVCApplicant): Promise<void> {
  await pages.evcYourDetailsPage.enterYourDetails(data.fullNameEvc, data.emailAddressEvc, data.contactNumberEvc, data.yourQuestionEvc);
  await pages.basePage.clickContinueButton();
}



// ********************************************************* Assertions ****************************************************************************

class EvcAssertions {
  constructor(readonly pages: Pages) {}

  async assertTitle(title: string): Promise<void> {
    await this.pages.basePage.assertPageTitle(this.pages.basePage.page, title);
  }

  async startNowPageContent(): Promise<void> {
    const start = this.pages.evcStartPage;
    await start.assertText(start.startNowHeaderText, content.START_NOW_HEADER);
    await start.assertText(start.startNowVisaAndImmigrationText, content.START_NOW_IMMIGRATION_TEXT);
    await start.assertText(start.startNowWorkingDaysText, content.START_NOW_WORKING_DAYS_TEXT);
    await start.assertText(start.startNowYouNeedText, content.START_NOW_YOU_NEED_TEXT);
    await start.assertText(start.startNowEmailAddressText, content.START_NOW_EMAIL_ADDRESS_TEXT);
    await start.assertText(start.startNowYourQuestionText, content.START_NOW_YOUR_QUESTION_TEXT);
  }

  async brpNumberPageContent(): Promise<void> {
    const brp = this.pages.evcBRPNumberPage;
    await brp.assertText(brp.yesRadioLabel, content.BRP_NUMBER_YES);
    await brp.assertText(brp.noRadioLabel, content.BRP_NUMBER_NO);
    await brp.assertText(brp.brpNumberPageHeaderText, content.BRP_NUMBER_HEADER);
    await brp.assertText(brp.brpNumberPanelOfThePermitText, content.BRP_NUMBER_CONTENT_ONE);
    await brp.selectAnOption(c.YES);
    await brp.assertText(brp.brpNumberText, content.BRP_NUMBER_YES_BIOMETRIC_TEXT);
    await brp.assertText(brp.brpNumberExampleText, content.BRP_NUMBER_YES_EXAMPLE_TEXT);
  }

  async referencePageContent(): Promise<void> {
    const reference = this.pages.evcReferenceNumbersPage;
    await reference.assertText(reference.refPageHeaderText, content.REF_HEADER);
    await reference.assertText(reference.refYourAccountText, content.REF_ENQUIRY_TEXT);
    await expect(reference.refURNRadioLabel).toContainText(content.REF_URN_LABEL);
    await reference.assertText(reference.refURNHintText, content.REF_EVISA_ACCOUNT_TEXT);
    await expect(reference.refPassportNumberRadioLabel).toContainText(content.REF_PASSPORT_NUMBER_LABEL);
    await reference.assertText(reference.refPassportNumberHintText, content.REF_PASSPORT_NUMBER_EXAMPLE);
    await expect(reference.refOtherRadioLabel).toContainText(content.REF_OTHER_LABEL);
    await reference.assertText(reference.refOtherHintText, content.REF_INC_GWF);
    await expect(reference.refNoneOfAboveRadioLabel).toContainText(content.REF_NONE_ABOVE_LABEL);
  }

  async yourDetailsPageContent(): Promise<void> {
    const details = this.pages.evcYourDetailsPage;
    await details.assertText(details.ydPageHeaderText, content.YD_HEADER);
    await details.assertText(details.ydContactDetailsText, content.YD_CONTACT_DETAILS);
    await details.assertText(details.ydFullNameLabel, content.YD_FULLNAME_TEXT);
    await details.assertText(details.ydEmailAddressLabel, content.YD_EMAIL_ADDRESS_TEXT);
    await details.assertText(details.ydEmailAddressHintText, content.YD_EMAIL_DETAILS_TEXT);
    await details.assertText(details.ydContactNumberLabel, content.YD_CONTACT_NUMBER);
    await details.assertText(details.ydContactNumberHintText, content.YD_CONTACT_NUMBER_DETAILS);
    await details.assertText(details.ydEnterYourQuestionLabel, content.YD_YOUR_QUESTION_BELOW);
    await details.assertText(details.ydEnterYourQuestionHint, content.YD_YOUR_QUESTION);
    await details.assertText(details.ydCharacterRemaining, content.YD_CHARACTER_REMAINING);
  }

  async uploadPageContent(): Promise<void> {
    const upload = this.pages.evcUploadPage;
    await upload.assertText(upload.uploadPageHeaderText, content.UPLOAD_HEADER);
    await upload.assertText(upload.uploadScreenShotsText, content.UPLOAD_SCREENSHOTS_TEXT);
    await upload.assertText(upload.uploadCannotUploadText, content.UPLOAD_CANNOT_UPLOAD_TEXT);
    await upload.assertText(upload.uploadFilesLargerText, content.UPLOAD_FILE_SIZE_TEXT);
    await upload.assertText(upload.uploadVideosText, content.UPLOAD_VIDEOS_TEXT);
    await upload.assertText(upload.uploadAnImageText, content.UPLOAD_IMAGE_TEXT);
    await upload.assertText(upload.uploadAcceptedFilesText, content.UPLOAD_ACCEPTED_FILES_TEXT);
    await upload.assertText(upload.uploadNoFilesText, content.UPLOAD_NO_FILES_UPLOADED_TEXT);
  }

  async confirmationPageContent(): Promise<void> {
    const confirmation = this.pages.evcConfirmationPage;
    await confirmation.assertText(confirmation.confirmBanner, content.CONFIRM_QUESTION_SENT_BANNER);
    await confirmation.assertText(confirmation.confirmationEmailText, content.CONFIRM_CONFIRMATION_EMAIL_TEXT);
    await confirmation.assertText(confirmation.confirmWhatHappensHeader, content.CONFIRM_WHAT_HAPPENS_TEXT);
    await confirmation.assertText(confirmation.confirmYourEnquiryText, content.CONFIRM_YOUR_ENQUIRY_TEXT);
    await confirmation.assertText(confirmation.confirmWorkingDaysText, content.CONFIRM_WORKING_DAYS_TEXT);
    await confirmation.assertText(confirmation.conformMoreInformationText, content.CONFIRM_MORE_INFORMATION_TEXT);
    await confirmation.assertText(confirmation.confirmServiceFeedbackLink, content.CONFIRM_SERVICE_LINK);
    await expect(confirmation.confirmServiceFeedbackLink).toBeVisible();
  }

  async eVisaFormTitleAndContentValidations(title: string): Promise<void> {
    await this.pages.basePage.validateBanners(content.ACCESS_YOUR_E_VISA_BANNER, content.BETA_BANNER);
    await this.assertTitle(title);
    switch (title) {
      case 'Ask a question about getting access to your eVisa – GOV.UK':
      case await this.pages.evcStartPage.expectedPageTitle():
        await this.pages.basePage.assertUrlEndPoints('start');
        await this.startNowPageContent();
        break;
      case 'Do you know your biometric residence permit number? – GOV.UK':
      case await this.pages.evcBRPNumberPage.expectedPageTitle():
        await this.pages.basePage.assertUrlEndPoints('biometric-residence-permit-number');
        await this.brpNumberPageContent();
        break;
      case 'Do you have any of the following reference numbers? – GOV.UK':
      case await this.pages.evcReferenceNumbersPage.expectedPageTitle():
        await this.pages.basePage.assertUrlEndPoints('reference-numbers');
        await this.referencePageContent();
        break;
      case 'Your details – GOV.UK':
      case await this.pages.evcYourDetailsPage.expectedPageTitle():
        await this.pages.basePage.assertUrlEndPoints('your-details');
        await this.yourDetailsPageContent();
        break;
      case 'Upload files (optional) – GOV.UK':
      case await this.pages.evcUploadPage.expectedPageTitle():
        await this.pages.basePage.assertUrlEndPoints('upload');
        await this.uploadPageContent();
        await this.pages.evcUploadPage.setUploadEvidence(c.CONTENT_UPLOAD_COUNT, c.PNG_FILE, c.MAX_UPLOAD_COUNT);
        await this.validateMaxFilesUploaded();
        break;
      case 'Question sent – GOV.UK':
        await this.pages.basePage.assertUrlEndPoints('confirmation');
        await this.confirmationPageContent();
        break;
      default:
        throw new Error(`There is no such page ${title}`);
    }
  }

  async assertEVisaFormInput(mainError: Locator, fieldError: Locator, error: string): Promise<void> {
    await this.pages.basePage.assertText(mainError, error);
    await expect(fieldError).toContainText(error);
  }

  async brpNumberErrorMessages(errorFor: string): Promise<void> {
    const brp = this.pages.evcBRPNumberPage;
    switch (errorFor) {
      case 'blank BRP number':
        await this.assertEVisaFormInput(brp.brpNumberMainError, brp.brpNumberFieldError, errors.BLANK_BRP_NUMBER_ERROR);
        break;
      case 'BRP number length':
        await this.assertEVisaFormInput(brp.brpNumberMainError, brp.brpNumberFieldError, errors.BRP_NUMBER_CHARS_LENGTH_ERROR);
        break;
      case 'incorrect BRP number':
      case 'special chars BRP number':
        await this.assertEVisaFormInput(brp.brpNumberMainError, brp.brpNumberFieldError, errors.BRP_NUMBER_FORMAT_ERROR);
        break;
      case 'no option selected':
        await brp.assertError(brp.brpNumberYesMainError, errors.BRP_NO_OPTION_SELECTION_ERROR);
        await expect(brp.brpNumberYesFieldError).toContainText(errors.BRP_NO_OPTION_SELECTION_ERROR);
        break;
      default:
        throw new Error(`Unexpected brp number error value: ${errorFor}`);
    }
  }

  async refDetailsErrorMessages(option: string, errorFor: string): Promise<void> {
    const reference = this.pages.evcReferenceNumbersPage;
    switch (option) {
      case c.UNIQUE_REFERENCE_OPTION:
        switch (errorFor) {
          case 'urn number blank':
            await this.assertEVisaFormInput(reference.refURNMainError, reference.refURNFieldError, errors.REF_BLANK_URN_ERROR);
            break;
          case 'urn number length':
            await this.assertEVisaFormInput(reference.refURNMainError, reference.refURNFieldError, errors.REF_URN_LENGTH_ERROR);
            break;
          case 'urn number incorrect':
          case 'urn number invalid format':
            await this.assertEVisaFormInput(reference.refURNMainError, reference.refURNFieldError, errors.REF_URN_FORMAT_ERROR);
            break;
          default:
            throw new Error(`Unexpected urn error value: ${errorFor}`);
        }
        break;
      case c.PASSPORT_OPTION:
        switch (errorFor) {
          case 'passport number blank':
            await this.assertEVisaFormInput(reference.refPassportNumberMainError, reference.refPassportNumberFieldError, errors.REF_BLANK_PASSPORT_NUMBER_ERROR);
            break;
          case 'passport number length':
            await this.assertEVisaFormInput(reference.refPassportNumberMainError, reference.refPassportNumberFieldError, errors.REF_PASSPORT_NUMBER_LENGTH_ERROR);
            break;
          case 'passport number special chars':
            await this.assertEVisaFormInput(reference.refPassportNumberMainError, reference.refPassportNumberFieldError, errors.REF_INVALID_PASSPORT_NUMBER_ERROR);
            break;
          default:
            throw new Error(`Unexpected passport number error value: ${errorFor}`);
        }
        break;
      case c.OTHER_OPTION:
        if (errorFor === 'Other input blank') await this.assertEVisaFormInput(reference.refOtherMainError, reference.refOtherFieldError, errors.REF_BLANK_OTHER_ERROR);
        else if (errorFor === 'Url input value') await this.assertEVisaFormInput(reference.refOtherMainError, reference.refOtherFieldError, errors.REF_URL_OTHER_ERROR);
        break;
      case c.EMPTY_OPTION:
        await reference.assertError(reference.refNoOptionSelectionMainError, errors.REF_NO_OPTION_SELECTION_ERROR);
        await expect(reference.refNoOptionSelectionFieldError).toContainText(errors.REF_NO_OPTION_SELECTION_ERROR);
        break;
      default:
        throw new Error(`Unexpected reference error value: ${errorFor}`);
    }
  }

  async assertYourDetailsErrors(option: string): Promise<void> {
    const details = this.pages.evcYourDetailsPage;
    switch (option) {
      case c.BLANK_DETAILS_CASE:
        await this.assertEVisaFormInput(details.ydFullNameMainError, details.ydFullNameFieldError, errors.YOUR_DETAILS_BLANK_FULL_NAME_ERROR);
        await this.assertEVisaFormInput(details.ydEmailAddressMainError, details.ydEmailAddressFieldError, errors.YOUR_DETAILS_BLANK_EMAIL_ADDRESS_ERROR);
        await this.assertEVisaFormInput(details.ydYourQuestionMainError, details.ydYourQuestionFieldError, errors.YOUR_DETAILS_BLANK_YOUR_QUESTION_ERROR);
        break;
      case 'special chars input':
        await this.assertEVisaFormInput(details.ydFullNameMainError, details.ydFullNameFieldError, errors.YOUR_DETAILS_SPECIAL_CHAR_FULL_NAME_ERROR);
        await this.assertEVisaFormInput(details.ydEmailAddressMainError, details.ydEmailAddressFieldError, errors.YOUR_DETAILS_SPECIAL_CHAR_EMAIL_ADDRESS_ERROR);
        await this.assertEVisaFormInput(details.ydContactNumberMainError, details.ydContactNumberFieldError, errors.YOUR_DETAILS_SPECIAL_CHAR_CONTACT_NUMBER_ERROR);
        await this.assertEVisaFormInput(details.ydYourQuestionMainError, details.ydYourQuestionFieldError, errors.YOUR_DETAILS_SPECIAL_CHAR_QUESTION_ERROR);
        break;
      case 'incorrect length input':
      case 'incorrect format input':
        await this.assertEVisaFormInput(details.ydEmailAddressMainError, details.ydEmailAddressFieldError, errors.YOUR_DETAILS_LENGTH_EMAIL_ADDRESS_ERROR);
        await this.assertEVisaFormInput(details.ydContactNumberMainError, details.ydContactNumberFieldError, errors.YOUR_DETAILS_SPECIAL_CONTACT_NUMBER_ERROR);
        break;
      case c.LONG_QUESTION_CASE:
        expect((await details.getInputFiledValue(details.ydFullNameInput)).length).toBe(c.LONG_NAME_LENGTH);
        await this.assertEVisaFormInput(details.ydEmailAddressMainError, details.ydEmailAddressFieldError, errors.YOUR_DETAILS_LENGTH_LESS_EMAIL_ADDRESS_ERROR);
        await this.assertEVisaFormInput(details.ydYourQuestionMainError, details.ydYourQuestionFieldError, errors.YOUR_DETAILS_2000_CHARS_ERROR);
        await expect(details.ydYourQuestionCharsError).toContainText(errors.YOUR_DETAILS_TOO_MANY_ERROR);
        break;
      case 'more than 15 chars without +':
      case 'more than 16 chars with +':
        await this.assertEVisaFormInput(details.ydContactNumberMainError, details.ydContactNumberFieldError, errors.YOUR_DETAILS_CONTACT_NUMBER_LENGTH_ERROR);
        await this.assertEVisaFormInput(details.ydEmailAddressMainError, details.ydEmailAddressFieldError, errors.YOUR_DETAILS_LENGTH_EMAIL_ADDRESS_ERROR);
        break;
      case 'contact number 6':
      case 'contact number<6':
        await this.assertEVisaFormInput(details.ydContactNumberMainError, details.ydContactNumberFieldError, errors.YOUR_DETAILS_CONTACT_NUMBER_LENGTH_ERROR);
        break;
      default:
        throw new Error(`Unexpected value: ${option}`);
    }
  }

  async validateMaxFilesUploaded(): Promise<void> {
    await expect(this.pages.evcUploadPage.chooseFileInput).toBeDisabled();
    await expect(this.pages.evcUploadPage.uploadBtn).toBeDisabled();
    await this.pages.evcUploadPage.assertText(this.pages.evcUploadPage.maxUploadText, content.UPLOAD_MAX_FILES_UPLOADED_TEXT);
  }

  async assertUploadErrorMessages(errorType: string): Promise<void> {
    if (errorType === 'file size over 25MB') await expect(this.pages.evcUploadPage.maxFileSizeError).toContainText(errors.UPLOAD_FILE_SIZE_ERROR);
    else if (errorType === 'invalid file type') await expect(this.pages.evcUploadPage.fileTypeError).toContainText(errors.UPLOAD_INVALID_FILETYPE_ERROR);
  }
}
