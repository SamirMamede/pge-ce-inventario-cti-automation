import LoginPage from '../support/pages/LoginPage';
import AtribuicaoPage from '../support/pages/AtribuicaoPage';

const obterDadosReferencia = () => ({
  area: 'Teste',
  subarea: 'Teste',
  atendidoPor: 'Atendente',
  modalidade: 'Home Office',
  so: 'WINDOWS 10 PRO',
  tombo1: Cypress.env('tombo_disponivel_1'),
  tombo2: Cypress.env('tombo_disponivel_2'),
  tombo3: Cypress.env('tombo_disponivel_3'),
  tombo4: Cypress.env('tombo_disponivel_4'),
  obs: 'Teste campo observação.'
});

describe('US02: Edição de Atribuições', () => {

  beforeEach(() => {
    LoginPage.accessPageAfterLogin('/portal_service/bonds');
  });

  const dadosReferencia = obterDadosReferencia();

  it('Cenário 01: Deve carregar corretamente os dados ao editar atribuição', () => {

    AtribuicaoPage.clicarPrimeiroEditar();

    AtribuicaoPage.validarAtivosVinculados([
      dadosReferencia.tombo1,
      dadosReferencia.tombo2
    ]);

    AtribuicaoPage.validarDadosCarregados(dadosReferencia);
  });

  it('Cenário 02: Deve substituir ativo com defeito por novo ativo funcional', () => {

    AtribuicaoPage.clicarPrimeiroEditar();

    AtribuicaoPage.substituirAtivo(
      dadosReferencia.tombo1,
      dadosReferencia.tombo3,
      'COM DEFEITO',
      'Motivo teste'
    );

    AtribuicaoPage.clicarEmSalvar();

    cy.get('.alert-success')
      .should('be.visible')
      .and('contain.text', 'sucesso');
  });

  it('Cenário 03: Deve substituir ativo saudável por outro ativo disponível', () => {

    AtribuicaoPage.clicarPrimeiroEditar();

    AtribuicaoPage.substituirAtivo(
      dadosReferencia.tombo2,
      dadosReferencia.tombo4,
      'DISPONÍVEL'
    );

    AtribuicaoPage.clicarEmSalvar();

    cy.get('.alert-success')
      .should('be.visible')
      .and('contain.text', 'sucesso');
  });

  it('Cenário 04: Deve alterar Área/Subárea e refletir mudança na listagem', () => {

    const novaArea = 'CEDAT';
    const novaSubarea = 'DIVIDA ATIVA';

    AtribuicaoPage.clicarPrimeiroEditar();

    AtribuicaoPage.alterarAreaESubarea(
      novaArea,
      novaSubarea
    );

    AtribuicaoPage.clicarEmSalvar();

    cy.get('.alert-success')
      .should('be.visible')
      .and('contain.text', 'sucesso');

    AtribuicaoPage.validarPrimeiraLinhaTabela(
      novaArea,
      novaSubarea
    );
  });

  it('Cenário 05: Não deve permitir salvar edição sem campos obrigatórios', () => {

    AtribuicaoPage.clicarPrimeiroEditar();

    AtribuicaoPage.selectArea.select('');

    AtribuicaoPage.clicarEmSalvar();

    AtribuicaoPage.selectArea
      .invoke('prop', 'validationMessage')
      .should('be.oneOf', [
        'Selecione um item da lista.',
        'Please select an item in the list.'
      ]);
  });
});