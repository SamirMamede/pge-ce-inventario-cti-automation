Feature: Asset Assignment Editing

  Background:
    Given que estou autenticado no sistema
    And acesso a tela de atribuições

  Scenario: Deve carregar corretamente os dados ao editar atribuição
    When edito a primeira atribuição cadastrada
    Then devo visualizar os dados carregados corretamente
    And devo visualizar os ativos vinculados

  Scenario: Deve substituir ativo com defeito por novo ativo funcional
    When edito a primeira atribuição cadastrada
    And substituo um ativo com defeito
    And salvo a edição da atribuição
    Then devo visualizar mensagem de sucesso

  Scenario: Deve substituir ativo saudável por outro ativo disponível
    When edito a primeira atribuição cadastrada
    And substituo um ativo disponível
    And salvo a edição da atribuição
    Then devo visualizar mensagem de sucesso

  Scenario: Deve alterar Área/Subárea e refletir mudança na listagem
    When edito a primeira atribuição cadastrada
    And altero área e subárea da atribuição
    And salvo a edição da atribuição
    Then devo visualizar mensagem de sucesso
    And devo visualizar a nova área e subárea na listagem

  Scenario: Não deve permitir salvar edição sem campos obrigatórios
    When edito a primeira atribuição cadastrada
    And removo os campos obrigatórios
    And tento salvar a edição
    Then devo visualizar validação dos campos obrigatórios
