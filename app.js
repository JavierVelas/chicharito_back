const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/router/auth.Routes');
require('dotenv').config();
const noticiasRoutes = require('./src/router/noticias.Routes');
const pool = require ('./src/database')

const app = express();

const helmet = require('helmet');
const morgan = require('morgan');


app.use(express.json()); // ← ¡Este es el problema principal!
app.use(express.urlencoded({ extended: true }));

// --- Middlewares de seguridad (insertados sin modificar lo existente) ---
app.use(helmet()); // Protección básica de headers
app.use(morgan('dev')); // Logs de solicitudes (solo en desarrollo)



process.env.BASE_URL = process.env.BASE_URL || `https://${process.env.RENDER_SERVICE_NAME}.onrender.com`;




app.use(express.json()); // Parsea JSON (¡Solución al error req.body undefined!)
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://chicharitos-web.onrender.com'] 
    : ['http://localhost:4200'],
  credentials: true
}));

pool.query('SELECT NOW()')
  .then(res => console.log('✅ PostgreSQL conectado:', res.rows[0]))
  .catch(err => {
    console.error('❌ Error con PostgreSQL:', err);
    process.exit(1);
  });

  
// Ruta de prueba OBLIGATORIA
app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    environment: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL 
  });
});

process.removeAllListeners('warning');


app.use('/api/auth', authRoutes);
app.use('/api/noticias', noticiasRoutes);

app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ 
    error: 'Error interno del servidor',
    detalle: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Antes de las rutas 404, agrega:
app.get('/', (req, res) => {
  res.json({
    message: "Bienvenido a la API de Chicharitos",
    endpoints: {
      auth: "/api/auth",
      noticias: "/api/noticias",
      healthcheck: "api/healthcheck"
    }
  });
});


module.exports = app;