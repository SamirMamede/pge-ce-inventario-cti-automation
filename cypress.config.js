const { defineConfig } = require("cypress");

const fs = require("fs");
const pdfParse = require("pdf-parse");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    }),
  );

  on("task", {
    getPdfText(filePath) {
      if (!fs.existsSync(filePath)) {
        throw new Error(`Arquivo não encontrado em: ${filePath}`);
      }

      const dataBuffer = fs.readFileSync(filePath);

      return pdfParse(dataBuffer).then((data) => {
        return data.text;
      });
    },
  });

  return config;
}

module.exports = defineConfig({
  allowCypressEnv: true,

  viewportWidth: 1920,

  viewportHeight: 1080,

  defaultCommandTimeout: 10000,

  e2e: {
    baseUrl: "http://testeqa.pge.ce.gov.br",

    specPattern: ["cypress/e2e/**/*.cy.js", "cypress/e2e/**/*.feature"],

    setupNodeEvents,
  },
});
