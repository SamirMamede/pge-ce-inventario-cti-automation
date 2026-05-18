import LoginPage from '../support/pages/LoginPage';
import RelatorioAtribuicoesPage from '../support/pages/RelatorioAtribuicoesPage';

describe('US05 - Relatório de Atribuições por Área/Subárea', () => { 
    beforeEach(() => {
    LoginPage.accessPageAfterLogin('/portal_service/reports/assignments_by_area');
    });

    it('Cenário 01: Validar exibição do Relatório Sintético e seus gráficos gerados', () => {
        const areaAlvo = 'Teste';

        RelatorioAtribuicoesPage.executarFiltro('Sintético', areaAlvo);
        RelatorioAtribuicoesPage.cardHeaderTitulo.should('be.visible').and('contain.text', `Relatório Sintético - ${areaAlvo}`);
        RelatorioAtribuicoesPage.containerTotalAtribicoes.should('be.visible').and('contain.text', 'Total de Atribuições:');
        RelatorioAtribuicoesPage.graficoModalidade.should('be.visible').and('contain.text', 'Atribuições por Modalidade');
        RelatorioAtribuicoesPage.graficoColaboradores.should('be.visible').and('contain.text', 'Atribuições por Colaboradores');
        RelatorioAtribuicoesPage.graficoTermoResponsabilidade.should('be.visible').and('contain.text', 'Atribuições por Termo Responsabilidade');
        RelatorioAtribuicoesPage.graficoTermoEmprestimo.should('be.visible').and('contain.text', 'Atribuições por Termo Empréstimo');
        RelatorioAtribuicoesPage.graficoSistemaOperacional.should('be.visible').and('contain.text', 'Atribuições por Sistema Operacional');
        RelatorioAtribuicoesPage.graficoPacoteOffice.should('be.visible').and('contain.text', 'Atribuições por Pacote Office');
    });

    it('Cenário 02: Validar estrutura do Relatório Analítico e tabela detalhada', () => {
        const areaAlvo = 'Teste';

        RelatorioAtribuicoesPage.executarFiltro('Analítico', areaAlvo);
        RelatorioAtribuicoesPage.cardHeaderTitulo.should('be.visible').and('contain.text', `Relatório Analítico - ${areaAlvo}`);
        RelatorioAtribuicoesPage.tabelaResumo.should('be.visible').and('contain.text', 'Área/Subárea');
        RelatorioAtribuicoesPage.tabelaAreaDetalhada(areaAlvo).should('be.visible');
        RelatorioAtribuicoesPage.colunaColaborador.should('be.visible').and('contain.text', 'Colaborador(a)');
        RelatorioAtribuicoesPage.colunaModalidade.should('be.visible');
        RelatorioAtribuicoesPage.colunaTermoEmprestimo.should('be.visible').and('contain.text', 'Termo Empréstimo');
        RelatorioAtribuicoesPage.colunaStatus.should('be.visible').and('contain.text', 'Status');
    });

    it('Cenário 03: Validar a consistência do Relatório PDF gerado no modo Analítico', () => {
            const caminhoDoPdf = 'cypress/downloads/relatorio_atribuicoes.pdf';
            const areaAlvo = 'Teste';
            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const ano = dataAtual.getFullYear();
            const mesPorExtenso = dataAtual.toLocaleString('pt-BR', { month: 'long' });
            const mesFormatado = mesPorExtenso.charAt(0).toUpperCase() + mesPorExtenso.slice(1);
            const dataAtualFormatada = `Gerado em: ${dia} de ${mesFormatado} de ${ano}`;

            RelatorioAtribuicoesPage.executarFiltro('Analítico', areaAlvo);

            RelatorioAtribuicoesPage.selectArea.invoke('val').then((idArea) => {
                RelatorioAtribuicoesPage.selectSubarea.invoke('val').then((idSubarea) => {
                    
                    const urlPdf = `/portal_service/reports/assignments_by_area_pdf?area=${idArea}&subarea=${idSubarea}&type=analytic`;

                    cy.request({
                        url: urlPdf,
                        encoding: 'binary'
                    }).then((response) => {
                        expect(response.status).to.eq(200);
                        expect(response.headers['content-type']).to.include('application/pdf');

                        cy.writeFile(caminhoDoPdf, response.body, 'binary');

                        cy.task('getPdfText', caminhoDoPdf).then((textoPDF) => {
                            const textoLimpo = textoPDF.replace(/\s+/g, ' ');

                            expect(textoLimpo).to.include('Relatório de Atribuições');
                            expect(textoLimpo).to.include(dataAtualFormatada);                    
                            expect(textoLimpo).to.match(/Tombo/i);
                            expect(textoLimpo).to.match(/Descrição/i);
                            expect(textoLimpo).to.match(/Atribuido/i);
                        });
                    });
                });
            });
        });
});