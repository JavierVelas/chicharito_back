const authService = require('../../src/services/auth.service');

exports.login = async (req, res) => {
  const { usuario, clave } = req.body;
  console.log('Datos recibidos:', usuario, clave); // <- Aquí

  try {
    const user = await authService.login(usuario, clave);
    console.log('Resultado de authService.login:', user); // <- Aquí

    if (user) {
      res.status(200).json({ message: 'Login exitoso', user });
    } else {
      res.status(401).json({ message: 'Usuario o clave inválidos' });
    }
  } catch (error) {
    console.error('Error en login controller:', error); // <- Aquí
    res.status(500).json({ message: 'Error del servidor' });
  }
};
