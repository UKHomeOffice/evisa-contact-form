import { test as base } from 'playwright-bdd';
import { basePage } from '../pages/base-page';
import { evcStartPage } from '../pages/evc-start.page';
import { evcBRPNumberPage } from '../pages/evc-brp-number.page';
import { evcReferenceNumbersPage } from '../pages/evc-reference-numbers.page';
import { evcYourDetailsPage } from '../pages/evc-your-details.page';
import { evcUploadPage } from '../pages/evc-upload.page';
import { evcConfirmationPage } from '../pages/evc-confirmation.page';
import path from 'node:path';

export type Pages = {
    basePage: basePage;
    evcStartPage: evcStartPage;
    evcBRPNumberPage: evcBRPNumberPage;
    evcReferenceNumbersPage: evcReferenceNumbersPage;
    evcYourDetailsPage: evcYourDetailsPage;
    evcUploadPage: evcUploadPage;
    evcConfirmationPage: evcConfirmationPage
};

export const test = base.extend<{ pages: Pages }>({
    pages: async ({ page }, use) => {
        await use({
            basePage: new basePage(page),
            evcStartPage: new evcStartPage(page),
            evcBRPNumberPage: new evcBRPNumberPage(page),
            evcReferenceNumbersPage: new evcReferenceNumbersPage(page),
            evcYourDetailsPage: new evcYourDetailsPage(page),
            evcUploadPage: new evcUploadPage(page, path.resolve(__dirname, '../test-data')),
            evcConfirmationPage: new evcConfirmationPage(page)
        });
    }
});

export const expect = test.expect;
