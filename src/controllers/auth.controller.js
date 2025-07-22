const authService = require('../services/auth.service');
const jwt = require('jsonwebtoken');
const { logger } = require('../utils/logger'); // Asumiendo que tienes un logger configurado

// Controlador de login
exports.login = async (req, res) => {
  try {
    // 1. Validación de entrada
    if (!req.body?.usuario?.trim() || !req.body?.clave?.trim()) {
      logger.warn('Intento de login sin credenciales completas');
      return res.status(400).json({ 
        error: "Se requieren usuario y contraseña",
        code: "CREDENCIALES_INCOMPLETAS"
      });
    }

    const { usuario, clave } = req.body;

    // 2. Auditoría: Registro del intento (sin información sensible)
    logger.info(`Intento de login para usuario: ${usuario.substring(0, 3)}***`);

    // 3. Autenticación
    const user = await authService.login(usuario, clave);
    
    if (!user) {
      logger.warn(`Intento fallido para usuario: ${usuario.substring(0, 3)}***`);
      return res.status(401).json({ 
        error: "Credenciales inválidas",
        code: "CREDENCIALES_INVALIDAS"
      });
    }

    // 4. Generación del token JWT seguro
    const token = jwt.sign(
      { 
        id: user.id,
        rol: user.rol, // Añade roles si es necesario
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // 1 hora de expiración
      }, 
      process.env.JWT_SECRET,
      { algorithm: 'HS256' }
    );

    // 5. Configuración de la cookie segura (opcional)
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000 // 1 hora
    });

    // 6. Respuesta exitosa (sin información sensible)
    logger.info(`Login exitoso para usuario ID: ${user.id}`);
    res.json({ 
      success: true,
      token,
      user: {
        id: user.id,
        nombre: user.nombre,
        rol: user.rol
        // Excluir información sensible como contraseñas
      }
    });
    
  } catch (error) {
    logger.error(`Error en login: ${error.message}`);
    res.status(500).json({ 
      error: "Error en el servidor",
      code: "ERROR_SERVIDOR",
      detalle: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};