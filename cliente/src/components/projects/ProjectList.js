import React, { useContext, useEffect } from 'react';
import Project from './Project';
import projectContext from '../../context/projects/projectContext';

const ProjectList = () => {

    const projectsContext = useContext(projectContext);
    const { projects, getProjects } = projectsContext;

    useEffect( () => {
        getProjects();
        // remove warning message
        // eslint-disable-next-line
    }, []);
    
    if (projects.length === 0) return <p>No hay proyectos, comienza creando uno.</p>;

    return (
        <ul className="listado-proyectos">  
            { projects.map(project => (
                <Project
                    key={project.id}
                    project={project}
                />
            ))}
        </ul>
    );
};

export default ProjectList;