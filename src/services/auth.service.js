const  pool  = require('../database');
const crypto = require('crypto');

async function login(usuario, clave) {
  try {
    const results = await pool.query(
      'SELECT * FROM usuarios WHERE usuario = $1 LIMIT 1',
      [usuario]
    );

    if (results.rows.length === 0) {
      return null; // Usuario no existe
    }

    const usuarioDB = results.rows[0];

    const hashClaveIngresada = crypto
      .createHash('sha256')
      .update(clave)
      .digest('hex');

    if (hashClaveIngresada === usuarioDB.clave) {
      return usuarioDB; // Autenticación exitosa
    } else {
      return null; // Contraseña incorrecta
    }
  } catch (err) {
    throw err; 
  }
}

module.exports = { login };