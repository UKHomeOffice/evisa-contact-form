import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/start');
  await page.getByRole('button', { name: 'Accept additional cookies' }).click();
  await page.getByRole('button', { name: 'Start Now' }).click();
  await page.getByLabel('No').check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel('None of the above').check();
  await page.getByRole('button', { name: 'Continue' }).click();
});