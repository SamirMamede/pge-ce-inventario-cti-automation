class AtribuicaoPage {
  get selectArea() { return cy.get('[name="bond[area]"]'); }
  get selectSubarea() { return cy.get('[name="bond[subarea_id]"]'); }
  get radioColaborador() { return cy.get('#bond_employee_type_colaborador'); }
  get radioSemColaborador() { return cy.get('#bond_employee_type_sem_usuario'); }
  get radioSubarea() { return cy.get('#bond_employee_type_subarea'); }
  get containerColaborador() { return cy.get('#select2-collaborators-container'); }
  get fieldAtendidoPor() { return cy.get('[name="bond[attendant_attributes][0][attended_by]"]'); } 
  get radioPresencial() { return cy.get('#bond_modality_presencial'); }
  get radioHomeOffice() { return cy.get('#bond_modality_home_office'); }
  get selectSO() { return cy.get('[name="bond[operating_system_id]"]'); }
  get checkOffice() { return cy.get('#check_office'); }
  get selectPacoteOffice() { return cy.get('[name="bond[office_suite_id]"]'); }
  get fieldObservacoes() { return cy.get('[name="bond[observation]"]'); }
  get btnAtribuirAtivo() { return cy.get('#btn_asset'); }
  get select2Tombo() { return cy.get('.select2-selection'); }
  get fieldDescricaoAtivo() { return cy.get('input[name*="[description]"]'); }
  get selectStatusAtivo() { return cy.get('select[name*="[status_id]"]'); }
  get btnRemoverAtivo() { return cy.get('.col-md-1 > .btn'); }
  get btnSalvar() { return cy.get('[name="commit"]'); }
  get btnCancelar() { return cy.get('a > .btn'); }

  preencherInformacoesBasicas(dados) {
    this.selectArea.select(dados.area);
    this.selectSubarea.select(dados.subarea);
    this.fieldAtendidoPor.type(dados.atendidoPor);
    this.containerColaborador.click();
    cy.get('.select2-results__option').contains(dados.colaborador).click();
    this.fieldAtendidoPor.select(dados.atendidoPor);
    
    if (dados.modalidade === 'Home Office') {
      this.radioHomeOffice.check();
    } else {
      this.radioPresencial.check();
    }

    if (dados.so) this.selectSO.select(dados.so);
    if (dados.obs) this.fieldObservacoes.type(dados.obs);
  }

selecionarAtivo(tombo) {
  cy.get('.select2-selection').last().click({ force: true });
  cy.get('.select2-search__field').type(`${tombo}{enter}`);
}

  validarDadosAtivo(descricao) {
    this.fieldDescricaoAtivo.should('not.be.empty');
    if (descricao) {
      this.fieldDescricaoAtivo.should('have.value', descricao);
    }
  }

  clicarAdicionarAtivo() {
  this.btnAtribuirAtivo.scrollIntoView().should('be.visible').click({ force: true });
}

  clicarEmSalvar() {
    this.btnSalvar.scrollIntoView().click({ force: true });
  }
}

export default new AtribuicaoPage();