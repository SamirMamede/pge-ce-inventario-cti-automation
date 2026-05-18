import LoginPage from '../support/pages/LoginPage';
import MovimentacaoPage from '../support/pages/MovimentacaoPage';

describe('US04 - Relatório de Movimentação de Ativos', () => {
    beforeEach(() => {
        LoginPage.visit();
        LoginPage.login(Cypress.env('user_login'), Cypress.env('user_password'));

        cy.visit(`${Cypress.env('baseUrl')}/portal_service/reports/index`);
    });

    it('Cenário 01: Validar comportamento sem dados disponíveis', () => {
        MovimentacaoPage.filtrarMovimentacao('Teste', '2000-01-01', '2000-01-02');
        MovimentacaoPage.msgSemMovimentacao
            .should('be.visible')
            .and('contain.text', 'Sem movimentações para: Teste');
    });

    it('Cenário 02: Validar listagem in tela com agrupamento por Área e Data', () => {
        MovimentacaoPage.filtrarMovimentacao('Teste', '2026-05-01', '2026-05-31');
        MovimentacaoPage.cabecalhosAgrupamento.should('have.length.at.least', 1);
        MovimentacaoPage.cabecalhosAgrupamento.each(($el) => {
            const texto = $el.text().trim();
            if (texto.includes('movimentaç')) {
                expect(texto).to.match(/\d+\s+de\s+[a-zA-ZçÇãÃ]+\s+de\s+\d{4}\s+-\s+\d+\s+movimentaç/i);
            }
        });
    });

    it('Cenário 03: Validar se a listagem apresenta todas as informações obrigatórias do ativo', () => {
        MovimentacaoPage.filtrarMovimentacao('Teste', '2026-05-01', '2026-05-17');
        MovimentacaoPage.linhasDeRegistros.first().within(() => {
            cy.get('td').eq(0).should('be.visible').and('not.be.empty');
            cy.get('td').eq(1).should('be.visible').and('not.be.empty');
            cy.get('td').eq(2).should('be.visible').and('not.be.empty');
            cy.get('td').eq(3).should('be.visible').and('not.be.empty');
            cy.get('td').eq(4).should('be.visible').and('not.be.empty');
            cy.get('td').eq(5).should('be.visible').and('not.be.empty');
        });
    });

    it('Cenário 04: Validar geração de Relatório PDF espelhando os filtros em tela', () => {
        const caminhoDoPdf = 'cypress/downloads/relatorio_movimentacao.pdf';
        const areaSelecionada = 'Teste';
        const dataInicio = '2026-05-01';
        const dataFim = '2026-05-17';
        const urlDoPdf = `/portal_service/reports/pdf_create?area_name=${areaSelecionada}&final_date=${dataFim}&initial_date=${dataInicio}`;

        MovimentacaoPage.filtrarMovimentacao(areaSelecionada, dataInicio, dataFim);

        cy.request({
            url: urlDoPdf,
            encoding: 'binary'
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.headers['content-type']).to.include('application/pdf');

            cy.writeFile(caminhoDoPdf, response.body, 'binary');
            cy.task('getPdfText', caminhoDoPdf).then((textoPDF) => {
                const textoLimpo = textoPDF.replace(/\s+/g, ' ');

                expect(textoLimpo).to.include(`Movimentações de Ativos para ${areaSelecionada} no período: 01/05/2026 à 17/05/2026`);
                expect(textoLimpo).to.match(/Tombo/i);
                expect(textoLimpo).to.match(/Nº_de_Série|Nº de Série/i);
                expect(textoLimpo).to.match(/Descrição/i);
                expect(textoLimpo).to.match(/Lotação_Atual|Lotação Atual/i);
                expect(textoLimpo).to.match(/Lotação_Anterior|Lotação Anterior/i);
                expect(textoLimpo).to.match(/Colaborador/i);
                expect(textoLimpo).to.match(/15\s+de\s+Maio\s+de\s+2026\s*-\s*12\s+movimentaç/i);
            });
        });
    });
});