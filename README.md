# pge-ce-inventario-cti-automation

## 💻 Sobre o projeto

Este projeto consiste em uma suíte de testes automatizados de ponta a ponta (E2E) para o sistema **Inventário CTI**. O objetivo é garantir a integridade das operações críticas, como o ciclo de vida de ativos de TI, atribuições e geração de relatórios.

## 🛠️ Tecnologias

As seguintes ferramentas foram utilizadas na construção do projeto:

- **Framework:** [Cypress](https://www.cypress.io/)
- **Linguagem:** [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- **Ambiente de Execução:** [Node.js](https://nodejs.org/)

## 🏗️ Arquitetura

O projeto foi estruturado utilizando o padrão Page Object Model (POM), visando maior reutilização, legibilidade e manutenibilidade dos testes automatizados.

## 📂 Estrutura do Projeto

```text
├── cypress/
│   ├── e2e/             # Cenários de teste
│   ├── support/
│   │   ├── pages/       # Classes com os elementos e ações
│   ├── fixtures/        # Massas de dados para os testes
├── docs/                # Plano de Teste
└── cypress.config.js    # Configurações globais do framework
```

## 🛠️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

- [Node.js](https://nodejs.org/en/) (Versão utilizada: `Node.js v22.14.0`)
- [npm](https://www.npmjs.com/) (Versão utilizada: `10.2.5` ou superior)
- Um editor de código

## 🚀 Como executar

Clone o repositório:

```bash
git clone https://github.com/SamirMamede/pge-ce-inventario-cti-automation.git
```

Instale as dependências:

```bash
npm install
```

Configuração de Ambiente:

- O ambiente base da aplicação está configurado no arquivo `cypress.config.js` através da propriedade `baseUrl`.
- Crie um arquivo na raiz do projeto chamado `cypress.env.json` baseando-se no arquivo `cypress.env.json.example` e insira as credenciais de acesso ao sistema.
- O projeto utiliza a biblioteca `pdf-parse` para validação de conteúdo em arquivos PDF gerados pelo sistema.
  > ⚠️ O projeto depende de credenciais válidas do sistema Inventário CTI para execução dos testes autenticados.

## 🛠️ Configuração de Dados Dinâmicos

Para rodar os testes da `US01: Cadastro de Atribuições` e da `US02: Edição de Atribuições`, é necessário configurar o arquivo `cypress.env.json` na raiz do projeto. Isso evita que os testes falhem por tentarem utilizar ativos que já foram vinculados por execuções anteriores.

```json
{
  "tombo_disponivel_1": "10516",
  "tombo_disponivel_2": "14707",
  "tombo_disponivel_3": "6807"
}
```

Consulte o arquivo `cypress.env.json.example` para o template completo.

## 📜 Scripts disponíveis

- `npm run cy:open` → Executa o Cypress em modo interativo
- `npm run cy:run` → Executa os testes em modo headless

## ✅ Cobertura Automatizada

- Cadastro de atribuições
- Edição de atribuições
- Geração de relatórios
- Validação de PDFs

---

## 🧪 Plano de Testes

Para consultar o plano de teste completo, acesse o link:

👉 **[Acesse aqui o Plano de Testes](./docs/plano-de-testes.md)**

---

## 📝 Evidências e Melhorias

Para consultar os resultados visuais dos testes, bugs mapeados e sugestões técnicas para o sistema, acesse o relatório completo:

👉 **[Acesse aqui o Relatório Completo de Evidências, Bugs Encontrados e Propostas de Melhoria](./docs/evidencias-testes.md)**
