import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../../../support/pages/LoginPage";
import RelatorioAtribuicoesPage from "../../../support/pages/RelatorioAtribuicoesPage";

let tipoRelatorio;
let area;

Given("que estou autenticado no sistema", () => {
  LoginPage.accessPageAfterLogin("/portal_service/reports/assignments_by_area");
});

Given("acesso a tela de relatório de atribuições", () => {
  RelatorioAtribuicoesPage.acessarTela();
});

When("seleciono o relatório {string}", (tipo) => {
  tipoRelatorio = tipo;
});

When("filtro pela área {string}", (nomeArea) => {
  area = nomeArea;
});

When("realizo a pesquisa de atribuições", () => {
  RelatorioAtribuicoesPage.executarFiltro(tipoRelatorio, area);
});

Then("devo visualizar o relatório sintético da área {string}", (nomeArea) => {
  RelatorioAtribuicoesPage.cardHeaderTitulo
    .should("be.visible")
    .and("contain.text", `Relatório Sintético - ${nomeArea}`);

  RelatorioAtribuicoesPage.containerTotalAtribicoes
    .should("be.visible")
    .and("contain.text", "Total de Atribuições:");
});

Then("devo visualizar os gráficos do relatório sintético", () => {
  RelatorioAtribuicoesPage.graficoModalidade
    .should("be.visible")
    .and("contain.text", "Atribuições por Modalidade");

  RelatorioAtribuicoesPage.graficoColaboradores
    .should("be.visible")
    .and("contain.text", "Atribuições por Colaboradores");

  RelatorioAtribuicoesPage.graficoTermoResponsabilidade
    .should("be.visible")
    .and("contain.text", "Atribuições por Termo Responsabilidade");

  RelatorioAtribuicoesPage.graficoTermoEmprestimo
    .should("be.visible")
    .and("contain.text", "Atribuições por Termo Empréstimo");

  RelatorioAtribuicoesPage.graficoSistemaOperacional
    .should("be.visible")
    .and("contain.text", "Atribuições por Sistema Operacional");

  RelatorioAtribuicoesPage.graficoPacoteOffice
    .should("be.visible")
    .and("contain.text", "Atribuições por Pacote Office");
});

Then("devo visualizar o relatório analítico da área {string}", (nomeArea) => {
  RelatorioAtribuicoesPage.cardHeaderTitulo
    .should("be.visible")
    .and("contain.text", `Relatório Analítico - ${nomeArea}`);
});

Then("devo visualizar a tabela detalhada de atribuições", () => {
  RelatorioAtribuicoesPage.tabelaResumo
    .should("be.visible")
    .and("contain.text", "Área/Subárea");

  RelatorioAtribuicoesPage.tabelaAreaDetalhada(area).should("be.visible");

  RelatorioAtribuicoesPage.colunaColaborador
    .should("be.visible")
    .and("contain.text", "Colaborador(a)");

  RelatorioAtribuicoesPage.colunaModalidade.should("be.visible");

  RelatorioAtribuicoesPage.colunaTermoEmprestimo
    .should("be.visible")
    .and("contain.text", "Termo Empréstimo");

  RelatorioAtribuicoesPage.colunaStatus
    .should("be.visible")
    .and("contain.text", "Status");
});

Then("devo conseguir gerar o relatório PDF analítico", () => {
  const caminhoDoPdf = "cypress/downloads/relatorio_atribuicoes.pdf";

  const dataAtual = new Date();

  const dia = String(dataAtual.getDate()).padStart(2, "0");

  const ano = dataAtual.getFullYear();

  const mesPorExtenso = dataAtual.toLocaleString("pt-BR", { month: "long" });

  const mesFormatado =
    mesPorExtenso.charAt(0).toUpperCase() + mesPorExtenso.slice(1);

  const dataAtualFormatada = `Gerado em: ${dia} de ${mesFormatado} de ${ano}`;

  RelatorioAtribuicoesPage.selectArea.invoke("val").then((idArea) => {
    RelatorioAtribuicoesPage.selectSubarea.invoke("val").then((idSubarea) => {
      const urlPdf = `/portal_service/reports/assignments_by_area_pdf?area=${idArea}&subarea=${idSubarea}&type=analytic`;

      cy.request({
        url: urlPdf,
        encoding: "binary",
      }).then((response) => {
        expect(response.status).to.eq(200);

        expect(response.headers["content-type"]).to.include("application/pdf");

        cy.writeFile(caminhoDoPdf, response.body, "binary");

        cy.task("getPdfText", caminhoDoPdf).then((textoPDF) => {
          const textoLimpo = textoPDF.replace(/\s+/g, " ");

          expect(textoLimpo).to.include("Relatório de Atribuições");

          expect(textoLimpo).to.include(dataAtualFormatada);

          expect(textoLimpo).to.match(/Tombo/i);

          expect(textoLimpo).to.match(/Descrição/i);

          expect(textoLimpo).to.match(/Atribuido/i);
        });
      });
    });
  });
});
