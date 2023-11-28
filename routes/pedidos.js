const router = require('express').Router();
const { jsonresponse } = require('../lib/jsonresponse.js');
const Pedido = require('../schema/pedido.js');

router.get('/', async(req, res) => {
    try {
        const idUser = req.user.email._id
            // Aquí deberías obtener los datos desde tu fuente de datos(base de datos, API, etc.)
            // const pedidos = await Pedido.find({ idUser });
        const pedidos = await Pedido.find({}); // Suponiendo que utilizas Mongoose para interactuar con MongoDB
        // Suponiendo que utilizas Mongoose para interactuar con MongoDB
        if (pedidos.length === 0) {
            return res
                .status(200)
                .json(jsonresponse(200, [{ title: 'carga el primer pedido' }]));
        } else {
            return res.status(200).json(jsonresponse(200, pedidos));
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        return res.status(500).json(jsonresponse(500, { error: 'Hubo un error en la solicitud' }));
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const pedidos = req.params.id;

        // Intenta encontrar y eliminar el todo por su ID
        const deletedTodo = await Todo.findByIdAndRemove(pedidos);

        if (!deletedTodo) {
            return res.status(404).json({ error: 'Todo no encontrado' });
        }

        res.json({ message: 'pedido eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const pedidoId = req.params.id;

        // Verifica si el pedido existe
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Realiza la eliminación del pedido
        await Pedido.findByIdAndRemove(pedidoId);

        res.status(200).json({ message: 'Pedido eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.put('/:id/toggle-completed', async(req, res) => {
    try {
        const pedidoId = req.params.id;

        // Verifica si el pedido existe
        const pedido = await Pedido.findById(pedidoId);
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido no encontrado' });
        }

        // Cambia el estado "completed" del pedido
        pedido.completed = !pedido.completed;
        await pedido.save();

        res.status(200).json({ message: 'Estado "completed" actualizado correctamente', updatedPedido: pedido });
    } catch (error) {
        console.error('Error al actualizar el estado "completed" del pedido:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
});
router.post('/', async(req, res) => {
    try {
        const { title, cuantos, recibio_pago, expiredate } = req.body;
        const idUser = req.user.email._id; // Assuming you have user information available in the request

        // Validate required fields
        if (!idUser || !title || !cuantos || expiredate === undefined || recibio_pago === undefined) {
            return res.status(400).json({
                status: 400,
                error: 'Missing required fields',
            });
        }

        // Create a new pedido object with the provided data
        const newPedido = new Pedido({
            idUser,
            title,
            cuantos,
            recibio_pago,
            expiredate,
        });

        // Save the new pedido to the database
        const savedPedido = await newPedido.save();

        // Respond with the saved pedido
        res.status(201).json({
            status: 201,
            data: savedPedido,
        });
    } catch (error) {
        console.error('Error creating pedido:', error);
        res.status(500).json({
            status: 500,
            error: 'Internal Server Error',
        });
    }
});

module.exports = router