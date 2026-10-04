import { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { EvcContents as content } from '../utility-helper/constants-lib';

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
    return content.YOUR_DETAILS_PAGE_TITLE;
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
}
