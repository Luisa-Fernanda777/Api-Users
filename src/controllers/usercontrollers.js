import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/users.js';

const generateAccessToken = (username) => {
  return jwt.sign({ username: username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
};

const userController = {};

userController.registerUser = async (req, res) => {
  try {
    const { username, password, nombre, email, esAdmin } = req.body;
    const userData = { username, password, nombre, email, esAdmin };
    User.createUser(userData, (error, result) => {
      if (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error al registrar usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado exitosamente' });
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ message: 'Error al registrar usuario' });
  }
};

userController.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    User.getUserByUsername(username, async (error, user) => {
        if (error) {
            console.error('Error al iniciar sesión:', error);
            return res.status(500).json({ message: 'Error al iniciar sesión' });
        }
        if (!user) {
        return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
        return res.status(401).json({ message: 'Nombre de usuario o contraseña incorrectos' });
        }

        const accessToken = generateAccessToken(username);
        res.json({ accessToken: accessToken });
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
};

userController.getAllUsers = async (req, res) => {
  try {
    User.getAllUsers((error, users) => {
      if (error) {
        console.error('Error al obtener usuarios:', error);
        return res.status(500).json({ message: 'Error al obtener usuarios' });
      }
      res.json(users);
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
  }
};

userController.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    User.getUserById(userId, (error, user) => {
      if (error) {
        console.error('Error al obtener usuario por ID:', error);
        return res.status(500).json({ message: 'Error al obtener usuario por ID' });
      }
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json(user);
    });
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ message: 'Error al obtener usuario por ID' });
  }
};

userController.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userData = req.body;
    User.updateUser(userId, userData, (error, result) => {
      if (error) {
        console.error('Error al actualizar usuario:', error);
        return res.status(500).json({ message: 'Error al actualizar usuario' });
      }
      res.json({ message: 'Usuario actualizado con éxito' });
    });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario' });
  }
};

userController.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    User.deleteUser(userId, (error, result) => {
      if (error) {
        console.error('Error al eliminar usuario:', error);
        return res.status(500).json({ message: 'Error al eliminar usuario' });
      }
      res.json({ message: 'Usuario eliminado con éxito' });
    });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ message: 'Error al eliminar usuario' });
  }
};



export default userController;