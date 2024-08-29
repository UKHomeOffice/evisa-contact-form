import { test, expect } from '@playwright/test';

test('reach /upload', async ({ page }) => {
  await page.goto('http://localhost:8080/start');
await page.getByRole('button', { name: 'Accept additional cookies' }).click();
await page.getByRole('button', { name: 'Hide this message' }).click();
await page.getByRole('button', { name: 'Start Now' }).click();
await page.getByLabel('No').check();
await page.getByRole('button', { name: 'Continue' }).click();
await page.getByLabel('None of the above').check();
await page.getByRole('button', { name: 'Continue' }).click();
await page.getByLabel('Full name').fill('some name');
await page.getByLabel('Email address').fill('name@example.com');
await page.getByLabel('Enter your question below.').fill('question 1');
await page.getByRole('button', { name: 'Continue' }).click();

// /upload
await page.getByLabel('fields.file-selector.label').click();
// [docs setInputFiles](https://playwright.dev/docs/api/class-locator#locator-set-input-files)
await page.getByLabel('fields.file-selector.label').setInputFiles('sample-doc-image.png');
});