Este documento consolida as evidências de execução da suíte de testes automatizados para o sistema de **Inventário CTI da PGE-CE**, detalhando o comportamento dos cenários propostos, bugs impeditivos mapeados durante o desenvolvimento e melhorias arquiteturais.

---

## 📊 Resumo Executivo da Execução

- **Total de Cenários Planejados:** 23
- **Cenários Passados (Sucesso):** 18
- **Cenários Falhados/Bloqueados:** 5
- **Taxa de Cobertura (Success Rate):** 78,26%

* **Ambiente de Testes:** `http://testeqa.pge.ce.gov.br/`

---

## 🔍 Evidências por User Story

### US01 - Cadastro de Atribuições

#### Cenário 01: Deve cadastrar múltiplos ativos para colaborador em Home Office.

- **Resultado:** Passou com sucesso.
- **Análise técnica:** O teste realizou o preenchimento dos dados básicos de triagem, marcou a opção do pacote Office, incluiu dois ativos consecutivamente informando os tombos disponíveis e efetuou o salvamento. A validação foi concluída confirmando a exibição do alerta de sucesso com o texto contendo "Parabéns".
- **Evidência Visual:**
  ![Execução Cenário 01](./assets/us01-cenario01-sucesso.png)

#### Cenário 02: Deve cadastrar atribuição exclusiva para subárea sem colaborador.

- **Resultado:** Falhou.
- **O que foi feito:** O script selecionou os campos de Área e Subárea, marcou a opção correspondente à subárea, preencheu o atendente responsável e inseriu dois ativos pelos tombos indicados. Após o clique no botão de salvar, a aplicação não retornou a mensagem de sucesso aguardada (`.alert-success`), gerando falha por timeout, caracterizando uma falha ou restrição da própria aplicação ao tentar salvar um registro sem vincular um colaborador individual.
- **Evidência Visual:**
  ![Execução Cenário 02](./assets/us01-cenario02-falha.png)

#### Cenário 03: Não deve permitir salvar sem preencher campos obrigatórios.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O teste disparou o clique diretamente no botão de salvar com o formulário em branco. Em seguida, capturou a propriedade `validationMessage` do elemento para garantir o bloqueio nativo de obrigatoriedade do navegador e validou que nenhum alerta de sucesso foi gerado.
- **Evidência Visual:**
  ![Execução Cenário 03](./assets/us01-cenario03-sucesso.png)

#### Cenário 04: Deve habilitar campo Pacote Office apenas quando checkbox estiver marcado.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O script validou os estados inicial desmarcado/desabilitado do checkbox e do select do Pacote Office. Na sequência, efetuou a marcação (`check`) confirmando a liberação do campo, e encerrou desmarcando o item (`uncheck`) para garantir que o componente retornou ao estado desabilitado.
- **Evidência Visual:**
  ![Execução Cenário 04](./assets/us01-cenario04-sucesso.png)

#### Cenário 05: Não deve permitir vincular ativo já utilizado.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O script preencheu os dados básicos de uma nova atribuição utilizando a modalidade Presencial e tentou adicionar um ativo informando um tombo que já se encontrava em uso no sistema (`16827`). Após comandar o salvamento, o teste confirmou o bloqueio da aplicação ao validar a exibição do alerta com o texto "Este Ativo já está vinculado".
- **Evidência Visual:**
  ![Execução Cenário 05](./assets/us01-cenario05-sucesso.png)

#### Cenário 06: Deve descartar informações ao cancelar cadastro.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O teste digitou uma string dinâmica única no campo de observações utilizando o timestamp atual e clicou no botão de cancelar. Em seguida, validou o redirecionamento automático para a listagem principal e confirmou que a string digitada não foi salva ou exposta na tela.
- **Evidência Visual:**
  ![Execução Cenário 06](./assets/us01-cenario06-sucesso.png)

### US02 - Editar Atribuições

#### Cenário 01: Validar se todos os campos carregam os dados corretamente ao clicar em "Editar".

- **Resultado:** Falhou.
- **O que foi feito:** O script acessou a listagem, clicou na ação de editar o primeiro registro e validou a presença dos ativos vinculados, da Área e da Subárea. A execução foi interrompida com uma falha de asserção no campo "Atendido Por", pois a aplicação limpou o campo exibindo "Selecione ..." em vez de persistir e carregar o atendente original ("Atendente").
- **Evidência Visual:**
  ![Execução Cenário 01](./assets/us02-cenario01-falha.png)

