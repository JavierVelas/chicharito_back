const noticiasService = require('../services/noticias.service');

// Obtener todas las noticias
exports.obtenerNoticias = async (req, res) => {
  try {
    const noticias = await noticiasService.obtenerNoticias();
    res.json(noticias);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener noticias' });
  }
}

// Obtener una noticia por ID
exports.obtenerNoticiaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const noticia = await noticiasService.obtenerNoticiaPorId(id);
    
    if (!noticia) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }
    
    res.json(noticia);
  } catch (error) {
    res.status(500).json({ error: 'Error al encontrar la noticia' });
  }
}

// Crear una noticia
exports.crearNoticia = async (req, res) => {
  try {
    const { titulo, info, fecha, id_user, url_imagen } = req.body;
    
    if (!titulo || !info || !id_user) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const nuevaNoticia = await noticiasService.crearNoticia(
      titulo, 
      info, 
      fecha || new Date().toISOString(), 
      id_user, 
      url_imagen
    );

    res.status(201).json(nuevaNoticia);
  } catch (error) {
    res.status(500).json({ error: 'Error al publicar la noticia' });
  }
}

// Actualizar una noticia
exports.actualizarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, info, fecha, id_user, url_imagen } = req.body;

    const actualizada = await noticiasService.actualizarNoticia(
      titulo, 
      info, 
      fecha, 
      id_user, 
      url_imagen,
      id
    );

    if (!actualizada) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al modificar la noticia' });
  }
}

// Eliminar una noticia
exports.eliminarNoticia = async (req, res) => {
  try {
    const { id } = req.params;
    const eliminada = await noticiasService.eliminarNoticia(id);

    if (!eliminada) {
      return res.status(404).json({ error: 'Noticia no encontrada' });
    }

    res.json({ message: 'Noticia eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar noticia' });
  }
}