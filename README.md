# E-Visa Contact Us (EVC)

## Getting Started

- [Install & run locally](#install--run-the-application-locally)

### Dependencies

This form is built using
- [HOF framework](https://github.com/UKHomeOfficeForms/hof)
- [Gov.uk Notify](https://www.notifications.service.gov.uk) to send notification emails
- [File Vault](https://github.com/UKHomeOffice/file-vault) to store and retrieve uploaded files

### Versions

- Node v20.15.1 (LTS)
- yarn v1.22 (not npm)
- hof v20.5.6


## Install & Run the Application locally

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [Redis server](http://redis.io/download) running on default port 6379
- [File Vault](https://github.com/UKHomeOffice/file-vault) Service - running port 3000

### Setup

1. Copy `.env.development` to `.env` and populate it with all the required environment variables for the project.
2. Install dependencies with `yarn install`.
3. Start the service in development mode using `yarn run start:dev`.
