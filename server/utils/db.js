const postgres = require('postgres');

const sql = postgres(process.env.POSTGRES_URL);

module.exports = sql;
