class RelatorioAtribuicoesPage {
    get radioSintetico() { return cy.get('#type_syntetic'); }
    get radioAnalitico() { return cy.get('#type_analytic'); }
    get selectArea() { return cy.get('[name="area_name"]'); }
    get selectSubarea() { return cy.get('[name="subarea_name"]'); }
    get btnPesquisar() { return cy.get('[name="commit"]'); }
    get btnGerarRelatorio() { return cy.get('a > .btn').parent(); } 
    get cardHeaderTitulo() { return cy.get(':nth-child(3) > .card-header'); }
    get containerTotalAtribicoes() { return cy.get('.mb-3'); }
    get todosOsGraficos() { return cy.get('.row > .col-md-6, .row > [class*="col-"]'); }
    get graficoModalidade() { return cy.get('.row > :nth-child(1)'); }
    get graficoColaboradores() { return cy.get('.row > :nth-child(2)'); }
    get graficoTermoResponsabilidade() { return cy.get('.row > :nth-child(3)'); }
    get graficoTermoEmprestimo() { return cy.get('.row > :nth-child(4)'); }
    get graficoSistemaOperacional() { return cy.get('.row > :nth-child(5)'); }
    get graficoPacoteOffice() { return cy.get('.row > :nth-child(6)'); }
    get tabelaResumo() { return cy.get('.row > :nth-child(2)'); }
    get colunaColaborador() { return cy.get(':nth-child(4) > thead > tr > :nth-child(1)'); }
    get colunaModalidade() { return cy.get(':nth-child(4) > thead > tr > :nth-child(2)'); }
    get colunaTermoEmprestimo() { return cy.get(':nth-child(4) > thead > tr > :nth-child(3)'); }
    get colunaStatus() { return cy.get(':nth-child(4) > thead > tr > :nth-child(4)'); }
    
    tabelaAreaDetalhada(nomeArea) {
        return cy.get(`#${nomeArea}`);
    }

    acessarTela() {
        cy.visit(this.url);
    }

    executarFiltro(tipo, area, subarea) {
        if (tipo === 'Sintético') {
            this.radioSintetico.check();
        } else {
            this.radioAnalitico.check();
        }
        
        if (area) this.selectArea.select(area);
        if (subarea) this.selectSubarea.select(subarea);
        
        this.btnPesquisar.click();
    }
}

export default new RelatorioAtribuicoesPage();  