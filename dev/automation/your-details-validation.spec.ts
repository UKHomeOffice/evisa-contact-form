import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/start');
  await page.getByRole('button', { name: 'Accept additional cookies' }).click();
  await page.getByRole('button', { name: 'Start Now' }).click();
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('None of the above').check();
  await page.getByRole('button', { name: 'Continue' }).click();

  // your-details - full-name
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#full-name-group')).toContainText('Error: Enter your full name');
  await page.getByLabel('Full name').click();
  await page.getByLabel('Full name').fill('https://www.example.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Full name').click();
  await page.getByLabel('Full name').press('Home');
  await page.getByLabel('Full name').press('Shift+End');
  await page.getByLabel('Full name').fill('no special []');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#full-name-group')).toContainText('Error: Name must not include these characters: [ ] < > / |');
  await page.getByLabel('Full name').click();
  await page.getByLabel('Full name').fill('no special <>');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#full-name-group')).toContainText('Error: Name must not include these characters: [ ] < > / |');
  await page.getByLabel('Full name').click();
  await page.getByLabel('Full name').fill('no special / |');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#full-name-group')).toContainText('Error: Name must not include these characters: [ ] < > / |');
  await page.getByLabel('Full name').click();
  await page.getByLabel('Full name').fill('some full name');
  await page.getByRole('button', { name: 'Continue' }).click();


  // /your-details - email-field
  await page.getByLabel('Email address').click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#email-field-group')).toContainText('Error: Enter your email address');
  await page.getByLabel('Email address').fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#email-field-group')).toContainText('Error: Email address must be between 6 and 254 characters');
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('https://www.example.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#email-field-group')).toContainText('Error: Enter a real email address');
  await page.getByLabel('Email address').fill('bad@email-address');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#email-field-group')).toContainText('Error: Enter a real email address');

  await page.getByLabel('Email address').fill('someone@example.com');
  await page.getByRole('button', { name: 'Continue' }).click();


  // /your-details - contact-number
});