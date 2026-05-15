import LoginPage from '../support/pages/LoginPage';

describe('Funcionalidade: Login', () => {
  
  beforeEach(() => {
    LoginPage.visit();
  });

  it('Deve realizar login com sucesso no Inventário CTI', () => {
    LoginPage.login(
      Cypress.env('user_login'), 
      Cypress.env('user_password')
    );

    cy.url().should('not.include', '/sign_in');
    cy.get('.navbar', { timeout: 10000 }).should('be.visible');
  });
});