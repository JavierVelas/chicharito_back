const app = require('./app');

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});