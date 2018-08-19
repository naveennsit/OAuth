const config = require('./util').mysql;
const knex = require('knex')(config);


module.exports = knex