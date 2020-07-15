const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

/**
 * Create user
 * uri: /api/users
 */
router.post('/',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'La contraseña debe ser minimo de 6 caracteres').isLength({ min: 6 }),
    ],
    userController.createUser
);

module.exports = router;