class LoginPage {
  visit() {
    cy.visit(Cypress.env('baseUrl'));
  }

  fillEmail(email) {
    cy.get('[name="admin[email]"]', { timeout: 10000 }).should('be.visible').type(email);
  }

  fillPassword(password) {
    cy.get('[name="admin[password]"]').should('be.visible').type(password, { log: false });
  }

  submit() {
    cy.get('[name="commit"]').click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }
}

export default new LoginPage();