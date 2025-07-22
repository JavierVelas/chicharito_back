const app = require('./app');


// En tu app.js o server.js
const PORT = process.env.PORT || 5432; // Render asigna su propio puerto

app.listen(PORT, '0.0.0.0', () => { // '0.0.0.0' es crucial para Render
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

console.log(`✅ Server running in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);
console.log(`🌐 Base URL: ${BASE_URL}`);