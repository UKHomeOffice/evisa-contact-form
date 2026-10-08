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

  async assertServiceLink(): Promise<void> {
    await expect(this.confirmServiceFeedbackLink).toBeVisible();
    await expect(this.confirmServiceFeedbackLink).toBeEnabled();
  }

  async confirmationPageContent(): Promise<void> {
    await this.assertUrlEndPoints('confirmation');
    await this.assertText(this.confirmBanner, content.CONFIRM_QUESTION_SENT_BANNER);
    await this.assertText(this.confirmationEmailText, content.CONFIRM_CONFIRMATION_EMAIL_TEXT);
    await this.assertText(this.confirmWhatHappensHeader, content.CONFIRM_WHAT_HAPPENS_TEXT);
    await this.assertText(this.confirmYourEnquiryText, content.CONFIRM_YOUR_ENQUIRY_TEXT);
    await this.assertText(this.confirmWorkingDaysText, content.CONFIRM_WORKING_DAYS_TEXT);
    await this.assertText(this.conformMoreInformationText, content.CONFIRM_MORE_INFORMATION_TEXT);
    await this.assertText(this.confirmServiceFeedbackLink, content.CONFIRM_SERVICE_LINK);
    await expect(this.confirmServiceFeedbackLink).toBeVisible();
  }
}
