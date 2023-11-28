const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const authenticate = require('./auth/authenticate');

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


async function connect() {
    await mongoose.connect(process.env.MONGO_URI)

    console.log('Connected to MongoDB');
}
connect().catch(console.error);
// Importa las rutas antes de usarlas como middleware
const signupRoutes = require('./routes/signup.js');
const pedidosRoutes = require('./routes/pedidos.js');
const refreshTokenRoutes = require('./routes/refreshToken.js');
const loginRoutes = require('./routes/login.js');
const userRoutes = require('./routes/user.js');
const logoutRoutes = require('./routes/logout.js');
const verifyEmail = require('./routes/verify-email.js');
// Utiliza las rutas como middleware
app.use('/api/signup', signupRoutes);
app.use('/api/verify-email', verifyEmail);
app.use('/api/refresh-token', refreshTokenRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/pedidos', authenticate, pedidosRoutes);
app.use('/api/user', authenticate, userRoutes);
app.use('/api/logout', authenticate, logoutRoutes);



app.listen(port, () => {
    console.log(`server is running on port ${port}`)
});