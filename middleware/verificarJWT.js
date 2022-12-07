const JWT = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ Error: 'Acceso no autorizado!!' });
    }

    try {
        const payload = JWT.verify(token, "IUDigital*2022");
        req.payload = payload;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({ Error: 'Acceso no autorizado!!' });
    }
}

module.exports = validarJWT;