const express = require('express');
const cors = require('cors');
const authRoutes = require('./src/router/auth.Routes');

const noticiasRoutes = require('./src/router/noticias.Routes');

const app = express();

app.use(cors({
    origin: [
        'https://chicharitos-web.onrender.com', // Producción
    'http://localhost:4200' //Desarollo
    ],
    
}));
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.use('/api/noticias', noticiasRoutes);

module.exports = app;