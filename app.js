const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/router/auth.Routes');
require('dotenv').config();
const noticiasRoutes = require('./src/router/noticias.Routes');

const helmet = require('helmet');
const morgan = require('morgan');





const app = express();

// --- Middlewares de seguridad (insertados sin modificar lo existente) ---
app.use(helmet()); // Protección básica de headers
app.use(morgan('dev')); // Logs de solicitudes (solo en desarrollo)


// 2. Configuración específica para Render (¡aquí va tu línea!)
process.env.BASE_URL = process.env.BASE_URL || `https://${process.env.RENDER_SERVICE_NAME}.onrender.com`;




const corsOptions = {
  origin: [
    'https://chicharitos-web.onrender.com',
    'http://localhost:4200'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Si usas cookies/sesión
};
app.use(cors(corsOptions));

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

// Manejo de rutas no encontradas (DEBE IR AL FINAL)
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Endpoint no encontrado',
    rutas_validas: ['/api/auth/login', '/api/noticias'],
    documentación: 'https://github.com/JavierVelas/chicharito_back'
  });
});

module.exports = app;