const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/UI/*.spec.ts',
    baseUrl: 'https://www.oysho.com/',
    blockHosts: ['geolocation.onetrust.com', 'cdn.cookielaw.org'],
  },
})
