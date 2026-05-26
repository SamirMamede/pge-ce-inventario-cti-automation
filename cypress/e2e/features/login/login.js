import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../../../support/pages/LoginPage";

Given("que acesso a página de login", () => {
  LoginPage.visit();
});

When("preencho credenciais válidas", () => {
  LoginPage.fillCredentials(
    Cypress.env("user_login"),
    Cypress.env("user_password"),
  );
});

When("clico no botão de login", () => {
  LoginPage.submit();
});

Then("devo visualizar o dashboard", () => {
  cy.url().should("not.include", "/sign_in");

  cy.contains("Logado com sucesso.").should("be.visible");

  cy.get(".navbar").should("be.visible");
});
