import LoginPage from '../support/pages/LoginPage';
import AtribuicaoPage from '../support/pages/AtribuicaoPage';

describe('US02: Edição de Atribuições', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.login(Cypress.env('user_login'), Cypress.env('user_password'));

        cy.visit(`${Cypress.env('baseUrl')}/portal_service/bonds`);
    });
    
    const dadosReferencia = {
        area: 'Teste',
        subarea: 'Teste',
        atendidoPor: 'Atendente',
        modalidade: 'Home Office',
        so: 'WINDOWS 10 PRO',
        tombo1: Cypress.env('tombo_disponivel_1'),
        tombo2: Cypress.env('tombo_disponivel_2'),
        obs: 'Teste campo observação.'
    };

    it('Cenário 01: Validar se todos os campos carregam os dados corretamente ao clicar em "Editar"', () => {
        AtribuicaoPage.clicarPrimeiroEditar();
        AtribuicaoPage.validarAtivosVinculados([dadosReferencia.tombo1, dadosReferencia.tombo2]);
        AtribuicaoPage.validarDadosCarregados(dadosReferencia);
    });
});