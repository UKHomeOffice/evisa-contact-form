# EVC Playwright BDD Tests

This test-only migration mirrors `hof-e2e-auto-tests/Function/src/main` EVC coverage using the LMR page/fixture/step pattern.

## Structure

- `features/`: EVC journey and validation features. Each scenario starts with an explicit navigation Given, following LMR, and uses description-only Examples. Given establishes setup, When performs actions, and Then asserts outcomes. Existing route-specific titles, descriptions, tags, and expected values are retained.
- `pages/`: all six EVC page objects own their actions, form completion, route checks, content assertions, and validation errors; `base-page.ts` owns shared controls and assertions.
- `fixture/fixtures.ts`: LMR-style pages-only fixture, registering every page object.
- `steps/evc.step.ts`: LMR-style setup Given definitions, action When definitions with the description-driven form-completion switch first, and outcome/validation Then definitions. Page methods receive scalar constants directly. Description and journey choices are passed explicitly to the actions that need them; no applicant-data model or shared scenario state is required.
- `test-data/user-upload-files/`: byte-identical source upload assets.
- `utility-helper/constants-lib.ts`: repeated scalar inputs, generated boundary data, and content/error constants.

## Prerequisites

Install dependencies using the repository's Yarn lockfile and install Chromium:

```powershell
yarn install
npx playwright install chromium
```

The harness uses `PLAYWRIGHT_BASE_URL` from the existing `.env` or environment. Without it, it starts the app at `http://localhost:8080` (or `PLAYWRIGHT_PORT`). Local journeys require the app's existing Redis, File Vault, and Notify configuration. Credentials and network provisioning are outside this migration.

## Running Tests

```powershell
npm run test:e2e:typecheck
npm run test:e2e -- --workers=2
```

To run a scenario in isolation, generate the BDD tests and filter by its title:

```powershell
npm run test:e2e:generate
npx playwright test --config playwright.config.ts --grep "E-Visa form content validations for all pages" --workers=1 --retries=0
```

Playwright writes test artifacts to `test-results/` and its HTML report to `playwright-report/`.

Do not weaken source title or content expectations to make a different application version pass. Resolve service-version drift with the owner and update the source baseline explicitly before remigrating.