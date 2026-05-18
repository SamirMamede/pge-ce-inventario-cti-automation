import LoginPage from "../support/pages/LoginPage";
import AtribuicaoPage from "../support/pages/AtribuicaoPage";

describe("US01: Cadastro de Atribuições", () => {
  beforeEach(() => {
    LoginPage.accessPageAfterLogin("/portal_service/bonds/new");
  });

  it("Cenário 01: Deve cadastrar múltiplos ativos para colaborador em Home Office", () => {
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

    cy.get(".alert-success")
      .should("be.visible")
      .and("contain.text", "Parabéns");
  });

  it("Cenário 02: Deve cadastrar atribuição exclusiva para subárea sem colaborador", () => {
    const dadosSubarea = {
      area: "Teste",
      subarea: "Teste",
      atendidoPor: "Atendente",
      tombo1: Cypress.env("tombo_disponivel_3"),
      tombo2: Cypress.env("tombo_disponivel_4"),
    };

    AtribuicaoPage.selectArea.select(dadosSubarea.area);

    AtribuicaoPage.selectSubarea.select(dadosSubarea.subarea);

    AtribuicaoPage.radioSemColaborador.check();

    AtribuicaoPage.fieldAtendidoPor.select(dadosSubarea.atendidoPor);

    AtribuicaoPage.clicarAdicionarAtivo();
    AtribuicaoPage.selecionarAtivo(dadosSubarea.tombo1);

    AtribuicaoPage.clicarAdicionarAtivo();
    AtribuicaoPage.selecionarAtivo(dadosSubarea.tombo2);

    AtribuicaoPage.clicarEmSalvar();

    cy.get(".alert-success")
      .should("be.visible")
      .and("contain.text", "Parabéns");
  });

  it("Cenário 03: Não deve permitir salvar sem preencher campos obrigatórios", () => {
    AtribuicaoPage.clicarEmSalvar();

    AtribuicaoPage.selectArea
      .invoke("prop", "validationMessage")
      .should("be.oneOf", [
        "Selecione um item da lista.",
        "Please select an item in the list.",
      ]);
  });

  it("Cenário 04: Deve habilitar campo Pacote Office apenas quando checkbox estiver marcado", () => {
    AtribuicaoPage.checkOffice.should("not.be.checked");

    AtribuicaoPage.selectPacoteOffice.should("be.disabled");

    AtribuicaoPage.checkOffice.check();

    AtribuicaoPage.selectPacoteOffice.should("not.be.disabled");

    AtribuicaoPage.checkOffice.uncheck();

    AtribuicaoPage.selectPacoteOffice.should("be.disabled");
  });

  it("Cenário 05: Não deve permitir vincular ativo já utilizado", () => {
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

    cy.get(".alert")
      .should("be.visible")
      .and("contain.text", "Este Ativo já está vinculado");
  });

  it("Cenário 06: Deve descartar informações ao cancelar cadastro", () => {
    const observacao = `Teste cancelamento ${Date.now()}`;

    AtribuicaoPage.fieldObservacoes.type(observacao);

    AtribuicaoPage.btnCancelar.click();

    cy.url().should("include", "/portal_service/bonds");

    cy.contains(observacao).should("not.exist");
  });
});
