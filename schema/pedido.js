const mongoose = require('mongoose');

const PedidoSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    idUser: { type: String, required: true },
    title: { type: String, required: true },
    completed: { type: Boolean, required: true, default: false },
    cuantos: { type: Number, required: true },
    recibio_pago: { type: Boolean, required: true },
    expiredate: { type: Date, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', PedidoSchema);