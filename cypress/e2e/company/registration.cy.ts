import { ICreateCompanyPayload } from "@src/models/auth";

describe('Company Registration', () => {
  it('should register company', () => {
    cy.visit('/')

    cy.get('[data-testId="loginInput"]').type('admin@admin.com');
    cy.get('[data-testId="passwordInput"]').type('123456');
    cy.get('[data-testId="loginButton"]').click()

    cy.wait(2000)

    cy.get('[data-testId="routeCreateCompany"]').click();

    cy.wait(2000)

    cy.fixture('companyRegister').then((company: ICreateCompanyPayload) => {

      cy.get('[data-testId="companyAddressStreet"]').type(company.address?.street ?? '');
      cy.get('[data-testId="companyAddressNumber"]').type(company.address?.number ?? '');
      cy.get('[data-testId="companyAddressNeighborhood"]').type(company.address?.neighborhood ?? '');
      cy.get('[data-testId="companyAddressCity"]').type(company.address?.city ?? '');
      cy.get('[data-testId="companyAddressState"]').type(company.address?.state ?? '');
      cy.get('[data-testId="companyAddressCountry"]').type(company.address?.country ?? '');
      cy.get('[data-testId="companyAddressZipCode"]').type(company.address?.zipCode ?? '');
      cy.get('[data-testId="companyAddressAdditionalInformation"]').type(company.address?.additionalInformation ?? '');

      cy.get('[data-testId="companyTaxIdentier"]').type(company.taxIdentifier ?? '');
      cy.get('[data-testId="companyName"]').type(company.name ?? '');
      cy.get('[data-testId="companyFantasyName"]').type(company.fantasyName ?? '');
      cy.get('[data-testId="companyPhone"]').type(company.phone ?? '');
      cy.get('[data-testId="companyEmail"]').type(company.email ?? '');
      cy.get('[data-testId="companyAdminFirstName"]').type(company.firstName ?? '');
      cy.get('[data-testId="companyAdminLastName"]').type(company.lastName ?? '');

      cy.get('[data-testId="companyLogin"]').type(company.login ?? '');
      cy.get('[data-testId="companyPassword"]').type(company.password ?? '');
      cy.get('[data-testId="companyConfirmPassword"]').type(company.password ?? '');
      cy.get('[data-testId="companyType"]').click();
      cy.get('[data-testId="companyTypeOption3"]').click();

    })
  })
})