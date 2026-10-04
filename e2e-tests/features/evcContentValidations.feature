@EvcRegression

Feature: EVC - Electronic Visa application error validations
  As a Home Office application user,
  I can validate the content displayed on all E-Visa form pages.

  Background:
    Given I visit evc application Start now page

  Scenario Outline: E-Visa form content validations for all pages
    When I select the EVC scenario "<Description>"
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
      | Description                     |
      | E-Visa form content validations |