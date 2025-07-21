app.use((req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    documentación: 'https://github.com/JavierVelas/chicharito_back' // Opcional
  });
});