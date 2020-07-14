import React, { useContext, useState, useEffect } from 'react';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const FormTask = () => {

    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(TaskContext);
    const { 
        selectedTask,
        errorTask,
        createTask,
        validateTask,
        getTasksByProjectID,
        updateTask,
        cleanTask
    } = tasksContext;

    useEffect(() => {
        if (selectedTask !== null) {
            setTask(selectedTask)
        } else {
            setTask({
                name: ''
            })
        }
    }, [selectedTask])

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

        if (name.trim() === '') {
            validateTask();
            return;
        }

        if (selectedTask === null) {
            task.projectId = currentProject.id;
            task.status = false;
            createTask(task);
        }
        else {
            updateTask(task);
            cleanTask();
        }

        getTasksByProjectID(currentProject.id);

        setTask({
            name: ''
        });
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
                        value={ selectedTask ? "Editar Tarea" : "Agregar Tarea" } />
                </div>
            </form>
            { errorTask ? 
                <p className="mensaje error">El nombre de la tarea es obligatorio.</p> 
                : null 
            }
        </div>
    );
};

export default FormTask;