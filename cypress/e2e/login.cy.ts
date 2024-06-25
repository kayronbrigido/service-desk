describe('Login Page', () => {
  it('should log in successfully with correct credentials', () => {
    cy.visit('/');
    
    cy.get('[data-testId="loginInput"]').type('admin@admin.com');
    cy.get('[data-testId="passwordInput"]').type('123456');
    cy.get('[data-testId="loginButton"]').click()
    
  });
});