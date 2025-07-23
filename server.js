const app = require('./app');



const PORT = process.env.PORT || 5432;
app.listen(PORT, '0.0.0.0', () => {  // <- Cambia crucial
  console.log(`Servidor corriendo en ${process.env.BASE_URL || `http://localhost:${PORT}`}`);
});