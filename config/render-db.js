const mysql2 = require('mysql2');

const pool = mysql2.createConnection({
  host: 'dpg-xxx.oregon-postgres.render.com', // Host de Render
  user: 'root',
  password: 'fQmBkWWhfs3pyOBxIml15Va8eFUfwvER',
  database: 'chicharitos',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;