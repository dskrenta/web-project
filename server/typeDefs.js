const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hi: String!
  }

  type Mutation {
    hey(hi: String): String!
  }
`;

module.exports = typeDefs;