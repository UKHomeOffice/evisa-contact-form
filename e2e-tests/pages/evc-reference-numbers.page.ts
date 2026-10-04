import { Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { EvcContents as content } from '../utility-helper/constants-lib';

export class evcReferenceNumbersPage extends basePage {
  readonly refPageHeaderText: Locator;
  readonly refYourAccountText: Locator;
  readonly refURNRadioLabel: Locator;
  readonly refURNHintText: Locator;
  readonly refURNInput: Locator;
  readonly refURNPanelHiddenStatus: Locator;
  readonly refPassportNumberRadioLabel: Locator;
  readonly refPassportNumberHintText: Locator;
  readonly refPassportNumberPanelHiddenStatus: Locator;
  readonly refPassportNumberInput: Locator;
  readonly refOtherRadioLabel: Locator;
  readonly refOtherHintText: Locator;
  readonly refOtherInput: Locator;
  readonly refOtherPanelHiddenStatus: Locator;
  readonly refNoneOfAboveRadioLabel: Locator;
  readonly refBackLinkBtn: Locator;
  readonly refContinueBtn: Locator;
  readonly refNoOptionSelectionMainError: Locator;
  readonly refNoOptionSelectionFieldError: Locator;
  readonly refURNMainError: Locator;
  readonly refPassportNumberMainError: Locator;
  readonly refOtherMainError: Locator;
  readonly refURNFieldError: Locator;
  readonly refPassportNumberFieldError: Locator;
  readonly refOtherFieldError: Locator;

  constructor(page: Page) {
    super(page);
    this.refPageHeaderText = this.headerText;
    this.refYourAccountText = page.locator('#gov-grid-row-content form > p');
    this.refURNRadioLabel = page.locator('label[for="reference-numbers-options-opt-unique-ref"]');
    this.refURNHintText = page.locator('#reference-numbers-options-opt-unique-ref-item-hint');
    this.refURNInput = page.locator('#urn-number');
    this.refURNPanelHiddenStatus = page.locator('#urn-number-panel[aria-hidden="true"]');
    this.refPassportNumberRadioLabel = page.locator('label[for="reference-numbers-options-opt-passport-number"]');
    this.refPassportNumberHintText = page.locator('#reference-numbers-options-opt-passport-number-item-hint');
    this.refPassportNumberPanelHiddenStatus = page.locator('#passport-number-panel[aria-hidden="true"]');
    this.refPassportNumberInput = page.locator('#passport-number');
    this.refOtherRadioLabel = page.locator('label[for="reference-numbers-options-opt-other-ref"]');
    this.refOtherHintText = page.locator('#reference-numbers-options-opt-other-ref-item-hint');
    this.refOtherInput = page.locator('#other-reference-number');
    this.refOtherPanelHiddenStatus = page.locator('#other-reference-number-panel[aria-hidden="true"]');
    this.refNoneOfAboveRadioLabel = page.locator('label[for="reference-numbers-options-opt-none"]');
    this.refBackLinkBtn = page.getByRole('link', { name: 'Back', exact: true });
    this.refContinueBtn = this.continueButton;
    this.refNoOptionSelectionMainError = page.locator('a[href="#reference-numbers-options-opt-unique-ref"]');
    this.refNoOptionSelectionFieldError = page.locator('#reference-numbers-options-error');
    this.refURNMainError = page.locator('a[href="#urn-number"]');
    this.refPassportNumberMainError = page.locator('a[href="#passport-number"]');
    this.refOtherMainError = page.locator('a[href="#other-reference-number"]');
    this.refURNFieldError = page.locator('#urn-number-group > .govuk-error-message');
    this.refPassportNumberFieldError = page.locator('#passport-number-group > .govuk-error-message');
    this.refOtherFieldError = page.locator('#other-reference-number-group > .govuk-error-message');
  }

  async expectedPageTitle(): Promise<string> {
    return content.REFERENCE_DETAILS_PAGE_TITLE;
  }

  async clickReferenceBackLink(): Promise<void> {
    await this.refBackLinkBtn.click();
  }

  async enterURNNumber(value: string): Promise<void> {
    if (!(await this.isElementPresent(this.refURNPanelHiddenStatus))) await this.clearAndEnterTextInElement(this.refURNInput, value);
  }

  async enterPassportNumber(value: string): Promise<void> {
    if (!(await this.isElementPresent(this.refPassportNumberPanelHiddenStatus))) await this.clearAndEnterTextInElement(this.refPassportNumberInput, value);
  }

  async enterOther(value: string): Promise<void> {
    if (!(await this.isElementPresent(this.refOtherPanelHiddenStatus))) await this.clearAndEnterTextInElement(this.refOtherInput, value);
  }

  async enterRefNo(option: string, value: string): Promise<void> {
    switch (option) {
      case content.REF_URN_LABEL:
        await this.enterURNNumber(value);
        break;
      case content.REF_PASSPORT_NUMBER_LABEL:
        await this.enterPassportNumber(value);
        break;
      case content.REF_OTHER_LABEL:
        await this.enterOther(value);
        break;
    }
  }

  async selectRadioOptions(option: string): Promise<void> {
    if ([content.REF_URN_LABEL, content.REF_PASSPORT_NUMBER_LABEL, content.REF_OTHER_LABEL, content.REF_NONE_ABOVE_LABEL].some(label => label === option)) {
      await this.selectRadioOptionWithText(option);
    }
  }

  async enterReferenceDetails(option: string, value: string | null): Promise<void> {
    await this.selectRadioOptions(option);
    if (option !== content.REF_NONE_ABOVE_LABEL) await this.enterRefNo(option, value ?? '');
    await this.clickContinueButton();
  }
}