#### Cenário 02: Remover um ativo selecionando o status "COM DEFEITO", informar o motivo e adicionar um novo ativo substituto.

- **Resultado:** Bloqueado (Blocked).
- **Motivo técnico do bloqueio:** O script aciona o método `AtribuicaoPage.substituirAtivo()` para passar o tombo atual para o estado "COM DEFEITO", preencher a justificativa e incluir o novo ativo. Contudo, como a tela carrega o campo obrigatório "Atendido Por" em branco (Bug do Cenário 01), a tentativa de disparo do método `AtribuicaoPage.clicarEmSalvar()` é rejeitada pela validação de integridade do formulário da própria aplicação, impedindo a conclusão do fluxo de substituição do ativo avariado.
  ![Execução Cenário 02](./assets/us02-cenario02-falha.png)

#### Cenário 03: Realizar a troca de um ativo funcional selecionando status "DISPONÍVEL" antes da remoção.

- **Resultado:** Bloqueado (Blocked).
- **Motivo técnico do bloqueio:** Semelhante ao cenário anterior, o teste tenta executar a regra de negócio de substituição preventiva de um ativo saudável, devolvendo o antigo para o estoque com o status "DISPONÍVEL". O comando `AtribuicaoPage.clicarEmSalvar()` falha, pois o sistema falha em persistir o atendente original no carregamento do formulário, tornando impossível testar a devolução correta do ativo ao inventário.
  ![Execução Cenário 03](./assets/us02-cenario03-falha.png)

#### Cenário 04: Modificar a Área/Subárea de uma atribuição e validar a atualização na listagem principal.

- **Resultado:** Bloqueado (Blocked).
- **Motivo técnico do bloqueio:** O script executa o método `AtribuicaoPage.alterarAreaESubarea()` para redefinir a estrutura para "CEDAT" e "DIVIDA ATIVA". Embora a alteração dos selects de localidade ocorra no DOM, o salvamento é bloqueado devido à inconsistência do campo de atendente. Como consequência, o fluxo é interrompido antes que possa retornar à listagem principal para executar a asserção final planejada em `AtribuicaoPage.validarPrimeiraLinhaTabela()`.
  ![Execução Cenário 04](./assets/us02-cenario04-falha.png)

#### Cenário 05: Tentar salvar uma edição removendo o conteúdo de um campo obrigatório (\*) e validar se o sistema bloqueia a atualização.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O script abriu a tela de edição, forçou a limpeza do campo "Área" (selecionando uma opção vazia) e disparou o comando `AtribuicaoPage.clicarEmSalvar()`. O teste confirmou a eficácia do bloqueio nativo do navegador ao capturar e validar a propriedade `validationMessage` do elemento e assegurar que nenhum alerta de sucesso foi emitido.
- **Evidência Visual:**
  ![Execução Cenário 05](./assets/us02-cenario05-sucesso.png)

### US03 - Geração de Termos

#### Cenário 01: Validar comportamento de exclusão mútua dos checkboxes no modal.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O script abriu o modal de termos do primeiro registro, marcou a opção "Termo de Responsabilidade" e, em seguida, marcou "Termo de Empréstimo". O teste confirmou a regra de exclusão mútua de interface ao validar que o primeiro checkbox foi desmarcado automaticamente pelo sistema.
- **Evidência Visual:**
  ![Execução Cenário 01](./assets/us03-cenario01-sucesso.png)

#### Cenário 02: Validar fechamento do modal pelo botão de fechar (X).

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O teste acionou a abertura do modal de termos, aplicou uma breve espera para a estabilização da animação em tela e forçou o clique no botão de fechamento (X). A asserção validou com sucesso que o modal deixou de ficar visível na interface.
- **Evidência Visual:**
  ![Execução Cenário 02](./assets/us03-cenario02-sucesso.png)

#### Cenário 03: Gerar Termo de Responsabilidade com sucesso.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O script interceptou a abertura de novas abas no navegador (`win.open`), acessou o modal, selecionou o tipo Responsabilidade e clicou em gerar. O teste validou que o gatilho de impressão foi disparado apontando para a rota correta do endpoint `/term_responsibility_asset`.
- **Evidência Visual:**
  ![Execução Cenário 03](./assets/us03-cenario03-sucesso.png)

