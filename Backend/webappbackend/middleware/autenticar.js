const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  // Obtén el token desde el encabezado 'Authorization'
  const token = req.headers['authorization'];

  if (!token) {
      return res.status(403).json({ mensaje: 'Acceso denegado, token no proporcionado' });
  }

  // Verifica si el token tiene el prefijo "Bearer"
  if (!token.startsWith('Bearer ')) {
      return res.status(403).json({ mensaje: 'Token no tiene el formato correcto' });
  }

  // Extrae el token de la cadena "Bearer <token>"
  const tokenSinBearer = token.split(' ')[1];

  try {
      // Verifica y decodifica el token (asegúrate de tener la clave secreta correcta)
      const decoded = jwt.verify(tokenSinBearer, process.env.SECRET_KEY); // Usa tu clave secreta

      // Si el token es válido, lo agregamos al objeto `req` para futuras referencias
      req.usuario = decoded;
      
      // Pasamos al siguiente middleware o controlador
      next();
  } catch (error) {
      // Si el token no es válido
      return res.status(403).json({ mensaje: 'Token inválido' });
  }
};
