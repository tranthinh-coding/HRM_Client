module.exports = {
  client: {
    service: {
      name: import.meta.env.VITE_APP_NAME,
      // URL to the GraphQL API
      url: 'http://server.test/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
}
