import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../../../support/pages/LoginPage";
import AtribuicaoPage from "../../../support/pages/AtribuicaoPage";

let urlDoPdf = "";

Given("que estou autenticado no sistema", () => {
  LoginPage.accessPageAfterLogin("/portal_service/bonds");
});

Given("acesso a tela de atribuições", () => {
  AtribuicaoPage.acessarTela();
});

Given("preparo o monitoramento de abertura do PDF", () => {
  AtribuicaoPage.prepararStubNovaAba();
});

Given("preparo a captura da URL do PDF", () => {
  cy.window().then((win) => {
    cy.stub(win, "open").callsFake((url) => {
      urlDoPdf = url;
    });
  });
});

When("abro o modal de geração de termos", () => {
  AtribuicaoPage.abrirModalParaPrimeiroRegistro();
});

When("seleciono o termo de responsabilidade", () => {
  AtribuicaoPage.chkResponsabilidade.check().should("be.checked");
});

When("seleciono o termo de empréstimo", () => {
  AtribuicaoPage.chkEmprestimo.check().should("be.checked");
});

When("fecho o modal de termos", () => {
  cy.wait(500);

  AtribuicaoPage.btnFecharModal.invoke("click");
});

When("gero o termo", () => {
  AtribuicaoPage.btnGerarDentroModal.click();
});

Then("o termo de responsabilidade deve ser desmarcado", () => {
  AtribuicaoPage.chkResponsabilidade.should("not.be.checked");
});

Then("o modal não deve estar visível", () => {
  AtribuicaoPage.modalTermos.should("not.be.visible");
});

Then("o PDF de responsabilidade deve ser aberto", () => {
  cy.get("@aberturaNovaAba").should(
    "be.calledWithMatch",
    /term_responsibility_asset/,
  );
});

Then("o PDF de empréstimo deve ser aberto", () => {
  cy.get("@aberturaNovaAba").should(
    "be.calledWithMatch",
    /term_responsibility_asset.*term_type=loan/,
  );
});

Then("o PDF deve conter os campos obrigatórios", () => {
  const caminhoDoPdf = "cypress/downloads/termo_validacao.pdf";

  cy.fixture("cidades").then((cidades) => {
    cy.then(() => {
      expect(urlDoPdf).to.not.be.empty;

      cy.request({
        url: urlDoPdf,
        encoding: "binary",
      }).then((response) => {
        expect(response.status).to.eq(200);

        expect(response.headers["content-type"]).to.include("application/pdf");

        cy.writeFile(caminhoDoPdf, response.body, "binary");

        cy.task("getPdfText", caminhoDoPdf).then((textoPDF) => {
          const textoLimpo = textoPDF.replace(/\s+/g, " ");

          const dataAtual = new Date();

          const dia = dataAtual.getDate();

          const ano = dataAtual.getFullYear();

          const mesPorExtenso = dataAtual.toLocaleString("pt-BR", {
            month: "long",
          });

          const mesFormatado =
            mesPorExtenso.charAt(0).toUpperCase() + mesPorExtenso.slice(1);

          const cidadesRegex = cidades.join("|");

          const regexLocalData = new RegExp(
            `(${cidadesRegex}),\\s*${dia}\\s*de\\s*${mesFormatado}\\s*de\\s*${ano}`,
            "i",
          );

          expect(textoLimpo).to.match(/NOME/i);

          expect(textoLimpo).to.match(/ÁREA/i);

          expect(textoLimpo).to.match(/CPF/i);

          expect(textoLimpo).to.match(/ATIVOS ATRIBUIDOS/i);

          expect(textoLimpo).to.match(/ASSINATURA/i);

          expect(textoLimpo).to.match(regexLocalData);

          if (textoLimpo.match(/RESPONSABILIDADE/i)) {
            expect(textoLimpo).to.include(
              "declaro receber os bens relacionados no presente termo",
            );
          } else {
            expect(textoLimpo).to.include(
              "declaro receber na condição de empréstimo",
            );
          }
        });
      });
    });
  });
});
