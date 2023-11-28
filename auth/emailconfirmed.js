const { jsonresponse } = require('../lib/jsonresponse.js');
const User = require('../schema/user.js');

async function emailconfirmed(req, res, next) {
    // Obtén el token del encabezado de autorización
    let email = req.user.email.email;
    if (!email) { email = req.user.email }

    try {

        // Verifica si el usuario ha confirmado su correo electrónico
        const user = await User.findOne({ email });
        if (!user || !user.isEmailConfirmed) {

            return res.status(401).json(jsonresponse(401, { error: 'Porfavor verifique su e-mail desde el link que le hemos enviado por correo electronico' }));
        }
        next(); // Continúa con la siguiente middleware o ruta
    } catch (error) {
        console.error(error);
        return res.status(401).json(jsonresponse(401, { error: 'Algo ha salido mal' }));
    }
};

module.exports = emailconfirmed;