class MovimentacaoPage {
  url = "/portal_service/reports/index";

  get selectArea() {
    return cy.get('[name="area_name"]');
  }
  get inputDataInicial() {
    return cy.get('[name="initial_date"]');
  }
  get inputDataFinal() {
    return cy.get('[name="final_date"]');
  }
  get btnPesquisar() {
    return cy.get('[name="commit"]');
  }
  get btnGerarRelatorio() {
    return cy.get("a > .btn");
  }
  get cabecalhosAgrupamento() {
    return cy.get("thead > .table-active > .text-center");
  }
  get linhasDeRegistros() {
    return cy.get("tbody > tr, :nth-child(2) > tbody > tr");
  }
  get msgSemMovimentacao() {
    return cy.get("tr > .text-center");
  }

  acessarTela() {
    cy.visit(this.url);
  }

  filtrarMovimentacao(area, dataInicio, dataFim) {
    if (area) this.selectArea.select(area);
    if (dataInicio) this.inputDataInicial.type(dataInicio);
    if (dataFim) this.inputDataFinal.type(dataFim);
    this.btnPesquisar.click();
  }
}

export default new MovimentacaoPage();
