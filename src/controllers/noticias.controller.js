const noticiasService = require('../services/noticias.service');

// Obtener todas las noticias
exports.obtenerNoticias = async (req, res) => {
  try {
    const noticias = await noticiasService.obtenerNoticias();
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticias', detail: error.message });
  }
}

// Obtener una noticia por ID
exports.obtenerNoticiaPorId = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await noticiasService.obtenerNoticiaPorId(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Error al encontrar la noticia', detail: error.message });
  }
}

// Crear una noticia
exports.crearNoticia = async (req, res) => {
  try {
    const {titulo, info, fecha, id_user, url_imagen} = req.body;
    const response = await noticiasService.crearNoticia(
      titulo, 
      info, 
      fecha, 
      id_user,
      url_imagen // Nuevo campo añadido
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al publicar la noticia', 
      detail: error.message 
    });
  }
}

// Actualizar una noticia
exports.actualizarNoticia = async (req, res) => {
  try {
    const {id} = req.params;
    const {titulo, info, fecha, id_user, url_imagen} = req.body;
    
    console.log('Parametro id:', id);
    console.log('Body recibido:', {titulo, info, fecha, id_user, url_imagen});
    
    const response = await noticiasService.actualizarNoticia(
      titulo, 
      info, 
      fecha, 
      id_user, 
      url_imagen, // Nuevo campo añadido
      id
    );

    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al modificar la noticia', 
      detail: error.message 
    });
  }
}

// Eliminar una noticia
exports.eliminarNoticia = async (req, res) => {
  try {
    const {id} = req.params;
    const response = await noticiasService.eliminarNoticia(id);
    res.json(response);
  } catch (error) {
    res.status(500).json({ 
      error: 'Error al eliminar noticia', 
      detail: error.message 
    });
  }
}