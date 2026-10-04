import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { EvcContents as content } from '../utility-helper/constants-lib';

export class evcConfirmationPage extends basePage {
  readonly confirmBanner: Locator;
  readonly confirmationEmailText: Locator;
  readonly confirmWhatHappensHeader: Locator;
  readonly confirmYourEnquiryText: Locator;
  readonly confirmWorkingDaysText: Locator;
  readonly conformMoreInformationText: Locator;
  readonly confirmServiceFeedbackLink: Locator;

  constructor(page: Page) {
    super(page);
    this.confirmBanner = page.locator('form > div > div > strong');
    this.confirmationEmailText = page.locator('#gov-grid-row-content form > p').first();
    this.confirmWhatHappensHeader = page.locator('#gov-grid-row-content form > h2');
    this.confirmYourEnquiryText = page.locator('#gov-grid-row-content form > p:nth-of-type(3)');
    this.confirmWorkingDaysText = page.locator('#gov-grid-row-content form > p:nth-of-type(4)');
    this.conformMoreInformationText = page.locator('#gov-grid-row-content form > p:nth-of-type(5)');
    this.confirmServiceFeedbackLink = page.getByRole('link', { name: 'What do you think of this service?', exact: true });
  }

  async expectedPageTitle(): Promise<string> {
    return content.E_VISA_CONFIRMATION_PAGE;
  }

  async assertServiceLink(): Promise<void> {
    await expect(this.confirmServiceFeedbackLink).toBeVisible();
    await expect(this.confirmServiceFeedbackLink).toBeEnabled();
  }
}
