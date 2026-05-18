import LoginPage from "../support/pages/LoginPage";
import AtribuicaoPage from "../support/pages/AtribuicaoPage";

describe("US03: Geração de Termos de Atribuição", () => {
  beforeEach(() => {
    LoginPage.accessPageAfterLogin("/portal_service/bonds");
  });

  it("Cenário 01: Validar comportamento de exclusão mútua dos checkboxes no modal", () => {
    AtribuicaoPage.abrirModalParaPrimeiroRegistro();

    AtribuicaoPage.chkResponsabilidade.check().should("be.checked");

    AtribuicaoPage.chkEmprestimo.check().should("be.checked");

    AtribuicaoPage.chkResponsabilidade.should("not.be.checked");
  });

  it("Cenário 02: Validar fechamento do modal pelo botão de fechar (X)", () => {
    AtribuicaoPage.abrirModalParaPrimeiroRegistro();

    cy.wait(500);

    AtribuicaoPage.btnFecharModal.invoke("click");

    AtribuicaoPage.modalTermos.should("not.be.visible");
  });

  it("Cenário 03: Gerar Termo de Responsabilidade com sucesso", () => {
    AtribuicaoPage.prepararStubNovaAba();

    AtribuicaoPage.abrirModalParaPrimeiroRegistro();

    AtribuicaoPage.chkResponsabilidade.check().should("be.checked");

    AtribuicaoPage.btnGerarDentroModal.click();

    cy.get("@aberturaNovaAba").should(
      "be.calledWithMatch",
      /term_responsibility_asset/,
    );
  });

  it("Cenário 04: Gerar Termo de Empréstimo com sucesso", () => {
    AtribuicaoPage.prepararStubNovaAba();

    AtribuicaoPage.abrirModalParaPrimeiroRegistro();

    AtribuicaoPage.chkEmprestimo.check().should("be.checked");

    AtribuicaoPage.btnGerarDentroModal.click();

    cy.get("@aberturaNovaAba").should(
      "be.calledWithMatch",
      /term_responsibility_asset.*term_type=loan/,
    );
  });

  it("Cenário 05: Validar se o PDF contém todos os campos obrigatórios", () => {
    const caminhoDoPdf = "cypress/downloads/termo_validacao.pdf";

    let urlDoPdf = "";

    cy.window().then((win) => {
      cy.stub(win, "open").callsFake((url) => {
        urlDoPdf = url;
      });
    });

    AtribuicaoPage.abrirModalParaPrimeiroRegistro();

    AtribuicaoPage.chkResponsabilidade.check().should("be.checked");

    AtribuicaoPage.btnGerarDentroModal.click();

    cy.fixture("cidades").then((cidades) => {
      cy.then(() => {
        expect(urlDoPdf).to.not.be.empty;

        cy.request({
          url: urlDoPdf,
          encoding: "binary",
        }).then((response) => {
          expect(response.status).to.eq(200);

          expect(response.headers["content-type"]).to.include(
            "application/pdf",
          );

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
                "declaro receber os bens relacionados no presente termo, no estado de conservação indicado, pelo qual assumo total responsabilidade pela guarda",
              );
            } else {
              expect(textoLimpo).to.include(
                "declaro receber na condição de empréstimo, os equipamentos listados pertencente à Procuradoria-Geral do Estado do Ceará",
              );
            }
          });
        });
      });
    });
  });
});
