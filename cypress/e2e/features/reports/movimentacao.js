import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../../../support/pages/LoginPage";
import MovimentacaoPage from "../../../support/pages/MovimentacaoPage";

let area;
let dataInicio;
let dataFim;

Given("que estou autenticado no sistema", () => {
  LoginPage.accessPageAfterLogin("/portal_service/reports/index");
});

Given("acesso a tela de relatório de movimentações", () => {
  MovimentacaoPage.acessarTela();
});

When("filtro movimentações da área {string}", (nomeArea) => {
  area = nomeArea;
});

When("informo período de {string} até {string}", (inicio, fim) => {
  dataInicio = inicio;
  dataFim = fim;
});

When("realizo a pesquisa", () => {
  MovimentacaoPage.filtrarMovimentacao(area, dataInicio, dataFim);
});

Then("devo visualizar a mensagem {string}", (mensagem) => {
  MovimentacaoPage.msgSemMovimentacao
    .should("be.visible")
    .and("contain.text", mensagem);
});

Then("devo visualizar agrupamentos de movimentações", () => {
  MovimentacaoPage.cabecalhosAgrupamento.should("have.length.at.least", 1);

  MovimentacaoPage.cabecalhosAgrupamento.each(($el) => {
    const texto = $el.text().trim();

    if (texto.includes("movimentaç")) {
      expect(texto).to.match(
        /\d+\s+de\s+[a-zA-ZçÇãÃ]+\s+de\s+\d{4}\s+-\s+\d+\s+movimentaç/i,
      );
    }
  });
});

Then("devo visualizar os dados obrigatórios do ativo", () => {
  MovimentacaoPage.linhasDeRegistros.first().within(() => {
    cy.get("td").eq(0).should("be.visible").and("not.be.empty");

    cy.get("td").eq(1).should("be.visible").and("not.be.empty");

    cy.get("td").eq(2).should("be.visible").and("not.be.empty");

    cy.get("td").eq(3).should("be.visible").and("not.be.empty");

    cy.get("td").eq(4).should("be.visible").and("not.be.empty");

    cy.get("td").eq(5).should("be.visible").and("not.be.empty");
  });
});

Then("devo conseguir gerar o relatório PDF", () => {
  const caminhoDoPdf = "cypress/downloads/relatorio_movimentacao.pdf";

  const urlDoPdf = `/portal_service/reports/pdf_create?area_name=${area}&final_date=${dataFim}&initial_date=${dataInicio}`;

  cy.request({
    url: urlDoPdf,
    encoding: "binary",
  }).then((response) => {
    expect(response.status).to.eq(200);

    expect(response.headers["content-type"]).to.include("application/pdf");

    cy.writeFile(caminhoDoPdf, response.body, "binary");

    cy.task("getPdfText", caminhoDoPdf).then((textoPDF) => {
      const textoLimpo = textoPDF.replace(/\s+/g, " ");

      expect(textoLimpo).to.include(
        `Movimentações de Ativos para ${area} no período: 01/05/2026 à 17/05/2026`,
      );
    });
  });
});
