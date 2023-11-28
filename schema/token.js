const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const tokenSchema = new Schema({
    id: { type: Types.ObjectId },
    token: { type: String, required: true },

});

module.exports = mongoose.model('Token', tokenSchema);