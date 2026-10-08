import { expect, Locator, Page } from '@playwright/test';

export class basePage {
  readonly headerText: Locator;
  readonly continueButton: Locator;
  readonly thereIsAProblemText: Locator;
  readonly errorSummaryList: Locator;
  readonly accessYourEVisaBanner: Locator;
  readonly betaBannerText: Locator;

  constructor(readonly page: Page) {
    this.headerText = page.locator('h1');
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.thereIsAProblemText = page.locator('#error-summary-title');
    this.errorSummaryList = page.locator('.govuk-error-summary__list');
    this.accessYourEVisaBanner = page.locator('#proposition-name');
    this.betaBannerText = page.locator('.govuk-phase-banner__content');
  }

  async assertPageTitle(page: Page, title: string): Promise<void> {
    await expect(page).toHaveTitle(title);
  }

  async click(locator: Locator): Promise<void> {
    await locator.click();
  }

  async clearAndEnterTextInElement(locator: Locator, value: string): Promise<void> {
    await locator.fill('');
    await locator.pressSequentially(value);
    await locator.press('Tab');
  }

  async clickContinueButton(): Promise<void> {
    await this.click(this.continueButton);
  }

  async selectRadioOptionWithText(option: string, exact = false): Promise<void> {
    await this.page.getByRole('radio', { name: option, exact }).check();
  }

  async getInputFiledValue(locator: Locator): Promise<string> {
    return locator.inputValue();
  }

  async assertUrlEndPoints(endpoint: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(`/${endpoint}/?$`));
  }

  async assertText(locator: Locator, text: string): Promise<void> {
    await expect(locator).toBeVisible();
    await expect(locator).toHaveText(text, { useInnerText: true });
  }

  async assertError(locator: Locator, error: string): Promise<void> {
    await this.assertText(locator, error);
  }

  async assertEVisaFormInput(mainError: Locator, fieldError: Locator, error: string): Promise<void> {
    await this.assertText(mainError, error);
    await expect(fieldError).toContainText(error);
  }

  async validateBanners(serviceName: string, betaText: string): Promise<void> {
    await this.assertText(this.accessYourEVisaBanner, serviceName);
    await expect(this.betaBannerText).toBeVisible();
    await expect
      .poll(async () => {
        const badge = await this.betaBannerText.locator('strong').innerText();
        const banner = await this.betaBannerText.innerText();
        return `${badge.trim()} ${banner.slice(badge.length).trim()}`.replace(/\s+/g, ' ');
      })
      .toBe(betaText);
  }

  async isElementPresent(locator: Locator): Promise<boolean> {
    return (await locator.count()) > 0;
  }
}
