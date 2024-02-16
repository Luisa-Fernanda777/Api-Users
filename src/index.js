import express from 'express';
import bodyParser from 'body-parser';
import userController from './controllers/usercontrollers.js';
import authenticateToken from './middleware/authorization.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.post('/users/register', userController.registerUser);
app.post('/users/login', userController.loginUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.put('/users/:id', authenticateToken, userController.updateUser);
app.delete('/users/:id', authenticateToken, userController.deleteUser);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});