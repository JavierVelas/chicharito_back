const  pool  = require('../database');

// Obtener todas las noticias
exports.obtenerNoticias = async () => {
  try {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM noticias ORDER BY fecha DESC',
        (err, results) => {
          if (err) return reject(err);
          resolve(results.rows);
        }
      );
    });
  } catch (error) {
    throw { status: 500, message: 'Ocurrió un error al intentar llamar las noticias', error }
  }
}

// Obtener una noticia por ID
exports.obtenerNoticiaPorId = async (id) => {
  try {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM noticias WHERE id = $1',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.rows[0] || null);
        }
      );
    });
  } catch (error) {
    throw { status: 500, message: 'Ocurrió un error al intentar obtener una noticia por id', error }
  }
}

// Crear una noticia
exports.crearNoticia = async (titulo, info, fecha, id_user, url_imagen) => {
  const crear = [titulo, info, fecha, id_user, url_imagen];
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO noticias (titulo, info, fecha, id_user, url_imagen) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      crear,
      (err, results) => {
        if (err) return reject({ status: 500, message: 'Ocurrió un error al intentar crear esta noticia', error: err });
        resolve({ id: results.rows[0].id });
      }
    );
  });
};

// Actualizar una noticia
exports.actualizarNoticia = async (titulo, info, fecha, id_user, url_imagen, id) => {
  return new Promise((resolve, reject) => {
    const datos = [titulo, info, fecha, id_user, url_imagen, id];
    pool.query(
      'UPDATE noticias SET titulo = $1, info = $2, fecha = $3, id_user = $4, url_imagen = $5 WHERE id = $6',
      datos,
      (err, results) => {
        if (err) return reject({ status: 500, message: 'Ocurrió un error al intentar modificar esta noticia', error: err });
        resolve(results.rowCount > 0);
      }
    );
  });
};

// Eliminar una noticia
exports.eliminarNoticia = async (id) => {
  try {
    console.log("el id obtenido es el: ", id);
    return new Promise((resolve, reject) => {
      pool.query(
        'DELETE FROM noticias WHERE id = $1',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.rowCount > 0);
        }
      );
    });
  } catch (error) {
    throw { status: 500, message: 'Ocurrió un error al intentar borrar esta noticia', error }
  }
}