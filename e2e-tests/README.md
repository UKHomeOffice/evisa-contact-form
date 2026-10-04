# EVC Playwright BDD Tests

This test-only migration mirrors `hof-e2e-auto-tests/Function/src/main` EVC coverage using the LMR page/fixture/step pattern.

## Structure

- `features/`: EVC journey and validation features. All features navigate first and use the original Scenario Outline titles with description-only Examples; an explicit journey Given distinguishes repeated descriptions without relying on titles, Rules, or tags.
- `pages/`: all six EVC page objects, plus shared `base-page.ts`.
- `fixture/fixture.ts`: every page and test-scoped applicant state.
- `steps/evc.step.ts`: direct page-object steps, all 19 journey data variants in the inline scenario-selection When switch, shared journey helpers, and content/error assertions.
- `test-data/user-upload-files/`: byte-identical source upload assets.
- `utility-helper/constants-lib.ts`: shared applicant defaults, repeated inputs, generated boundary data, applicant types, description and journey string lists, and content/error constants.

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