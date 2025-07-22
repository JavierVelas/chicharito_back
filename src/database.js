// database.js
const { Pool } = require('pg');
require('dotenv').config();



const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Usa la variable automática de Render
  ssl: {
    rejectUnauthorized: false // Requerido para Render
  }
});

pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL conectado correctamente'))
  .catch(err => {
    console.error('❌ Error de conexión a PostgreSQL:', err);
    process.exit(1); // Falla rápido si no hay conexión
  });



module.exports = pool; 

