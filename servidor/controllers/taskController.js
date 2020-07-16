const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const { messages } = require('../config/messages');

exports.createTask = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { projectId } = req.body;

    try {
        const project = await Project.findById(projectId);
        
        if (!project) {
            return res.status(404).json({ msg: `Project ${messages.status[404] }` })
        }

        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: messages.status[401] });
        }

        const task = new Task(req.body);
        await task.save();
        res.json({ task });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(messages.status[500]);
    }
}

exports.getTasksByProjectId = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { projectId } = req.body;

    try {
        const project = await Project.findById(projectId);
        
        if (!project) {
            return res.status(404).json({ msg: `Project ${messages.status[404] }` })
        }

        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: messages.status[401] });
        }

        const tasks = await Task.find({ projectId })
        res.json({ tasks });
        
    } catch (error) {
        console.log(error);
        res.status(500).send(messages.status[500]);
    }
}

exports.updateTask = async (req, res) => {

    try {
        
        const { name, status, projectId } = req.body;
        const taskId = req.params.id;
        
        // verify if task exist
        let task = Task.findById(taskId);

        if (!task) {
            return res.status(404).json({ msg: `Task ${messages.status[404] }` });
        }

        // verify if project exist
        const project = await Project.findById(projectId);
        
        if (!project) {
            return res.status(404).json({ msg: `Project ${messages.status[404] }` })
        }

        // check if it is the correct author
        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: messages.status[401] });
        }

        const newTask = {};

        if (name) newTask.name = name;

        if (status) newTask.status = status;

        task = await Task.findOneAndUpdate({ _id: taskId }, newTask, { new: true });

        res.json({ task });

    } catch (error) {
        console.log(error);
        res.status(500).send(messages.status[500]);
    }
}