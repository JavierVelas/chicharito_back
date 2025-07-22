const { Pool } = require('pg');
console.log('HOST:', process.env.DB_HOST);

require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST, // Debe incluir .render.com
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // Obligatorio para Render
  },
  connectionTimeoutMillis: 10000, // Aumenta timeout
  idleTimeoutMillis: 30000,
  max: 20 // Conexiones máximas
});

// Manejo avanzado de errores
pool.on('connect', (client) => {
  console.log('🟢 Nueva conexión establecida');
});

pool.on('error', (err, client) => {
  console.error('🔴 Error en el pool:', err);
  // No termines el proceso aquí, el pool se recuperará automáticamente
});

// Función de verificación mejorada
async function verifyConnection() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log('✅ Verificación exitosa. Hora DB:', res.rows[0].now);
  } finally {
    client.release();
  }
}

// Verificar al inicio y cada hora
verifyConnection().catch(err => console.error('❌ Verificación fallida:', err));
setInterval(verifyConnection, 3600000).unref();

module.exports = pool;