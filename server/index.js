'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: `${__dirname}/.env`});
}

const http = require('http');
const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const elasticsearch = require('elasticsearch');

const { ES_ENDPOINT } = require('./utils/constants');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const getPayload = require('./utils/getPayload');

const PORT = 4000 || process.env.PORT;

const esClient = new elasticsearch.Client({
  host: ES_ENDPOINT,
  log: process.env.NODE_ENV !== 'production' ? 'trace' : undefined
});


const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  engine: true,
  playground: true,
  introspection: true,
  context: async ({ req }) => {
    const user = getPayload(req.headers.authorization);

    return {
      esClient,
      user
    };
  }
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
