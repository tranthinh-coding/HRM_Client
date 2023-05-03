module.exports = {
  client: {
    service: {
      name: 'HR Managerment',
      // URL to the GraphQL API
      url: 'http://10.128.0.3:80/graphql',
    },
    // Files processed by the extension
    includes: ['src/**/*.vue', 'src/**/*.ts'],
  },
}
