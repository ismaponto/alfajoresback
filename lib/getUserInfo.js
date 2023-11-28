const getUserInfo = function(user) {
    return {
        email: user.email,
        name: user.name,
        surname: user.surname,
        _id: user._id,
    }
}
module.exports = getUserInfo;