Feature: Relatório de Movimentação de Ativos

  Background:
    Given que estou autenticado no sistema
    And acesso a tela de relatório de movimentações

  Scenario: Validar comportamento sem dados disponíveis
    When filtro movimentações da área "Teste"
    And informo período de "2000-01-01" até "2000-01-02"
    And realizo a pesquisa
    Then devo visualizar a mensagem "Sem movimentações para: Teste"

  Scenario: Validar agrupamento por área e data
    When filtro movimentações da área "Teste"
    And informo período de "2026-05-01" até "2026-05-31"
    And realizo a pesquisa
    Then devo visualizar agrupamentos de movimentações

  Scenario: Validar informações obrigatórias dos ativos
    When filtro movimentações da área "Teste"
    And informo período de "2026-05-01" até "2026-05-17"
    And realizo a pesquisa
    Then devo visualizar os dados obrigatórios do ativo

  Scenario: Validar geração do relatório PDF
    When filtro movimentações da área "Teste"
    And informo período de "2026-05-01" até "2026-05-17"
    And realizo a pesquisa
    Then devo conseguir gerar o relatório PDF
