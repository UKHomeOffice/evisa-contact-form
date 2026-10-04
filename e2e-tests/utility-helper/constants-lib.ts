export type EVCApplicant = {
    description: string;
    doYouKnowYourBiometricResidencePermitNumber: string;
    brpNumber: string;
    doYouHaveAnyOfTheFollowingReferenceNumbers: string;
    uniqueReferenceNumberEvc: string;
    passportNumberEvc: string; otherEvc: string;
    fullNameEvc: string; emailAddressEvc: string;
    contactNumberEvc: string;
    yourQuestionEvc: string; uploadFiles: string
};

export class ConstantsLib {
    static readonly YES = 'Yes';
    static readonly NO = 'No';
    static readonly EMPTY = '';
    static readonly BLANK = ' ';
    static readonly EMPTY_OPTION = 'empty';
    static readonly NOT_APPLICABLE = 'N/A';
    static readonly BRP_NUMBER = 'RAX203829';
    static readonly ALTERNATIVE_BRP_NUMBER = 'RAX203819';
    static readonly PASSPORT_NUMBER = '120383978A';
    static readonly UNIQUE_REFERENCE_NUMBER = '1111-2222-3333-4444';
    static readonly OTHER_REFERENCE = 'Other Automation input';
    static readonly LEGACY_OTHER_REFERENCE = 'N/A120383978A';
    static readonly UNIQUE_REFERENCE_OPTION = 'Unique reference number';
    static readonly PASSPORT_OPTION = 'Passport number';
    static readonly OTHER_OPTION = 'Other';
    static readonly NONE_OPTION = 'None of the above';
    static readonly FULL_NAME = 'Automation Tester';
    static readonly SAS_HOF_EMAIL = requiredEnv('SAS_HOF_EMAIL');
    static readonly TELEPHONE = '01234567899';
    static readonly QUESTION = 'Enter your questions related to your E-Visa application';
    static readonly PNG_FILE = 'PNG test.png';
    static readonly THREE_FILES = 'GIF Test.gif-JPEG test.jpg-PNG test.png-';
    static readonly FIVE_FILES = 'GIF Test.gif-JPEG test.jpg-PNG test.png-JPEG test.jpg-PNG test.png-';
    static readonly TWO_FILES = 'GIF Test.gif-JPEG test.jpg-';
    static readonly INVALID_FILES = 'invalid file.txt-PNG 30mb.png';
    static readonly LONG_NAME_LENGTH = 250;
    static readonly LONG_EMAIL_LOCAL_LENGTH = 260;
    static readonly LONG_EMAIL_SUFFIX = '@a.com';
    static readonly LONG_QUESTION_LENGTH = 2009;
    static readonly LONG_QUESTION_CASE = 'question>2000chars';
    static readonly BLANK_DETAILS_CASE = 'blank input';
    static readonly BLANK_BRP_ERRORS: readonly string[] = ['no option selected', 'blank BRP number'];
    static readonly BLANK_REFERENCE_ERRORS: readonly string[] = ['no option selected', 'urn number blank', 'passport number blank', 'Other input blank'];
    static readonly CONTENT_UPLOAD_COUNT = 6;
    static readonly MAX_UPLOAD_COUNT = 5;
    static readonly DETAILS = { 
        fullNameEvc: ConstantsLib.FULL_NAME, 
        emailAddressEvc: ConstantsLib.SAS_HOF_EMAIL, 
        contactNumberEvc: ConstantsLib.TELEPHONE, 
        yourQuestionEvc: ConstantsLib.QUESTION 
    };

    static readonly DEFAULT_APPLICANT = {
        doYouKnowYourBiometricResidencePermitNumber: ConstantsLib.NO,
        brpNumber: ConstantsLib.NOT_APPLICABLE,
        doYouHaveAnyOfTheFollowingReferenceNumbers: ConstantsLib.NOT_APPLICABLE,
        uniqueReferenceNumberEvc: ConstantsLib.NOT_APPLICABLE,
        passportNumberEvc: ConstantsLib.NOT_APPLICABLE,
        otherEvc: ConstantsLib.NOT_APPLICABLE,
        fullNameEvc: ConstantsLib.NOT_APPLICABLE,
        emailAddressEvc: ConstantsLib.NOT_APPLICABLE,
        contactNumberEvc: ConstantsLib.NOT_APPLICABLE,
        yourQuestionEvc: ConstantsLib.NOT_APPLICABLE,
        uploadFiles: ConstantsLib.NOT_APPLICABLE
    };

