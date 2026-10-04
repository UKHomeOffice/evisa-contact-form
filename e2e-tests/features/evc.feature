@EvcRegression
@EvcRegressionCI
Feature: EVC - Electronic Visa
  As a Home Office application user,
  I can navigate through the E-Visa form pages.

  Background:
    Given I visit evc application Start now page
    And Test data has been created for "EVC" scenarios

  Scenario Outline: E2E 1 - Verify the user can delete the uploaded file and continue
    When I select the EVC scenario "<Description>"
    And I complete E-Visa form up your details page
    And I can upload files from Upload page
    And I can remove 1 file from the table
    And I continue from Upload page
    Then the user should be on the "Question sent – GOV.UK" page
    Examples:
      | Description                        |
      | Remove an file from uploaded files |

  Scenario Outline: E2E 2 - Verify the user clicks on continue by uploading a valid file type will navigates to Confirmation page
    When I select the EVC scenario "<Description>"
    And I complete E-Visa form up your details page
    And I can upload files from Upload page
    And I continue from Upload page
    Then I validate the feedback link
    Examples:
      | Description                               |
      | Service link check from Confirmation page |

  Scenario Outline: 3 - Verify the user can navigate to Your details page with a valid BRP number
    When I select the EVC scenario "<Description>"
    And I continue from Start Now page
    And I select BRP number option and continue
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                 |
      | VALID BRP number validation |

  Scenario Outline: 4 - Verify the user can navigate to Reference number page and without entering BRP number
    When I select the EVC scenario "<Description>"
    And I continue from Start Now page
    And I select BRP number option and continue
    Then the user should be on the "Do you have any of the following reference numbers? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description              |
      | No BRP number validation |

  Scenario Outline: 5 - Verify the back navigation from Your details will navigates to BRP number page
    When I select the EVC scenario "<Description>"
    And I continue from Start Now page
    And I select BRP number option and continue
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    When User click on the back button from Your details page
    Then the user should be on the "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                        |
      | Back navigation to BRP number page |

  Scenario Outline: 6 - Verify the back navigation from Your details will navigates to BRP number page
    When I select the EVC scenario "<Description>"
    And I continue from Start Now page
    And I select BRP number option and continue
    And the user choose his reference option and continue
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    When User click on the back button from Your details page
    Then the user should be on the "Do you have any of the following reference numbers? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                        |
      | Back navigation to BRP number page |

  Scenario Outline: 7 - Verify the user clicks on continue by entering a valid data on Your details will navigates to Upload page
    When I select the EVC scenario "<Description>"
    And I continue from Start Now page
    And I select BRP number option and continue
    And I enter valid user details and continue
    Then the user should be on the "Upload files (optional) – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description              |
      | No BRP number validation |

  Scenario Outline: 8 - Verify the back navigation from Reference number will navigates to BRP number page
    When I select the EVC scenario "<Description>"
    And I continue from Start Now page
    And I select BRP number option and continue
    And User click on the back button from Reference number page
    Then the user should be on the "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                                            |
      | Back navigation to BRP number page from Reference page |

  Scenario Outline: 9 - Verify the user can navigates to Your details page from Reference number page when he provide correct details
    When I select the EVC scenario "<Description>"
    And I continue from Start Now page
    And I select BRP number option and continue
    And the user choose his reference option and continue
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                                                       |
      | Unique reference number navigation from Reference page validation |
      | Passport number navigation from Reference page validation         |
      | Other navigation from Reference page validation                   |
      | None of the above navigation from Reference page validation       |

  Scenario Outline: 10 - Verify the user clicks on continue by entering a valid data on Your details will navigates to Upload page
    When I select the EVC scenario "<Description>"
    And I continue from Start Now page
    And I select BRP number option and continue
    And the user choose his reference option and continue
    And I enter valid user details and continue
    Then the user should be on the "Upload files (optional) – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                                                       |
      | Unique reference number navigation from Reference page validation |

  Scenario Outline: 11 - Verify the back navigation from File Upload will navigates to Your details page
    When I select the EVC scenario "<Description>"
    And I complete E-Visa form up your details page
    And User click on the back button from Upload page
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Description                 |
      | VALID BRP number validation |

  Scenario Outline: 12 - Verify the user clicks on continue by uploading a valid file type will navigates to Confirmation page
    When I select the EVC scenario "<Description>"
    And I complete E-Visa form up your details page
    And I can upload files from Upload page
    And I continue from Upload page
    Then the user should be on the "Question sent – GOV.UK" page
    Examples:
      | Description             |
      | Upload valid file types |

  Scenario Outline: 13 - Verify the user clicks on continue without uploading any files will navigates to Confirmation page
    When I select the EVC scenario "<Description>"
    And I complete E-Visa form up your details page
    And I can upload files from Upload page
    And I continue from Upload page
    Then the user should be on the "Question sent – GOV.UK" page
    Examples:
      | Description                                 |
      | Complete E-Visa without uploading any files |

  Scenario Outline: 14 - Verify the user can upload maximum of 5 files
    When I select the EVC scenario "<Description>"
    And I complete E-Visa form up your details page
    And I can upload files from Upload page
    Then I can validate the maximum files uploaded
    When I continue from Upload page
    Then the user should be on the "Question sent – GOV.UK" page
    Examples:
      | Description                 |
      | Upload a maximum of 5 files |

  Scenario: User clicks on start now button and able to navigate to the ‘BRP number’
    When I click on Start now button from Ask a Question page
    Then the user should be on the "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page

  Scenario: EVC - Electronic Visa - click guidance link
    When I click the EVC guidance link
    Then the user should be on the "eVisas: access and use your online immigration status: Set up a UKVI account to access your eVisa - GOV.UK" page

  Scenario: Verify the back navigation from BRP number page is redirecting to Ask a Question page
    When I click on Start now button from Ask a Question page
    And User click on the back button from BRP page
    Then I should be on "Ask a question about getting access to your eVisa – Ask a question about getting access to your eVisa – GOV.UK" page and he can validate it