const { Pool } = require('pg'); // Usa el cliente PostgreSQL

// Configuración para Render PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://root:fQmBkWWhfs3pyOBxIml15Va8eFUfwvER@dpg-d1s9i6ripnbc73drf52g-a.oregon-postgres.render.com/chicharitos',
  ssl: {
    rejectUnauthorized: false // Obligatorio en Render
  }
});

// Verificación de conexión
pool.query('SELECT NOW()')
  .then(() => console.log('✅ PostgreSQL conectado exitosamente'))
  .catch(err => {
    console.error('❌ Error de conexión a PostgreSQL:', err);
    process.exit(1); // Detiene la aplicación si no hay conexión
  });

module.exports = pool;