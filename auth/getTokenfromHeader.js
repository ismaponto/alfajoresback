function getTokenFromHeader(headers) {
    if (headers.authorization) {
        const parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            // Elimina las comillas dobles del principio y del final del token de refresco
            const token = parted[1].replace(/^"|"$/g, '');
            return token;
        } else {
            return null;
        }
    } else {
        return null;
    }
}
module.exports = getTokenFromHeader;