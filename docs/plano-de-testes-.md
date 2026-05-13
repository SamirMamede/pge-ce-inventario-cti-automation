# Plano de Testes - Sistema Inventário CTI

## 1. Introdução
Este documento detalha a estratégia de teste para a validação das funcionalidades core do sistema Inventário CTI. O foco está em garantir que o ciclo de vida dos ativos e as atribuições de equipamentos funcionem conforme as regras de negócio estabelecidas.

## 2. Escopo dos Testes
Serão automatizadas as seguintes Histórias de Usuário (US):
* **US01:** Cadastro de Ativo (Fluxo positivo e campos obrigatórios).
* **US02:** Edição de Ativo (Alteração de status e metadados).
* **US03:** Atribuição de Ativo a Colaborador (Vínculo e regras de disponibilidade).
* **US04:** Devolução de Ativo (Desvinculação e atualização de status).
* **US05:** Relatório de Movimentação (Filtros e geração de PDF).

## 3. Ferramentas e Tecnologias
* **Framework de Automação:** Cypress
* **Linguagem:** JavaScript (Node.js)
* **Padrão de Projeto:** Page Object Model (POM)
* **Evidências:** Screenshots e Vídeos
* **Versionamento:** GitHub

## 4. Estratégia de Teste
* **Nível de Teste:** Testes de Ponta a Ponta (E2E).
* **Tipos de Teste:** 
    * Funcional.
    * Negativo.
* **Massa de Dados:** Utilização de `fixtures` para manter os dados de teste independentes do código.

## 5. Critérios de Entrada e Saída
### 5.1 Critérios de Entrada
* Ambiente de teste (URL) disponível e estável.
* Credenciais de acesso ativas.
* Plano de teste revisado.

### 5.2 Critérios de Saída
* 100% dos cenários críticos executados com sucesso.
* Relatório de execução gerado com evidências.
* Bugs identificados documentados.

## 6. Ambiente de Teste
* **URL:** [http://testeqa.pge.ce.gov.br/](http://testeqa.pge.ce.gov.br/)
* **Navegador:** Google Chrome.

## 7. Cenários de Teste

### US01: Cadastro de Atribuições
* **Cenário 01:** Cadastro completo vinculando um ativo a um colaborador com modalidade "Home Office" e Pacote Office habilitado.
* **Cenário 02:** Cadastro de atribuição exclusiva para uma Subárea sem colaborador definido.
* **Cenário 03:** Tentar salvar sem preencher campos obrigatórios (*) e validar mensagens de erro.
* **Cenário 04:** Validar que o campo "Pacote Office" só fica disponível se a checkbox "Utilizará Pacote Office?" estiver marcada.
* **Cenário 05:** Validar que o botão "Cancelar" descarta as informações preenchidas sem salvar.

### US02: Editar Atribuições
* **Cenário 01:** Validar se todos os campos da atribuição carregam os dados corretamente ao clicar em "Editar".
* **Cenário 02:** Remover um ativo selecionando "COM DEFEITO", informar o motivo e adicionar um novo ativo substituto.
* **Cenário 03:** Modificar a área/modalidade de uma atribuição existente e validar a persistência da atualização.
* **Cenário 04:** Validar a remoção de um ativo específico da lista de atribuições através do botão "Remover".

### US03: Geração de Termos
* **Cenário 01:** Validar que a seleção entre os tipos "Responsabilidade" e "Empréstimo" é mutuamente exclusiva.
* **Cenário 02:** Gerar Termo de Responsabilidade e validar a abertura do documento em PDF.
* **Cenário 03:** Validar se o PDF contém o nome do colaborador, área e a lista de ativos vinculados.
* **Cenário 04:** Validar o fechamento do modal de termos através do ícone "X".

### US04 e US05: Relatórios de Movimentação e Atribuição
* **Cenário 01:** Realizar pesquisa por Área e Período, validando a atualização da listagem em tela.
* **Cenário 02:** Validar se os resultados em tela são agrupados por área, exibindo data e quantidade de movimentações.
* **Cenário 03:** Validar mensagem informativa quando não existem dados para o filtro selecionado.
* **Cenário 04:** Clicar em "Gerar Relatório" e validar se o PDF mantém a mesma estrutura visual da tela.