    static readonly JOURNEYS: readonly string[] = ['BRP number', 'Reference number', 'Your details', 'Upload'];
    static readonly DESCRIPTION: readonly string[] = [
        'Remove an file from uploaded files',
        'Service link check from Confirmation page',
        'VALID BRP number validation',
        'No BRP number validation',
        'Back navigation to BRP number page',
        'Back navigation to BRP number page from Reference page',
        'Unique reference number navigation from Reference page validation',
        'Passport number navigation from Reference page validation',
        'Other navigation from Reference page validation',
        'None of the above navigation from Reference page validation',
        'Upload valid file types',
        'Complete E-Visa without uploading any files',
        'Upload a maximum of 5 files',
        'E-Visa form content validations',
        'E-Visa form error validations'
    ];

    static longDetails(contactNumber: string): { fullName: string; emailAddress: string; contactNumber: string; question: string } {
        const alphabet = (length: number): string => Array.from({ length }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))).join('');
        const emailAddress = alphabet(ConstantsLib.LONG_EMAIL_LOCAL_LENGTH) + ConstantsLib.LONG_EMAIL_SUFFIX;
        return { fullName: alphabet(ConstantsLib.LONG_NAME_LENGTH), emailAddress, contactNumber, question: alphabet(ConstantsLib.LONG_QUESTION_LENGTH) };
    }
}

export class EvcContents {
    static readonly ACCESS_YOUR_E_VISA_BANNER = 'Ask a question about getting access to your eVisa';
    static readonly BETA_BANNER = 'BETA This is a new service – your feedback will help us to improve it.';
    static readonly START_NOW_HEADER = 'Ask a question about getting access to your eVisa';
    static readonly START_NOW_IMMIGRATION_TEXT = 'Use this service if you have a question about creating your UK Visas and Immigration (UKVI) account and getting access to your online immigration status (eVisa).';
    static readonly START_NOW_WORKING_DAYS_TEXT = 'We aim to reply within 5 working days (Monday to Friday).';
    static readonly START_NOW_YOU_NEED_TEXT = 'What you need';
    static readonly START_NOW_EMAIL_ADDRESS_TEXT = 'You will need an email address where we can send our reply.';
    static readonly START_NOW_YOUR_QUESTION_TEXT = 'If you do not do anything for 30 minutes, your answers will not be saved. Your question is only saved when you submit the form.';
    static readonly BRP_NUMBER_HEADER = 'Do you know your biometric residence permit number?';
    static readonly BRP_NUMBER_CONTENT_ONE = 'You can find this in the top right corner on the front panel of the permit.';
    static readonly BRP_NUMBER_YES = 'Yes';
    static readonly BRP_NUMBER_YES_BIOMETRIC_TEXT = 'Biometric residence permit number';
    static readonly BRP_NUMBER_YES_EXAMPLE_TEXT = 'For example ‘RAX203829’';
    static readonly BRP_NUMBER_NO = 'No';
    static readonly REF_HEADER = 'Do you have any of the following reference numbers?';
    static readonly REF_ENQUIRY_TEXT = 'This will help us link your enquiry to your account.';
    static readonly REF_URN_LABEL = 'Unique reference number';
    static readonly REF_EVISA_ACCOUNT_TEXT = 'You can find this in the email we sent you when you first created an eVisa account.';
    static readonly REF_PASSPORT_NUMBER_LABEL = 'Passport number';
    static readonly REF_PASSPORT_NUMBER_EXAMPLE = 'This can contain letters and numbers For example. ‘120383978A’.';
    static readonly REF_OTHER_LABEL = 'Other';
    static readonly REF_INC_GWF = 'This could be an Incident Number (INC), National ID card number or a Global Web Form (GWF) number.';
    static readonly REF_NONE_ABOVE_LABEL = 'None of the above';
    static readonly YD_HEADER = 'Your details';
    static readonly YD_CONTACT_DETAILS = 'Enter your contact details below. We will use these to respond to your question.';
    static readonly YD_FULLNAME_TEXT = 'Full name';
    static readonly YD_EMAIL_ADDRESS_TEXT = 'Email address';
    static readonly YD_EMAIL_DETAILS_TEXT = 'Use an email you used in a past UK visa or immigration application';
    static readonly YD_CONTACT_NUMBER = 'Contact number (optional)';
    static readonly YD_CONTACT_NUMBER_DETAILS = 'We may call you to ask for more details';
    static readonly YD_YOUR_QUESTION_BELOW = 'Enter your question below';
    static readonly YD_YOUR_QUESTION = 'Provide as much detail as possible';
    static readonly YD_CHARACTER_REMAINING = 'You have 2000 characters remaining';
    static readonly UPLOAD_HEADER = 'Upload files (optional)';
    static readonly UPLOAD_SCREENSHOTS_TEXT = 'Upload screenshots or images of the problem, if you have them.';
    static readonly UPLOAD_CANNOT_UPLOAD_TEXT = 'You cannot upload:';
    static readonly UPLOAD_FILE_SIZE_TEXT = 'files larger than 25MB';
    static readonly UPLOAD_VIDEOS_TEXT = 'videos';
    static readonly UPLOAD_IMAGE_TEXT = 'Upload an image';
    static readonly UPLOAD_ACCEPTED_FILES_TEXT = 'Accepted files types are JPG, PNG or GIF';
    static readonly UPLOAD_NO_FILES_UPLOADED_TEXT = 'No files uploaded';
    static readonly UPLOAD_MAX_FILES_UPLOADED_TEXT = 'You may submit a maximum of 5 files';
    static readonly CONFIRM_QUESTION_SENT_BANNER = 'Question sent';
    static readonly CONFIRM_CONFIRMATION_EMAIL_TEXT = 'We have sent you a confirmation email.';
    static readonly CONFIRM_WHAT_HAPPENS_TEXT = 'What happens next';
    static readonly CONFIRM_YOUR_ENQUIRY_TEXT = 'We have sent your enquiry to the help team.';
    static readonly CONFIRM_WORKING_DAYS_TEXT = 'We aim to reply within 5 working days (Monday to Friday).';
    static readonly CONFIRM_MORE_INFORMATION_TEXT = 'We will ask you more information if we need it.';
    static readonly CONFIRM_SERVICE_LINK = 'What do you think of this service?';
}

