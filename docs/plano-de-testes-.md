# Plano de Testes - Sistema Inventário CTI

## 1. Introdução
Este documento detalha a estratégia de teste para a validação das funcionalidades core do sistema Inventário CTI. O foco está em garantir que o ciclo de vida dos ativos e as atribuições de equipamentos funcionem conforme as regras de negócio estabelecidas.

## 2. Escopo dos Testes
Serão automatizadas as seguintes Histórias de Usuário:
* **US01:** Cadastro de Ativo.
* **US02:** Edição de Ativo.
* **US03:** Atribuição de Ativo a Colaborador.
* **US04:** Devolução de Ativo.
* **US05:** Relatório de Movimentação.

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
* **Cenário 01:** Cadastro vinculando múltiplos ativos a um colaborador com modalidade "Home Office" e Pacote Office habilitado, validando a mensagem de confirmação de sucesso após salvar.
* **Cenário 02:** Cadastro de atribuição exclusiva para uma Subárea sem colaborador definido.
* **Cenário 03:** Tentar salvar sem preencher campos obrigatórios (*) e validar se o sistema impede a operação exibindo mensagens de erro específicas.
* **Cenário 04:** Validar que o campo de seleção "Pacote Office" permanece condicionado apenas à marcação da checkbox "Utilizará Pacote Office?".
* **Cenário 05:** Valida regra de negócio de duplicidade no inventário.
* **Cenário 06:** Validar que o botão "Cancelar" descarta as informações preenchidas sem persistir dados no inventário.

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
* **Cenário 01:** Realizar pesquisa por Área e Período, validando a atualização da listagem.
* **Cenário 02:** Validar se os resultados são agrupados por área e exibem a quantidade correta de movimentações.
* **Cenário 03:** Gerar relatório PDF e validar se o documento abre em nova aba respeitando a estrutura da tela.
* **Cenário 04:** Validar a exibição da mensagem informativa "não há dados disponíveis" ao filtrar um período ou área sem movimentações.

### US05: Relatório de Atribuições por Área
* **Cenário 01:** Validar a atualização da listagem de atribuições ao alternar entre diferentes Áreas.
* **Cenário 02:** Validar se Tombo, Série e Descrição estão presentes na listagem e no relatório gerado.
* **Cenário 03:** Validar mensagem informativa "não há dados disponíveis" para filtros sem ocorrências.
* **Cenário 04:** Tentar pesquisar utilizando um período inválido e validar o tratamento de erro do sistema.