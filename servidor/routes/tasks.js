const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

/**
 * Create task
 * uri: /api/tasks
 */
router.post('/',
    auth,
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('projectId', 'El proyecto es obligatorio').notEmpty()
    ],
    taskController.createTask
);

router.get('/',
    auth,
    [
        check('projectId', 'El ID del proyecto es obligatorio').notEmpty()
    ],
    taskController.getTasksByProjectId
);

router.put('/:id',
    auth,
    taskController.updateTask
);

module.exports = router;