#### Cenário 04: Gerar Termo de Empréstimo com sucesso.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** Utilizando a mesma estratégia de stub, o teste selecionou o tipo Empréstimo no modal e disparou a geração. A validação confirmou que o sistema chamou a rota de geração injetando corretamente o parâmetro query string correspondente ao tipo selecionado (`term_type=loan`).
- **Evidência Visual:**
  ![Execução Cenário 04](./assets/us03-cenario04-sucesso.png)

#### Cenário 05: Validar se o PDF gerado contém todos os campos obrigatórios.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O teste executou o fluxo completo de geração, capturou a URL do documento e realizou uma requisição HTTP (`cy.request`) para baixar o arquivo binário. O PDF foi salvo localmente e processado via `cy.task('getPdfText')`. O script validou via expressões regulares a presença dos campos obrigatórios (Nome, Área, CPF, Ativos, Assinatura), a estrutura de localidade, data atualizada dinamicamente e o texto jurídico condicional do termo.
- **Evidência Visual:**
  ![Execução Cenário 05](./assets/us03-cenario05-sucesso.png)

### US04 - Relatório de Movimentação de Ativos

#### Cenário 01: Validar filtros obrigatórios e comportamento sem dados disponíveis.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O script aplicou filtros em um range de datas retroativas sem movimentações reais registradas. O teste confirmou a robustez do tratamento de exceções da interface ao certificar a exibição da mensagem de alerta com o texto "Sem movimentações para: ".
- **Evidência Visual:**
  ![Execução Cenário 01](./assets/us04-cenario01-sucesso.png)

#### Cenário 02: Validar listagem em tela com agrupamento por Área e Data.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O teste aplicou filtros de período do mês corrente e percorreu os cabeçalhos de agrupamento retornados pela listagem. Utilizando expressões regulares, o script validou que o sistema mantém a padronização gramatical de datas (ex: "X de Maio de 2026 - Y movimentações").
- **Evidência Visual:**
  ![Execução Cenário 02](./assets/us04-cenario02-sucesso.png)

#### Cenário 03: Validar a presença de todas as colunas obrigatórias do Ativo na listagem.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O script acionou os filtros de listagem e utilizou o escopo interno (`.within()`) na primeira linha de dados retornada no DOM. O teste validou de forma sequencial que todas as 6 colunas obrigatórias relativas aos dados do Ativo estavam visíveis e com strings devidamente preenchidas.
- **Evidência Visual:**
  ![Execução Cenário 03](./assets/us04-cenario03-sucesso.png)

#### Cenário 04: Validar geração de Relatório PDF espelhando os filtros em tela.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** Após preencher os critérios de busca em tela, o teste disparou uma requisição HTTP (`cy.request`) para o endpoint de exportação injetando as query strings parametrizadas. O documento foi parseado localmente e o script validou se os dados do filtro foram espelhados no título, a presença das colunas estruturais do inventário (Tombo, Série, Descrição, Lotações, Colaborador) e a listagem de registros consolidados.
- **Evidência Visual:**
  ![Execução Cenário 04](./assets/us04-cenario04-sucesso.png)

### US05 - Relatório de Atribuições por Área/Subárea

> 📝 Durante a fase de mapeamento de cenários, foi identificada uma inconsistência crítica no documento de especificação (PDF). Os critérios de aceitação da US05 foram replicados erroneamente a partir da US04 (Movimentações). A suíte de testes da US05 foi inteiramente projetada com base nas regras de negócio e componentes reais presentes na rota da aplicação (`/assignments_by_area`), distinguindo com sucesso os modos de visualização Sintético e Analítico.

#### Cenário 01: Validar exibição do Relatório Sintético e seus gráficos gerados.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O script configurou o filtro selecionando a modalidade "Sintético" para uma área informada. O teste validou a renderização dos elementos visuais da tela, certificando que o sistema gerou os cards informativos de totais e os 6 gráficos estatísticos de distribuição (Modalidade, Colaboradores, Termos de Responsabilidade, Termos de Empréstimo, Sistema Operacional e Pacote Office).
- **Evidência Visual:**
  ![Execução Cenário 01](./assets/us05-cenario01-sucesso.png)

