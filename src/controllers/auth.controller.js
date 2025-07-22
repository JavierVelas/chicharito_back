const authService = require('../services/auth.service');

// En tu controlador de login (backend)
exports.login = async (req, res) => {
  try {
    // Validación básica
    if (!req.body || !req.body.usuario || !req.body.clave) {
      return res.status(400).json({ error: "Usuario y clave son requeridos" });
    }

    const { usuario, clave } = req.body;

    // Debug: Verifica los datos recibidos
    console.log(`Intento de login para usuario: ${usuario}`);

    const user = await authService.login(usuario, clave);
    
    if (!user) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Genera token JWT (asegúrate de tener JWT_SECRET en .env)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { 
      expiresIn: '1h' 
    });

    res.json({ token });
    
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ 
      error: "Error interno del servidor",
      detalle: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

