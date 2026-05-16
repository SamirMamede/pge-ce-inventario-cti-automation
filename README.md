# pge-ce-inventario-cti-automation

## 💻 Sobre o projeto

Este projeto consiste em uma suíte de testes automatizados de ponta a ponta (E2E) para o sistema **Inventário CTI**. O objetivo é garantir a integridade das operações críticas, como o ciclo de vida de ativos de TI, atribuições e geração de relatórios.

## 🛠️ Tecnologias

As seguintes ferramentas foram utilizadas na construção do projeto:

* **Framework:** [Cypress](https://www.cypress.io/)
* **Linguagem:** [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
* **Ambiente de Execução:** [Node.js](https://nodejs.org/)

## 🏗️ Arquitetura

O projeto utiliza o padrão **Page Object Model**. 

## 📂 Estrutura do Projeto

```text
├── cypress/
│   ├── e2e/             # Cenários de teste
│   ├── support/
│   │   ├── pages/       # Classes com os elementos e ações
│   │   └── commands.js  # Comandos customizados
│   ├── fixtures/        # Massas de dados para os testes
├── docs/                # Plano de Teste e documentação adicional
└── cypress.config.js    # Configurações globais do framework
```

## 🛠️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

* [Node.js](https://nodejs.org/en/) (Versão utilizada: `v22.14.0` ou superior)
* [npm](https://www.npmjs.com/) (Versão utilizada: `10.2.5` ou superior)
* Um editor de código

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
 - Crie um arquivo na raiz do projeto chamado `cypress.env.json` baseando-se no arquivo `cypress.env.json.example` e insira suas credenciais.

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

Execução:
 - Modo Interativo (Interface): `npx cypress open`
 - Modo Headless (Console): `npx cypress run`