const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/router/auth.Routes');
require('dotenv').config();
const noticiasRoutes = require('./src/router/noticias.Routes');

// --- Nuevos módulos (agregados al inicio sin alterar flujo) ---
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// --- Middlewares de seguridad (insertados sin modificar lo existente) ---
app.use(helmet()); // Protección básica de headers
app.use(morgan('dev')); // Logs de solicitudes (solo en desarrollo)

// --- Configuración CORS original (se mantiene igual) ---
app.use(cors({
    origin: [
        'https://chicharitos-web.onrender.com',
        'http://localhost:4200'
    ],
}));
app.use(express.json());

// Ruta de prueba OBLIGATORIA
app.get('/api/healthcheck', (req, res) => {
  res.status(200).json({ 
    status: 'OK',
    environment: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL 
  });
});

process.removeAllListeners('warning');

// --- TUS RUTAS ORIGINALES (preservadas al 100%) ---
app.use('/api/auth', authRoutes);
app.use('/api/noticias', noticiasRoutes);

module.exports = app;