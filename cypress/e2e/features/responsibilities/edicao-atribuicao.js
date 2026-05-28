import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../../../support/pages/LoginPage";
import AtribuicaoPage from "../../../support/pages/AtribuicaoPage";

const dadosReferencia = {
  area: "Teste",
  subarea: "Teste",
  atendidoPor: "Atendente",
  modalidade: "Home Office",
  so: "WINDOWS 10 PRO",
  tombo1: Cypress.env("tombo_disponivel_1"),
  tombo2: Cypress.env("tombo_disponivel_2"),
  tombo5: Cypress.env("tombo_disponivel_5"),
  tombo6: Cypress.env("tombo_disponivel_6"),
  obs: "Teste campo observação.",
};

Given("que estou autenticado no sistema", () => {
  LoginPage.visit();

  LoginPage.login(Cypress.env("user_login"), Cypress.env("user_password"));
});

Given("acesso a tela de atribuições", () => {
  AtribuicaoPage.acessarTela();
});

When("edito a primeira atribuição cadastrada", () => {
  AtribuicaoPage.clicarPrimeiroEditar();
});

Then("devo visualizar os dados carregados corretamente", () => {
  AtribuicaoPage.validarDadosCarregados(dadosReferencia);
});

Then("devo visualizar os ativos vinculados", () => {
  AtribuicaoPage.validarAtivosVinculados([
    dadosReferencia.tombo1,
    dadosReferencia.tombo2,
  ]);
});

When("substituo um ativo com defeito", () => {
  AtribuicaoPage.substituirAtivo(
    dadosReferencia.tombo1,
    dadosReferencia.tombo5,
    "COM DEFEITO",
    "Motivo teste",
  );
});

When("substituo um ativo disponível", () => {
  AtribuicaoPage.substituirAtivo(
    dadosReferencia.tombo2,
    dadosReferencia.tombo6,
    "DISPONÍVEL",
  );
});

When("altero área e subárea da atribuição", () => {
  AtribuicaoPage.alterarAreaESubarea("CEDAT", "DIVIDA ATIVA");
});

When("salvo a edição da atribuição", () => {
  AtribuicaoPage.clicarEmSalvar();
});

When("removo os campos obrigatórios", () => {
  AtribuicaoPage.selectArea.select("");
});

When("tento salvar a edição", () => {
  AtribuicaoPage.clicarEmSalvar();
});

Then("devo visualizar mensagem de sucesso", () => {
  cy.get(".alert-success").should("be.visible").and("contain.text", "sucesso");
});

Then("devo visualizar a nova área e subárea na listagem", () => {
  AtribuicaoPage.validarPrimeiraLinhaTabela("CEDAT", "DIVIDA ATIVA");
});

Then("devo visualizar validação dos campos obrigatórios", () => {
  AtribuicaoPage.selectArea
    .invoke("prop", "validationMessage")
    .should("be.oneOf", [
      "Selecione um item da lista.",
      "Please select an item in the list.",
    ]);
});
