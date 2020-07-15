const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

/**
 * Create projects
 * uri: /api/projects
 */
router.post('/',
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').notEmpty()
    ],
    projectController.createProject
);

router.get('/',
    auth,
    projectController.getProjectsByUser
);

router.put('/:id',
    auth,
    [
        check('name', 'El nombre del proyecto es obligatorio').notEmpty()
    ],
    projectController.updateProject
)

router.delete('/:id',
    auth,
    projectController.deleteProject
)

module.exports = router;