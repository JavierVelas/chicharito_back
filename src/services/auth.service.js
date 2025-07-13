const { pool } = require('../database');
const crypto = require('crypto');

async function login(usuario, clave) {
  return new Promise((resolve, reject) => {
    // 1. Primero busca solo por usuario
    pool.query(
      'SELECT * FROM usuarios WHERE usuario = ? LIMIT 1',
      [usuario],
      async (err, results) => {
        if (err) return reject(err);
        
        if (results.length === 0) {
          return resolve(null); // Usuario no existe
        }

        const usuarioDB = results[0];
        
        // 2. Hashea la clave ingresada y compara con la BD
        const hashClaveIngresada = crypto
          .createHash('sha256')
          .update(clave)
          .digest('hex');

        if (hashClaveIngresada === usuarioDB.clave) {
          resolve(usuarioDB); // Autenticación exitosa
        } else {
          resolve(null); // Contraseña incorrecta
        }
      }
    );
  });
}

module.exports = { login };