'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({path: `${__dirname}/../.env`});
}

const jwt = require('jwt-simple');

function getPayload(token) {
  try {
    return jwt.decode(token, process.env.JWT_SECRET);
  }
  catch (error) {
    return null;
  }
}

module.exports = getPayload;