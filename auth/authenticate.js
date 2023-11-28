const getTokenFromHeader = require('./getTokenfromHeader');
const { jsonresponse } = require('../lib/jsonresponse.js');
const { verifyAccessToken } = require('./verifyTokens');

function authenticate(req, res, next) {
    const token = getTokenFromHeader(req.headers);
    if (token) {
        const decoded = verifyAccessToken(token)
        req.user = {...decoded.email };
        next();
    } else {
        res
            .status(401)
            .send(jsonresponse(401, { error: 'Unauthorized token' }));
    }
}
module.exports = authenticate;