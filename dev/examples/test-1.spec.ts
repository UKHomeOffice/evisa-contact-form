import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:8080/start');
  await page.getByRole('button', { name: 'Accept additional cookies' }).click();
  await page.getByRole('button', { name: 'Hide this message' }).click();
  await page.getByRole('button', { name: 'Start Now' }).click();
});
