import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/start');
  await page.getByRole('button', { name: 'Accept additional cookies' }).click();
  await page.getByRole('button', { name: 'Start Now' }).click();
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('None of the above').check();
  await page.getByRole('button', { name: 'Continue' }).click();


  // your-details
  await page.getByLabel('Full name').fill('');
  await page.getByLabel('Email address').fill('');
  await page.getByLabel('Contact number (optional)').fill('');
  await page.getByLabel('Enter your question below.').fill('');

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
  await expect(page.locator('#full-name-group')).not.toHaveClass(/error/);


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
  await expect(page.locator('#email-field-group')).not.toHaveClass(/error/);

  // /your-details - contact-number (optional)
  await page.getByLabel('Contact number (optional)').click();
  await page.getByLabel('Contact number (optional)').fill('https://www.example.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#contact-number-group')).toContainText('Error: Please do not enter a link/url into your answers');
  await page.getByLabel('Contact number (optional)').fill('aphonenumber');
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('Contact number (optional)').fill('123456789');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#contact-number-group')).toHaveClass(/error/);
  await expect(page.locator('#contact-number-group')).toContainText('Error: Enter a valid UK telephone number');
  await page.getByLabel('Contact number (optional)').fill('07930555666');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#contact-number-group')).not.toHaveClass(/error/);

  // /your-details - question-field
  await page.getByLabel('Enter your question below.').click();
  await expect(page.locator('#question-field-group')).toContainText('Error:Enter your question');
  await page.getByLabel('Enter your question below.').click();
  await page.getByLabel('Enter your question below.').fill('https://www.example.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#question-field-group')).toContainText('Error:Please do not enter a link/url into your answers');
  await page.getByLabel('Enter your question below.').fill('[]<>|/');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#question-field-group')).toContainText('Error:Your question must not include these characters: [ ] < > / |');
  await page.getByLabel('Enter your question below.').fill('12345');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#question-field-group')).toContainText('Error:Enter your question');
  await page.getByLabel('Enter your question below.').fill('a'.repeat(2001));
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#question-field-group')).toContainText('Error:Your question must be 2,000 characters or less');

  await page.getByLabel('Full name').fill('');  // reset the full name so the error shifts away from question-field
  await page.getByLabel('Enter your question below.').fill('b'.repeat(2000));
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.locator('#question-field-group')).not.toHaveClass(/error/);
  await page.getByLabel('Full name').fill('some full name');

  await page.getByRole('button', { name: 'Continue' }).click();
  await page.waitForURL('**/confirmation');
});