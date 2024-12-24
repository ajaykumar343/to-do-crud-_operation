const { Pool } = require('pg');

// PostgreSQL connection setup
const pool = new Pool({
    user: 'postgres',     // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'todolist',
    password: 'postgres',  // Replace with your PostgreSQL password
    port: 5432,
  });

  module.exports= {pool}