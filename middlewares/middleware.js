// const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');

// // Protección contra headers HTTP vulnerables
// app.use(helmet());

// // Limitar peticiones (protección contra brute force)
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutos
//   max: 100 // 100 peticiones por IP
// });
// app.use('/api/auth', limiter); // Solo aplicar a rutas sensibles