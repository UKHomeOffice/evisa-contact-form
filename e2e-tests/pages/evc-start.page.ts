import { expect, Locator, Page } from '@playwright/test';
import { basePage } from './base-page';
import { EvcContents as content } from '../utility-helper/constants-lib';

export class evcStartPage extends basePage {
  readonly startNowHeaderText: Locator;
  readonly startNowVisaAndImmigrationText: Locator;
  readonly startNowWorkingDaysText: Locator;
  readonly startNowYouNeedText: Locator;
  readonly startNowEmailAddressText: Locator;
  readonly startNowYourQuestionText: Locator;
  readonly startNowBtn: Locator;
  readonly acceptCookieButton: Locator;
  readonly hideThisMessageButton: Locator;
  readonly guidanceLink: Locator;

  constructor(page: Page) {
    super(page);
    this.startNowHeaderText = this.headerText;
    this.startNowVisaAndImmigrationText = page.locator('#gov-grid-row-content form > p:nth-of-type(1)');
    this.startNowWorkingDaysText = page.locator('#gov-grid-row-content form > p:nth-of-type(2)');
    this.startNowYouNeedText = page.getByRole('heading', { name: 'What you need', exact: true });
    this.startNowEmailAddressText = page.locator('#gov-grid-row-content form > p:nth-of-type(3)');
    this.startNowYourQuestionText = page.locator('#gov-grid-row-content form > p:nth-of-type(4)');
    this.startNowBtn = page.getByRole('button', { name: /^Start now$/i });
    this.acceptCookieButton = page.getByRole('button', { name: 'Accept additional cookies', exact: true });
    this.hideThisMessageButton = page.getByRole('button', { name: /Hide / });
    this.guidanceLink = page.getByRole('link', { name: 'getting access to your online immigration status (eVisa)' });
  }

  async expectedPageTitle(): Promise<string> {
    return content.START_NOW_PAGE_TITLE;
  }

  async openEvcStartNowPage(): Promise<void> {
    await this.page.goto('/start');
  }

  async acceptCookies(): Promise<void> {
    if (await this.acceptCookieButton.isVisible()) {
      await this.acceptCookieButton.click();
      await expect(this.hideThisMessageButton).toBeVisible();
      await this.hideThisMessageButton.click();
      await expect(this.hideThisMessageButton).toBeHidden();
    }
    const currentUrl = new URL(this.page.url());
    if (currentUrl.searchParams.has('hof-cookie-check')) {
      currentUrl.searchParams.delete('hof-cookie-check');
      await this.page.goto(currentUrl.href);
    }
  }

  async clickLinkEvcGuidanceOnGovUK(): Promise<void> {
    await this.guidanceLink.click();
  }

  async clickStartNowBtn(): Promise<void> {
    await this.startNowBtn.click();
  }
}
