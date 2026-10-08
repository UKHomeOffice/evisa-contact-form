@EvcRegression
@EvcRegressionCI
Feature: EVC - Electronic Visa
  As someone asking a question about accessing my eVisa,
  I can complete the contact form and navigate between its pages.

  Scenario Outline: Remove an uploaded file and submit the question
    Given I visit the eVisa contact form Page
    When I fill out the answers to EVC form pertaining to "<Description>"
    And I attach any selected files for "<Description>"
    And I remove uploaded file 1
    And I submit my question
    Then I am navigated to "Question sent – GOV.UK" page
    Examples:
      | Description                               |
      | Remove an uploaded file before submitting |

  Scenario Outline: Display the feedback link after submission
    Given I visit the eVisa contact form Page
    When I fill out the answers to EVC form pertaining to "<Description>"
    And I attach any selected files for "<Description>"
    And I submit my question
    Then the feedback link should be available
    Examples:
      | Description                              |
      | Check the feedback link after submission |

  Scenario Outline: Submit without files using a passport number
    Given I visit the eVisa contact form Page
    When I fill out the answers to EVC form pertaining to "<Description>"
    And I attach any selected files for "<Description>"
    And I submit my question
    Then I am navigated to "Question sent – GOV.UK" page
    Examples:
      | Description                                |
      | Submit with a passport number and no files |

  Scenario Outline: Submit without a reference number or files
    Given I visit the eVisa contact form Page
    When I fill out the answers to EVC form pertaining to "<Description>"
    And I attach any selected files for "<Description>"
    And I submit my question
    Then I am navigated to "Question sent – GOV.UK" page
    Examples:
      | Description                                |
      | Submit without a reference number or files |

  Scenario Outline: Submit the maximum of five files
    Given I visit the eVisa contact form Page
    When I fill out the answers to EVC form pertaining to "<Description>"
    And I attach any selected files for "<Description>"
    Then the upload limit should be reached
    When I submit my question
    Then I am navigated to "Question sent – GOV.UK" page
    Examples:
      | Description                |
      | Submit five uploaded files |

  Scenario Outline: Return from Upload to Your details
    Given I visit the eVisa contact form Page
    When I fill out the answers to EVC form pertaining to "<Description>"
    And I go back from Upload
    Then I am navigated to "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                        |
      | Return from Upload to Your details |

  Scenario Outline: Return from reference numbers to the BRP number page
    Given I visit the eVisa contact form Page
    When I select Start now
    And I answer the BRP number question and continue for "<Description>" on the "Reference number" journey
    And I go back from the reference numbers page
    Then I am navigated to "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                                          |
      | Return from reference numbers to the BRP number page |

  Scenario Outline: Continue to Your details using a reference number option
    Given I visit the eVisa contact form Page
    When I select Start now
    And I answer the BRP number question and continue for "<Description>" on the "Reference number" journey
    And I provide reference details and continue for "<Description>" on the "Reference number" journey
    Then I am navigated to "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                             |
      | Continue with a unique reference number |
      | Continue with a passport number         |
      | Continue with another reference number  |
      | Continue without a reference number     |

  Scenario Outline: Continue to Upload without a reference number
    Given I visit the eVisa contact form Page
    When I select Start now
    And I answer the BRP number question and continue for "<Description>" on the "Your details" journey
    And I provide reference details and continue for "<Description>" on the "Your details" journey
    And I enter valid contact details and continue
    Then I am navigated to "Upload files (optional) – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                                      |
      | Enter contact details without a reference number |

  Scenario Outline: Continue to Your details with a valid BRP number
    Given I visit the eVisa contact form Page
    When I select Start now
    And I answer the BRP number question and continue for "<Description>" on the "BRP number" journey
    Then I am navigated to "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                      |
      | Continue with a valid BRP number |

  Scenario Outline: Continue to reference numbers without a BRP number
    Given I visit the eVisa contact form Page
    When I select Start now
    And I answer the BRP number question and continue for "<Description>" on the "Reference number" journey
    Then I am navigated to "Do you have any of the following reference numbers? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                   |
      | Continue without a BRP number |

  Scenario Outline: Return from Your details to the BRP number page
    Given I visit the eVisa contact form Page
    When I select Start now
    And I answer the BRP number question and continue for "<Description>" on the "BRP number" journey
    Then I am navigated to "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    When I go back from Your details
    Then I am navigated to "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                                     |
      | Return from Your details to the BRP number page |

  Scenario Outline: Return from Your details to the reference numbers page
    Given I visit the eVisa contact form Page
    When I select Start now
    And I answer the BRP number question and continue for "<Description>" on the "Reference number" journey
    And I provide reference details and continue for "<Description>" on the "Reference number" journey
    Then I am navigated to "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    When I go back from Your details
    Then I am navigated to "Do you have any of the following reference numbers? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                                            |
      | Return from Your details to the reference numbers page |

  Scenario Outline: Continue to Upload after providing a BRP number and contact details
    Given I visit the eVisa contact form Page
    When I select Start now
    And I answer the BRP number question and continue for "<Description>" on the "Your details" journey
    And I enter valid contact details and continue
    Then I am navigated to "Upload files (optional) – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                                        |
      | Enter contact details after providing a BRP number |

  Scenario: Open the BRP number question from Start now
    Given I visit the eVisa contact form Page
    When I select Start now
    Then I am navigated to "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page

  Scenario: Open the eVisa guidance on GOV.UK
    Given I visit the eVisa contact form Page
    When I click the EVC guidance link
    Then I am navigated to "eVisas: access and use your online immigration status: Set up a UKVI account to access your eVisa - GOV.UK" page

  Scenario: Return from the BRP number question to Start now
    Given I visit the eVisa contact form Page
    When I select Start now
    And I go back from the BRP number page
    Then the "Ask a question about getting access to your eVisa – Ask a question about getting access to your eVisa – GOV.UK" page should display the expected content