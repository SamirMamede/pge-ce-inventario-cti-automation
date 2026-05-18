class AtribuicaoPage {

  get selectArea() {
    return cy.get('[name="bond[area]"]');
  }

  get selectSubarea() {
    return cy.get('[name="bond[subarea_id]"]');
  }

  get radioColaborador() {
    return cy.get('#bond_employee_type_colaborador');
  }

  get radioSemColaborador() {
    return cy.get('#bond_employee_type_sem_usuario');
  }

  get radioSubarea() {
    return cy.get('#bond_employee_type_subarea');
  }

  get containerColaborador() {
    return cy.get('#select2-collaborators-container');
  }

  get fieldAtendidoPor() {
    return cy.get('[name*="[attended_by]"]');
  }

  get radioPresencial() {
    return cy.get('#bond_modality_presencial');
  }

  get radioHomeOffice() {
    return cy.get('#bond_modality_home_office');
  }

  get selectSO() {
    return cy.get('[name="bond[operating_system_id]"]');
  }

  get checkOffice() {
    return cy.get('#check_office');
  }

  get selectPacoteOffice() {
    return cy.get('[name="bond[office_suite_id]"]');
  }

  get fieldObservacoes() {
    return cy.get('[name="bond[observation]"]');
  }

  get btnAtribuirAtivo() {
    return cy.get('#btn_asset');
  }

  get btnSalvar() {
    return cy.get('[name="commit"]');
  }

  get btnCancelar() {
    return cy.contains('a', 'Cancelar');
  }

  preencherInformacoesBasicas(dados) {

    this.selectArea.select(dados.area);

    this.selectSubarea.select(dados.subarea);

    this.containerColaborador.click();

    cy.contains('.select2-results__option', dados.colaborador)
      .should('be.visible')
      .click();

    this.fieldAtendidoPor.select(dados.atendidoPor);

    if (dados.modalidade === 'Home Office') {
      this.radioHomeOffice.check();
    } else {
      this.radioPresencial.check();
    }

    if (dados.so) {
      this.selectSO.select(dados.so);
    }

    if (dados.obs) {
      this.fieldObservacoes.type(dados.obs);
    }
  }

  clicarAdicionarAtivo() {

    this.btnAtribuirAtivo
      .scrollIntoView()
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  selecionarAtivo(tombo) {

    cy.get('.select2-selection')
      .last()
      .should('be.visible')
      .click();

    cy.get('.select2-search__field')
      .should('be.visible')
      .type(`${tombo}{enter}`);

    cy.get('#bond_asset')
      .should('contain.text', tombo);
  }

  clicarEmSalvar() {

    this.btnSalvar
      .scrollIntoView()
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  validarDadosCarregados(dados) {

    cy.get('.card-header')
      .should('contain.text', 'Atualizando Atribuição');

    this.selectArea.should('contain', dados.area);

    this.selectSubarea.should('contain', dados.subarea);

    this.fieldAtendidoPor
      .find('option:selected')
      .should('contain.text', dados.atendidoPor);

    if (dados.modalidade === 'Home Office') {
      this.radioHomeOffice.should('be.checked');
    } else {
      this.radioPresencial.should('be.checked');
    }

    if (dados.so) {
      this.selectSO.should('contain', dados.so);
    }

    if (dados.obs) {
      this.fieldObservacoes.should(
        'have.value',
        dados.obs
      );
    }
  }

  clicarPrimeiroEditar() {

    cy.get('table tbody tr')
      .first()
      .within(() => {

        cy.get('a[href*="/edit"]')
          .should('exist')
          .click({ force: true });
      });

    cy.url().should('include', '/edit');
  }

  validarAtivosVinculados(tombosEsperados) {

    const listaTombos = Array.isArray(tombosEsperados)
      ? tombosEsperados
      : [tombosEsperados];

    listaTombos.forEach((tombo) => {

      cy.contains('#bond_asset .nested-fields', tombo)
        .should('be.visible')
        .within(() => {

          cy.get(
            'input[name*="[description]"], textarea[name*="[description]"]'
          ).should('not.be.empty');

          cy.get(
            'select[name*="[status_id]"] option:selected'
          ).should('contain.text', 'VÍNCULADO EM USO');
        });
    });
  }

  substituirAtivo(
    tomboAntigo,
    tomboNovo,
    novoStatus,
    motivo = null
  ) {

    cy.contains('#bond_asset .nested-fields', tomboAntigo)
      .should('be.visible')
      .within(() => {

        cy.get('select[name*="[status_id]"]')
          .select(novoStatus);

        if (motivo) {

          cy.get(
            'input[name*="[observation]"], textarea[name*="[observation]"]'
          ).type(motivo);
        }

        cy.get('.btn-danger, .btn-remove')
          .should('be.visible')
          .click();
      });

    cy.get('#bond_asset .nested-fields')
      .last()
      .within(() => {

        cy.get('.select2-selection')
          .should('be.visible')
          .click();
      });

    cy.get('.select2-search__field')
      .should('be.visible')
      .type(`${tomboNovo}{enter}`);

    cy.contains('#bond_asset', tomboNovo)
      .should('be.visible');

    cy.get('select[name*="[status_id]"]')
      .last()
      .select('VÍNCULADO EM USO');
  }

  alterarAreaESubarea(novaArea, novaSubarea) {

    this.selectArea.select(novaArea);

    this.selectSubarea.select(novaSubarea);
  }

  validarPrimeiraLinhaTabela(
    areaEsperada,
    subareaEsperada
  ) {

    cy.get('tbody > :nth-child(1) > :nth-child(2)')
      .should('contain.text', areaEsperada);

    cy.get('tbody > :nth-child(1) > :nth-child(3)')
      .should('contain.text', subareaEsperada);
  }
}

export default new AtribuicaoPage();