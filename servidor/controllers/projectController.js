const Project = require('../models/Project');
const { messages } = require('../config/messages');
const { validationResult } = require('express-validator');

exports.createProject = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const project = new Project(req.body);
        project.author = req.user.id;
        project.save();
        res.json(project);
    } catch (error) {
        res.status(500).send(messages.status[500]);
    }
}

// get all projects from current user
exports.getProjectsByUser = async (req, res) => {
    try {
        console.log(req.user);
        const projects = await Project.find({ author: req.user.id }).sort({ createdAt: -1 });
        res.json({ projects });
    } catch (error) {
        res.status(500).send(messages.status[500]);
    }
}

// update a project
exports.updateProject = async (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;
    const newProject = {};

    if (name) {
        newProject.name = name;
    }

    try {
        
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: messages.status[404] });
        }

        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: messages.status[401] });
        }

        project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set: newProject }, { new: true });

        res.json({ project });

    } catch (error) {
        console.log(error);
        res.status(500).send(messages.status[500]);
    }
}

exports.deleteProject = async (req, res) => {
    try {
        
        let project = await Project.findById(req.params.id);

        if (!project) {
            return res.status(404).json({ msg: `Project ${messages.status[404]} ` });
        }

        if (project.author.toString() !== req.user.id) {
            return res.status(401).json({ msg: messages.status[401] });
        }

        await Project.findOneAndRemove({ _id: req.params.id });

        res.json({ msg: messages.onDelete });

    } catch (error) {
        console.log(error);
        res.status(500).send(messages.status[500]);
    }
}