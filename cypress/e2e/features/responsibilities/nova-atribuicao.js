import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../../../support/pages/LoginPage";
import AtribuicaoPage from "../../../support/pages/AtribuicaoPage";

let observacaoCancelamento = "";

Given("que estou autenticado no sistema", () => {
  LoginPage.visit();

  LoginPage.login(Cypress.env("user_login"), Cypress.env("user_password"));
});

Given("acesso a tela de cadastro de atribuições", () => {
  AtribuicaoPage.acessarTelaCadastro();
});

Given("inicio um cadastro de atribuição", () => {
  observacaoCancelamento = `Teste cancelamento ${Date.now()}`;

  AtribuicaoPage.fieldObservacoes.type(observacaoCancelamento);
});

When("realizo uma atribuição completa em home office", () => {
  const dadosAtribuicao = {
    area: "Teste",

    subarea: "Teste",

    colaborador: "Teste",

    atendidoPor: "Atendente",

    modalidade: "Home Office",

    so: "WINDOWS 10 PRO",

    tombo1: Cypress.env("tombo_disponivel_1"),

    tombo2: Cypress.env("tombo_disponivel_2"),

    obs: "Teste campo observação.",
  };

  AtribuicaoPage.preencherInformacoesBasicas(dadosAtribuicao);

  AtribuicaoPage.checkOffice.check();

  AtribuicaoPage.clicarAdicionarAtivo();

  AtribuicaoPage.selecionarAtivo(dadosAtribuicao.tombo1);

  AtribuicaoPage.clicarAdicionarAtivo();

  AtribuicaoPage.selecionarAtivo(dadosAtribuicao.tombo2);

  AtribuicaoPage.clicarEmSalvar();
});

When("realizo uma atribuição exclusiva para subárea", () => {
  const dadosSubarea = {
    area: "Teste",

    subarea: "Teste",

    atendidoPor: "Atendente",

    tombo1: Cypress.env("tombo_disponivel_3"),

    tombo2: Cypress.env("tombo_disponivel_4"),
  };

  AtribuicaoPage.selectArea.select(dadosSubarea.area);

  AtribuicaoPage.selectSubarea.select(dadosSubarea.subarea);

  AtribuicaoPage.radioSubarea.check();

  AtribuicaoPage.fieldAtendidoPor.select(dadosSubarea.atendidoPor);

  AtribuicaoPage.clicarAdicionarAtivo();

  AtribuicaoPage.selecionarAtivo(dadosSubarea.tombo1);

  AtribuicaoPage.clicarAdicionarAtivo();

  AtribuicaoPage.selecionarAtivo(dadosSubarea.tombo2);

  AtribuicaoPage.clicarEmSalvar();
});

When("tento salvar a atribuição sem preencher os campos obrigatórios", () => {
  AtribuicaoPage.clicarEmSalvar();
});

When("marco o checkbox de pacote office", () => {
  AtribuicaoPage.checkOffice.check();
});

When("desmarco o checkbox de pacote office", () => {
  AtribuicaoPage.checkOffice.uncheck();
});

When("tento vincular um ativo já utilizado", () => {
  const dadosDuplicados = {
    area: "Teste",

    subarea: "Teste",

    colaborador: "Teste",

    atendidoPor: "Atendente",

    modalidade: "Presencial",

    tombo: "16827",
  };

  AtribuicaoPage.preencherInformacoesBasicas(dadosDuplicados);

  AtribuicaoPage.clicarAdicionarAtivo();

  AtribuicaoPage.selecionarAtivo(dadosDuplicados.tombo);

  AtribuicaoPage.clicarEmSalvar();
});

When("cancelo o cadastro", () => {
  AtribuicaoPage.btnCancelar.click();
});

Then("a atribuição deve ser salva com sucesso", () => {
  cy.get(".alert-success").should("be.visible").and("contain.text", "Parabéns");
});

Then("devo visualizar validações obrigatórias", () => {
  AtribuicaoPage.selectArea
    .invoke("prop", "validationMessage")
    .should("be.oneOf", [
      "Selecione um item da lista.",
      "Please select an item in the list.",
    ]);

  cy.get(".alert-success").should("not.exist");
});

Then("o campo de pacote office deve ser habilitado", () => {
  AtribuicaoPage.selectPacoteOffice.should("not.be.disabled");
});

Then("o campo de pacote office deve ser desabilitado", () => {
  AtribuicaoPage.selectPacoteOffice.should("be.disabled");
});

Then("devo visualizar mensagem de ativo já vinculado", () => {
  cy.get(".alert")
    .should("be.visible")
    .and("contain.text", "Este Ativo já está vinculado");
});

Then("as informações não devem ser persistidas", () => {
  cy.url().should("include", "/portal_service/bonds");

  cy.contains(observacaoCancelamento).should("not.exist");
});
