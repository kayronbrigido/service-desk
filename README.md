# :warning: :rotating_light: PROJECT STILL UNDER DEVELOPMENT :rotating_light: :warning:

# Service Desk - Open Source

This is a free service desk system, feel free to use it as you wish. The technology used for the FrontEnd is Next.js version 14, BaaS is handled by Firebase, and currently, Cypress is used for E2E testing.

## Installing and Running the Project

The installation process is straightforward. Just use your preferred package manager, for example:

``yarn install``

To run the project, the script is defined in package.json under the dev command:

``yarn dev``

## Configuration

The first configuration you need to make is in the .env file. Although it's not recommended to commit this file for security reasons, I have included it so that you know which environment variables are necessary for the project to function correctly. Once you have it, simply fill in your configurations.

The most important configuration is to add the Firebase variables. To do this, create your project in Firebase and then add the value of each variable to the corresponding keys in the .env file.

Additionally, in Firebase, you need to create your first user under Authentication. This allows you to perform your first login and start creating other users.

## Running Tests

Running the tests is very simple. Just ensure Cypress is installed and then run the command cypress:open to open the Cypress GUI for running and configuring new tests, or run cypress:run to simply execute the tests.

It's important to note that in the ./cypress/fixtures folder, there are some test configuration files. For example, the companyRegister.json file contains data for registering a company in the system.


:computer: Developed by: 

Kayron Brigido