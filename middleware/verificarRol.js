const JWT = require('jsonwebtoken');

const verificarRol = (req, res, next) => {
    if (req.payload.rol !== 'ADMIN') {
        return res.status(401).json({ Error: 'Acceso no autorizado!!' });
    }
    next();
}

module.exports = verificarRol;