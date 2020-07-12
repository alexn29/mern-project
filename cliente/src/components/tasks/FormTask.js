import React, { useContext, useState } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(TaskContext);
    const { createTask } = tasksContext;

    const [task, setTask] = useState({
        name: ''
    });
    
    const { name } = task;
    
    if (!project) return null;

    const [currentProject] = project;

    const handleChange = e => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        task.projectId = currentProject.id;
        task.status = false;
        createTask(task);
    }

    return (
        <div className="formulario">
            <form 
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="e.g. Set up environment"
                        name="name"
                        value={name}
                        onChange={handleChange} />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar Tarea" />
                </div>
            </form>
        </div>
    );
};

export default FormTask;