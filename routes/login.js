const { jsonresponse } = require('../lib/jsonresponse.js');
const User = require('../schema/user.js');
const router = require('express').Router();
const getUserInfo = require('../lib/getUserInfo');

router.post('/', async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json(jsonresponse(400, { error: 'All fields are required' }));
    }

    try {
        const user = await User.findOne({ email });
        if (user) {
            const correctPassword = await user.comparePassword(password);

            if (correctPassword) {
                const accessToken = user.createAccessToken(); // Ensure correct method name
                const refreshToken = await user.createRefreshToken();
                return res.status(200).json(jsonresponse(200, { user: getUserInfo(user), accessToken, refreshToken }));
            } else {
                return res.status(401).json(jsonresponse(401, { error: 'User or Password incorrect' }));
            }
        } else {
            return res.status(400).json(jsonresponse(400, { error: 'User not found' }));
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json(jsonresponse(500, { error: 'Internal Server Error' }));
    }
});

module.exports = router;