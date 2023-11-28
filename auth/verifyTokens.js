const jwt = require('jsonwebtoken');
require("dotenv").config();


function verifyAccessToken(token) {
    return jwt.verify(token, process.env.access_token_secret)
}

function verifyRefreshToken(token) {
    try {
        return jwt.verify(token, process.env.refresh_token_secret, { algorithms: ['HS256'] });
    } catch (error) {
        console.error('Error al verificar el token de actualización:', error.message);
        return null; // o maneja el error de otra manera según tus necesidades
    }
}

module.exports = { verifyAccessToken, verifyRefreshToken }