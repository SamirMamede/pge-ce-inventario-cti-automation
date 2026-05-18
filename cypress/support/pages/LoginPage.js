class LoginPage {

  visit() {
    cy.visit('/');
  }

  fillEmail(email) {
    cy.get('[name="admin[email]"]')
      .should('be.visible')
      .type(email);
  }

  fillPassword(password) {
    cy.get('[name="admin[password]"]')
      .should('be.visible')
      .type(password, { log: false });
  }

  submit() {
    cy.get('[name="commit"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.submit();
  }

  accessPageAfterLogin(path) {
    this.visit();

    this.login(
      Cypress.env('user_login'),
      Cypress.env('user_password')
    );

    cy.visit(path);
  }
}

export default new LoginPage();