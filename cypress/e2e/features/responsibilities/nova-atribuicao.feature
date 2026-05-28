Feature: Cadastro de Atribuições de Ativos

  Background:
    Given que estou autenticado no sistema
    And acesso a tela de cadastro de atribuições

  Scenario: Cadastrar múltiplos ativos para colaborador em home office
    When realizo uma atribuição completa em home office
    Then a atribuição deve ser salva com sucesso

  Scenario: Cadastrar atribuição exclusiva para subárea
    When realizo uma atribuição exclusiva para subárea
    Then a atribuição deve ser salva com sucesso

  Scenario: Validar obrigatoriedade dos campos
    When tento salvar a atribuição sem preencher os campos obrigatórios
    Then devo visualizar validações obrigatórias

  Scenario: Habilitar pacote office dinamicamente
    When marco o checkbox de pacote office
    Then o campo de pacote office deve ser habilitado
    When desmarco o checkbox de pacote office
    Then o campo de pacote office deve ser desabilitado

  Scenario: Impedir vínculo de ativo já utilizado
    When tento vincular um ativo já utilizado
    Then devo visualizar mensagem de ativo já vinculado

  Scenario: Cancelar cadastro da atribuição
    Given inicio um cadastro de atribuição
    When cancelo o cadastro
    Then as informações não devem ser persistidas
