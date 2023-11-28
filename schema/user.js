const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { generateAccessToken, generateRefreshToken } = require('../auth/generateTokens.js');
const getUserInfo = require('../lib/getUserInfo.js');
const Token = require('./token.js')


const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', function(next) {
    if (this.isModified('password') || this.isNew) {
        const document = this;
        bcrypt.hash(document.password, 10, (err, hash) => {
            if (err) {
                return next(err);
            } else {
                document.password = hash;
                return next();
            }
        });
    } else {
        return next();
    }
});

UserSchema.statics.userExists = async function(email) {
    const result = await this.findOne({ email });
    return result !== null;
};

UserSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.methods.createAccessToken = function() {
    return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function() {
    const refreshToken = generateRefreshToken(getUserInfo(this));
    try {
        await new Token({ token: refreshToken }).save();
        return refreshToken;
    } catch (error) {
        console.error('Error saving refresh token:', error);
        throw error; // Rethrow the error for proper handling at a higher level
    }
};


const User = mongoose.model('User', UserSchema);

module.exports = User;