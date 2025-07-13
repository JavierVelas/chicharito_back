const { pool } = require('../database');
const { stack } = require('../router/noticias.Routes');

// Obtener todas las noticias
exports.obtenerNoticias = async () => {
  try {
    return new Promise((resolve, reject) => {
      pool.query(
        'SELECT * FROM noticias ORDER BY fecha DESC',
        (err, results) => {
          if (err) return reject(err);
          resolve(results);
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
        'SELECT * FROM noticias WHERE info_id = ?',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results[0] || null);
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
      'INSERT INTO noticias (titulo, info, fecha, id_user, url_imagen) VALUES (?, ?, ?, ?, ?)', crear,
      (err, results) => {
        if (err) return reject({ status: 500, message: 'Ocurrió un error al intentar crear esta noticia', error: err });
        resolve({ info_id: results.insertId });
      }
    );
  });
};

// Actualizar una noticia
exports.actualizarNoticia = async (titulo, info, fecha, id_user, url_imagen, id) => {
  return new Promise((resolve, reject) => {
    const datos = [titulo, info, fecha, id_user, url_imagen, id];
    pool.query(
      'UPDATE noticias SET titulo = ?, info = ?, fecha = ?, id_user = ?, url_imagen = ? WHERE info_id = ?', datos,
      (err, results) => {
        if (err) return reject({ status: 500, message: 'Ocurrió un error al intentar modificar esta noticia', error: err });
        resolve(results.affectedRows > 0);
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
        'DELETE FROM noticias WHERE info_id = ?',
        [id],
        (err, results) => {
          if (err) return reject(err);
          resolve(results.affectedRows > 0);
        }
      );
    });
  } catch (error) {
    throw { status: 500, message: 'Ocurrió un error al intentar borrar esta noticia', error }
  }
}