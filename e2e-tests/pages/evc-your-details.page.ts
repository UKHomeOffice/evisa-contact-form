import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { EvcContents as content, EvcErrorMessages as errors } from '../utility-helper/constants-lib';

export class evcYourDetailsPage extends basePage {
  readonly ydPageHeaderText: Locator;
  readonly ydContactDetailsText: Locator;
  readonly ydFullNameLabel: Locator;
  readonly ydFullNameInput: Locator;
  readonly ydEmailAddressLabel: Locator;
  readonly ydEmailAddressHintText: Locator;
  readonly ydImmigrationApplicationInput: Locator;
  readonly ydContactNumberLabel: Locator;
  readonly ydContactNumberHintText: Locator;
  readonly ydContactNumberInput: Locator;
  readonly ydEnterYourQuestionLabel: Locator;
  readonly ydEnterYourQuestionHint: Locator;
  readonly ydEnterYourQuestionInput: Locator;
  readonly ydCharacterRemaining: Locator;
  readonly ydBackLink: Locator;
  readonly ydContinueBtn: Locator;
  readonly ydFullNameMainError: Locator;
  readonly ydEmailAddressMainError: Locator;
  readonly ydContactNumberMainError: Locator;
  readonly ydYourQuestionMainError: Locator;
  readonly ydFullNameFieldError: Locator;
  readonly ydEmailAddressFieldError: Locator;
  readonly ydContactNumberFieldError: Locator;
  readonly ydYourQuestionFieldError: Locator;
  readonly ydYourQuestionCharsError: Locator;

  constructor(page: Page) {
    super(page);
    this.ydPageHeaderText = this.headerText;
    this.ydContactDetailsText = page.locator('#gov-grid-row-content form > p:nth-of-type(1)');
    this.ydFullNameLabel = page.locator('label[for="full-name"]');
    this.ydFullNameInput = page.getByRole('textbox', { name: 'Full name', exact: true });
    this.ydEmailAddressLabel = page.locator('label[for="email-field"]');
    this.ydEmailAddressHintText = page.locator('#email-field-hint');
    this.ydImmigrationApplicationInput = page.getByRole('textbox', { name: 'Email address', exact: true });
    this.ydContactNumberLabel = page.locator('label[for="contact-number"]');
    this.ydContactNumberHintText = page.locator('#contact-number-hint');
    this.ydContactNumberInput = page.locator('#contact-number');
    this.ydEnterYourQuestionLabel = page.locator('label[for="question-field"]');
    this.ydEnterYourQuestionHint = page.locator('#question-field-hint');
    this.ydEnterYourQuestionInput = page.locator('#question-field');
    this.ydCharacterRemaining = page.locator('#question-field-info');
    this.ydBackLink = page.getByRole('link', { name: 'Back', exact: true });
    this.ydContinueBtn = this.continueButton;
    this.ydFullNameMainError = page.locator('a[href="#full-name"]');
    this.ydEmailAddressMainError = page.locator('a[href="#email-field"]');
    this.ydContactNumberMainError = page.locator('a[href="#contact-number"]');
    this.ydYourQuestionMainError = page.locator('a[href="#question-field"]');
    this.ydFullNameFieldError = page.locator('#full-name-group > .govuk-error-message');
    this.ydEmailAddressFieldError = page.locator('#email-field-group > .govuk-error-message');
    this.ydContactNumberFieldError = page.locator('#contact-number-group > .govuk-error-message');
    this.ydYourQuestionFieldError = page.locator('#question-field-group > p.govuk-error-message');
    this.ydYourQuestionCharsError = page.locator('[class^="govuk-character-count__message"]').first();
  }

  async expectedPageTitle(): Promise<string> {
    return 'Your details – Ask a question about getting access to your eVisa – GOV.UK';
  }

  async clickYourDetailsBackLink(): Promise<void> {
    await this.ydBackLink.click();
  }

  async enterYourDetails(fullName: string, emailAddress: string, contactNumber: string, details: string): Promise<void> {
    await this.enterFullName(fullName);
    await this.enterEmailAddress(emailAddress);
    await this.enterContactNumber(contactNumber);
    await this.enterYourQuestions(details);
  }

  async completeDetails(fullName: string, emailAddress: string, contactNumber: string, details: string): Promise<void> {
    await this.enterYourDetails(fullName, emailAddress, contactNumber, details);
    await this.clickContinueButton();
  }

  async enterFullName(value: string): Promise<void> {
    await this.clearAndEnterTextInElement(this.ydFullNameInput, value);
  }

  async enterEmailAddress(value: string): Promise<void> {
    await this.clearAndEnterTextInElement(this.ydImmigrationApplicationInput, value);
  }

  async enterContactNumber(value: string): Promise<void> {
    await this.clearAndEnterTextInElement(this.ydContactNumberInput, value);
  }

