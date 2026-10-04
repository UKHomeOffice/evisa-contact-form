@EvcRegression

Feature: EVC - Electronic Visa application error validations
  As Home Office application user,
  I am able validate the content displaying on all the pages in E-Visa forms


  Scenario Outline: E-Visa form content validations for all pages
    Given Test data has been created for "EVC" scenarios
    And I selected the data for scenario "<Scenario ID>" - "<Description>"
    When I visit evc application Start now page
    Then I should be on "Ask a question about getting access to your eVisa – Ask a question about getting access to your eVisa – GOV.UK" page and he can validate it
    When I click on Start now button from Ask a Question page
    Then I should be on "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page and he can validate it
    When I select BRP number option and continue
    Then I should be on "Do you have any of the following reference numbers? – Ask a question about getting access to your eVisa – GOV.UK" page and he can validate it
    When the user choose his reference option and continue
    Then I should be on "Your details – Ask a question about getting access to your eVisa – GOV.UK" page and he can validate it
    When I enter valid user details and continue
    Then I should be on "Upload files (optional) – Ask a question about getting access to your eVisa – GOV.UK" page and he can validate it
    When I continue from Upload page
    Then I should be on "Question sent – GOV.UK" page and he can validate it
    Examples:
      | Scenario ID | Description                     |
      | 18          | E-Visa form content validations |