export class EvcErrorMessages {
    static readonly BRP_NO_OPTION_SELECTION_ERROR = 'Tell us if you can provide a biometric residence permit number';
    static readonly BLANK_BRP_NUMBER_ERROR = 'Enter a biometric residence permit number';
    static readonly BRP_NUMBER_CHARS_LENGTH_ERROR = 'BRP number must be 9 characters';
    static readonly BRP_NUMBER_FORMAT_ERROR = 'Enter a BRP number in the correct format';
    static readonly REF_NO_OPTION_SELECTION_ERROR = 'Tell us if you can provide a unique reference number';
    static readonly REF_BLANK_URN_ERROR = 'Enter a unique reference number';
    static readonly REF_URN_LENGTH_ERROR = 'Unique reference number must be between 16 and 22 characters';
    static readonly REF_URN_FORMAT_ERROR = 'Enter a unique reference number in the correct format. For example 1111-2222-3333-4444';
    static readonly REF_BLANK_PASSPORT_NUMBER_ERROR = 'Enter a passport number';
    static readonly REF_PASSPORT_NUMBER_LENGTH_ERROR = 'Passport number must be 9 or 10 characters';
    static readonly REF_INVALID_PASSPORT_NUMBER_ERROR = 'Enter a valid passport number';
    static readonly REF_BLANK_OTHER_ERROR = 'Enter a reference number';
    static readonly REF_URL_OTHER_ERROR = 'Please do not enter a link/url into your answers';
    static readonly YOUR_DETAILS_BLANK_FULL_NAME_ERROR = 'Enter your full name';
    static readonly YOUR_DETAILS_BLANK_EMAIL_ADDRESS_ERROR = 'Enter your email address';
    static readonly YOUR_DETAILS_BLANK_YOUR_QUESTION_ERROR = 'Enter your question';
    static readonly YOUR_DETAILS_SPECIAL_CHAR_FULL_NAME_ERROR = 'Name must not include these characters: [ ] < > / |';
    static readonly YOUR_DETAILS_SPECIAL_CHAR_EMAIL_ADDRESS_ERROR = 'Enter a real email address';
    static readonly YOUR_DETAILS_SPECIAL_CHAR_CONTACT_NUMBER_ERROR = 'Enter a valid UK telephone number';
    static readonly YOUR_DETAILS_SPECIAL_CHAR_QUESTION_ERROR = 'Your question must not include these characters: [ ] < > / |';
    static readonly YOUR_DETAILS_LENGTH_LESS_EMAIL_ADDRESS_ERROR = 'Email address must be 255 characters or less';
    static readonly YOUR_DETAILS_LENGTH_EMAIL_ADDRESS_ERROR = 'Email address must be between 6 and 254 characters';
    static readonly YOUR_DETAILS_SPECIAL_CONTACT_NUMBER_ERROR = 'Enter a valid UK telephone number';
    static readonly YOUR_DETAILS_2000_CHARS_ERROR = 'Your question must be 2,000 characters or less';
    static readonly YOUR_DETAILS_TOO_MANY_ERROR = 'You have 9 characters too many';
    static readonly YOUR_DETAILS_CONTACT_NUMBER_LENGTH_ERROR = 'Enter a valid UK telephone number';
    static readonly UPLOAD_FILE_SIZE_ERROR = 'The selected file must be 25MB or less';
    static readonly UPLOAD_INVALID_FILETYPE_ERROR = 'The selected file must be JPG, PNG, GIF';
}

function requiredEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`${name} is not configured`);
    }

    return value;
}
