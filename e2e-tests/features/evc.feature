@EvcRegression
@EvcRegressionCI
Feature: EVC - Electronic Visa
  As Home Office application user,
  I am able check navigation on all the pages in E-Visa forms

  Background:
    Given Test data has been created for "EVC" scenarios

  Scenario Outline: E2E 1 - Verify the user can delete the uploaded file and continue
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I complete E-Visa form up your details page
    Then I can upload files from Upload page
    And I can remove 1 file from the table
    When I continue from Upload page
    Then the user should be on the "Question sent – GOV.UK" page
    Examples:
      | Scenario ID | Description                        |
      | 16          | Remove an file from uploaded files |


  Scenario Outline: E2E 2 - Verify the user clicks on continue by uploading a valid file type will navigates to Confirmation page
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I complete E-Visa form up your details page
    Then I can upload files from Upload page
    When I continue from Upload page
    Then I validate the feedback link
    Examples:
      | Scenario ID | Description                               |
      | 17          | Service link check from Confirmation page |


  Scenario:1 - User clicks on start now button and able to navigate to the ‘BRP number’
    When I visit evc application Start now page
    When I click on Start now button from Ask a Question page
    Then the user should be on the "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page


  Scenario:2 - EVC - Electronic Visa - click guidance link
    When I visit the EVC Homepage and click the guidance link
    Then the user should be on the "eVisas: access and use your online immigration status: Set up a UKVI account to access your eVisa - GOV.UK" page


  Scenario Outline:3 - Verify the user can navigate to Your details page with a valid BRP number
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    And I visit evc application Start now page
    When I continue from Start Now page
    And I select BRP number option and continue
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Scenario ID | Description                 |
      | 1           | VALID BRP number validation |


  Scenario Outline:4 - Verify the user can navigate to Reference number page and without entering BRP number
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When the user continue from Start Now page
    And I select BRP number option and continue
    Then the user should be on the "Do you have any of the following reference numbers? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Scenario ID | Description              |
      | 2           | No BRP number validation |


  Scenario:5 - Verify the back navigation from BRP number page is redirecting to Ask a Question page
    And I visit evc application Start now page
    When I click on Start now button from Ask a Question page
    And User click on the back button from BRP page
    Then I should be on "Ask a question about getting access to your eVisa – Ask a question about getting access to your eVisa – GOV.UK" page and he can validate it


  Scenario Outline:6 - Verify the back navigation from Your details will navigates to BRP number page
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When the user continue from Start Now page
    And I select BRP number option and continue
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    When User click on the back button from Your details page
    Then the user should be on the "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Scenario ID | Description                        |
      | 3           | Back navigation to BRP number page |


  Scenario Outline:7 - Verify the back navigation from Your details will navigates to BRP number page
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When the user continue from Start Now page
    And I select BRP number option and continue
    And the user choose his reference option and continue
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    When User click on the back button from Your details page
    Then the user should be on the "Do you have any of the following reference numbers? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Scenario ID | Description                        |
      | 4           | Back navigation to BRP number page |


  Scenario Outline:8 - Verify the user clicks on continue by entering a valid data on Your details will navigates to Upload page
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When the user continue from Start Now page
    And I select BRP number option and continue
    And I enter valid user details and continue
    Then the user should be on the "Upload files (optional) – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Scenario ID | Description              |
      | 5           | No BRP number validation |


  Scenario Outline:9 - Verify the back navigation from Reference number will navigates to BRP number page
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When the user continue from Start Now page
    And I select BRP number option and continue
    And User click on the back button from Reference number page
    Then the user should be on the "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Scenario ID | Description                                            |
      | 6           | Back navigation to BRP number page from Reference page |


  Scenario Outline:10 - Verify the user can navigates to Your details page from Reference number page when he provide correct details
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When the user continue from Start Now page
    And I select BRP number option and continue
    And the user choose his reference option and continue
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Scenario ID | Description                                                       |
      | 7           | Unique reference number navigation from Reference page validation |
      | 8           | Passport number navigation from Reference page validation         |
      | 9           | Other navigation from Reference page validation                   |
      | 10          | None of the above navigation from Reference page validation       |


  Scenario Outline:11 - Verify the user clicks on continue by entering a valid data on Your details will navigates to Upload page
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When the user continue from Start Now page
    And I select BRP number option and continue
    And the user choose his reference option and continue
    And I enter valid user details and continue
    Then the user should be on the "Upload files (optional) – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Scenario ID | Description                                                       |
      | 11          | Unique reference number navigation from Reference page validation |


  Scenario Outline:12 - Verify the back navigation from File Upload will navigates to Your details page
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I complete E-Visa form up your details page
    And User click on the back button from Upload page
    Then the user should be on the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page
    Examples:
      | Scenario ID | Description                 |
      | 12           | VALID BRP number validation |


  Scenario Outline:13 - Verify the user clicks on continue by uploading a valid file type will navigates to Confirmation page
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I complete E-Visa form up your details page
    Then I can upload files from Upload page
    When I continue from Upload page
    Then the user should be on the "Question sent – GOV.UK" page
    Examples:
      | Scenario ID | Description             |
      | 13           | Upload valid file types |


  Scenario Outline:14 - Verify the user clicks on continue without uploading any files will navigates to Confirmation page
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I complete E-Visa form up your details page
    Then I can upload files from Upload page
    When I continue from Upload page
    Then the user should be on the "Question sent – GOV.UK" page
    Examples:
      | Scenario ID | Description                                 |
      | 14          | Complete E-Visa without uploading any files |


  Scenario Outline:15 - Verify the user can upload maximum of 5 files
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I complete E-Visa form up your details page
    Then I can upload files from Upload page
    Then I can validate the maximum files uploaded
    When I continue from Upload page
    Then the user should be on the "Question sent – GOV.UK" page
    Examples:
      | Scenario ID | Description                 |
      | 15          | Upload a maximum of 5 files |