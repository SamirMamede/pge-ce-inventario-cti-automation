Feature: Relatório de Atribuições por Área/Subárea

  Background:
    Given que estou autenticado no sistema
    And acesso a tela de relatório de atribuições

  Scenario: Validar exibição do relatório sintético
    When seleciono o relatório "Sintético"
    And filtro pela área "Teste"
    And realizo a pesquisa de atribuições
    Then devo visualizar o relatório sintético da área "Teste"
    And devo visualizar os gráficos do relatório sintético

  Scenario: Validar estrutura do relatório analítico
    When seleciono o relatório "Analítico"
    And filtro pela área "Teste"
    And realizo a pesquisa de atribuições
    Then devo visualizar o relatório analítico da área "Teste"
    And devo visualizar a tabela detalhada de atribuições

  Scenario: Validar geração do relatório PDF analítico
    When seleciono o relatório "Analítico"
    And filtro pela área "Teste"
    And realizo a pesquisa de atribuições
    Then devo conseguir gerar o relatório PDF analítico
