const knex = require('../utitlity/db');
const {USER_TABLE_NAME} = require('../utitlity/util');


(async function () {
    const exit = await knex.schema.withSchema('sql12252060').hasTable(USER_TABLE_NAME);
    console.log('KNEX', exit);
    if (!exit) {
        const output = await knex.schema.withSchema('sql12252060').createTable(USER_TABLE_NAME, (table) => {
            table.increments('id').primary();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
        })
        console.log(output)
    }

})();



