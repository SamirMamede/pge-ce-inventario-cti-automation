# Plano de Testes - Sistema Inventário CTI

## 1. Introdução
Este documento detalha a estratégia de teste para a validação das funcionalidades core do sistema Inventário CTI. O foco está em garantir que o ciclo de vida dos ativos e as atribuições de equipamentos funcionem conforme as regras de negócio estabelecidas.

## 2. Escopo dos Testes
Serão automatizadas as seguintes Histórias de Usuário:
* **US01:** Cadastro de Atribuições.
* **US02:** Editar Atribuições.
* **US03:** Geração de Termos.
* **US04:** Relatório de Movimentação de Ativos.
* **US05:** Relatório de Atribuições por Área.

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

## 7. Detalhamento dos Cenários de Teste

### US01: Cadastro de Atribuições
* **Cenário 01:** Deve cadastrar múltiplos ativos para colaborador em Home Office.
* **Cenário 02:** Deve cadastrar atribuição exclusiva para subárea sem colaborador.
* **Cenário 03:** Não deve permitir salvar sem preencher campos obrigatórios.
* **Cenário 04:** Deve habilitar campo Pacote Office apenas quando checkbox estiver marcado.
* **Cenário 05:** Não deve permitir vincular ativo já utilizado.
* **Cenário 06:** Deve descartar informações ao cancelar cadastro.

### US02: Editar Atribuições
* **Cenário 01:** Validar se todos os campos carregam os dados corretamente ao clicar em "Editar".
* **Cenário 02:** Remover um ativo selecionando o status "COM DEFEITO", informar o motivo e adicionar um novo ativo substituto.
* **Cenário 03:** Realizar a troca de um ativo funcional selecionando status "DISPONÍVEL" antes da remoção.
* **Cenário 04:** Modificar a Área/Subárea de uma atribuição e validar a atualização na listagem principal.
* **Cenário 05:** Tentar salvar uma edição removendo o conteúdo de um campo obrigatório (*) e validar se o sistema bloqueia a atualização.

### US03: Geração de Termos
* **Cenário 01:** Validar comportamento de exclusão mútua dos checkboxes no modal.
* **Cenário 02:** Validar fechamento do modal pelo botão de fechar (X).
* **Cenário 03:** Gerar Termo de Responsabilidade com sucesso.
* **Cenário 04:** Gerar Termo de Empréstimo com sucesso.
* **Cenário 05:** Validar se o PDF gerado contém todos os campos obrigatórios.

### US04: Relatório de Movimentação de Ativos
* **Cenário 01:** Validar filtros obrigatórios e comportamento sem dados disponíveis.
* **Cenário 02:** Validar listagem em tela com agrupamento por Área e Data.
* **Cenário 03:** Validar a presença de todas as colunas obrigatórias do Ativo na listagem.
* **Cenário 04:** Validar geração de Relatório PDF espelhando os filtros em tela.

### US05: Relatório de Atribuições por Área
* **Cenário 01:** Validar exibição do Relatório Sintético e seus gráficos gerados.
* **Cenário 02:** Validar estrutura do Relatório Analítico e tabela detalhada.
* **Cenário 03:** Validar a consistência do Relatório PDF gerado no modo Analítico.