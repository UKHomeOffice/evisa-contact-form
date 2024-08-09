# Dev Automation

The idea of Dev Automation is to save the developer a piece of time by automating the time-consuming chore of repeatedly playing through the Form in the browser to visually confirm changes. This is  unit-test TDD elevated to E2E.

Playwright was chosen as driver for its ability to rapidly capture recordings of user browser interactions into js code for browser automation.

This Dev Automation is not meant for "Testing". It is a Rapid Application Development approach built with tools also used in Testing and does not contributes in any way to UAT/Acceptance or Test Coverage or provide Validity guarantees of any sort.

To know more read-up on the excellent docs at [Playwright](https://playwright.dev/)

From the project root run:
```sh
  yarn playwright test                        # Runs the end-to-end tests.

  yarn playwright test --ui                   # Starts the interactive UI mode.

  yarn playwright test --project=chromium     # Runs the tests only on Desktop Chrome.

  yarn playwright test --debug                # Runs the tests in debug mode.

  yarn playwright codegen                     # Auto generate tests with Codegen.

  yarn playwright show-report                 # open last HTML report
```
