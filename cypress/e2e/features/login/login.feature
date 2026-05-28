Feature: Autenticação

  Scenario: Login com sucesso
    Given que acesso a página de login
    When preencho credenciais válidas
    And clico no botão de login
    Then devo visualizar o dashboard
