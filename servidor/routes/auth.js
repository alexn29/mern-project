const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

/**
 * Authenticate user
 * uri: /api/auth
 */
router.post('/',
    [
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'La contraseña debe ser minimo de 6 caracteres').isLength({ min: 6 }),
    ],
    authController.authUser
);

module.exports = router;