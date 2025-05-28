const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');
const verifyToken = require('../middlewares/auth');

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get('/', verifyToken, controller.getUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener datos de un usuario en base a su id
 *     responses:
 *       200:
 *         description: Json con los datos del usuario
 */
router.get('/:id', verifyToken, controller.getUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', verifyToken, controller.createUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Crear un nuevo usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuario editado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.put('/:id', verifyToken, controller.updateUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Borra el usuario
 *     responses:
 *       200:
 *         description: Elimina el usuario
 */
router.delete('/:id', verifyToken, controller.deleteUsuario);

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Hacer login y recibir un json web token
 *     security: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Login exitoso y te devuelve un json web token
 *       400:
 *         description: Datos inválidos
 */
router.post('/login', controller.loginUsuario);

module.exports = router;