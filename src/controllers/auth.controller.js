const authService = require('../services/auth.service');

// En tu auth.controller.js
exports.login = async (req, res) => {
  // Verifica que el body exista y tenga datos
  if (!req.body || !req.body.usuario || !req.body.clave) {
    return res.status(400).json({ 
      error: 'Datos incompletos',
      message: 'Debes enviar { usuario, clave } en el cuerpo de la solicitud'
    });
  }

  const { usuario, clave } = req.body; // Ahora seguro que existen

  try {
    const user = await authService.login(usuario, clave);
    if (user) {
      res.json({ success: true, user });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

