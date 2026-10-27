import { ICreateCompanyPayload } from '@src/models/auth';

describe('Company Registration', () => {
  it('should register company', () => {
    cy.visit('/')

    cy.get('[test-id="loginInput"]').type('admin@admin.com');
    cy.get('[test-id="passwordInput"]').type('123456');
    cy.get('[test-id="loginButton"]').click()

    cy.wait(2000)

    cy.get('[test-id="routeCreateCompany"]').click();

    cy.wait(2000)

    cy.fixture('companyRegister').then((company: ICreateCompanyPayload) => {

      cy.get('[test-id="companyAddressStreet"]').type(company.address?.street ?? '');
      cy.get('[test-id="companyAddressNumber"]').type(company.address?.number ?? '');
      cy.get('[test-id="companyAddressNeighborhood"]').type(company.address?.neighborhood ?? '');
      cy.get('[test-id="companyAddressCity"]').type(company.address?.city ?? '');
      cy.get('[test-id="companyAddressState"]').type(company.address?.state ?? '');
      cy.get('[test-id="companyAddressCountry"]').type(company.address?.country ?? '');
      cy.get('[test-id="companyAddressZipCode"]').type(company.address?.zipCode ?? '');
      cy.get('[test-id="companyAddressAdditionalInformation"]').type(company.address?.additionalInformation ?? '');

      cy.get('[test-id="companyTaxIdentier"]').type(company.taxIdentifier ?? '');
      cy.get('[test-id="companyName"]').type(company.name ?? '');
      cy.get('[test-id="companyTradeName"]').type(company.tradeName ?? '');
      cy.get('[test-id="companyPhone"]').type(company.phone ?? '');
      cy.get('[test-id="companyEmail"]').type(company.email ?? '');
      cy.get('[test-id="companyAdminFirstName"]').type(company.firstName ?? '');
      cy.get('[test-id="companyAdminLastName"]').type(company.lastName ?? '');

      cy.get('[test-id="companyLogin"]').type(company.login ?? '');
      cy.get('[test-id="companyPassword"]').type(company.password ?? '');
      cy.get('[test-id="companyConfirmPassword"]').type(company.password ?? '');
      cy.get('[test-id="companyType"]').click();
      cy.get('[test-id="companyTypeOption3"]').click();

    })
  })
})