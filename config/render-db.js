const mysql2 = require('mysql2');

const pool = mysql2.createConnection({
  host: 'dpg-d1s9i6ripnbc73drf52g-a', // Host de Render
  user: 'root',
  password: 'fQmBkWWhfs3pyOBxIml15Va8eFUfwvER',
  database: 'chicharitos',
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;