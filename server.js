const app = require('./app');

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {  // <- Cambia crucial
  console.log(`Servidor corriendo en ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
});