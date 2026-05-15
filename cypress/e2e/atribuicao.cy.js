import LoginPage from '../support/pages/LoginPage';
import AtribuicaoPage from '../support/pages/AtribuicaoPage';

describe('US01: Cadastro de Atribuições', () => {
  beforeEach(() => {
    LoginPage.visit();
    LoginPage.login(Cypress.env('user_login'), Cypress.env('user_password'));
    
    cy.visit(`${Cypress.env('baseUrl')}/portal_service/bonds/new`);     
  });

  it('Cenário 01: Cadastro vinculando múltiplos ativos a um colaborador em Home Office', () => {
    
    const dadosAtribuicao = {
      area: 'Teste',
      subarea: 'Teste',
      colaborador: 'Teste',
      atendidoPor: 'Atendente',
      modalidade: 'Home Office',
      so: 'WINDOWS 10 PRO',
      utilizarOffice: true,
      tombo1: Cypress.env('tombo_disponivel_1'),
      tombo2: Cypress.env('tombo_disponivel_2'),
      obs: 'Teste campo observação.'
    };

    AtribuicaoPage.preencherInformacoesBasicas(dadosAtribuicao);

    AtribuicaoPage.checkOffice.check();

    AtribuicaoPage.btnAtribuirAtivo.click({ force: true });
    AtribuicaoPage.selecionarAtivo(dadosAtribuicao.tombo1);
    
    cy.wait(500); 

    AtribuicaoPage.btnAtribuirAtivo.scrollIntoView().click({ force: true });
    AtribuicaoPage.selecionarAtivo(dadosAtribuicao.tombo2);

    AtribuicaoPage.clicarEmSalvar();

    cy.get('.alert').should('be.visible').and('contain', 'Parabéns');
  });

  it('Cenário 02: Cadastro de atribuição exclusiva para uma Subárea sem colaborador definido', () => {
    const dadosSubarea = {
      area: 'Teste',
      subarea: 'Teste',
      atendidoPor: 'Atendente',
      modalidade: 'Presencial',
      tombo: '20220'
    };

    AtribuicaoPage.selectArea.select(dadosSubarea.area);
    AtribuicaoPage.selectSubarea.select(dadosSubarea.subarea);
    
    AtribuicaoPage.radioSemColaborador.check(); 
    
    AtribuicaoPage.fieldAtendidoPor.select(dadosSubarea.atendidoPor);
    AtribuicaoPage.btnAtribuirAtivo.click();
    AtribuicaoPage.selecionarAtivo(dadosSubarea.tombo);
    
    AtribuicaoPage.clicarEmSalvar();

    cy.get('.alert').should('be.visible').and('contain', 'Parabéns');
  });

  it('Cenário 03: Validar impedimento de salvar sem campos obrigatórios', () => {
    AtribuicaoPage.clicarEmSalvar();
    AtribuicaoPage.selectArea
    .invoke('prop', 'validationMessage')
    .should('be.oneOf', ['Selecione um item da lista.', 'Please select an item in the list.']); 
  });

it('Cenário 04: Validar que o campo Pacote Office é condicional', () => {
    AtribuicaoPage.checkOffice.should('not.be.checked');
    AtribuicaoPage.selectPacoteOffice.should('be.disabled'); 

    AtribuicaoPage.checkOffice.check();
    AtribuicaoPage.selectPacoteOffice.should('not.be.disabled');

    AtribuicaoPage.checkOffice.uncheck();
    AtribuicaoPage.selectPacoteOffice.should('be.disabled');
});

  it('Cenário 05: Validar impedimento de vincular ativo já utilizado', () => {
    const dadosDuplicados = {
      area: 'Teste',
      subarea: 'Teste',
      colaborador: 'Teste',
      atendidoPor: 'Atendente',
      modalidade: 'Presencial',
      tombo: '16827'
    };

    AtribuicaoPage.preencherInformacoesBasicas(dadosDuplicados);
    AtribuicaoPage.btnAtribuirAtivo.click();
    AtribuicaoPage.selecionarAtivo(dadosDuplicados.tombo); 
    AtribuicaoPage.clicarEmSalvar();

    cy.get('.alert').should('be.visible').and('contain', 'Este Ativo já está vinculado');
  });

  it('Cenário 06: Validar que o botão "Cancelar" descarta as informações preenchidas', () => {
    AtribuicaoPage.selectArea.select('Teste');
    AtribuicaoPage.btnCancelar.click();

    cy.url().should('include', '/portal_service/bonds');
    cy.get('.alert').should('not.exist');
  });
});