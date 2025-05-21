const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuariosModel = require('../models/usuariosModel');

const getUsuarios = async (req, res) => {
  try {
    const usuarios = await usuariosModel.getAllUsuarios();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const getUsuario = async (req, res) => {
  try {
    const usuario = await usuariosModel.getUsuarioById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const createUsuario = async (req, res) => {
  try {
    const newUser = await usuariosModel.createUsuario(req.body);
    res.status(201).json({ message: 'Usuario creado', id: newUser.id });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

const updateUsuario = async (req, res) => {
  try {
    await usuariosModel.updateUsuario(req.params.id, req.body);
    res.status(200).json({ message: 'Usuario actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    await usuariosModel.deleteUsuario(req.params.id);
    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await usuariosModel.getUsuarioByEmail(email);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) return res.status(401).json({ error: 'password incorrecta' });

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = {
  getUsuarios,
  getUsuario,
  createUsuario,
  updateUsuario,
  deleteUsuario,
  loginUsuario,
};