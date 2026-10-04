import { expect, Locator, Page } from '@playwright/test';
import path from 'node:path';
import { basePage } from './base-page';
import { EvcContents as content, EvcErrorMessages as errors } from '../utility-helper/constants-lib';

export class evcUploadPage extends basePage {
  readonly uploadPageHeaderText: Locator;
  readonly uploadScreenShotsText: Locator;
  readonly uploadCannotUploadText: Locator;
  readonly uploadFilesLargerText: Locator;
  readonly uploadVideosText: Locator;
  readonly uploadAnImageText: Locator;
  readonly uploadAcceptedFilesText: Locator;
  readonly uploadNoFilesText: Locator;
  readonly maxUploadText: Locator;
  readonly uploadBackLinkBtn: Locator;
  readonly chooseFileInput: Locator;
  readonly uploadBtn: Locator;
  readonly uploadContinueBtn: Locator;
  readonly maxFileSizeError: Locator;
  readonly fileTypeError: Locator;
  readonly uploadedRows: Locator;

  constructor(
    page: Page,
    readonly filePath: string
  ) {
    super(page);
    this.uploadPageHeaderText = this.headerText;
    this.uploadScreenShotsText = page.locator('#gov-grid-row-content form > p');
    this.uploadCannotUploadText = page.locator('#gov-grid-row-content form > div:nth-of-type(1) > p');
    this.uploadFilesLargerText = page.locator('.govuk-list--bullet > li:nth-of-type(1)');
    this.uploadVideosText = page.locator('.govuk-list--bullet > li:nth-of-type(2)');
    this.uploadAnImageText = page.locator('#file-upload-group > h2');
    this.uploadAcceptedFilesText = page.locator('#file-upload-group > p:nth-of-type(1)');
    this.uploadNoFilesText = page.locator('#file-upload-group > div:nth-of-type(4) > p');
    this.maxUploadText = page.locator('#no-more-uploads');
    this.uploadBackLinkBtn = page.getByRole('link', { name: 'Back', exact: true });
    this.chooseFileInput = page.locator('#file-selector');
    this.uploadBtn = page.locator('button[name="upload-file-button"]');
    this.uploadContinueBtn = page.locator('button[value="continue-button"]');
    this.maxFileSizeError = page.locator('#file-selector-error-maxFileSize');
    this.fileTypeError = page.locator('#file-selector-error-fileType');
    this.uploadedRows = page.locator('table.table-files-loop > tbody > tr');
  }

  async expectedPageTitle(): Promise<string> {
    return 'Upload files (optional) – Ask a question about getting access to your eVisa – GOV.UK';
  }

  async uploadEvidence(filename: string): Promise<void> {
    const count = await this.uploadFilesCount();
    await this.chooseFileInput.setInputFiles(path.join(this.filePath, filename));
    await this.uploadBtn.click();
    await expect(this.uploadedRows).toHaveCount(count + 1);
  }

  async uploadEvidenceFile(filename: string): Promise<void> {
    await this.chooseFileInput.setInputFiles(path.join(this.filePath, filename));
    await expect.poll(async () => (await this.uploadBtn.isEnabled()) || (await this.maxFileSizeError.isVisible()) || (await this.fileTypeError.isVisible())).toBe(true);
    if (await this.uploadBtn.isEnabled()) {
      await this.uploadBtn.click();
    } else {
      await expect(this.uploadBtn).toBeDisabled();
    }
  }

  async setUploadEvidence(count: number, filename: string, maxCount: number): Promise<void> {
    for (let fileIndex = 1; fileIndex <= Math.min(count, maxCount); fileIndex++) await this.uploadEvidence(filename);
  }

  async setUploadYourEvidence(files: readonly string[]): Promise<void> {
    for (const filename of files) await this.uploadEvidence(filename);
  }

  async clickUploadBackLink(): Promise<void> {
    await this.uploadBackLinkBtn.click();
  }

  async uploadContinue(): Promise<void> {
    await this.uploadContinueBtn.click();
  }

  async uploadFilesCount(): Promise<number> {
    return this.uploadedRows.count();
  }

  async deleteAFile(row: number): Promise<void> {
    const count = await this.uploadFilesCount();
    if (count > 0 && row > 0 && row <= count) {
      await this.uploadedRows
        .nth(row - 1)
        .locator('td:nth-of-type(2) a')
        .click();
      await expect(this.uploadedRows).toHaveCount(count - 1);
    }
  }

  async uploadPageContent(): Promise<void> {
    await this.assertUrlEndPoints('upload');
    await this.assertText(this.uploadPageHeaderText, content.UPLOAD_HEADER);
    await this.assertText(this.uploadScreenShotsText, content.UPLOAD_SCREENSHOTS_TEXT);
    await this.assertText(this.uploadCannotUploadText, content.UPLOAD_CANNOT_UPLOAD_TEXT);
    await this.assertText(this.uploadFilesLargerText, content.UPLOAD_FILE_SIZE_TEXT);
    await this.assertText(this.uploadVideosText, content.UPLOAD_VIDEOS_TEXT);
    await this.assertText(this.uploadAnImageText, content.UPLOAD_IMAGE_TEXT);
    await this.assertText(this.uploadAcceptedFilesText, content.UPLOAD_ACCEPTED_FILES_TEXT);
    await this.assertText(this.uploadNoFilesText, content.UPLOAD_NO_FILES_UPLOADED_TEXT);
  }

  async validateMaxFilesUploaded(): Promise<void> {
    await expect(this.chooseFileInput).toBeDisabled();
    await expect(this.uploadBtn).toBeDisabled();
    await this.assertText(this.maxUploadText, content.UPLOAD_MAX_FILES_UPLOADED_TEXT);
  }

  async assertUploadErrorMessages(errorType: string): Promise<void> {
    if (errorType === 'file size over 25MB') await expect(this.maxFileSizeError).toContainText(errors.UPLOAD_FILE_SIZE_ERROR);
    else if (errorType === 'invalid file type') await expect(this.fileTypeError).toContainText(errors.UPLOAD_INVALID_FILETYPE_ERROR);
  }
}
