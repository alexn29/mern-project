import React, { useContext } from 'react';
import taskContext from '../../context/tasks/taskContext';
import projectContext from '../../context/projects/projectContext';

const Task = ({task}) => {
    
    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;
    const [currentProject] = project;

    const tasksContext = useContext(taskContext);
    const { deleteTaskByID, getTasksByProjectID, changeStatus, saveCurrentTask } = tasksContext;

    const { name, status, id } = task;

    const deleteTask = id => {
        deleteTaskByID(id);
        getTasksByProjectID(currentProject.id);
    }

    const toggleStatus = task => {

        if (task.status) {
            task.status = false;
        }
        else {
            task.status = true;
        }

        changeStatus(task);
    }

    const selectTask = task => {
        saveCurrentTask(task);
    }

    return (
        <li className="tarea sombra">
            <p>{ name }</p>
            <div className="estado">
                { status ? 
                    <button
                        type="button"
                        className="completo"
                        onClick={ () => toggleStatus(task) }
                    >Completo</button>
                :
                    <button
                        type="button"
                        className="incompleto"
                        onClick={ () => toggleStatus(task) }
                    >Incompleto</button>
                }
            </div>
            <div className="acciones">
                <button
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => selectTask(task) }
                >Editar</button>
                <button
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => deleteTask(id) }>Eliminar</button>
            </div>
        </li>
    );
};

export default Task;