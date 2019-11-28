module.exports = {
  client: {
    service: {
      name: 'fauna',
      url: 'https://graphql.fauna.com/graphql',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_FAUNADB_API_KEY}`,
        'X-Schema-Preview': 'partial-update-mutation'
      },
      skipSSLValidation: true
    }
  }
}
