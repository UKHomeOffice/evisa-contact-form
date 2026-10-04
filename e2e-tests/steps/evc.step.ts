import { DataTable } from '@cucumber/cucumber';
import { createBdd } from 'playwright-bdd';
import { test } from '../fixture/fixtures';
import { ConstantsLib as c, EvcContents as content } from '../utility-helper/constants-lib';

export const { Given, When, Then } = createBdd(test);

// ********************************************************* Step Definitions ****************************************************************************

Given('I visit the eVisa contact form Page', async ({ pages }) => {
    await pages.evcStartPage.openEvcStartNowPage();
    await pages.evcStartPage.acceptCookies();
});

When('I fill out the answers to EVC form pertaining to {string}', async ({ pages }, description: string) => {
    await pages.evcStartPage.clickStartNowBtn();

    let referenceOption = c.NONE_OPTION;
    let referenceValue: string | null = null;
    switch (description) {
        case 'Return from Upload to Your details':
            break;
        case 'Submit with a passport number and no files':
            referenceOption = c.PASSPORT_OPTION;
            referenceValue = c.PASSPORT_NUMBER;
            break;
        case 'Submit without a reference number or files':
            referenceValue = c.LEGACY_OTHER_REFERENCE;
            break;
        case 'Submit five uploaded files':
        case 'Remove an uploaded file before submitting':
        case 'Check the feedback link after submission':
        case 'E-Visa form content validations':
        case 'E-Visa form error validations':
            break;
        default:
            throw new Error(`Unsupported full EVC journey for description: ${description}`);
    }
            await pages.evcBRPNumberPage.completeBRP(c.NO, c.NOT_APPLICABLE);
            await pages.evcReferenceNumbersPage.enterReferenceDetails(referenceOption, referenceValue);
            await pages.evcYourDetailsPage.completeDetails(c.FULL_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE, c.QUESTION);
});

When('I click the EVC guidance link', async ({ pages }) => {
    await pages.evcStartPage.clickLinkEvcGuidanceOnGovUK();
});

When('I select Start now', async ({ pages }) => {
    await pages.evcStartPage.clickStartNowBtn();
});

When('I go back from the BRP number page', async ({ pages }) => {
    await pages.evcBRPNumberPage.clickBackLink();
});

When('I answer the BRP number question and continue for {string} on the {string} journey', async ({ pages }, description: string, journey: string) => {
    switch (description) {
        case 'Continue with a valid BRP number':
            if (journey === 'BRP number') {
                await pages.evcBRPNumberPage.completeBRP(c.YES, c.BRP_NUMBER);
            } else {
                await pages.evcBRPNumberPage.completeBRP(c.NO, c.NOT_APPLICABLE);
            }
            break;
        case 'Continue without a BRP number':
        case 'Enter contact details after providing a BRP number':
            if (journey === 'Your details') {
                await pages.evcBRPNumberPage.completeBRP(c.YES, c.ALTERNATIVE_BRP_NUMBER);
            } else {
                await pages.evcBRPNumberPage.completeBRP(c.NO, c.NOT_APPLICABLE);
            }
            break;
        case 'Return from Your details to the BRP number page':
        case 'Return from Your details to the reference numbers page':
            if (journey === 'BRP number') {
                await pages.evcBRPNumberPage.completeBRP(c.YES, c.ALTERNATIVE_BRP_NUMBER);
            } else {
                await pages.evcBRPNumberPage.completeBRP(c.NO, c.NOT_APPLICABLE);
            }
            break;
        default:
            await pages.evcBRPNumberPage.completeBRP(c.NO, c.NOT_APPLICABLE);
    }
});

When('I enter valid contact details and continue', async ({ pages }) => {
    await pages.evcYourDetailsPage.completeDetails(c.FULL_NAME, c.SAS_HOF_EMAIL, c.TELEPHONE, c.QUESTION);
});

When('I go back from Your details', async ({ pages }) => {
    await pages.evcYourDetailsPage.clickYourDetailsBackLink();
});

When('I go back from the reference numbers page', async ({ pages }) => {
    await pages.evcReferenceNumbersPage.clickReferenceBackLink();
});

When('I provide reference details and continue for {string} on the {string} journey', async ({ pages }, description: string, journey: string) => {
    switch (description) {
        case 'Return from Your details to the reference numbers page':
        case 'Continue with a passport number':
            await pages.evcReferenceNumbersPage.enterReferenceDetails(c.PASSPORT_OPTION, c.PASSPORT_NUMBER);
            break;
        case 'Continue with a unique reference number':
        case 'Enter contact details without a reference number':
            if (journey === 'Reference number') {
                await pages.evcReferenceNumbersPage.enterReferenceDetails(c.UNIQUE_REFERENCE_OPTION, c.UNIQUE_REFERENCE_NUMBER);
            } else {
                await pages.evcReferenceNumbersPage.enterReferenceDetails(c.NONE_OPTION, c.PASSPORT_NUMBER);
            }
            break;
        case 'Continue with another reference number':
            await pages.evcReferenceNumbersPage.enterReferenceDetails(c.OTHER_OPTION, c.OTHER_REFERENCE);
            break;
        case 'Continue without a reference number':
            await pages.evcReferenceNumbersPage.enterReferenceDetails(c.NONE_OPTION, c.PASSPORT_NUMBER);
            break;
        case 'E-Visa form content validations':
        case 'E-Visa form error validations':
            await pages.evcReferenceNumbersPage.enterReferenceDetails(c.NONE_OPTION, null);
            break;
        default:
            await pages.evcReferenceNumbersPage.enterReferenceDetails(c.NOT_APPLICABLE, null);
    }
});

