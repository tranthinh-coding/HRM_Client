module.exports = {
  client: {
    service: {
      name: 'HR Managerment',
      // URL to the GraphQL API
      url: 'http://hrm_server.test/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.ts'],
  },
}