  async enterYourQuestions(value: string): Promise<void> {
    await this.clearAndEnterTextInElement(this.ydEnterYourQuestionInput, value);
  }

  async yourDetailsPageContent(): Promise<void> {
    await this.assertUrlEndPoints('your-details');
    await this.assertText(this.ydPageHeaderText, content.YD_HEADER);
    await this.assertText(this.ydContactDetailsText, content.YD_CONTACT_DETAILS);
    await this.assertText(this.ydFullNameLabel, content.YD_FULLNAME_TEXT);
    await this.assertText(this.ydEmailAddressLabel, content.YD_EMAIL_ADDRESS_TEXT);
    await this.assertText(this.ydEmailAddressHintText, content.YD_EMAIL_DETAILS_TEXT);
    await this.assertText(this.ydContactNumberLabel, content.YD_CONTACT_NUMBER);
    await this.assertText(this.ydContactNumberHintText, content.YD_CONTACT_NUMBER_DETAILS);
    await this.assertText(this.ydEnterYourQuestionLabel, content.YD_YOUR_QUESTION_BELOW);
    await this.assertText(this.ydEnterYourQuestionHint, content.YD_YOUR_QUESTION);
    await this.assertText(this.ydCharacterRemaining, content.YD_CHARACTER_REMAINING);
  }

  async assertYourDetailsErrors(option: string, fullNameLength: number): Promise<void> {
    switch (option) {
      case 'blank input':
        await this.assertEVisaFormInput(this.ydFullNameMainError, this.ydFullNameFieldError, errors.YOUR_DETAILS_BLANK_FULL_NAME_ERROR);
        await this.assertEVisaFormInput(this.ydEmailAddressMainError, this.ydEmailAddressFieldError, errors.YOUR_DETAILS_BLANK_EMAIL_ADDRESS_ERROR);
        await this.assertEVisaFormInput(this.ydYourQuestionMainError, this.ydYourQuestionFieldError, errors.YOUR_DETAILS_BLANK_YOUR_QUESTION_ERROR);
        break;
      case 'special chars input':
        await this.assertEVisaFormInput(this.ydFullNameMainError, this.ydFullNameFieldError, errors.YOUR_DETAILS_SPECIAL_CHAR_FULL_NAME_ERROR);
        await this.assertEVisaFormInput(this.ydEmailAddressMainError, this.ydEmailAddressFieldError, errors.YOUR_DETAILS_SPECIAL_CHAR_EMAIL_ADDRESS_ERROR);
        await this.assertEVisaFormInput(this.ydContactNumberMainError, this.ydContactNumberFieldError, errors.YOUR_DETAILS_SPECIAL_CHAR_CONTACT_NUMBER_ERROR);
        await this.assertEVisaFormInput(this.ydYourQuestionMainError, this.ydYourQuestionFieldError, errors.YOUR_DETAILS_SPECIAL_CHAR_QUESTION_ERROR);
        break;
      case 'incorrect length input':
      case 'incorrect format input':
        await this.assertEVisaFormInput(this.ydEmailAddressMainError, this.ydEmailAddressFieldError, errors.YOUR_DETAILS_LENGTH_EMAIL_ADDRESS_ERROR);
        await this.assertEVisaFormInput(this.ydContactNumberMainError, this.ydContactNumberFieldError, errors.YOUR_DETAILS_SPECIAL_CONTACT_NUMBER_ERROR);
        break;
      case 'question>2000chars':
        expect((await this.getInputFiledValue(this.ydFullNameInput)).length).toBe(fullNameLength);
        await this.assertEVisaFormInput(this.ydEmailAddressMainError, this.ydEmailAddressFieldError, errors.YOUR_DETAILS_LENGTH_LESS_EMAIL_ADDRESS_ERROR);
        await this.assertEVisaFormInput(this.ydYourQuestionMainError, this.ydYourQuestionFieldError, errors.YOUR_DETAILS_2000_CHARS_ERROR);
        await expect(this.ydYourQuestionCharsError).toContainText(errors.YOUR_DETAILS_TOO_MANY_ERROR);
        break;
      case 'more than 15 chars without +':
      case 'more than 16 chars with +':
        await this.assertEVisaFormInput(this.ydContactNumberMainError, this.ydContactNumberFieldError, errors.YOUR_DETAILS_CONTACT_NUMBER_LENGTH_ERROR);
        await this.assertEVisaFormInput(this.ydEmailAddressMainError, this.ydEmailAddressFieldError, errors.YOUR_DETAILS_LENGTH_EMAIL_ADDRESS_ERROR);
        break;
      case 'contact number 6':
      case 'contact number<6':
        await this.assertEVisaFormInput(this.ydContactNumberMainError, this.ydContactNumberFieldError, errors.YOUR_DETAILS_CONTACT_NUMBER_LENGTH_ERROR);
        break;
      default: throw new Error(`Unexpected value: ${option}`);
    }
  }
}