#### Cenário 02: Validar estrutura do Relatório Analítico e tabela detalhada.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O teste aplicou o filtro na opção "Analítico" e validou a mudança estrutural da página. O script confirmou a presença da tabela de resumo de Área/Subárea e inspecionou as colunas do relatório detalhado, garantindo a exibição correta dos campos de Colaborador(a), Modalidade, Termo Empréstimo e Status.
- **Evidência Visual:**
  ![Execução Cenário 02](./assets/us05-cenario02-sucesso.png)

#### Cenário 03: Validar a consistência do Relatório PDF gerado no modo Analítico.

- **Resultado:** Passou com sucesso.
- **O que foi feito:** O teste realizou a filtragem em tela e capturou dinamicamente os IDs dos elementos de Área e Subárea no DOM para estruturar a URL de exportação. Através de um `cy.request()`, o binário do PDF foi baixado, salvo localmente e processado. O script validou no corpo do documento o título ("Relatório de Atribuições"), a data de geração formatada por extenso segundo o relógio do sistema e a presença das palavras-chave estruturais do inventário (Tombo, Descrição e Atribuído).
- **Evidência Visual:**
  ![Execução Cenário 03](./assets/us05-cenario03-sucesso.png)

## 🛠️ Sugestões Técnicas e Propostas de Melhoria para o Sistema

Após a execução da suíte completa de testes automatizados e análise do comportamento do **Inventário CTI**, foram mapeadas oportunidades de melhoria técnica e de experiência do usuário (UX) que elevarão a confiabilidade, integridade e usabilidade da aplicação.

### 1. Correção de Inconsistência de Dados (Persistência no Formulário de Edição)

- **Contexto:** Identificado na **US02 (Cenário 01)** que o campo obrigatório "Atendido Por" é limpo pelo sistema ao carregar a tela de edição, bloqueando os fluxos subsequentes de substituição e movimentação de ativos.
- **Proposta Técnica:** Implementar uma validação no ciclo de vida de carregamento da rota de edição para garantir que o estado inicial popule corretamente todos os elementos.

### 2. Aperfeiçoamento da Validação de Negócio

- **Contexto:** Na **US01 (Cenário 02)**, o sistema permitiu preencher o formulário para uma subárea sem colaborador, mas não disparou o alerta de sucesso e nem concluiu a operação após o clique em salvar.
- **Proposta Técnica:** \* **Se o comportamento for permitido:** Corrigir o fluxo de salvamento no backend para aceitar registros onde a chave estrangeira do colaborador seja nula.
  - **Se o comportamento for proibido:** Adicionar uma validação reativa no front-end. Caso o radio de "Subárea" seja marcado, o sistema deve aplicar dinamicamente o atributo `required` ou exibir uma mensagem clara em tela informando a obrigatoriedade ou impedimento da ação, em vez de quebrar silenciosamente.

### 3. Sincronização e Atualização da Documentação de Requisitos

- **Contexto:** Identificado na **US05** que as especificações de critérios de aceitação fornecidas no documento base estavam duplicadas e desalinhadas com as funcionalidades reais da tela de Relatório de Atribuições por Área.
- **Proposta Técnica:** Estabelecer uma cultura de "Mapeamento Vivo de Requisitos" (Living Documentation). Sugere-se a atualização do backlog e das especificações funcionais para refletirem as visões **Sintética** (gráficos analíticos) e **Analítica** (tabela nominal) existentes no sistema, evitando retrabalho das equipes de desenvolvimento e testes em sprints futuras.

### 4. Feedback Visual e Mensagens de Erro Amigáveis (Friendly Errors)

- **Contexto:** Em cenários de erro ou bloqueio (como na tentativa de salvar campos em branco), a aplicação depende exclusivamente das mensagens nativas do navegador (`validationMessage` do HTML5).
- **Proposta Técnica:** Embora a validação nativa seja eficiente, para uma melhor experiência do usuário (UX), propõe-se a adoção de componentes de validação customizados como _Toasts_ de alerta ou mensagens de erro vermelhas logo abaixo de cada campo específico, padronizando o comportamento visual do sistema independentemente do navegador utilizado pelo usuário.
