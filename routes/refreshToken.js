const router = require('express').Router();
const { generateAccessToken } = require('../auth/generateTokens.js');
const { verifyRefreshToken } = require('../auth/verifyTokens.js')
const { jsonresponse } = require('../lib/jsonresponse.js');
const Token = require('../schema/token');

router.post('/', async(req, res) => {
    const refreshToken = (req.body.refreshToken);
    if (refreshToken) {
        // Asegúrate de que refreshToken sea una cadena (string)
        const refreshTokenString = refreshToken.toString();

        try {
            const found = await Token.findOne({
                token: refreshTokenString,
            });

            if (!found) {
                return res.status(401).send(jsonresponse(401, {
                    error: 'Unauthorized token 5'
                }));
            }

            const payload = verifyRefreshToken(found.token);;
            if (payload) {
                const accessToken = generateAccessToken(payload);
                return res.status(201).json(jsonresponse(201, accessToken));
            } else {
                return res.status(401).json(jsonresponse(401, { error: 'Unauthorized token 1' }));
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json(jsonresponse(401, { error: 'Unauthorized token 2' }));
        }
    } else {
        res.status(401).json(jsonresponse(401, { error: 'Unauthorized token 3' }));
    }
});

module.exports = router;