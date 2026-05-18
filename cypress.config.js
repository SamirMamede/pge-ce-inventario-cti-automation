const { defineConfig } = require("cypress");
const fs = require("fs");
const pdfParse = require("pdf-parse");

module.exports = defineConfig({
  allowCypressEnv: true,
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 10000,

  e2e: {
    baseUrl: "http://testeqa.pge.ce.gov.br",

    setupNodeEvents(on, config) {
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
    },
  },
});
