import LoginPage from "../support/pages/LoginPage";

describe("Funcionalidade: Login", () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it("Deve autenticar usuário válido e redirecionar para dashboard", () => {
    LoginPage.login(Cypress.env("user_login"), Cypress.env("user_password"));

    cy.url().should("not.include", "/sign_in");

    cy.contains("Logado com sucesso.").should("be.visible");

    cy.get(".navbar").should("be.visible");
  });
});
