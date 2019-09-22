'use strict';

const hiResolver = require('./hiResolver');
const heyResolver = require('./heyResolver');
const generateResolver = require('../utils/generateResolver');

const resolvers = {
  Query: {
    hi: generateResolver(hiResolver)
  },
  Mutation: {
    hey: generateResolver(heyResolver)
  }
};

module.exports = resolvers;