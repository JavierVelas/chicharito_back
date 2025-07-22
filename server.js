const app = require('./app');


const isProduction = process.env.NODE_ENV === 'production';

// Configuración base URL dinámica
const BASE_URL = isProduction 
  ? 'https://chicharito-back.onrender.com' 
  : 'http://localhost:3000';

console.log(`✅ Server running in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode`);
console.log(`🌐 Base URL: ${BASE_URL}`);