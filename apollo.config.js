module.exports = {
  client: {
    service: {
      name: 'hr-managerment',
      // URL to the GraphQL API
      url: 'http://server.test/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.js'],
  },
}
