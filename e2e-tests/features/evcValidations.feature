@EvcRegression

Feature: EVC - Electronic Visa application validations
  As a Home Office application user,
  I can validate the content displayed on all E-Visa form pages.

  Scenario Outline: E-Visa form content validations for all pages
    Given I visit the eVisa contact form Page
    Then the "Ask a question about getting access to your eVisa – Ask a question about getting access to your eVisa – GOV.UK" page should display the expected content
    When I select Start now
    Then the "Do you know your biometric residence permit number? – Ask a question about getting access to your eVisa – GOV.UK" page should display the expected content
    When I answer the BRP number question and continue for "<Description>" on the "Reference number" journey
    Then the "Do you have any of the following reference numbers? – Ask a question about getting access to your eVisa – GOV.UK" page should display the expected content
    When I provide reference details and continue for "<Description>" on the "Reference number" journey
    Then the "Your details – Ask a question about getting access to your eVisa – GOV.UK" page should display the expected content
    When I enter valid contact details and continue
    Then the "Upload files (optional) – Ask a question about getting access to your eVisa – GOV.UK" page should display the expected content
    When I submit my question
    Then the "Question sent – GOV.UK" page should display the expected content
    Examples:
      | Description                     |
      | E-Visa form content validations |


  Scenario Outline: E-Visa form error validations for all pages
    Given I visit the eVisa contact form Page
    When I select Start now
    Then I validate BRP number selection page error messages
      | empty |           | no option selected       |
      | Yes   |           | blank BRP number         |
      | Yes   | RAX9999   | BRP number length        |
      | Yes   | RAXo99999 | incorrect BRP number     |
      | Yes   | RAX-03829 | special chars BRP number |
    When I validate for "No" selection with "empty" BRP number
    Then I validate Reference details page error messages
      | empty                   |                      | no option selected            |
      | Unique reference number |                      | urn number blank              |
      | Unique reference number | 1111-1110-99         | urn number length             |
      | Unique reference number | 1111-11000-12!1-11o1 | urn number incorrect          |
      | Unique reference number | 1111-11000-1211-1111 | urn number invalid format     |
      | Passport number         |                      | passport number blank         |
      | Passport number         | 1203839A             | passport number length        |
      | Passport number         | 1203839!A            | passport number special chars |
      | Other                   |                      | Other input blank             |
      | Other                   | http:/test.com       | Url input value               |
    When I provide reference details and continue for "<Description>" on the "Reference number" journey
    Then I validate Your details page error messages
      | blank input                  |                  |                                        |                  |                                 |
      | special chars input          | Automation/ Test | automation.test@/                      | +312312312312/   | /?test                          |
      | question>2000chars           | Name>250         | email>264                              | 012456           | question>2000chars              |
      | incorrect format input       | Automation Test  | wqeqe                                  | 012456           | Automation test question  input |
      | more than 15 chars without + | Automation Test  | a@a.c                                  | 441234567899999  | Automation test question  input |
      | more than 16 chars with +    | Automation Test  | a@a.c                                  | +441234567899999 | Automation test question  input |
      | contact number 6             | Automation Test  | sas-hof-test@digital.homeoffice.gov.uk | +12388           | Automation test question input  |
      | contact number<6             | Automation Test  | sas-hof-test@digital.homeoffice.gov.uk | 994499           | Automation test question  input |
    When I enter valid contact details and continue
    Then I validate Upload page error messages
      | PNG 30mb.png     | file size over 25MB |
      | invalid file.txt | invalid file type   |
    Examples:
      | Description                   |
      | E-Visa form error validations |