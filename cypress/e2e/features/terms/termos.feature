Feature: Geração de Termos de Atribuição

  Background:
    Given que estou autenticado no sistema
    And acesso a tela de atribuições

  Scenario: Validar exclusão mútua entre os tipos de termo
    When abro o modal de geração de termos
    And seleciono o termo de responsabilidade
    And seleciono o termo de empréstimo
    Then o termo de responsabilidade deve ser desmarcado

  Scenario: Validar fechamento do modal de termos
    When abro o modal de geração de termos
    And fecho o modal de termos
    Then o modal não deve estar visível

  Scenario: Gerar termo de responsabilidade com sucesso
    Given preparo o monitoramento de abertura do PDF
    When abro o modal de geração de termos
    And seleciono o termo de responsabilidade
    And gero o termo
    Then o PDF de responsabilidade deve ser aberto

  Scenario: Gerar termo de empréstimo com sucesso
    Given preparo o monitoramento de abertura do PDF
    When abro o modal de geração de termos
    And seleciono o termo de empréstimo
    And gero o termo
    Then o PDF de empréstimo deve ser aberto

  Scenario: Validar conteúdo obrigatório do PDF gerado
    Given preparo a captura da URL do PDF
    When abro o modal de geração de termos
    And seleciono o termo de responsabilidade
    And gero o termo
    Then o PDF deve conter os campos obrigatórios
