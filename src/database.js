const mysql = require('mysql2/promise'); // Usamos la versión promise-based
require('dotenv').config();

// Configuración mejorada para producción/desarrollo
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'leonora19',
  database: process.env.DB_NAME || 'chicharitos',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verificación de conexión mejorada
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Conexión a MySQL exitosa');
    connection.release();
  } catch (err) {
    console.error('❌ Error de conexión a MySQL:', err.message);
    // Reintentar conexión después de 5 segundos
    setTimeout(testConnection, 5000);
  }
}

testConnection();

// Exportamos el pool directamente
module.exports = pool;