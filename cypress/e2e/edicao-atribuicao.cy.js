import LoginPage from '../support/pages/LoginPage';
import AtribuicaoPage from '../support/pages/AtribuicaoPage';

describe('US02: Edição de Atribuições', () => {
    beforeEach(() => {
    LoginPage.accessPageAfterLogin('/portal_service/bonds');
    });
    
    const dadosReferencia = {
        area: 'Teste',
        subarea: 'Teste',
        atendidoPor: 'Atendente',
        modalidade: 'Home Office',
        so: 'WINDOWS 10 PRO',
        tombo1: Cypress.env('tombo_disponivel_1'),
        tombo2: Cypress.env('tombo_disponivel_2'),
        tombo3: Cypress.env('tombo_disponivel_3'),
        obs: 'Teste campo observação.'
    };

    it('Cenário 01: Validar se todos os campos carregam os dados corretamente ao clicar em "Editar"', () => {
        AtribuicaoPage.clicarPrimeiroEditar();
        AtribuicaoPage.validarAtivosVinculados([dadosReferencia.tombo1, dadosReferencia.tombo2]);
        AtribuicaoPage.validarDadosCarregados(dadosReferencia);
    });

    it('Cenário 02: Substituir ativo com defeito por um novo ativo funcional', () => {
        const tomboComDefeito = dadosReferencia.tombo1;
        const tomboSubstituto = dadosReferencia.tombo3;
        
        AtribuicaoPage.clicarPrimeiroEditar();
        
        AtribuicaoPage.substituirAtivo(tomboComDefeito, tomboSubstituto, 'COM DEFEITO', 'Motivo teste');
        AtribuicaoPage.clicarEmSalvar();

        cy.get('.alert-success', { timeout: 10000 }).should('be.visible').and('contain', 'sucesso!');
    });

    it('Cenário 03: Substituir ativo saudável por outro ativo', () => {
        const tomboSaudavel = dadosReferencia.tombo1;
        const tomboSubstituto = dadosReferencia.tombo3;
        
        AtribuicaoPage.clicarPrimeiroEditar();
        
        AtribuicaoPage.substituirAtivo(tomboSaudavel, tomboSubstituto, 'DISPONÍVEL');
        AtribuicaoPage.clicarEmSalvar();

        cy.get('.alert-success', { timeout: 10000 }).should('be.visible').and('contain', 'sucesso!');
    });

    it('Cenário 04: Modificar a Área/Subárea de uma atribuição e validar na listagem', () => {
        const novaAreaModificada = 'CEDAT';
        const novaSubareaModificada = 'DIVIDA ATIVA';

        AtribuicaoPage.clicarPrimeiroEditar();
        AtribuicaoPage.alterarAreaESubarea(novaAreaModificada, novaSubareaModificada);
        AtribuicaoPage.clicarEmSalvar();

        cy.get('.alert-success', { timeout: 10000 }).should('be.visible').and('contain', 'sucesso!');

        AtribuicaoPage.validarPrimeiraLinhaTabela(novaAreaModificada, novaSubareaModificada);
    });

    it('Cenário 05: Validar impedimento ao tentar salvar uma edição removendo o conteúdo de campos obrigatórios', () => {
        AtribuicaoPage.clicarPrimeiroEditar();
        AtribuicaoPage.selectArea.select('');
        AtribuicaoPage.clicarEmSalvar();
        AtribuicaoPage.selectArea.invoke('prop', 'validationMessage').should('be.oneOf', ['Selecione um item da lista.', 'Please select an item in the list.']);
    });
});