When('I go back from Upload', async ({ pages }) => {
    await pages.evcUploadPage.clickUploadBackLink();
});

When('I submit my question', async ({ pages }) => {
    await pages.evcUploadPage.uploadContinue();
});

When('I remove uploaded file {int}', async ({ pages }, row: number) => {
    await pages.evcUploadPage.deleteAFile(row);
});

When('I validate for {string} selection with {string} BRP number', async ({ pages }, option: string, value: string) => {
    await pages.evcBRPNumberPage.enterBRPNumber(option, value);
});

When('I attach any selected files for {string}', async ({ pages }, description: string) => {
    let files: string;
    switch (description) {
        case 'Return from Upload to Your details':
            files = c.THREE_FILES;
            break;
        case 'Submit five uploaded files':
            files = c.FIVE_FILES;
            break;
        case 'Remove an uploaded file before submitting':
        case 'E-Visa form content validations':
            files = c.THREE_FILES;
            break;
        case 'Check the feedback link after submission':
            files = c.TWO_FILES;
            break;
        case 'E-Visa form error validations':
            files = c.INVALID_FILES;
            break;
        default:
            files = c.NOT_APPLICABLE;
    }
    await pages.evcUploadPage.setUploadYourEvidence(
        files === c.NOT_APPLICABLE
            ? []
            : files
                .split('-')
                .map((filename) => filename.trim())
                .filter(Boolean)
    );
});

Then('I am navigated to {string} page', async ({ page, pages }, title: string) => {
    await pages.basePage.assertPageTitle(page, title);
});

Then('the upload limit should be reached', async ({ pages }) => {
    await pages.evcUploadPage.validateMaxFilesUploaded();
});

Then('the {string} page should display the expected content', async ({ page, pages }, title: string) => {
    await pages.basePage.validateBanners(content.ACCESS_YOUR_E_VISA_BANNER, content.BETA_BANNER);
    await pages.basePage.assertPageTitle(page, title);
    switch (title) {
        case await pages.evcStartPage.expectedPageTitle():
            await pages.evcStartPage.startNowPageContent();
            break;
        case await pages.evcBRPNumberPage.expectedPageTitle():
            await pages.evcBRPNumberPage.brpNumberPageContent();
            break;
        case await pages.evcReferenceNumbersPage.expectedPageTitle():
            await pages.evcReferenceNumbersPage.referencePageContent();
            break;
        case await pages.evcYourDetailsPage.expectedPageTitle():
            await pages.evcYourDetailsPage.yourDetailsPageContent();
            break;
        case await pages.evcUploadPage.expectedPageTitle():
            await pages.evcUploadPage.uploadPageContent();
            await pages.evcUploadPage.setUploadEvidence(c.CONTENT_UPLOAD_COUNT, c.PNG_FILE, c.MAX_UPLOAD_COUNT);
            await pages.evcUploadPage.validateMaxFilesUploaded();
            break;
        case 'Question sent – GOV.UK':
            await pages.evcConfirmationPage.confirmationPageContent();
            break;
        default:
            throw new Error(`There is no such page ${title}`);
    }
});

Then('the feedback link should be available', async ({ pages }) => {
    await pages.evcConfirmationPage.assertServiceLink();
});

Then('I validate BRP number selection page error messages', async ({ pages }, dataTable: DataTable) => {
    for (const [option, value, errorFor] of dataTable.raw()) {
        await pages.evcBRPNumberPage.enterBRPNumber(option, c.BLANK_BRP_ERRORS.includes(errorFor) ? c.BLANK : value);
        await pages.evcBRPNumberPage.brpNumberErrorMessages(errorFor);
    }
});

Then('I validate Reference details page error messages', async ({ pages }, dataTable: DataTable) => {
    for (const [option, value, errorFor] of dataTable.raw()) {
        await pages.evcReferenceNumbersPage.enterReferenceDetails(option.trim(), c.BLANK_REFERENCE_ERRORS.includes(errorFor) ? c.BLANK : value.trim());
        await pages.evcReferenceNumbersPage.refDetailsErrorMessages(option.trim(), errorFor.trim());
    }
});

Then('I validate Your details page error messages', async ({ pages }, dataTable: DataTable) => {
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
        await pages.evcYourDetailsPage.assertYourDetailsErrors(option.trim(), c.LONG_NAME_LENGTH);
    }
});

Then('I validate Upload page error messages', async ({ pages }, dataTable: DataTable) => {
    for (const [fileName, errorType] of dataTable.raw()) {
        await pages.evcUploadPage.uploadEvidenceFile(fileName.trim());
        await pages.evcUploadPage.assertUploadErrorMessages(errorType.trim());
    }
});