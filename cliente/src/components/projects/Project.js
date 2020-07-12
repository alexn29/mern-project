import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';


const Project = ({project}) => {

    const projectsContext = useContext(ProjectContext);
    const { currentProject } = projectsContext;

    const tasksContext = useContext(TaskContext);
    const { getTasksByProjectID } = tasksContext;

    const selectProject = id => {
        currentProject(id);
        getTasksByProjectID(id);
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => selectProject(project.id) }
                >{ project.name }</button>
        </li>
    );
};

export default Project;