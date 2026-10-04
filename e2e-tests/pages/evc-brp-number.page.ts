import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { EvcContents as content, EvcErrorMessages as errors } from '../utility-helper/constants-lib';

export class evcBRPNumberPage extends basePage {
  readonly brpNumberPageHeaderText: Locator;
  readonly brpNumberPanelOfThePermitText: Locator;
  readonly brpNumberText: Locator;
  readonly brpNumberExampleText: Locator;
  readonly brpBackLinkBtn: Locator;
  readonly brpContinueBtn: Locator;
  readonly yesRadioLabel: Locator;
  readonly noRadioLabel: Locator;
  readonly brpNumberInput: Locator;
  readonly brpNumberPanelHiddenStatus: Locator;
  readonly brpNumberYesMainError: Locator;
  readonly brpNumberMainError: Locator;
  readonly brpNumberFieldError: Locator;
  readonly brpNumberYesFieldError: Locator;

  constructor(page: Page) {
    super(page);
    this.brpNumberPageHeaderText = this.headerText;
    this.brpNumberPanelOfThePermitText = page.locator('#gov-grid-row-content form > p');
    this.brpNumberText = page.locator('label[for="brp-number"]');
    this.brpNumberExampleText = page.locator('#brp-number-hint');
    this.brpBackLinkBtn = page.getByRole('link', { name: 'Back', exact: true });
    this.brpContinueBtn = this.continueButton;
    this.yesRadioLabel = page.locator('label[for="brp-options-yes"]');
    this.noRadioLabel = page.locator('label[for="brp-options-no"]');
    this.brpNumberInput = page.getByRole('textbox', { name: 'Biometric residence permit number', exact: true });
    this.brpNumberPanelHiddenStatus = page.locator('#brp-number-panel[aria-hidden="true"]');
    this.brpNumberYesMainError = page.locator('a[href="#brp-options-yes"]');
    this.brpNumberMainError = page.locator('a[href="#brp-number"]');
    this.brpNumberFieldError = page.locator('#brp-number-group > .govuk-error-message');
    this.brpNumberYesFieldError = page.locator('#brp-options-error');
  }

  async expectedPageTitle(): Promise<string> {
    return 'Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK';
  }

  async clickBackLink(): Promise<void> {
    await this.brpBackLinkBtn.click();
  }

  async completeBRP(option: string, brpNumber: string): Promise<void> {
    if (option === content.BRP_NUMBER_YES) {
      await this.selectAnOption(option);
      await this.clearAndEnterTextInElement(this.brpNumberInput, brpNumber);
    } else if (option === content.BRP_NUMBER_NO) {
      await this.selectAnOption(option);
    }
    await this.clickContinueButton();
  }

  async enterBRPNumber(input: string): Promise<void>;
  async enterBRPNumber(option: string, value: string): Promise<void>;
  async enterBRPNumber(inputOrOption: string, value?: string): Promise<void> {
    if (value === undefined) {
      if (!(await this.isElementPresent(this.brpNumberPanelHiddenStatus))) {
        await this.clearAndEnterTextInElement(this.brpNumberInput, inputOrOption);
      }
      return;
    }
    if (inputOrOption !== 'empty') {
      await this.selectAnOption(inputOrOption);
      if (inputOrOption === content.BRP_NUMBER_YES) await this.enterBRPNumber(value);
    }
    await this.clickContinueButton();
  }

  async selectAnOption(option: string): Promise<void> {
    if (option === content.BRP_NUMBER_YES || option === content.BRP_NUMBER_NO) {
      await this.selectRadioOptionWithText(option, true);
    }
  }

  async brpNumberPageContent(): Promise<void> {
    await this.assertUrlEndPoints('biometric-residence-permit-number');
    await this.assertText(this.yesRadioLabel, content.BRP_NUMBER_YES);
    await this.assertText(this.noRadioLabel, content.BRP_NUMBER_NO);
    await this.assertText(this.brpNumberPageHeaderText, content.BRP_NUMBER_HEADER);
    await this.assertText(this.brpNumberPanelOfThePermitText, content.BRP_NUMBER_CONTENT_ONE);
    await this.selectAnOption(content.BRP_NUMBER_YES);
    await this.assertText(this.brpNumberText, content.BRP_NUMBER_YES_BIOMETRIC_TEXT);
    await this.assertText(this.brpNumberExampleText, content.BRP_NUMBER_YES_EXAMPLE_TEXT);
  }

  async brpNumberErrorMessages(errorFor: string): Promise<void> {
    switch (errorFor) {
      case 'blank BRP number':
        await this.assertEVisaFormInput(this.brpNumberMainError, this.brpNumberFieldError, errors.BLANK_BRP_NUMBER_ERROR);
        break;
      case 'BRP number length':
        await this.assertEVisaFormInput(this.brpNumberMainError, this.brpNumberFieldError, errors.BRP_NUMBER_CHARS_LENGTH_ERROR);
        break;
      case 'incorrect BRP number':
      case 'special chars BRP number':
        await this.assertEVisaFormInput(this.brpNumberMainError, this.brpNumberFieldError, errors.BRP_NUMBER_FORMAT_ERROR);
        break;
      case 'no option selected':
        await this.assertError(this.brpNumberYesMainError, errors.BRP_NO_OPTION_SELECTION_ERROR);
        await expect(this.brpNumberYesFieldError).toContainText(errors.BRP_NO_OPTION_SELECTION_ERROR);
        break;
      default: throw new Error(`Unexpected brp number error value: ${errorFor}`);
    }
  }
}
