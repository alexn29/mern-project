import React, { Fragment, useContext } from 'react';
import Task from './Task';
import projectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const TaskList = () => {

    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;
    
    const tasksContext = useContext(TaskContext);
    const { tasksProject } = tasksContext;

    if (!project) return <h2>Selecciona un proyecto</h2>;

    const [projectObj] = project;

    const onClickEliminar = () => {
        deleteProject(projectObj.id);
    }

    return (
        <Fragment>
            <h2>Proyecto: { projectObj.name }</h2>
            <ul className="listado-tareas">
                {
                    tasksProject.length === 0 ?
                    <li key={0} className="tarea"><p>No hay tareas</p></li>
                    :
                    tasksProject.map(task => (
                        <Task
                            key={task.id} 
                            task={task} />
                    ))
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar Proyecto &times;
            </button>
        </Fragment>
    );
};

export default TaskList;