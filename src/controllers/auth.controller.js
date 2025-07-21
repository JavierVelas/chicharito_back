const authService = require('../services/auth.service');

const login = async (req, res) => {
  const { usuario, clave } = req.body;
  console.log('Datos recibidos:', usuario, clave);

  try {
    const user = await authService.login(usuario, clave);
    console.log('Resultado de authService.login:', user);

    if (user) {
      res.status(200).json({ message: 'Login exitoso', user });
    } else {
      res.status(401).json({ message: 'Usuario o clave inválidos' });
    }
  } catch (error) {
    console.error('Error en login controller:', error);
    res.status(500).json({ 
      message: 'Error del servidor',
      error: error.message // Solo para desarrollo, quitar en producción
    });
  }
};

// Exporta las funciones directamente
module.exports = {
  login
};