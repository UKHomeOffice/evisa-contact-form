import { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { EvcContents as content } from '../utility-helper/constants-lib';

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
    return content.BRP_NUMBER_PAGE_TITLE;
  }

  async clickBackLink(): Promise<void> {
    await this.brpBackLinkBtn.click();
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
}
