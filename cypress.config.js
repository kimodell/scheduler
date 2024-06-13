const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:8080",
    viewportHeight: 1280,
    viewportWidth: 720,
  },
});
