const jwt = require('jsonwebtoken');
require("dotenv").config();

const access_token_secret = process.env.access_token_secret;
const refresh_token_secret = process.env.refresh_token_secret;

function sign(payload, isAccessToken) {
    return jwt.sign(payload, isAccessToken ? access_token_secret : refresh_token_secret, { algorithm: 'HS256', expiresIn: isAccessToken ? '1d' : '1h' });
}

function generateAccessToken(email) {
    return sign({ email }, true);
}

function generateRefreshToken(email) {
    return sign({ email }, false);
}

module.exports = { generateAccessToken, generateRefreshToken };